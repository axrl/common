# Class: TranslationsService

## Table of contents

### Constructors

- [constructor](TranslationsService.md#constructor)

### Accessors

- [languagesList](TranslationsService.md#languageslist)

### Properties

- [currentLanguage$](TranslationsService.md#currentlanguage$)
- [translations$](TranslationsService.md#translations$)

### Methods

- [changeCurrentLanguage](TranslationsService.md#changecurrentlanguage)
- [translate](TranslationsService.md#translate)
- [getFromMemory](TranslationsService.md#getfrommemory)
- [saveToMemory](TranslationsService.md#savetomemory)

## Constructors

### constructor

• **new TranslationsService**(`api`, `translationsConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | [`ApiService`](ApiService.md) |
| `translationsConfig` | [`TranslationConfig`](../README.md#translationconfig) |

## Accessors

### languagesList

• `get` **languagesList**(): `string`[]

#### Returns

`string`[]

## Properties

### currentLanguage$

• **currentLanguage$**: `Observable`<`string`\>

___

### translations$

• **translations$**: `Observable`<`Record`<`string`, `string`\>\>

## Methods

### changeCurrentLanguage

▸ **changeCurrentLanguage**(`language`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`void`

___

### translate

▸ **translate**(`translations`, `value?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `translations` | `Record`<`string`, `string`\> |
| `value?` | `string` |

#### Returns

`string`

___

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
