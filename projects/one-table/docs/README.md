# @axrl/one-table

## Table of contents

### Classes

- [CmkTableKeyboardListenerDirective](classes/CmkTableKeyboardListenerDirective.md)
- [OneTableExpandedRowContentProjectDirective](classes/OneTableExpandedRowContentProjectDirective.md)
- [ActionButton](classes/ActionButton.md)
- [BaseListRequest](classes/BaseListRequest.md)
- [AllItemsOneTableDataSource](classes/AllItemsOneTableDataSource.md)
- [TableFilterOptions](classes/TableFilterOptions.md)
- [OneTableData](classes/OneTableData.md)
- [OneTableComponent](classes/OneTableComponent.md)
- [ColumnPipe](classes/ColumnPipe.md)
- [ExcelService](classes/ExcelService.md)
- [OneTableService](classes/OneTableService.md)

### Interfaces

- [CountAndRows](interfaces/CountAndRows.md)
- [BasePersonSettings](interfaces/BasePersonSettings.md)
- [ColumnConfig](interfaces/ColumnConfig.md)
- [ActionEvent](interfaces/ActionEvent.md)
- [TableFilterBaseParams](interfaces/TableFilterBaseParams.md)
- [TableFilterDateControlParams](interfaces/TableFilterDateControlParams.md)
- [TableFilterSelectControlParams](interfaces/TableFilterSelectControlParams.md)
- [MakeOneTableConfig](interfaces/MakeOneTableConfig.md)
- [TableIconsDataFn](interfaces/TableIconsDataFn.md)
- [IconColumnData](interfaces/IconColumnData.md)

### Type Aliases

- [PropertyesKeys](README.md#propertyeskeys)
- [ColumnName](README.md#columnname)
- [ColumnType](README.md#columntype)
- [ColumnsType](README.md#columnstype)
- [TableFilterOption](README.md#tablefilteroption)
- [TableFilterOptionsData](README.md#tablefilteroptionsdata)
- [TableFilterUpdateFn](README.md#tablefilterupdatefn)
- [FilterFormValueType](README.md#filterformvaluetype)
- [MakeOneTableConfigWithoutApiPagination](README.md#makeonetableconfigwithoutapipagination)
- [OneTableDataConfig](README.md#onetabledataconfig)

### Variables

- [PERSON\_SETTINGS\_START\_VALUE](README.md#person_settings_start_value)
- [TABLE\_ICON\_DATA\_FN](README.md#table_icon_data_fn)

## Type Aliases

### PropertyesKeys

Ƭ **PropertyesKeys**<`T`\>: `T` extends `undefined` \| ``null`` \| `number` \| `boolean` \| `symbol` \| `Observable`<`unknown`\> \| `Function` \| `AbstractControl` ? `never` : `T` extends `string` ? `T` : `T` extends infer U[] ? [`PropertyesKeys`](README.md#propertyeskeys)<`U`\> : { [K in keyof T]-?: K extends string ? T[K] extends string \| number \| boolean \| symbol \| undefined \| null ? K : T[K] extends Observable<unknown\> \| Function \| AbstractControl ? never : \`${K}.${PropertyesKeys<T[K] extends (infer U)[] ? U : T[K]\>}\` \| K : never }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ColumnName

Ƭ **ColumnName**<`T`\>: [`PropertyesKeys`](README.md#propertyeskeys)<`T`\> \| ``"select"`` \| ``"action"``

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

### TableFilterOption

Ƭ **TableFilterOption**<`T`\>: [`TableFilterBaseParams`](interfaces/TableFilterBaseParams.md)<`T`\> \| [`TableFilterDateControlParams`](interfaces/TableFilterDateControlParams.md)<`T`\> \| [`TableFilterSelectControlParams`](interfaces/TableFilterSelectControlParams.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

___

### TableFilterOptionsData

Ƭ **TableFilterOptionsData**<`T`\>: `Record`<`string`, [`TableFilterOption`](README.md#tablefilteroption)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

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

___

### FilterFormValueType

Ƭ **FilterFormValueType**<`Q`\>: `Record`<keyof [`TableFilterOptions`](classes/TableFilterOptions.md)<`Q`\>[``"options"``] & `string`, `string` \| `number` \| `undefined` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Q` | extends [`BaseListRequest`](classes/BaseListRequest.md) |

___

### MakeOneTableConfigWithoutApiPagination

Ƭ **MakeOneTableConfigWithoutApiPagination**<`T`\>: `Omit`<[`MakeOneTableConfig`](interfaces/MakeOneTableConfig.md)<`T`, [`BaseListRequest`](classes/BaseListRequest.md)\>, ``"sourceFn"`` \| ``"additionParams"``\> & { `data`: `T`[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

___

### OneTableDataConfig

Ƭ **OneTableDataConfig**<`T`, `Q`\>: `Omit`<[`MakeOneTableConfig`](interfaces/MakeOneTableConfig.md)<`T`, `Q`\>, ``"filterOptions"`` \| ``"updateFilterFn"``\> & { `filterOptions?`: [`TableFilterOptions`](classes/TableFilterOptions.md)<`Q`\> ; `paginatorDefaultSize`: `number` ; `showedColumns$`: `Observable`<[`ColumnsType`](README.md#columnstype)<`T`\>\> ; `defaultFilter`: `unknown`  }

Alias-тип для объекта конфигурации таблицы, передаваемый в качестве параметра в конструктор класса OneTableData.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](classes/BaseListRequest.md) = [`BaseListRequest`](classes/BaseListRequest.md) |

## Variables

### PERSON\_SETTINGS\_START\_VALUE

• `Const` **PERSON\_SETTINGS\_START\_VALUE**: `InjectionToken`<``null`` \| [`BasePersonSettings`](interfaces/BasePersonSettings.md)\>

InjectionToken со стартовым значением для потока с настройками пользователя.
По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.

Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение 
будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.

___

### TABLE\_ICON\_DATA\_FN

• `Const` **TABLE\_ICON\_DATA\_FN**: `InjectionToken`<[`TableIconsDataFn`](interfaces/TableIconsDataFn.md)\>
