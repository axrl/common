import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AsyncValidatorFn, AbstractControl, FormControlOptions } from "@angular/forms";
import { Observable } from "rxjs";
/**
 * Вспомогательная утилита типа.
 * На вход принимает некий тип T, возвращает список только строковых ключей этого типа, при этом значения этих ключей не являются Observable.
 */
export declare type StringKeys<T> = {
    [K in keyof T]: T[K] extends Observable<unknown> ? never : K extends string ? K : never;
}[keyof T];
/**
 * Вспомогательный alias-тип ключей в объекте Map, содержащем конфигурацию валидаторов контролов.
 */
export declare type ControlsNames<T> = T extends Observable<unknown> ? never : T extends Array<infer U> ? 'main' | 'mainItems' | `mainItems.${PropertyesKeys<U>}` : 'main' | PropertyesKeys<T>;
/**
 * Вспомогательная утилита типа.
 * На вход принимает некий тип T, возвращает только строковые ключи этого типа.
 */
export declare type PropertyesKeys<T> = T extends undefined | null | number | boolean | symbol | Observable<unknown> ? never : T extends Readonly<string> ? T : T extends string ? T : T extends Array<infer U> ? PropertyesKeys<U> : {
    [K in keyof T]-?: K extends string ? T[K] extends (string | number | boolean | symbol | undefined | null) ? K : T[K] extends Observable<unknown> ? never : T[K] extends Array<infer U> ? `${K}Items.${PropertyesKeys<U>}` | `${K}Items` | K : `${K}.${PropertyesKeys<T[K]>}` | K : never;
}[keyof T];
/**
 * Упрощенная запись для типа объекта FormGroup, образованного из типа T.
 */
export declare type FormGroupType<T extends object> = FormGroup<{
    [K in keyof T]: ScanFormType<T[K]>;
}>;
/**
 * Универсальный тип-утилита.
 * Для любого типа Т выводит правильный тип создаваемой формы, включая любой уровень вложенности.
 * ВАЖНО!
 * Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых
 * Observable-значений ( в т.ч., к примеру, Subject  * и EventEmitter) соответствующий элемент формы не создается.
 * ScanFormType это также учитывает.
 */
export declare type ScanFormType<T> = T extends (null | undefined) ? never : T extends Readonly<string> ? FormControl<string | null> : T extends (string | symbol) ? FormControl<T | null> : T extends boolean ? FormControl<boolean | null> : T extends number ? FormControl<number | null> : T extends AbstractControl ? T : T extends Array<infer U> ? FormArray<ScanFormType<U>> : T extends object ? FormGroupType<T> : never;
declare type MakeControlOptions = Omit<FormControlOptions, 'validators' | 'asyncValidators'> & {
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
export declare function makeForm<T extends unknown>(source: T, options?: Map<ControlsNames<T>, MakeControlOptions>): ScanFormType<T>;
export declare function liftValidationErrors(control: AbstractControl): ValidationErrors | null;
export {};
