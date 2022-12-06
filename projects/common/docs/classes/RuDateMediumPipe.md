# Class: RuDateMediumPipe

## Implements

- `PipeTransform`

## Table of contents

### Constructors

- [constructor](RuDateMediumPipe.md#constructor)

### Methods

- [transform](RuDateMediumPipe.md#transform)

## Constructors

### constructor

• **new RuDateMediumPipe**(`formatDateService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `formatDateService` | `FormatDateService` |

## Methods

### transform

▸ **transform**(`value`, `mode?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` \| `number` \| `Date` | `undefined` |
| `mode` | ``"time"`` \| ``"short"`` \| ``"long"`` | `'short'` |

#### Returns

`string`

#### Implementation of

PipeTransform.transform
