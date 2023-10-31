# Class: DialogService

## Table of contents

### Constructors

- [constructor](DialogService.md#constructor)

### Properties

- [\_dialog](DialogService.md#_dialog)

### Methods

- [closeAllDialogs](DialogService.md#closealldialogs)
- [getDialogOptions](DialogService.md#getdialogoptions)
- [openWindow](DialogService.md#openwindow)
- [openWindowAndWaitPromise](DialogService.md#openwindowandwaitpromise)

## Constructors

### constructor

• **new DialogService**(): [`DialogService`](DialogService.md)

#### Returns

[`DialogService`](DialogService.md)

## Properties

### \_dialog

• `Private` **\_dialog**: ``null`` \| `MatDialog`

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
