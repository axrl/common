# Class: FileLoaderAndReaderService

## Table of contents

### Constructors

- [constructor](FileLoaderAndReaderService.md#constructor)

### Methods

- [onlyLoadFile](FileLoaderAndReaderService.md#onlyloadfile)
- [readFileAsBase64](FileLoaderAndReaderService.md#readfileasbase64)
- [readFileAsDataUrl](FileLoaderAndReaderService.md#readfileasdataurl)

## Constructors

### constructor

• **new FileLoaderAndReaderService**()

## Methods

### onlyLoadFile

▸ **onlyLoadFile**(`accept`): `Promise`<`File`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accept` | `string` |

#### Returns

`Promise`<`File`\>

___

### readFileAsBase64

▸ **readFileAsBase64**(`accept`): `Promise`<{ `name`: `string` ; `data`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accept` | `string` |

#### Returns

`Promise`<{ `name`: `string` ; `data`: `string`  }\>

___

### readFileAsDataUrl

▸ **readFileAsDataUrl**(`accept`): `Promise`<{ `name`: `string` ; `dataUrl`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accept` | `string` |

#### Returns

`Promise`<{ `name`: `string` ; `dataUrl`: `string`  }\>
