# Class: TranslationsService

## Table of contents

### Constructors

- [constructor](TranslationsService.md#constructor)

### Properties

- [translations$](TranslationsService.md#translations$)

### Methods

- [translate](TranslationsService.md#translate)
- [getFromMemory](TranslationsService.md#getfrommemory)
- [saveToMemory](TranslationsService.md#savetomemory)

## Constructors

### constructor

• **new TranslationsService**(`api`, `translationsJsonUrl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | [`ApiService`](ApiService.md) |
| `translationsJsonUrl` | `string` |

## Properties

### translations$

• **translations$**: `Observable`<`Record`<`string`, `string`\>\>

## Methods

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
