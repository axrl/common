# Class: LanguagePersonSettingsService<Settings\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Settings` | extends [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) = [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) |

## Table of contents

### Constructors

- [constructor](LanguagePersonSettingsService.md#constructor)

### Properties

- [storageKey](LanguagePersonSettingsService.md#storagekey)
- [\_languagePersonSettings$](LanguagePersonSettingsService.md#_languagepersonsettings$)
- [languagePersonSettings$](LanguagePersonSettingsService.md#languagepersonsettings$)
- [languagePersonSettingsFiltered$](LanguagePersonSettingsService.md#languagepersonsettingsfiltered$)
- [settingsChanges](LanguagePersonSettingsService.md#settingschanges)

### Methods

- [updatePersonSettings](LanguagePersonSettingsService.md#updatepersonsettings)

## Constructors

### constructor

• **new LanguagePersonSettingsService**<`Settings`\>(`translationsService`, `defaultPersonSettingsValue`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Settings` | extends [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) = [`LanguagePersonSettings`](../interfaces/LanguagePersonSettings.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `translationsService` | [`TranslationsService`](TranslationsService.md) |
| `defaultPersonSettingsValue` | ``null`` \| `Settings` |

## Properties

### storageKey

• `Readonly` **storageKey**: `string`

___

### \_languagePersonSettings$

• `Readonly` **\_languagePersonSettings$**: `BehaviorSubject`<``null`` \| `Settings`\>

___

### languagePersonSettings$

• **languagePersonSettings$**: `Observable`<``null`` \| `Settings`\>

___

### languagePersonSettingsFiltered$

• **languagePersonSettingsFiltered$**: `Observable`<`Settings`\>

___

### settingsChanges

• **settingsChanges**: `Observable`<`Settings`\>

Поток с данными об обновлениях в настроках.

## Methods

### updatePersonSettings

▸ **updatePersonSettings**(`newSettings`, `emitEvent?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newSettings` | `Settings` | `undefined` |
| `emitEvent` | `boolean` | `true` |

#### Returns

`void`
