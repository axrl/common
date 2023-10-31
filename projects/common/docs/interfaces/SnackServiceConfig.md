# Interface: SnackServiceConfig<T, D\>

Тип для InjectionToken с объектом конфигурации для SnackService для ситуации, в качестве Snackbar требуется отображать пользовательский компонент вместо
встроенного в в Angular Material компонента по умолчанию.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `D` | `any` |

## Table of contents

### Properties

- [component](SnackServiceConfig.md#component)
- [snackBarConfig](SnackServiceConfig.md#snackbarconfig)

## Properties

### component

• **component**: `ComponentType`<`T`\>

___

### snackBarConfig

• **snackBarConfig**: (`message`: `string`, `isError`: `boolean`) => `MatSnackBarConfig`<`D`\>

#### Type declaration

▸ (`message`, `isError`): `MatSnackBarConfig`<`D`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `isError` | `boolean` |

##### Returns

`MatSnackBarConfig`<`D`\>
