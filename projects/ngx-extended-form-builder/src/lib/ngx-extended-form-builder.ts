import type {
    AbstractControl,
    AsyncValidatorFn,
    FormControlOptions,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

/**
 * Вспомогательный alias-тип ключей в объекте Map, содержащем конфигурацию валидаторов контролов.
 */
export type ControlsNames<T> = T extends
    | null
    | undefined
    | number
    | bigint
    | boolean
    | symbol
    | string
    ? 'main'
    : T extends Array<infer U>
    ? 'main' | 'mainItems' | `mainItems.${PropertyesKeys<U>}`
    : T extends Observable<unknown> | Function
    ? never
    : 'main' | PropertyesKeys<T>;

/**
 * Вспомогательная утилита типа.
 * На вход принимает некий тип T, возвращает только строковые ключи этого типа, значения которых не являются Observable или Function, а также
 * строковые ключи всех вложенных объектов и объектов внутри вложенных массивов разделенных символом "." (точкой), так называемый "dot-like path".
 * Названия ключей также дополнительно модифицируются применимо к специфики использования только для данной библиотеки!
 */
export type PropertyesKeys<T> = T extends
    | undefined
    | null
    | number
    | bigint
    | boolean
    | symbol
    | Observable<unknown>
    | Function
    ? never
    : T extends string
    ? T
    : T extends Array<infer U>
    ? PropertyesKeys<U>
    : T extends {}
    ? {
          [K in keyof T]-?: K extends string
              ? T[K] extends string | number | bigint | boolean | symbol | undefined | null
                  ? K
                  : T[K] extends Observable<unknown> | Function
                  ? never
                  : T[K] extends Array<infer U>
                  ? K | `${K}Items.${PropertyesKeys<U>}` | `${K}Items`
                  : K | `${K}.${PropertyesKeys<T[K]>}`
              : never;
      }[keyof T]
    : never;

/**
 * Упрощенная запись для типа объекта FormGroup, образованного из типа T.
 * @deprecated Используй ScanFormType
 */
export type FormGroupType<T> = ScanFormType<T>;

/**
 * Универсальный тип-утилита.
 * Для любого типа Т выводит правильный тип создаваемой формы, включая любой уровень вложенности.
 * ВАЖНО!
 * Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых
 * Observable-значений ( в т.ч., к примеру, Subject  * и EventEmitter) и значений с типом Function (функции либо методы классов)
 * соответствующий элемент формы не создается. ScanFormType это также учитывает.
 */
export type ScanFormType<T> = T extends AbstractControl
    ? T
    : T extends `${string}`
    ? FormControl<`${PropertyesKeys<T>}`>
    : T extends true | false | boolean
    ? FormControl<boolean>
    : T extends symbol | number | bigint | string | undefined | null
    ? FormControl<T extends undefined ? T | undefined | null : T | null>
    : T extends Array<infer U>
    ? FormArray<ScanFormType<U>>
    : T extends {}
    ? FormGroup<{
          [K in keyof T]: ScanFormType<T[K]>;
      }>
    : never;

export type MakeControlOptions = Omit<FormControlOptions, 'validators' | 'asyncValidators'> & {
    disabled?: boolean;
    validators?: ValidatorFn[];
    asyncValidators?: AsyncValidatorFn[];
};

/**
@function makeForm<T>
  Фабричная функция для создания Angular Reactive Form.
В отличие от стандартного FormBuilder - а в пакете @angular/forms, при создании формы из сложных объектов,
сохраняется вложенность контролов - каждый вложенный объект превращается во вложенную FormGroup,
  обычные свойства объектов становятся FormControl - ами, а массивы - FormArray - ми.
При этом создаваемая форма имеет более строгую типизацию.

  ВАЖНО!
   Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых;
Observable - значений(в т.ч., к примеру, Subject * и EventEmitter) соответствующий элемент формы не создается.
 * @param source  источник данных типа T для создания формы.
 * @param keysValidator объект Map с конфигурацией синхронных валидаторов контролов формы.
 * В качестве ключей могут быть указаны следующие значения:
 *  PropertyesKeys<T> - строковые ключи в типе T, включая строковые ключи всех вложенных типов, разделенные "." - точкой.
    Например имеется такой тип:
    ```ts
                    interface User {
                      firstname: string;
                      lastname: string;
                      phone:  {
                        code: string;
                        number: string;
                        }
                      };
    ```
    Для формы, которая будет создана из объекта User в конфигурации валидаторов названия контролов можно будет указать так:
    `lastname` или`phone`, или`phone.code`.

   'main' - специальное значение, являющееся признаком того, что массив валидаторов необходимо
    назначить самому объекту формы, а не вложеным контролам.

   'mainItems' - используется только если source является массивом. Специальное значение, являющееся признаком того,
  что массив валидаторов необходимо назначить для всех элементов массива FormArray.
 * @param asyncKeysValidator объект Map, аналогичный keysValidator, но для асинхронных валидаторов
 * @returns объект типизированной формы - FormGroup, FormArray или FormControl в зависимости от типа значения source.
 */
export function makeForm<T extends unknown>(
    source: T,
    options?: Map<ControlsNames<T>, MakeControlOptions>,
): ScanFormType<T> {
    const isValue = <T extends any>(value: T | null | undefined): value is NonNullable<T> => {
        return value !== null && value !== undefined;
    };

    const form =
        isValue(source) && (typeof source === 'object' || typeof source === 'function')
            ? source instanceof Array
                ? CreationHelper.makeArray(source, options)
                : CreationHelper.makeGroup(source, 'main', options)
            : CreationHelper.makeControl(
                  <undefined | null | number | bigint | boolean | symbol | string>source,
                  options,
              );

    return <ScanFormType<T>>form;
}

export function liftValidationErrors(control: AbstractControl): ValidationErrors | null {
    const allControls =
        control instanceof FormGroup
            ? Object.values(control.controls)
            : control instanceof FormArray
            ? control.controls
            : [];
    const invalidControls = allControls.filter(control => control.status === 'INVALID');
    const errors: ValidationErrors =
        invalidControls.length === 0
            ? {}
            : invalidControls.reduce(
                  (accumulator, current) => {
                      if (current.errors) {
                          CreationHelper.addValidationErrors(current.errors, accumulator);
                      }
                      const innerErrors = liftValidationErrors(current);
                      if (innerErrors) {
                          CreationHelper.addValidationErrors(innerErrors, accumulator);
                      }
                      return accumulator;
                  },
                  <ValidationErrors>{},
              );
    return Object.values(errors).length === 0 ? null : errors;
}

class CreationHelper {
    static makeControl<T extends unknown>(
        source: T,
        options?: Map<ControlsNames<T>, MakeControlOptions>,
    ): FormControl<T | null> {
        const controlOptions = CreationHelper.getValidatorsOrNull(
            <ControlsNames<T>>'main',
            options,
            false,
        );
        const result =
            source instanceof FormControl
                ? source
                : new FormControl<T | null>(
                      !!source &&
                      typeof source == 'string' &&
                      (source.includes('0001-01-01') || source.includes('1970-01-01'))
                          ? null
                          : source,
                      {
                          validators: controlOptions?.validators,
                          asyncValidators: controlOptions?.asyncValidators,
                          updateOn: controlOptions?.updateOn,
                          nonNullable: controlOptions?.nonNullable,
                      },
                  );
        if (controlOptions?.disabled) {
            result.disable();
        }
        return result;
    }

    static makeGroup<T extends {}>(
        source: T | ScanFormType<T>,
        internalKey: ControlsNames<T>,
        options?: Map<ControlsNames<T>, MakeControlOptions>,
    ): ScanFormType<T> {
        const controlOptions = CreationHelper.getValidatorsOrNull(internalKey, options, true);
        const result: ScanFormType<T> =
            source instanceof FormGroup
                ? source
                : (<Array<[keyof T & string, T[keyof T]]>>Object.entries(source)).reduce(
                      (accumulator: ScanFormType<T>, entry) => {
                          const key = entry[0];
                          const value = entry[1];
                          if (!(value instanceof Observable)) {
                              accumulator.addControl(
                                  key,
                                  !!value &&
                                      (value instanceof FormGroup ||
                                          value instanceof FormArray ||
                                          value instanceof FormControl)
                                      ? <ScanFormType<T[keyof T]>>value
                                      : makeForm<T[keyof T]>(
                                            value,
                                            CreationHelper.makeNewMainMap<T, T[keyof T]>(
                                                <ControlsNames<T>>key,
                                                options,
                                            ),
                                        ),
                              );
                          }
                          return accumulator;
                      },
                      <ScanFormType<T>>new FormGroup(
                          {},
                          {
                              validators: controlOptions?.validators,
                              asyncValidators: controlOptions?.asyncValidators,
                              updateOn: controlOptions?.updateOn,
                          },
                      ),
                  );
        if (controlOptions?.disabled) {
            result.disable();
        }
        return result;
    }

    static makeArray<T extends unknown[], E = T extends Array<infer U> ? U : never>(
        source: E[] | FormArray<ScanFormType<E>>,
        options?: Map<ControlsNames<T>, MakeControlOptions>,
    ): FormArray<ScanFormType<E>> {
        const controlOptions = CreationHelper.getValidatorsOrNull(
            <ControlsNames<T>>'main',
            options,
            true,
        );
        const result =
            source instanceof FormArray
                ? source
                : new FormArray(
                      source.map((item: E) => {
                          const itemForm = makeForm(
                              item,
                              CreationHelper.makeNewMainMap<T, E>(
                                  <ControlsNames<T>>'mainItems',
                                  options,
                              ),
                          );
                          return itemForm;
                      }),
                      {
                          validators: controlOptions?.validators,
                          asyncValidators: controlOptions?.asyncValidators,
                          updateOn: controlOptions?.updateOn,
                      },
                  );
        if (controlOptions?.disabled) {
            result.disable();
        }
        return result;
    }

    static addValidationErrors(
        additionErrors: ValidationErrors,
        currentErrors: ValidationErrors,
    ): void {
        Object.entries(additionErrors).forEach(entry => (currentErrors[entry[0]] = entry[1]));
    }

    static liftErrors(control: AbstractControl): ValidationErrors | null {
        if (control instanceof FormControl) {
            return null;
        } else {
            const allControls =
                control instanceof FormGroup
                    ? Object.values(control.controls)
                    : control instanceof FormArray
                    ? control.controls
                    : [];
            const invalidControls = allControls.filter(control => control.status === 'INVALID');
            return invalidControls.length === 0
                ? null
                : invalidControls.reduce(
                      (accumulator, current) => {
                          if (current.errors) {
                              CreationHelper.addValidationErrors(current.errors, accumulator);
                          }
                          return accumulator;
                      },
                      <ValidationErrors>{},
                  );
        }
    }

    static getValidatorsOrNull<T>(
        key: ControlsNames<T>,
        options?: Map<ControlsNames<T>, MakeControlOptions>,
        addLift: boolean = false,
    ): MakeControlOptions | null | undefined {
        const result = options && options.has(key) ? options.get(key) : null;
        if (addLift) {
            if (result && result.validators) {
                result.validators.push(<ValidatorFn>CreationHelper.liftErrors);
                return result;
            } else {
                if (result) {
                    result.validators = [CreationHelper.liftErrors];
                    return result;
                } else {
                    return {
                        validators: [CreationHelper.liftErrors],
                    };
                }
            }
        } else {
            return result;
        }
    }

    static makeNewMainMap<I, O>(
        key: ControlsNames<I>,
        oldMap?: Map<ControlsNames<I>, MakeControlOptions>,
    ): Map<ControlsNames<O>, MakeControlOptions> | undefined {
        if (!oldMap || key === 'main') {
            return <Map<ControlsNames<O>, MakeControlOptions> | undefined>oldMap;
        } else {
            if (!oldMap.has(key) && !oldMap.has(<ControlsNames<I>>`${key}Items`)) {
                return new Map<ControlsNames<O>, MakeControlOptions>(
                    Array.from(oldMap.entries())
                        .filter(item => item[0] !== 'main' && item[0] !== 'mainItems')
                        .map(([entryKey, entryValue]) => [
                            <ControlsNames<O>>(
                                (entryKey.startsWith(`${key}.`)
                                    ? entryKey.replace(`${key}.`, '')
                                    : entryKey)
                            ),
                            entryValue,
                        ]),
                );
            } else {
                const filterPredicate = oldMap.has(<ControlsNames<I>>'main')
                    ? oldMap.has(<ControlsNames<I>>'mainItems')
                        ? (item: [ControlsNames<I>, MakeControlOptions]): boolean => {
                              const pre = item[0] !== key + 'Items';
                              return (
                                  item[0] !== key &&
                                  pre &&
                                  item[0] !== 'main' &&
                                  item[0] !== 'mainItems'
                              );
                          }
                        : (item: [ControlsNames<I>, MakeControlOptions]): boolean => {
                              const pre = item[0] !== key + 'Items';
                              return (
                                  item[0] !== key && key[0] !== key + 'Items' && item[0] !== 'main'
                              );
                          }
                    : oldMap.has(<ControlsNames<I>>'mainItems')
                    ? (item: [ControlsNames<I>, MakeControlOptions]): boolean => {
                          const pre = item[0] !== key + 'Items';
                          return item[0] !== key && pre && item[0] !== 'mainItems';
                      }
                    : (item: [ControlsNames<I>, MakeControlOptions]): boolean => {
                          const pre = item[0] !== key + 'Items';
                          return item[0] !== key && pre;
                      };
                const newMainValidatorsArray: Array<[ControlsNames<O>, MakeControlOptions]> =
                    oldMap.has(key)
                        ? oldMap.has(<ControlsNames<I>>`${key}Items`)
                            ? [
                                  [<ControlsNames<O>>'main', oldMap.get(key)!],
                                  [
                                      <ControlsNames<O>>'mainItems',
                                      oldMap.get(<ControlsNames<I>>`${key}Items`)!,
                                  ],
                              ]
                            : [[<ControlsNames<O>>'main', oldMap.get(key)!]]
                        : oldMap.has(<ControlsNames<I>>`${key}Items`)
                        ? [
                              [
                                  <ControlsNames<O>>'mainItems',
                                  oldMap.get(<ControlsNames<I>>`${key}Items`)!,
                              ],
                          ]
                        : [];
                const filtered = Array.from(oldMap.entries()).filter(filterPredicate);
                const result = new Map<ControlsNames<O>, MakeControlOptions>([
                    ...newMainValidatorsArray,
                    ...filtered.map<[ControlsNames<O>, MakeControlOptions]>(
                        ([entryKey, entryValue]) => [
                            <ControlsNames<O>>(
                                (entryKey.startsWith(`${key}.`)
                                    ? entryKey.replace(`${key}.`, '')
                                    : entryKey.startsWith(`${key}Items.`)
                                    ? entryKey.replace(`${key}Items.`, '')
                                    : entryKey)
                            ),
                            entryValue,
                        ],
                    ),
                ]);
                return result;
            }
        }
    }
}
