# Class: ColumnPipe<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Implements

- `PipeTransform`

## Table of contents

### Constructors

- [constructor](ColumnPipe.md#constructor)

### Methods

- [transform](ColumnPipe.md#transform)

## Constructors

### constructor

• **new ColumnPipe**<`T`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Methods

### transform

▸ **transform**(`value`, `columnData`): `undefined` \| `T`[keyof `T`] \| `NonNullable`<`T`[keyof `T`]\>[keyof `T`[keyof `T`]] \| `NonNullable`<`NonNullable`<`T`[keyof `T`]\>[keyof `T`[keyof `T`]]\>[keyof `T`[keyof `T`][keyof `T`[keyof `T`]]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `columnData` | [`ColumnType`](../README.md#columntype)<`T`\> |

#### Returns

`undefined` \| `T`[keyof `T`] \| `NonNullable`<`T`[keyof `T`]\>[keyof `T`[keyof `T`]] \| `NonNullable`<`NonNullable`<`T`[keyof `T`]\>[keyof `T`[keyof `T`]]\>[keyof `T`[keyof `T`][keyof `T`[keyof `T`]]]

#### Implementation of

PipeTransform.transform
