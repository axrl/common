# Class: DialogService

## Table of contents

### Properties

- [dialog](DialogService.md#dialog)

### Constructors

- [constructor](DialogService.md#constructor)

### Methods

- [closeAllDialogs](DialogService.md#closealldialogs)
- [getDialogOptions](DialogService.md#getdialogoptions)
- [openWindow](DialogService.md#openwindow)
- [openWindowAndWaitPromise](DialogService.md#openwindowandwaitpromise)

## Properties

### dialog

• `Private` **dialog**: ``null`` \| `MatDialog`

## Constructors

### constructor

• **new DialogService**()

## Methods

### closeAllDialogs

▸ **closeAllDialogs**(`dialog?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialog?` | `MatDialog` |

#### Returns

`void`

___

### getDialogOptions

▸ **getDialogOptions**<`D`\>(`config?`): `MatDialogConfig`<`D`\>

#### Type parameters

| Name |
| :------ |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `MatDialogConfig`<`D`\> |

#### Returns

`MatDialogConfig`<`D`\>

___

### openWindow

▸ **openWindow**<`T`, `D`, `R`\>(`T`, `config?`, `dialog?`): `MatDialogRef`<`T`, `R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `D` | `any` |
| `R` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `T` | `ComponentType`<`T`\> \| `TemplateRef`<`T`\> |
| `config?` | `MatDialogConfig`<`D`\> |
| `dialog?` | `MatDialog` |

#### Returns

`MatDialogRef`<`T`, `R`\>

___

### openWindowAndWaitPromise

▸ **openWindowAndWaitPromise**<`T`, `D`, `R`\>(`T`, `config?`, `dialog?`): `Promise`<`undefined` \| `R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `D` | `any` |
| `R` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `T` | `ComponentType`<`T`\> \| `TemplateRef`<`T`\> |
| `config?` | `MatDialogConfig`<`D`\> |
| `dialog?` | `MatDialog` |

#### Returns

`Promise`<`undefined` \| `R`\>
