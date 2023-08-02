# Interface: TableFilterSelectControlParams<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`TableFilterBaseParams`](TableFilterBaseParams.md)<`T`\>

  ↳ **`TableFilterSelectControlParams`**

## Table of contents

### Properties

- [translateName](TableFilterSelectControlParams.md#translatename)
- [required](TableFilterSelectControlParams.md#required)
- [hidden](TableFilterSelectControlParams.md#hidden)
- [canShow](TableFilterSelectControlParams.md#canshow)
- [translateKey](TableFilterSelectControlParams.md#translatekey)
- [values](TableFilterSelectControlParams.md#values)
- [arrayParam](TableFilterSelectControlParams.md#arrayparam)

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

### values

• **values**: `T`[]

Список значений, доступных для выбора

___

### arrayParam

• `Optional` **arrayParam**: `boolean`

Признак, что в качестве значений в values используются сериализованные в строку массивы (с разделителем ',' - запятой).
