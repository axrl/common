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
- [actions](OneTableData.md#actions)
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
- [isSelectable](OneTableData.md#isselectable)
- [isDateControl](OneTableData.md#isdatecontrol)
- [resetFilterFormToDefault](OneTableData.md#resetfilterformtodefault)
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

• **filterForm**: `undefined` \| `FormGroupType`<[`FilterFormValueType`](../README.md#filterformvaluetype)<`Q`\>\>

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

### actions

• `Optional` **actions**: [`ActionButton`](ActionButton.md)<`T`\>[]

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

• **columnsForXlsxExport**: ``"all"`` \| [`ColumnsType`](../README.md#columnstype)<`T`\> \| ``"default"``

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
| `config` | [`OneTableDataConfig`](../README.md#onetabledataconfig)<`T`, `Q`\> |

## Methods

### getOption

▸ **getOption**<`K`\>(`name`): `undefined` \| [`TableFilterOption`](../README.md#tablefilteroption)<`string` \| `number` \| `string`[] \| `number`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |

#### Returns

`undefined` \| [`TableFilterOption`](../README.md#tablefilteroption)<`string` \| `number` \| `string`[] \| `number`[]\>

___

### isSelectable

▸ **isSelectable**<`OptionItemType`\>(`option?`): option is TableFilterSelectControlParams<OptionItemType\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OptionItemType` | extends `string` \| `number` \| `string`[] \| `number`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `option?` | [`TableFilterOption`](../README.md#tablefilteroption)<`OptionItemType`\> |

#### Returns

option is TableFilterSelectControlParams<OptionItemType\>

___

### isDateControl

▸ **isDateControl**<`K`\>(`controlName`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlName` | `K` |

#### Returns

`boolean`

___

### resetFilterFormToDefault

▸ **resetFilterFormToDefault**(`afterTriggerUpdateCb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `afterTriggerUpdateCb` | (`triggerValue`: `Q`) => `void` |

#### Returns

`void`

___

### addFilter

▸ **addFilter**<`K`\>(`name`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |

#### Returns

`void`

___

### delFilter

▸ **delFilter**<`K`\>(`name`, `afterTriggerUpdateCb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `afterTriggerUpdateCb` | (`triggerValue`: `Q`) => `void` |

#### Returns

`void`

___

### submit

▸ **submit**(`triggerValue`, `afterTriggerUpdateCb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `triggerValue` | `Q` |
| `afterTriggerUpdateCb` | (`triggerValue`: `Q`) => `void` |

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

• `get` **availableFilters**(): { `key`: `string` ; `translateName`: `undefined` \| `string`  }[]

#### Returns

{ `key`: `string` ; `translateName`: `undefined` \| `string`  }[]
