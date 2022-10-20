import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AsyncValidatorFn, AbstractControl, FormControlOptions } from "@angular/forms";
import { Observable } from "rxjs";

/**
 * Вспомогательная утилита типа.
 * На вход принимает некий тип T, возвращает список только строковых ключей этого типа, при этом значения этих ключей не являются Observable.
 */
export type StringKeys<T> = {
  [ K in keyof T ]: T[ K ] extends Observable<unknown> ?
  never :
  K extends string ?
  K : never;
}[ keyof T ];

/**
 * Вспомогательный alias-тип ключей в объекте Map, содержащем конфигурацию валидаторов контролов.
 */
export type ControlsNames<T> = T extends Observable<unknown> ?
  never :
  T extends Array<infer U> ?
  'main' | 'mainItems' | `mainItems.${ PropertyesKeys<U> }` :
  'main' | PropertyesKeys<T>;
/**
 * Вспомогательная утилита типа.
 * На вход принимает некий тип T, возвращает только строковые ключи этого типа.
 */
export type PropertyesKeys<T> = T extends undefined | null | number | boolean | symbol | Observable<unknown> ?
  never :
  T extends string ?
  T :
  T extends Array<infer U> ?
  PropertyesKeys<U> :
  {
    [ K in keyof T ]-?: K extends string ?
    T[ K ] extends (string | number | boolean | symbol | undefined | null) ?
    K :
    T[ K ] extends Observable<unknown> ?
    never :
    T[ K ] extends Array<infer U> ?
    `${ K }Items.${ PropertyesKeys<U> }` | `${ K }Items` | K :
    `${ K }.${ PropertyesKeys<T[ K ]> }` | K : never
  }[ keyof T ];
/**
 * Упрощенная запись для типа объекта FormGroup, образованного из типа T.
 */
export type FormGroupType<T> = FormGroup<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }>;

/**
 * Универсальный тип-утилита.
 * Для любого типа Т выводит правильный тип создаваемой формы, включая любой уровень вложенности.
 * ВАЖНО!
 * Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых
 * Observable-значений ( в т.ч., к примеру, Subject  * и EventEmitter) соответствующий элемент формы не создается.
 * ScanFormType это также учитывает.
 */
export type ScanFormType<T> = T extends AbstractControl ?
  T :
  T extends null | undefined ?
  never :
  T extends Array<infer U> ?
  FormArray<ScanFormType<U>> :
  T extends (string | number | boolean | symbol | null | undefined) ?
  FormControl<T> :
  FormGroupType<T>;

type MakeControlOptions = Omit<FormControlOptions, 'validators' | 'asyncValidators'> & {
  disabled?: boolean;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
};

function getValidatorsOrNull<T>(
  key: ControlsNames<T>,
  options?: Map<ControlsNames<T>, MakeControlOptions>,
  addLift: boolean = false
): MakeControlOptions | null | undefined {
  const result = options && options.has(key) ? options.get(key) : null;
  if (addLift) {
    if (result && result.validators) {
      result.validators.push(<ValidatorFn> liftErrors);
      return result;
    } else {
      if (result) {
        result.validators = [ liftErrors ];
        return result;
      } else {
        return {
          validators: [ liftErrors ]
        };
      };
    }
  } else {
    return result;
  };
}

function makeNewMainMap<I, O>(
  key: ControlsNames<I>,
  oldMap?: Map<ControlsNames<I>, MakeControlOptions>,
): Map<ControlsNames<O>, MakeControlOptions> | undefined {
  if (!oldMap || key === 'main') {
    return <Map<ControlsNames<O>, MakeControlOptions> | undefined> oldMap;
  } else {
    if (!oldMap.has(key) && !oldMap.has(<ControlsNames<I>> `${ key }Items`)) {
      return new Map<ControlsNames<O>, MakeControlOptions>(
        Array.from(
          oldMap.entries()
        ).filter(
          item => item[ 0 ] !== 'main' && item[ 0 ] !== 'mainItems'
        ).map(
          ([ entryKey, entryValue ]) => [ <ControlsNames<O>>(entryKey.startsWith(`${ key }.`) ? entryKey.replace(`${ key }.`, '') : entryKey), entryValue ]
        )
      );
    } else {
      const filterPredicate = oldMap.has(<ControlsNames<I>> 'main') ?
        oldMap.has(<ControlsNames<I>> 'mainItems') ?
          (item: [ ControlsNames<I>, MakeControlOptions ]) => {
            const pre = item[ 0 ] !== (key + 'Items');
            return item[ 0 ] !== key && pre && item[ 0 ] !== 'main' && item[ 0 ] !== 'mainItems';
          } :
          (item: [ ControlsNames<I>, MakeControlOptions ]) => {
            const pre = item[ 0 ] !== (key + 'Items');
            return item[ 0 ] !== key && key[ 0 ] !== (key + 'Items') && item[ 0 ] !== 'main';
          } :
        oldMap.has(<ControlsNames<I>> 'mainItems') ?
          (item: [ ControlsNames<I>, MakeControlOptions ]) => {
            const pre = item[ 0 ] !== (key + 'Items');
            return item[ 0 ] !== key && pre && item[ 0 ] !== 'mainItems';
          } :
          (item: [ ControlsNames<I>, MakeControlOptions ]) => {
            const pre = item[ 0 ] !== (key + 'Items');
            return item[ 0 ] !== key && pre;
          };
      const newMainValidatorsArray: [ ControlsNames<O>, MakeControlOptions ][] = oldMap.has(key) ?
        oldMap.has(<ControlsNames<I>> `${ key }Items`) ?
          [
            [ <ControlsNames<O>> 'main', oldMap.get(key)! ],
            [ <ControlsNames<O>> 'mainItems', oldMap.get(<ControlsNames<I>> `${ key }Items`)! ]
          ] :
          [
            [ <ControlsNames<O>> 'main', oldMap.get(key)! ],
          ] :
        oldMap.has(<ControlsNames<I>> `${ key }Items`) ?
          [
            [ <ControlsNames<O>> 'mainItems', oldMap.get(<ControlsNames<I>> `${ key }Items`)! ]
          ] :
          [];
      const filtered = Array.from(
        oldMap.entries()
      ).filter(filterPredicate);
      const result = new Map<ControlsNames<O>, MakeControlOptions>([
        ...newMainValidatorsArray,
        ...filtered.map<[ ControlsNames<O>, MakeControlOptions ]>(
          ([ entryKey, entryValue ]) => [ <ControlsNames<O>>(
            entryKey.startsWith(`${ key }.`) ?
              entryKey.replace(`${ key }.`, '') :
              entryKey.startsWith(`${ key }Items.`) ?
                entryKey.replace(`${ key }Items.`, '') :
                entryKey
          ), entryValue ]
        )
      ]);
      return result;
    };
  };
}

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
  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array<unknown> ?
      makeArray(source, options) :
      makeGroup(<object> source, 'main', options) :
    makeControl(<undefined | null | number | boolean | symbol | string> source, options);
  return <ScanFormType<T>> form;
};

function liftErrors(control: AbstractControl): ValidationErrors | null {
  if (control instanceof FormControl) {
    return null;
  } else {
    const allControls = control instanceof FormGroup ?
      Object.values(control.controls) :
      control instanceof FormArray ?
        control.controls :
        [];
    const invalidControls = allControls.filter(control => control.status === 'INVALID');
    return invalidControls.length === 0 ? null : invalidControls.reduce(
      (accumulator, current) => {
        if (current.errors) {
          addValidationErrors(current.errors, accumulator);
        };
        return accumulator;
      }, <ValidationErrors> {}
    );
  }
}

export function liftValidationErrors(control: AbstractControl): ValidationErrors | null {
  const allControls = control instanceof FormGroup ?
    Object.values(control.controls) :
    control instanceof FormArray ?
      control.controls :
      [];
  const invalidControls = allControls.filter(control => control.status === 'INVALID');
  const errors: ValidationErrors = invalidControls.length === 0 ? {} : invalidControls.reduce(
    (accumulator, current) => {
      if (current.errors) {
        addValidationErrors(current.errors, accumulator);
      };
      const innerErrors = liftValidationErrors(current);
      if (innerErrors) {
        addValidationErrors(innerErrors, accumulator);
      };
      return accumulator;
    }, <ValidationErrors> {}
  );
  return Object.values(errors).length === 0 ? null : errors;
};

function addValidationErrors(additionErrors: ValidationErrors, currentErrors: ValidationErrors) {
  Object.entries(additionErrors).forEach(
    entry => currentErrors[ entry[ 0 ] ] = entry[ 1 ]
  );
}

function makeControl<T extends undefined | null | number | boolean | symbol | string>(
  source: T | FormControl<T | null>,
  options?: Map<ControlsNames<T>, MakeControlOptions>
): FormControl<T | null> {
  const controlOptions = getValidatorsOrNull(<ControlsNames<T>> 'main', options, false);
  const result = source instanceof FormControl ?
    source :
    new FormControl<T | null>(
      !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
      ,
      {
        validators: controlOptions?.validators,
        asyncValidators: controlOptions?.asyncValidators,
        updateOn: controlOptions?.updateOn,
        nonNullable: controlOptions?.nonNullable
      },
    );
  if (controlOptions?.disabled) {
    result.disable();
  };
  return result;
}

function makeGroup<T extends object = object>(
  source: T | FormGroupType<T>,
  internalKey: ControlsNames<T>,
  options?: Map<ControlsNames<T>, MakeControlOptions>
): FormGroupType<T> {
  const controlOptions = getValidatorsOrNull(internalKey, options, false);
  const result = source instanceof FormGroup<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }> ?
    source :
    (<[ StringKeys<T>, T[ StringKeys<T> ] ][]> Object.entries(source)).reduce(
      (accumulator: FormGroup, entry: [ StringKeys<T>, T[ StringKeys<T> ] ]) => {
        const key = entry[ 0 ];
        const value = entry[ 1 ];
        if (!(value instanceof Observable)) {
          accumulator.addControl(
            key,
            !!value && (
              value instanceof FormGroup || value instanceof FormArray || value instanceof FormControl
            ) ?
              <ScanFormType<T[ StringKeys<T> ]>> value :
              makeForm<T[ StringKeys<T> ]>(
                value,
                makeNewMainMap<T, T[ StringKeys<T> ]>(<ControlsNames<T>> key, options),
              )
          );
        };
        return <FormGroupType<T>> accumulator;
      }, new FormGroup<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }>(<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }> {},
        {
          validators: controlOptions?.validators,
          asyncValidators: controlOptions?.asyncValidators,
          updateOn: controlOptions?.updateOn,
        },
      )
    );
  if (controlOptions?.disabled) {
    result.disable();
  };
  return result;
}

function makeArray<T extends Array<unknown>, E = T extends Array<infer U> ? U : never>(
  source: E[] | FormArray<ScanFormType<E>>,
  options?: Map<ControlsNames<T>, MakeControlOptions>
): FormArray<ScanFormType<E>> {
  const controlOptions = getValidatorsOrNull(<ControlsNames<T>> 'main', options, false);
  const result = source instanceof FormArray ?
    source :
    new FormArray(
      source.map(
        (item: E) => {
          const itemForm = makeForm(
            item,
            makeNewMainMap<T, E>(<ControlsNames<T>> 'mainItems', options),
          );
          return itemForm;
        }),
      {
        validators: controlOptions?.validators,
        asyncValidators: controlOptions?.asyncValidators,
        updateOn: controlOptions?.updateOn
      }
    );
  if (controlOptions?.disabled) {
    result.disable();
  };
  return result;
}