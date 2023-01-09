# Class: OneTableService<Settings\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Settings` | extends [`BasePersonSettings`](../interfaces/BasePersonSettings.md) = [`BasePersonSettings`](../interfaces/BasePersonSettings.md) |

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

• **new OneTableService**<`Settings`\>(`languagePersonSettingsService`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Settings` | extends [`BasePersonSettings`](../interfaces/BasePersonSettings.md) = [`BasePersonSettings`](../interfaces/BasePersonSettings.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `languagePersonSettingsService` | `LanguagePersonSettingsService`<`Settings`\> |

## Methods

### getFromMemory

▸ **getFromMemory**(`key`): `undefined` \| [`IconColumnData`](../interfaces/IconColumnData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`IconColumnData`](../interfaces/IconColumnData.md)

___

### saveToMemory

▸ **saveToMemory**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | [`IconColumnData`](../interfaces/IconColumnData.md) |

#### Returns

`void`

___

### updatePersonSettings

▸ **updatePersonSettings**(`newSettings`, `emitEvent?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newSettings` | `Settings` | `undefined` |
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
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> |

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
| `config` | [`MakeOneTableConfig`](../interfaces/MakeOneTableConfig.md)<`T`, `Q`\> |

#### Returns

`Observable`<[`OneTableData`](OneTableData.md)<`T`, `Q`\>\>

## Properties

### basePersonSettings$

• **basePersonSettings$**: `Observable`<``null`` \| `Settings`\>

___

### basePersonSettingsFiltered$

• **basePersonSettingsFiltered$**: `Observable`<`Settings`\>

___

### settingsChanges

• **settingsChanges**: `Observable`<`Settings`\>

Поток с данными об обновлениях в настроках.
