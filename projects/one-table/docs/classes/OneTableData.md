# Class: OneTableData<T, Q\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md) = [`BaseListRequest`](BaseListRequest.md) |

## Table of contents

### Properties

- [showedColumns$](OneTableData.md#showedcolumns$)
- [showedColumnsNames$](OneTableData.md#showedcolumnsnames$)
- [dataSource](OneTableData.md#datasource)
- [dataSourceRows](OneTableData.md#datasourcerows)
- [dataSourceCount](OneTableData.md#datasourcecount)
- [\_trigger](OneTableData.md#_trigger)
- [trigger](OneTableData.md#trigger)
- [filterForm](OneTableData.md#filterform)
- [withExtendedRow](OneTableData.md#withextendedrow)
- [id](OneTableData.md#id)
- [shortColumnsNames](OneTableData.md#shortcolumnsnames)
- [defaultColumns](OneTableData.md#defaultcolumns)
- [sourceFn](OneTableData.md#sourcefn)
- [componentName](OneTableData.md#componentname)
- [action](OneTableData.md#action)
- [filterOptions](OneTableData.md#filteroptions)
- [exportXlsxFileNameGenerationFn](OneTableData.md#exportxlsxfilenamegenerationfn)
- [extendedRowPredicate](OneTableData.md#extendedrowpredicate)
- [shortColumns](OneTableData.md#shortcolumns)
- [isInnerTable](OneTableData.md#isinnertable)
- [columnsForXlsxExport](OneTableData.md#columnsforxlsxexport)
- [columnsForCopy](OneTableData.md#columnsforcopy)

### Constructors

- [constructor](OneTableData.md#constructor)

### Methods

- [getOption](OneTableData.md#getoption)
- [isDateControl](OneTableData.md#isdatecontrol)
- [isSelectable](OneTableData.md#isselectable)
- [addFilter](OneTableData.md#addfilter)
- [delFilter](OneTableData.md#delfilter)
- [submit](OneTableData.md#submit)

### Accessors

- [usedFilters](OneTableData.md#usedfilters)
- [showedUsedFilters](OneTableData.md#showedusedfilters)
- [availableFilters](OneTableData.md#availablefilters)

## Properties

### showedColumns$

• **showedColumns$**: `Observable`<[`ColumnsType`](../README.md#columnstype)<`T`\>\>

___

### showedColumnsNames$

• **showedColumnsNames$**: `Observable`<[`ColumnName`](../README.md#columnname)<`T`\>[]\>

___

### dataSource

• **dataSource**: `Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\>

___

### dataSourceRows

• **dataSourceRows**: `Observable`<`T`[]\>

___

### dataSourceCount

• **dataSourceCount**: `Observable`<`number`\>

___

### \_trigger

• **\_trigger**: `BehaviorSubject`<`Q`\>

___

### trigger

• **trigger**: `Observable`<`Q`\>

___

### filterForm

• **filterForm**: `undefined` \| `FormGroupType`<`FilterFormValueType`\>

___

### withExtendedRow

• **withExtendedRow**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

___

### id

• **id**: `string`

___

### shortColumnsNames

• `Optional` **shortColumnsNames**: [`ColumnsType`](../README.md#columnstype)<`T`\>

___

### defaultColumns

• **defaultColumns**: [`ColumnsType`](../README.md#columnstype)<`T`\>

___

### sourceFn

• **sourceFn**: (`req`: `Q`) => `Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\>

#### Type declaration

▸ (`req`): `Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Q` |

##### Returns

`Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\>

___

### componentName

• **componentName**: `string`

___

### action

• `Optional` **action**: [`ActionButton`](ActionButton.md)<`T`\>[]

___

### filterOptions

• `Optional` **filterOptions**: [`TableFilterOptions`](TableFilterOptions.md)<`Q`\>

___

### exportXlsxFileNameGenerationFn

• **exportXlsxFileNameGenerationFn**: (`req?`: `Q`) => `string`

#### Type declaration

▸ (`req?`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | `Q` |

##### Returns

`string`

___

### extendedRowPredicate

• `Optional` **extendedRowPredicate**: (`row`: `T`) => `boolean`

#### Type declaration

▸ (`row`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `T` |

##### Returns

`boolean`

___

### shortColumns

• `Optional` **shortColumns**: [`ColumnsType`](../README.md#columnstype)<`T`\>

___

### isInnerTable

• **isInnerTable**: `boolean`

___

### columnsForXlsxExport

• **columnsForXlsxExport**: [`ColumnsType`](../README.md#columnstype)<`T`\> \| ``"all"`` \| ``"default"``

___

### columnsForCopy

• **columnsForCopy**: [`ColumnName`](../README.md#columnname)<`T`\>[]

## Constructors

### constructor

• **new OneTableData**<`T`, `Q`\>(`config`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> = [`BaseListRequest`](BaseListRequest.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.paginatorDefaultSize` | `number` |
| `config.defaultColumns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |
| `config.showedColumns$` | `Observable`<[`ColumnsType`](../README.md#columnstype)<`T`\>\> |
| `config.sourceFn` | (`req`: `Q`) => `Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\> |
| `config.componentName` | `string` |
| `config.filter?` | `any` |
| `config.orderBy` | [`ColumnType`](../README.md#columntype)<`T`\> |
| `config.action?` | [`ActionButton`](ActionButton.md)<`T`\>[] |
| `config.additionParams?` | `Partial`<`Omit`<`Q`, keyof [`BaseListRequest`](BaseListRequest.md)\>\> |
| `config.filterOptions?` | [`TableFilterOptions`](TableFilterOptions.md)<`Q`\> |
| `config.exportXlsxFileNameGenerationFn?` | (`req?`: `Q`) => `string` |
| `config.extendedRowPredicate?` | (`row`: `T`) => `boolean` |
| `config.orderDirection?` | ``"asc"`` \| ``"desc"`` |
| `config.shortColumns?` | [`ColumnsType`](../README.md#columnstype)<`T`\> |
| `config.isInnerTable?` | `boolean` |
| `config.columnsForXlsxExport?` | [`ColumnsType`](../README.md#columnstype)<`T`\> \| ``"all"`` \| ``"default"`` |
| `config.columnsForCopy?` | [`ColumnName`](../README.md#columnname)<`T`\>[] |

## Methods

### getOption

▸ **getOption**(`name`): `undefined` \| [`TableFilterOption`](../interfaces/TableFilterOption.md)<`string` \| `number` \| `string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`undefined` \| [`TableFilterOption`](../interfaces/TableFilterOption.md)<`string` \| `number` \| `string`[]\>

___

### isDateControl

▸ **isDateControl**(`controlName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlName` | `string` |

#### Returns

`boolean`

___

### isSelectable

▸ **isSelectable**(`controlName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlName` | `string` |

#### Returns

`boolean`

___

### addFilter

▸ **addFilter**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

___

### delFilter

▸ **delFilter**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

___

### submit

▸ **submit**(): `void`

#### Returns

`void`

## Accessors

### usedFilters

• `get` **usedFilters**(): `string`[]

#### Returns

`string`[]

___

### showedUsedFilters

• `get` **showedUsedFilters**(): `string`[]

#### Returns

`string`[]

___

### availableFilters

• `get` **availableFilters**(): `AvailableFilterItem`[]

#### Returns

`AvailableFilterItem`[]
