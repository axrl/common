# Class: SnackService

## Table of contents

### Constructors

- [constructor](SnackService.md#constructor)

### Properties

- [snackBar](SnackService.md#snackbar)
- [snackServiceConfig](SnackService.md#snackserviceconfig)

### Methods

- [showText](SnackService.md#showtext)

## Constructors

### constructor

• **new SnackService**(`snackBar`, `snackServiceConfig`): [`SnackService`](SnackService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `snackBar` | `MatSnackBar` |
| `snackServiceConfig` | `undefined` \| [`SnackServiceConfig`](../interfaces/SnackServiceConfig.md)<`unknown`, `any`\> |

#### Returns

[`SnackService`](SnackService.md)

## Properties

### snackBar

• `Private` **snackBar**: `MatSnackBar`

___

### snackServiceConfig

• `Private` **snackServiceConfig**: `undefined` \| [`SnackServiceConfig`](../interfaces/SnackServiceConfig.md)<`unknown`, `any`\>

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
