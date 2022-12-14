# @axrl/one-table

## Table of contents

### Classes

- [CmkTableKeyboardListenerDirective](classes/CmkTableKeyboardListenerDirective.md)
- [OneTableExpandedRowContentProjectDirective](classes/OneTableExpandedRowContentProjectDirective.md)
- [ActionButton](classes/ActionButton.md)
- [BaseListRequest](classes/BaseListRequest.md)
- [AllItemsOneTableDataSource](classes/AllItemsOneTableDataSource.md)
- [OneTableComponent](classes/OneTableComponent.md)
- [OneTableService](classes/OneTableService.md)
- [TableFilterOptions](classes/TableFilterOptions.md)
- [OneTableData](classes/OneTableData.md)
- [ColumnPipe](classes/ColumnPipe.md)

### Interfaces

- [ActionEvent](interfaces/ActionEvent.md)
- [CountAndRows](interfaces/CountAndRows.md)
- [ColumnConfig](interfaces/ColumnConfig.md)
- [TableFilterOption](interfaces/TableFilterOption.md)

### Type Aliases

- [ColumnName](README.md#columnname)
- [ColumnType](README.md#columntype)
- [ColumnsType](README.md#columnstype)
- [TableFilterOptionsData](README.md#tablefilteroptionsdata)
- [TableFilterUpdateFn](README.md#tablefilterupdatefn)

### Variables

- [TABLE\_ICON\_DATA\_FN](README.md#table_icon_data_fn)
- [PERSON\_SETTINGS\_START\_VALUE](README.md#person_settings_start_value)

## Type Aliases

### ColumnName

Ƭ **ColumnName**<`T`\>: \`Icon-${PropertyesKeys<T\>}\` \| `PropertyesKeys`<`T`\> \| ``"select"`` \| ``"action"``

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ColumnType

Ƭ **ColumnType**<`T`\>: [`ColumnName`](README.md#columnname)<`T`\> \| [`ColumnConfig`](interfaces/ColumnConfig.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ColumnsType

Ƭ **ColumnsType**<`T`\>: [`ColumnType`](README.md#columntype)<`T`\>[]

#### Type parameters

| Name |
| :------ |
| `T` |

___

### TableFilterOptionsData

Ƭ **TableFilterOptionsData**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Index signature

▪ [key: `string`]: [`TableFilterOption`](interfaces/TableFilterOption.md)<`T`\>

___

### TableFilterUpdateFn

Ƭ **TableFilterUpdateFn**<`Q`\>: (`req`: `Q`, `values`: `any`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Q` | extends [`BaseListRequest`](classes/BaseListRequest.md) |

#### Type declaration

▸ (`req`, `values`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Q` |
| `values` | `any` |

##### Returns

`void`

## Variables

### TABLE\_ICON\_DATA\_FN

• `Const` **TABLE\_ICON\_DATA\_FN**: `InjectionToken`<`TableIconsDataFn`\>

___

### PERSON\_SETTINGS\_START\_VALUE

• `Const` **PERSON\_SETTINGS\_START\_VALUE**: `InjectionToken`<``null`` \| `BasePersonSettings`<{}, [`BaseListRequest`](classes/BaseListRequest.md)\>\>

InjectionToken со стартовым значением для потока с настройками пользователя.
По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.

Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение 
будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.
