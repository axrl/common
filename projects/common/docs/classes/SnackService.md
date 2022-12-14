# Class: SnackService

## Table of contents

### Constructors

- [constructor](SnackService.md#constructor)

### Methods

- [showText](SnackService.md#showtext)

## Constructors

### constructor

• **new SnackService**(`snackBar`, `snackServiceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `snackBar` | `MatSnackBar` |
| `snackServiceConfig` | `undefined` \| [`SnackServiceConfig`](../interfaces/SnackServiceConfig.md)<`unknown`, `any`\> |

## Methods

### showText

▸ **showText**(`message`, `isError?`, `config?`): `MatSnackBarRef`<`unknown`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `isError` | `boolean` | `false` |
| `config?` | `MatSnackBarConfig`<`any`\> | `undefined` |

#### Returns

`MatSnackBarRef`<`unknown`\>
