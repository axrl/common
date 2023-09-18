# @axrl/ngx-extended-form-builder

## Table of contents

### Type Aliases

- [ControlsNames](README.md#controlsnames)
- [PropertyesKeys](README.md#propertyeskeys)
- [FormGroupType](README.md#formgrouptype)
- [ScanFormType](README.md#scanformtype)
- [MakeControlOptions](README.md#makecontroloptions)

### Functions

- [makeForm](README.md#makeform)
- [liftValidationErrors](README.md#liftvalidationerrors)

## Type Aliases

### ControlsNames

Ƭ **ControlsNames**<`T`\>: `T` extends ``null`` \| `undefined` \| `number` \| `bigint` \| `boolean` \| `symbol` \| `string` ? ``"main"`` : `T` extends infer U[] ? ``"main"`` \| ``"mainItems"`` \| \`mainItems.${PropertyesKeys<U\>}\` : `T` extends `Observable`<`unknown`\> \| `Function` ? `never` : ``"main"`` \| [`PropertyesKeys`](README.md#propertyeskeys)<`T`\>

Вспомогательный alias-тип ключей в объекте Map, содержащем конфигурацию валидаторов контролов.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### PropertyesKeys

Ƭ **PropertyesKeys**<`T`\>: `T` extends `undefined` \| ``null`` \| `number` \| `bigint` \| `boolean` \| `symbol` \| `Observable`<`unknown`\> \| `Function` ? `never` : `T` extends `string` ? `T` : `T` extends infer U[] ? [`PropertyesKeys`](README.md#propertyeskeys)<`U`\> : `T` extends {} ? { [K in keyof T]-?: K extends string ? T[K] extends string \| number \| bigint \| boolean \| symbol \| undefined \| null ? K : T[K] extends Observable<unknown\> \| Function ? never : T[K] extends (infer U)[] ? K \| \`${K}Items.${PropertyesKeys<U\>}\` \| \`${K}Items\` : K \| \`${K}.${PropertyesKeys<T[K]\>}\` : never }[keyof `T`] : `never`

Вспомогательная утилита типа.
На вход принимает некий тип T, возвращает только строковые ключи этого типа, значения которых не являются Observable или Function, а также
строковые ключи всех вложенных объектов и объектов внутри вложенных массивов разделенных символом "." (точкой), так называемый "dot-like path".
Названия ключей также дополнительно модифицируются применимо к специфики использования только для данной библиотеки!

#### Type parameters

| Name |
| :------ |
| `T` |

___

### FormGroupType

Ƭ **FormGroupType**<`T`\>: [`ScanFormType`](README.md#scanformtype)<`T`\>

Упрощенная запись для типа объекта FormGroup, образованного из типа T.

**`Deprecated`**

Используй ScanFormType

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ScanFormType

Ƭ **ScanFormType**<`T`\>: `T` extends `AbstractControl` ? `T` : `T` extends \`${string}\` ? `FormControl`<\`${PropertyesKeys<T\>}\`\> : `T` extends `boolean` \| `boolean` ? `FormControl`<`boolean`\> : `T` extends `undefined` \| ``null`` \| `symbol` \| `number` \| `bigint` \| `string` ? `FormControl`<`T`\> : `T` extends infer U[] ? `FormArray`<[`ScanFormType`](README.md#scanformtype)<`U`\>\> : `T` extends {} ? `FormGroup`<{ [K in keyof T]: ScanFormType<T[K]\> }\> : `never`

Универсальный тип-утилита.
Для любого типа Т выводит правильный тип создаваемой формы, включая любой уровень вложенности.
ВАЖНО!
Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых
Observable-значений ( в т.ч., к примеру, Subject  * и EventEmitter) и значений с типом Function (функции либо методы классов)
соответствующий элемент формы не создается. ScanFormType это также учитывает.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### MakeControlOptions

Ƭ **MakeControlOptions**: `Omit`<`FormControlOptions`, ``"validators"`` \| ``"asyncValidators"``\> & { `disabled?`: `boolean` ; `validators?`: `ValidatorFn`[] ; `asyncValidators?`: `AsyncValidatorFn`[]  }

## Functions

### makeForm

▸ **makeForm**<`T`\>(`source`, `options?`): [`ScanFormType`](README.md#scanformtype)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | источник данных типа T для создания формы. * |
| `options?` | `Map`<[`ControlsNames`](README.md#controlsnames)<`T`\>, [`MakeControlOptions`](README.md#makecontroloptions)\> | - |

#### Returns

[`ScanFormType`](README.md#scanformtype)<`T`\>

объект типизированной формы - FormGroup, FormArray или FormControl в зависимости от типа значения source.

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

___

### liftValidationErrors

▸ **liftValidationErrors**(`control`): `ValidationErrors` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `AbstractControl`<`any`, `any`\> |

#### Returns

`ValidationErrors` \| ``null``
