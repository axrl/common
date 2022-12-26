# Class: OneTableComponent<T, Q\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md) |

## Implements

- `OnDestroy`

## Table of contents

### Constructors

- [constructor](OneTableComponent.md#constructor)

### Properties

- [inputData$](OneTableComponent.md#inputdata$)
- [tableAction](OneTableComponent.md#tableaction)
- [expandedRowContent](OneTableComponent.md#expandedrowcontent)
- [selectedItemIndex$](OneTableComponent.md#selecteditemindex$)
- [selectedItem$](OneTableComponent.md#selecteditem$)
- [trackByFn](OneTableComponent.md#trackbyfn)
- [openTrigger](OneTableComponent.md#opentrigger)
- [exportXlsxModes](OneTableComponent.md#exportxlsxmodes)
- [exportXlsxBus$](OneTableComponent.md#exportxlsxbus$)

### Methods

- [log](OneTableComponent.md#log)
- [cleanSelected](OneTableComponent.md#cleanselected)
- [getColumnName](OneTableComponent.md#getcolumnname)
- [getTranslatedColumnName](OneTableComponent.md#gettranslatedcolumnname)
- [isIconColumn](OneTableComponent.md#isiconcolumn)
- [isSortedColumn](OneTableComponent.md#issortedcolumn)
- [getActualAction](OneTableComponent.md#getactualaction)
- [isAvailableAction](OneTableComponent.md#isavailableaction)
- [clickedAction](OneTableComponent.md#clickedaction)
- [onSelect](OneTableComponent.md#onselect)
- [onDblClick](OneTableComponent.md#ondblclick)
- [pageEvent](OneTableComponent.md#pageevent)
- [sortEvent](OneTableComponent.md#sortevent)
- [getPageIndex](OneTableComponent.md#getpageindex)
- [getMainRowClass](OneTableComponent.md#getmainrowclass)
- [ngOnDestroy](OneTableComponent.md#ngondestroy)
- [getIconData](OneTableComponent.md#geticondata)
- [getColumnsForRightView](OneTableComponent.md#getcolumnsforrightview)
- [getSelectedItem](OneTableComponent.md#getselecteditem)
- [exportXlsx](OneTableComponent.md#exportxlsx)
- [isSelectedColumn](OneTableComponent.md#isselectedcolumn)
- [showColumn](OneTableComponent.md#showcolumn)
- [drop](OneTableComponent.md#drop)
- [resetColumnLayout](OneTableComponent.md#resetcolumnlayout)
- [copy](OneTableComponent.md#copy)

## Constructors

### constructor

• **new OneTableComponent**<`T`, `Q`\>(`tableIconsDataFn`, `oneTableService`, `excelService`, `clipboard`, `snack`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableIconsDataFn` | [`TableIconsDataFn`](../interfaces/TableIconsDataFn.md) |
| `oneTableService` | [`OneTableService`](OneTableService.md)<[`BasePersonSettings`](../interfaces/BasePersonSettings.md)\> |
| `excelService` | `ExcelService` |
| `clipboard` | `Clipboard_2` |
| `snack` | `SnackService` |

## Properties

### inputData$

• **inputData$**: `undefined` \| `Observable`<[`OneTableData`](OneTableData.md)<`T`, `Q`\>\>

___

### tableAction

• **tableAction**: `EventEmitter`<[`ActionEvent`](../interfaces/ActionEvent.md)<`T`, `Q`\>\>

___

### expandedRowContent

• **expandedRowContent**: `undefined` \| [`OneTableExpandedRowContentProjectDirective`](OneTableExpandedRowContentProjectDirective.md)

___

### selectedItemIndex$

• **selectedItemIndex$**: `BehaviorSubject`<``null`` \| `number`\>

___

### selectedItem$

• **selectedItem$**: `undefined` \| `Observable`<``null`` \| `T`\>

___

### trackByFn

• **trackByFn**: <T\>(`index`: `number`, `item`: `T`) => `number` = `trackByFn`

#### Type declaration

▸ <`T`\>(`index`, `item`): `number`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `item` | `T` |

##### Returns

`number`

___

### openTrigger

• **openTrigger**: `BehaviorSubject`<`boolean`\>

___

### exportXlsxModes

• **exportXlsxModes**: readonly [``"current"``, ``"all"``]

___

### exportXlsxBus$

• **exportXlsxBus$**: `Observable`<`void`\>

Перед тем, как выгружать данные в Excel-таблицу, их нужно предварительно трансформировать. 
Делается это по двум причинам :
 1. У объектов могут быть еще какие-то другие свои данные, помимо тех, которые выводятся в таблице.
 2. Настройка колонок в таблице подразумевают, что какие-то значения в объекте определены не с тем ключом, с каким отображаются.
Поэтому данные трансформируются из исходного интерфейса так, чтобы сервис экспорта в Excel 
смог сделать правильный перевод для всех экспортируемых данных (в т.ч. названия колонок-ключей в первой строке).
В настройках таблицы определен специальный дополнительный параметр `columnsForXlsxExport`, управляющий порядком трансформации данных.
Возможные значения:
 - all - экспортировать все данные, имеющиеся в объектах таблицы
 - default - экспортировать только те данные, которые могут отображаться в таблице (в т.ч. скрытые пользователем от отоборажения)
 - массив ColumnsType<T> - массив со списком колонок, которые нужно экспортировать.

## Methods

### log

▸ **log**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

#### Returns

`void`

___

### cleanSelected

▸ **cleanSelected**(): `void`

#### Returns

`void`

___

### getColumnName

▸ **getColumnName**(`columnData`): [`ColumnName`](../README.md#columnname)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnData` | [`ColumnType`](../README.md#columntype)<`T`\> |

#### Returns

[`ColumnName`](../README.md#columnname)<`T`\>

___

### getTranslatedColumnName

▸ **getTranslatedColumnName**(`columnData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnData` | [`ColumnType`](../README.md#columntype)<`T`\> |

#### Returns

`string`

___

### isIconColumn

▸ **isIconColumn**(`column`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`ColumnType`](../README.md#columntype)<`T`\> |

#### Returns

`undefined` \| `boolean`

___

### isSortedColumn

▸ **isSortedColumn**(`column`): `boolean`

to do  = счписок колонок убрать из хардкода

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`ColumnType`](../README.md#columntype)<`T`\> |

#### Returns

`boolean`

___

### getActualAction

▸ **getActualAction**(`row`, `allAction?`): ``null`` \| [`ActionButton`](ActionButton.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `T` |
| `allAction?` | [`ActionButton`](ActionButton.md)<`T`\>[] |

#### Returns

``null`` \| [`ActionButton`](ActionButton.md)<`T`\>[]

___

### isAvailableAction

▸ **isAvailableAction**(`action`, `allAction?`): `undefined` \| [`ActionButton`](ActionButton.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `string` |
| `allAction?` | [`ActionButton`](ActionButton.md)<`T`\>[] |

#### Returns

`undefined` \| [`ActionButton`](ActionButton.md)<`T`\>

___

### clickedAction

▸ **clickedAction**(`action`, `element`, `inputData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `string` |
| `element` | `T` |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |

#### Returns

`void`

___

### onSelect

▸ **onSelect**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

___

### onDblClick

▸ **onDblClick**(`index`, `dataElement`, `inputData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | ``null`` \| `number` |
| `dataElement` | `T` |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |

#### Returns

`void`

___

### pageEvent

▸ **pageEvent**(`event`, `trigger`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `PageEvent` |
| `trigger` | `BehaviorSubject`<`Q`\> |

#### Returns

`void`

___

### sortEvent

▸ **sortEvent**(`event`, `trigger`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Sort` |
| `trigger` | `BehaviorSubject`<`Q`\> |

#### Returns

`void`

___

### getPageIndex

▸ **getPageIndex**(`req`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Q` |

#### Returns

`number`

___

### getMainRowClass

▸ **getMainRowClass**(`inputData`, `row`, `index`, `currentSelected`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |
| `row` | `T` |
| `index` | `number` |
| `currentSelected` | ``null`` \| `number` |

#### Returns

`string`

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

___

### getIconData

▸ **getIconData**(`id`, `row`, `column`): [`IconColumnData`](../interfaces/IconColumnData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `row` | `T` |
| `column` | [`ColumnType`](../README.md#columntype)<`T`\> |

#### Returns

[`IconColumnData`](../interfaces/IconColumnData.md)

___

### getColumnsForRightView

▸ **getColumnsForRightView**(`columns`): [`ColumnsType`](../README.md#columnstype)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `columns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |

#### Returns

[`ColumnsType`](../README.md#columnstype)<`T`\>

___

### getSelectedItem

▸ **getSelectedItem**(`dataSourceRows`): `Observable`<``null`` \| `T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSourceRows` | `Observable`<`T`[]\> |

#### Returns

`Observable`<``null`` \| `T`\>

___

### exportXlsx

▸ **exportXlsx**(`mode`, `inputData`, `req`, `data`, `count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | ``"all"`` \| ``"current"`` |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |
| `req` | `Q` |
| `data` | `T`[] |
| `count` | `number` |

#### Returns

`void`

___

### isSelectedColumn

▸ **isSelectedColumn**(`columnData`, `showedColumns`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnData` | [`ColumnType`](../README.md#columntype)<`T`\> |
| `showedColumns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |

#### Returns

`boolean`

___

### showColumn

▸ **showColumn**(`column`, `inputData`, `showedColumns`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`ColumnType`](../README.md#columntype)<`T`\> |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |
| `showedColumns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |

#### Returns

`void`

___

### drop

▸ **drop**(`event`, `inputData`, `showedColumns`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `CdkDragDrop`<`string`[], `string`[], `any`\> |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |
| `showedColumns` | [`ColumnsType`](../README.md#columnstype)<`T`\> |

#### Returns

`void`

___

### resetColumnLayout

▸ **resetColumnLayout**(`inputData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputData` | [`OneTableData`](OneTableData.md)<`T`, `Q`\> |

#### Returns

`void`

___

### copy

▸ **copy**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` \| `number` |

#### Returns

`void`
