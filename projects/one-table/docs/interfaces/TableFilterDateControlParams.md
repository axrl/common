# Interface: TableFilterDateControlParams<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`TableFilterBaseParams`](TableFilterBaseParams.md)<`T`\>

  ↳ **`TableFilterDateControlParams`**

## Table of contents

### Properties

- [translateName](TableFilterDateControlParams.md#translatename)
- [required](TableFilterDateControlParams.md#required)
- [hidden](TableFilterDateControlParams.md#hidden)
- [canShow](TableFilterDateControlParams.md#canshow)
- [translateKey](TableFilterDateControlParams.md#translatekey)
- [dateControl](TableFilterDateControlParams.md#datecontrol)

## Properties

### translateName

• **translateName**: `string`

#### Inherited from

[TableFilterBaseParams](TableFilterBaseParams.md).[translateName](TableFilterBaseParams.md#translatename)

___

### required

• `Optional` **required**: `boolean`

Признак обязательности. Для таких фильтров будет недоступна кнопка "убрать фильтр"

#### Inherited from

[TableFilterBaseParams](TableFilterBaseParams.md).[required](TableFilterBaseParams.md#required)

___

### hidden

• `Optional` **hidden**: `boolean`

Используется, чтобы фильтр не отображался в форме (в т.ч. в списке доступных фильтров)

#### Inherited from

[TableFilterBaseParams](TableFilterBaseParams.md).[hidden](TableFilterBaseParams.md#hidden)

___

### canShow

• `Optional` **canShow**: (`values`: `any`) => `boolean`

#### Type declaration

▸ (`values`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `any` |

##### Returns

`boolean`

#### Inherited from

[TableFilterBaseParams](TableFilterBaseParams.md).[canShow](TableFilterBaseParams.md#canshow)

___

### translateKey

• `Optional` **translateKey**: (`item`: `T`) => `string`

#### Type declaration

▸ (`item`): `string`

Функция, которая будет применяться для перевода:
 - значений, доступных в массиве values (для фильтра с выбором значения из списка)
 - названий полей, соответствующих началу и концу нужного периода времени (для фильтра по дате)

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |

##### Returns

`string`

#### Inherited from

[TableFilterBaseParams](TableFilterBaseParams.md).[translateKey](TableFilterBaseParams.md#translatekey)

___

### dateControl

• **dateControl**: `boolean`

Признак, что фильтр используется для поля, содержащего дату.
Для такого фильтра будет создано два контрола - с префиксами From и To для выбора начальной и конечной даты периода фильтрации
