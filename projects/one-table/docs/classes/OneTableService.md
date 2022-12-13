# Class: OneTableService

## Table of contents

### Constructors

- [constructor](OneTableService.md#constructor)

### Methods

- [getFromMemory](OneTableService.md#getfrommemory)
- [saveToMemory](OneTableService.md#savetomemory)
- [updatePersonSettings](OneTableService.md#updatepersonsettings)
- [updateUiLayoutFn](OneTableService.md#updateuilayoutfn)
- [makeOneTableData](OneTableService.md#makeonetabledata)

### Properties

- [basePersonSettings$](OneTableService.md#basepersonsettings$)
- [basePersonSettingsFiltered$](OneTableService.md#basepersonsettingsfiltered$)
- [settingsChanges](OneTableService.md#settingschanges)

## Constructors

### constructor

• **new OneTableService**(`defaultPersonSettingsValue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultPersonSettingsValue` | ``null`` \| `BasePersonSettings`<{}, [`BaseListRequest`](BaseListRequest.md)\> |

## Methods

### getFromMemory

▸ **getFromMemory**(`key`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| `string`

___

### saveToMemory

▸ **saveToMemory**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void`

___

### updatePersonSettings

▸ **updatePersonSettings**<`T`, `Q`\>(`newSettings`, `emitEvent?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newSettings` | `BasePersonSettings`<`T`, `Q`\> | `undefined` |
| `emitEvent` | `boolean` | `true` |

#### Returns

`void`

___

### updateUiLayoutFn

▸ **updateUiLayoutFn**<`T`, `Q`\>(`componentName`, `newComponentLayout`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> = [`BaseListRequest`](BaseListRequest.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentName` | `string` |
| `newComponentLayout` | `Object` |
| `newComponentLayout.columns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |
| `newComponentLayout.req?` | `Q` |

#### Returns

`void`

___

### makeOneTableData

▸ **makeOneTableData**<`T`, `Q`\>(`config`): `Observable`<[`OneTableData`](OneTableData.md)<`T`, `Q`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> = [`BaseListRequest`](BaseListRequest.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.defaultColumns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |
| `config.sourceFn` | (`req`: `Q`) => `Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\> |
| `config.componentName` | `string` |
| `config.filter` | `any` |
| `config.orderBy` | [`ColumnType`](../README.md#columntype)<`T`\> |
| `config.actions?` | [`ActionButton`](ActionButton.md)<`T`\>[] |
| `config.additionParams?` | `Partial`<`Omit`<`Q`, keyof [`BaseListRequest`](BaseListRequest.md)\>\> |
| `config.filterOptions?` | [`TableFilterOptionsData`](../README.md#tablefilteroptionsdata)<`string` \| `number` \| `string`[]\> |
| `config.updateFilterFn?` | [`TableFilterUpdateFn`](../README.md#tablefilterupdatefn)<`Q`\> |
| `config.exportXlsxFileNameGenerationFn?` | (`req?`: `Q`) => `string` |
| `config.extendedRowPredicate?` | (`row`: `T`) => `boolean` |
| `config.orderDirection?` | ``"asc"`` \| ``"desc"`` |
| `config.shortColumns?` | [`ColumnsType`](../README.md#columnstype)<`T`\> |
| `config.isInnerTable?` | `boolean` |
| `config.columnsForXlsxExport?` | ``"all"`` \| [`ColumnsType`](../README.md#columnstype)<`T`\> |
| `config.columnsForCopy?` | [`ColumnName`](../README.md#columnname)<`T`\>[] |

#### Returns

`Observable`<[`OneTableData`](OneTableData.md)<`T`, `Q`\>\>

## Properties

### basePersonSettings$

• **basePersonSettings$**: `Observable`<``null`` \| `BasePersonSettings`<{}, [`BaseListRequest`](BaseListRequest.md)\>\>

___

### basePersonSettingsFiltered$

• **basePersonSettingsFiltered$**: `Observable`<`BasePersonSettings`<{}, [`BaseListRequest`](BaseListRequest.md)\>\>

___

### settingsChanges

• **settingsChanges**: `EventEmitter`<`BasePersonSettings`<{}, [`BaseListRequest`](BaseListRequest.md)\>\>

Поток с данными об обновлениях настроек.
