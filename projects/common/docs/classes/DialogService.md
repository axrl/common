# Class: DialogService

## Table of contents

### Constructors

- [constructor](DialogService.md#constructor)

### Methods

- [closeAllDialogs](DialogService.md#closealldialogs)
- [getDialogOptions](DialogService.md#getdialogoptions)
- [openWindow](DialogService.md#openwindow)
- [openWindowAndWaitPromise](DialogService.md#openwindowandwaitpromise)

## Constructors

### constructor

• **new DialogService**()

## Methods

### closeAllDialogs

▸ **closeAllDialogs**(`dialog`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialog` | `MatDialog` |

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

▸ **openWindow**<`T`, `D`, `R`\>(`dialog`, `T`, `config?`): `MatDialogRef`<`T`, `R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `D` | `any` |
| `R` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialog` | `MatDialog` |
| `T` | `ComponentType`<`T`\> \| `TemplateRef`<`T`\> |
| `config?` | `MatDialogConfig`<`D`\> |

#### Returns

`MatDialogRef`<`T`, `R`\>

___

### openWindowAndWaitPromise

▸ **openWindowAndWaitPromise**<`T`, `D`, `R`\>(`dialog`, `T`, `config?`): `Promise`<`undefined` \| `R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `D` | `any` |
| `R` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialog` | `MatDialog` |
| `T` | `ComponentType`<`T`\> \| `TemplateRef`<`T`\> |
| `config?` | `MatDialogConfig`<`D`\> |

#### Returns

`Promise`<`undefined` \| `R`\>
