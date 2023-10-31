# Class: LanguagePersonSettingsService<Settings\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Settings` | extends [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) = [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) |

## Table of contents

### Constructors

- [constructor](LanguagePersonSettingsService.md#constructor)

### Properties

- [\_settingsChanges](LanguagePersonSettingsService.md#_settingschanges)
- [settingsChanges](LanguagePersonSettingsService.md#settingschanges)
- [storageKey](LanguagePersonSettingsService.md#storagekey)
- [\_languagePersonSettings$](LanguagePersonSettingsService.md#_languagepersonsettings$)
- [languagePersonSettings$](LanguagePersonSettingsService.md#languagepersonsettings$)
- [languagePersonSettingsFiltered$](LanguagePersonSettingsService.md#languagepersonsettingsfiltered$)
- [translationsService](LanguagePersonSettingsService.md#translationsservice)
- [defaultPersonSettingsValue](LanguagePersonSettingsService.md#defaultpersonsettingsvalue)

### Methods

- [updatePersonSettings](LanguagePersonSettingsService.md#updatepersonsettings)

## Constructors

### constructor

• **new LanguagePersonSettingsService**<`Settings`\>(`translationsService`, `defaultPersonSettingsValue`): [`LanguagePersonSettingsService`](LanguagePersonSettingsService.md)<`Settings`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Settings` | extends [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) = [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `translationsService` | [`TranslationsService`](TranslationsService.md) |
| `defaultPersonSettingsValue` | ``null`` \| `Settings` |

#### Returns

[`LanguagePersonSettingsService`](LanguagePersonSettingsService.md)<`Settings`\>

## Properties

### \_settingsChanges

• `Private` **\_settingsChanges**: `EventEmitter`<`Settings`\>

___

### settingsChanges

• `Readonly` **settingsChanges**: `Observable`<`Settings`\>

Поток с данными об обновлениях в настроках.

___

### storageKey

• `Readonly` **storageKey**: `string`

___

### \_languagePersonSettings$

• `Readonly` **\_languagePersonSettings$**: `BehaviorSubject`<``null`` \| `Settings`\>

___

### languagePersonSettings$

• `Readonly` **languagePersonSettings$**: `Observable`<``null`` \| `Settings`\>

___

### languagePersonSettingsFiltered$

• `Readonly` **languagePersonSettingsFiltered$**: `Observable`<`Settings`\>

___

### translationsService

• `Private` **translationsService**: [`TranslationsService`](TranslationsService.md)

___

### defaultPersonSettingsValue

• `Private` **defaultPersonSettingsValue**: ``null`` \| `Settings`

## Methods

### updatePersonSettings

▸ **updatePersonSettings**(`newSettings`, `emitEvent?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newSettings` | `Settings` | `undefined` |
| `emitEvent` | `boolean` | `true` |

#### Returns

`Promise`<`void`\>
