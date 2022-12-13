# Class: ActionButton<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Table of contents

### Properties

- [action](ActionButton.md#action)
- [canShow](ActionButton.md#canshow)
- [routerLink](ActionButton.md#routerlink)
- [iconName](ActionButton.md#iconname)

### Constructors

- [constructor](ActionButton.md#constructor)

## Properties

### action

• **action**: `string`

___

### canShow

• **canShow**: (`row?`: `T`) => `boolean`

#### Type declaration

▸ (`row?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `row?` | `T` |

##### Returns

`boolean`

___

### routerLink

• `Optional` **routerLink**: (`row?`: `T`) => `any`[]

#### Type declaration

▸ (`row?`): `any`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `row?` | `T` |

##### Returns

`any`[]

___

### iconName

• **iconName**: ``null`` \| `string`

## Constructors

### constructor

• **new ActionButton**<`T`\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.action` | `string` | название действия |
| `options.canShow?` | (`row?`: `T`) => `boolean` | условие, при выполнении которого будет отображаться кнопка. По умолчанию = () => true |
| `options.routerLink?` | (`row?`: `T`) => `any`[] | (необязательный) url, по которому необходимо перейти при клике на кнопку |
| `options.iconName?` | ``null`` \| `string` | (необязательный) название иконки <mat-icon>, используемое для кнопки |
