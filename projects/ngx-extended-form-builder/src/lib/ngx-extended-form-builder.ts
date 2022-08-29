import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AsyncValidatorFn, AbstractControl, AbstractControlOptions } from "@angular/forms";
import { Observable } from "rxjs";

type ArrayElement<T> = T extends Array<infer U> ? U : never;

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
export type ControlsNames<T> = T extends Array<infer U> ?
  'main' | 'mainItems' | `mainItems.${ PropertyesKeys<U> }` :
  T extends Observable<unknown> ?
  never :
  'main' | PropertyesKeys<T>;
/**
 * Вспомогательная утилита типа.
 * На вход принимает некий тип T, возвращает только строковые ключи этого типа.
 */
export type PropertyesKeys<T> = T extends undefined | null | number | boolean | symbol | Observable<unknown> ?
  never :
  T extends string ?
  T : T extends Array<infer U> ?
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
export type ScanFormType<T> = T extends AbstractControl<unknown, unknown> ?
  T :
  T extends null | undefined ?
  never :
  T extends Array<infer U> ?
  FormArray<ScanFormType<U>> :
  T extends (string | number | boolean | symbol | null | undefined) ?
  FormControl<T> :
  FormGroupType<T>;

function getValidatorsOrNull(
  key: string,
  keysValidator?: Map<string, MakeControlOptions | null>,
  addLift: boolean = false
): MakeControlOptions | null {
  const result: MakeControlOptions | null = keysValidator && keysValidator.has(key) ? keysValidator.get(key)! : null;
  if (addLift) {
    if (result && result.keysValidator) {
      result.keysValidator.push(<ValidatorFn> liftErrors);
      return result;
    } else {
      if (result) {
        result.keysValidator = [ liftErrors ];
        return result;
      } else {
        return {
          keysValidator: [ liftErrors ]
        };
      }
    }
  } else {
    return result;
  };
}

interface MakeControlOptions {
  keysValidator?: ValidatorFn[] | null;
  asyncKeysValidator?: AsyncValidatorFn[] | null;
  abstractControlOptions?: AbstractControlOptions;
}

function makeFormGroup<T>(
  source: T,
  internalKey: string,
  options?: Map<ControlsNames<T>, MakeControlOptions | null>
): FormGroupType<T> {
  return source instanceof FormGroup<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }> ?
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
                <Map<ControlsNames<T[ StringKeys<T> ]>, ValidatorFn[] | null>> makeNewmainMap<ValidatorFn[] | null, T>(key, keysValidator),
                <Map<ControlsNames<T[ StringKeys<T> ]>, AsyncValidatorFn[] | null>> makeNewmainMap<AsyncValidatorFn[] | null, T>(key, asyncKeysValidator),
              )
          );
        };
        return <FormGroupType<T>> accumulator;
      }, new FormGroup<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }>(<{ [ K in StringKeys<T> ]: ScanFormType<T[ K ]>; }> {},
        getValidatorsOrNull(internalKey, keysValidator, true),
        getValidatorsOrNull(internalKey, asyncKeysValidator, false)
      )
    );
}

function makeNewmainMap<T extends ValidatorFn[] | AsyncValidatorFn[] | null, P>(
  key: StringKeys<P>, oldMap?: Map<string, T>,
): Map<string, T> | undefined {
  if (!oldMap || key === 'main' || key === 'mainItems') {
    return oldMap;
  } else {
    if (!oldMap.has(key) && !oldMap.has(`${ key }Items`)) {
      return new Map<string, T>(
        Array.from(
          oldMap.entries()
        ).filter(
          item => item[ 0 ] !== 'main' && item[ 0 ] !== 'mainItems'
        ).map(
          ([ entryKey, entryValue ]) => [ entryKey.startsWith(`${ key }.`) ? entryKey.replace(`${ key }.`, '') : entryKey, entryValue ]
        )
      );
    } else {
      const filterPredicate = oldMap.has('main') ?
        oldMap.has('mainItems') ?
          (item: [ string, T ]) => item[ 0 ] !== key && item[ 0 ] !== 'main' && item[ 0 ] !== 'mainItems' :
          (item: [ string, T ]) => item[ 0 ] !== key && item[ 0 ] !== 'main' :
        oldMap.has('mainItems') ?
          (item: [ string, T ]) => item[ 0 ] !== key && item[ 0 ] !== 'mainItems' :
          (item: [ string, T ]) => item[ 0 ] !== key;
      const newMainValidatorsArray: [ string, T ][] = oldMap.has(key) ?
        oldMap.has(`${ key }Items`) ?
          [
            [ 'main', oldMap.get(key)! ],
            [ 'mainItems', oldMap.get(`${ key }Items`)! ]
          ] :
          [
            [ 'main', oldMap.get(key)! ],
          ] :
        oldMap.has(`${ key }Items`) ?
          [
            [ 'mainItems', oldMap.get(`${ key }Items`)! ]
          ] :
          [];
      return new Map<string, T>([
        ...newMainValidatorsArray,
        ...Array.from(
          oldMap.entries()
        ).filter(filterPredicate).map<[ string, T ]>(
          ([ entryKey, entryValue ]) => [ entryKey.startsWith(`${ key }.`) ? entryKey.replace(`${ key }.`, '') : entryKey, entryValue ]
        )
      ]);
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
export function makeForm<T>(
  source: T,
  keysValidator?: Map<ControlsNames<T>, ValidatorFn[] | null>,
  asyncKeysValidator?: Map<ControlsNames<T>, AsyncValidatorFn[] | null>,
): ScanFormType<T> {
  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array<ArrayElement<T>> ?
      new FormArray(
        source.map(
          (item: ArrayElement<T>) => {
            const itemForm = makeForm(
              item,
              <Map<ControlsNames<ArrayElement<T>>, ValidatorFn[] | null>> makeNewmainMap('mainItems', keysValidator),
              <Map<ControlsNames<ArrayElement<T>>, AsyncValidatorFn[] | null>> makeNewmainMap('mainItems', asyncKeysValidator)
            );
            return itemForm;
          }),
        getValidatorsOrNull('main', keysValidator, true),
        getValidatorsOrNull('main', asyncKeysValidator, false)
      ) :
      makeFormGroup<T>(source, 'main', keysValidator, asyncKeysValidator) :
    new FormControl<T | null>(
      !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
      ,
      getValidatorsOrNull('main', keysValidator, false),
      getValidatorsOrNull('main', asyncKeysValidator, false)
    );
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