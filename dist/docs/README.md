# @axrl/ngx-extended-form-builder

## Table of contents

### Type Aliases

- [StringKeys](README.md#stringkeys)
- [ControlsNames](README.md#controlsnames)
- [PropertyesKeys](README.md#propertyeskeys)
- [FormGroupType](README.md#formgrouptype)
- [ScanFormType](README.md#scanformtype)

### Functions

- [makeForm](README.md#makeform)
- [liftValidationErrors](README.md#liftvalidationerrors)

## Type Aliases

### StringKeys

Ƭ **StringKeys**<`T`\>: { [K in keyof T]: K extends string ? T[K] extends Observable<unknown\> ? never : K : never }[keyof `T`]

Вспомогательная утилита типа.
На вход принимает некий тип T, возвращает список только строковых ключей этого типа, при этом значения этих ключей не являются Observable.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ControlsNames

Ƭ **ControlsNames**<`T`\>: ``"mainFormValidators"`` \| ``"mainFormValidatorsItems"`` \| [`PropertyesKeys`](README.md#propertyeskeys)<`T`\>

Вспомогательный alias-тип ключей в объекте Map, содержащем конфигурацию валидаторов контролов.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### PropertyesKeys

Ƭ **PropertyesKeys**<`T`\>: `T` extends `undefined` \| ``null`` \| `number` \| `boolean` \| `symbol` \| `Observable`<`unknown`\> ? `never` : `T` extends `string` ? `T` : { [K in keyof T]-?: K extends string ? T[K] extends string \| number \| boolean \| symbol \| undefined \| null ? K : T[K] extends Observable<unknown\> ? never : T[K] extends (infer U)[] ? K \| \`${K}Items\` \| \`${K}.${PropertyesKeys<U\>}\` : K \| \`${K}.${PropertyesKeys<T[K]\>}\` : never }[keyof `T`]

Вспомогательная утилита типа.
На вход принимает некий тип T, возвращает только строковые ключи этого типа.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### FormGroupType

Ƭ **FormGroupType**<`T`\>: `FormGroup`<{ [K in StringKeys<T\>]: ScanFormType<T[K]\> }\>

Упрощенная запись для типа объекта FormGroup, образованного из типа T.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ScanFormType

Ƭ **ScanFormType**<`T`\>: `T` extends `FormGroup` \| `FormControl` \| `FormArray` ? `T` : `T` extends ``null`` \| `undefined` ? `never` : `T` extends infer U[] ? `FormArray`<[`ScanFormType`](README.md#scanformtype)<`U`\>\> : `T` extends `string` \| `number` \| `boolean` \| `symbol` \| ``null`` \| `undefined` ? `FormControl`<`T`\> : [`FormGroupType`](README.md#formgrouptype)<`T`\>

Универсальный тип-утилита.
Для любого типа Т выводит правильный тип создаваемой формы, включая любой уровень вложенности.
ВАЖНО!
Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых
Observable-значений ( в т.ч., к примеру, Subject  * и EventEmitter) соответствующий элемент формы не создается.
ScanFormType это также учитывает.

#### Type parameters

| Name |
| :------ |
| `T` |

## Functions

### makeForm

▸ **makeForm**<`T`, `E`\>(`source`, `keysValidator?`, `asyncKeysValidator?`): [`ScanFormType`](README.md#scanformtype)<`T`\>

**`Function`**

makeForm < T >
  Фабричная функция для создания Angular Reactive Form.
В отличие от стандартного FormBuilder - а в пакете @angular/forms, при создании формы из сложных объектов,
сохраняется вложенность контролов - каждый вложенный объект превращается во вложенную FormGroup,
  обычные свойства объектов становятся FormControl - ами, а массивы - FormArray - ми.
При этом создаваемая форма имеет более строгую типизацию.

  ВАЖНО!
   Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых;
Observable - значений(в т.ч., к примеру, Subject * и EventEmitter) соответствующий элемент формы не создается.
 *

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | `T` extends `U`[] ? `U` : `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | источник данных типа T для создания формы.  * |
| `keysValidator?` | `Map`<[`ControlsNames`](README.md#controlsnames)<`T`\>, ``null`` \| `ValidatorFn`[]\> | объект Map с конфигурацией синхронных валидаторов контролов формы.  * В качестве ключей могут быть указаны следующие значения:  *  PropertyesKeys<T> - строковые ключи в типе T, включая строковые ключи всех вложенных типов, разделенные "." - точкой.     Например имеется такой тип:     ```ts                     interface User {                       firstname: string;                       lastname: string;                       phone:  {                         code: string;                         number: string;                         }                       };     ```     Для формы, которая будет создана из объекта User в конфигурации валидаторов названия контролов можно будет указать так:     `lastname` или`phone`, или`phone.code`.     'mainFormValidators' - специальное значение, являющееся признаком того, что массив валидаторов необходимо     назначить самому объекту формы, а не вложеным контролам.     'mainFormValidatorsItems' - используется только если source является массивом. Специальное значение, являющееся признаком того,   что массив валидаторов необходимо назначить для всех элементов массива FormArray.  * |
| `asyncKeysValidator?` | `Map`<[`ControlsNames`](README.md#controlsnames)<`T`\>, ``null`` \| `AsyncValidatorFn`[]\> | объект Map, аналогичный keysValidator, но для асинхронных валидаторов  * |

#### Returns

[`ScanFormType`](README.md#scanformtype)<`T`\>

объект типизированной формы - FormGroup, FormArray или FormControl в зависимости от типа значения source.

___

### liftValidationErrors

▸ **liftValidationErrors**(`control`): `ValidationErrors` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `AbstractControl`<`any`, `any`\> |

#### Returns

`ValidationErrors` \| ``null``
