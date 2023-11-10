# Class: TranslationsService

## Table of contents

### Constructors

- [constructor](TranslationsService.md#constructor)

### Properties

- [\_currentLanguage$](TranslationsService.md#_currentlanguage$)
- [memory](TranslationsService.md#memory)
- [currentLanguage$](TranslationsService.md#currentlanguage$)
- [translations$](TranslationsService.md#translations$)
- [api](TranslationsService.md#api)
- [translationsConfig](TranslationsService.md#translationsconfig)

### Accessors

- [languagesList](TranslationsService.md#languageslist)

### Methods

- [changeCurrentLanguage](TranslationsService.md#changecurrentlanguage)
- [translate](TranslationsService.md#translate)
- [getFromMemory](TranslationsService.md#getfrommemory)
- [saveToMemory](TranslationsService.md#savetomemory)

## Constructors

### constructor

• **new TranslationsService**(`api`, `translationsConfig`): [`TranslationsService`](TranslationsService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | [`ApiService`](ApiService.md) |
| `translationsConfig` | [`TranslationConfig`](../README.md#translationconfig) |

#### Returns

[`TranslationsService`](TranslationsService.md)

## Properties

### \_currentLanguage$

• `Private` **\_currentLanguage$**: `BehaviorSubject`\<``null`` \| `string`\>

___

### memory

• `Private` **memory**: `Map`\<`string`, `string`\>

___

### currentLanguage$

• **currentLanguage$**: `Observable`\<`string`\>

___

### translations$

• **translations$**: `Observable`\<`Record`\<`string`, `string`\>\>

___

### api

• `Private` **api**: [`ApiService`](ApiService.md)

___

### translationsConfig

• `Private` **translationsConfig**: [`TranslationConfig`](../README.md#translationconfig)

## Accessors

### languagesList

• `get` **languagesList**(): `string`[]

#### Returns

`string`[]

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
| `translations` | `Record`\<`string`, `string`\> |
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
