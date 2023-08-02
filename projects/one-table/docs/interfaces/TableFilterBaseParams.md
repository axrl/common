# Interface: TableFilterBaseParams<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`TableFilterBaseParams`**

  ↳ [`TableFilterDateControlParams`](TableFilterDateControlParams.md)

  ↳ [`TableFilterSelectControlParams`](TableFilterSelectControlParams.md)

## Table of contents

### Properties

- [translateName](TableFilterBaseParams.md#translatename)
- [required](TableFilterBaseParams.md#required)
- [hidden](TableFilterBaseParams.md#hidden)
- [canShow](TableFilterBaseParams.md#canshow)
- [translateKey](TableFilterBaseParams.md#translatekey)

## Properties

### translateName

• **translateName**: `string`

___

### required

• `Optional` **required**: `boolean`

Признак обязательности. Для таких фильтров будет недоступна кнопка "убрать фильтр"

___

### hidden

• `Optional` **hidden**: `boolean`

Используется, чтобы фильтр не отображался в форме (в т.ч. в списке доступных фильтров)

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
