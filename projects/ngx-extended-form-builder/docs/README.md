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

Ƭ **StringKeys**<`T`\>: { [K in keyof T]: T[K] extends Observable<unknown\> ? never : K extends string ? K : never }[keyof `T`]

Вспомогательная утилита типа.
На вход принимает некий тип T, возвращает список только строковых ключей этого типа, при этом значения этих ключей не являются Observable.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ControlsNames

Ƭ **ControlsNames**<`T`\>: `T` extends `Observable`<`unknown`\> ? `never` : `T` extends infer U[] ? ``"main"`` \| ``"mainItems"`` \| \`mainItems.${PropertyesKeys<U\>}\` : ``"main"`` \| [`PropertyesKeys`](README.md#propertyeskeys)<`T`\>

Вспомогательный alias-тип ключей в объекте Map, содержащем конфигурацию валидаторов контролов.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### PropertyesKeys

Ƭ **PropertyesKeys**<`T`\>: `T` extends `undefined` \| ``null`` \| `number` \| `boolean` \| `symbol` \| `Observable`<`unknown`\> ? `never` : `T` extends `string` ? `T` : `T` extends infer U[] ? [`PropertyesKeys`](README.md#propertyeskeys)<`U`\> : { [K in keyof T]-?: K extends string ? T[K] extends string \| number \| boolean \| symbol \| undefined \| null ? K : T[K] extends Observable<unknown\> ? never : T[K] extends (infer U)[] ? \`${K}Items.${PropertyesKeys<U\>}\` \| \`${K}Items\` \| K : \`${K}.${PropertyesKeys<T[K]\>}\` \| K : never }[keyof `T`]

Вспомогательная утилита типа.
На вход принимает некий тип T, возвращает только строковые ключи этого типа.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### FormGroupType

Ƭ **FormGroupType**<`T`\>: `FormGroup`<{ [K in StringKeys<T\>]: T[K] extends string ? FormControl<T[K]\> : T[K] extends boolean ? FormControl<boolean\> : T[K] extends number ? FormControl<number\> : T extends symbol ? FormControl<T[K]\> : ScanFormType<T[K]\> }\>

Упрощенная запись для типа объекта FormGroup, образованного из типа T.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ScanFormType

Ƭ **ScanFormType**<`T`\>: `T` extends `AbstractControl`<`unknown`, `unknown`\> ? `T` : `T` extends ``null`` \| `undefined` ? `never` : `T` extends infer U[] ? `FormArray`<[`ScanFormType`](README.md#scanformtype)<`U`\>\> : `T` extends `object` ? [`FormGroupType`](README.md#formgrouptype)<`T`\> : `FormControl`<`T`\>

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

▸ **makeForm**<`T`\>(`source`, `options?`): [`ScanFormType`](README.md#scanformtype)<`T`\>

**`Function`**

makeForm<T>
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
| `T` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | источник данных типа T для создания формы. * |
| `options?` | `Map`<[`ControlsNames`](README.md#controlsnames)<`T`\>, `MakeControlOptions`\> | - |

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
