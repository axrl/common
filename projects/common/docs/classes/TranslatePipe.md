# Class: TranslatePipe

## Implements

- `PipeTransform`

## Table of contents

### Properties

- [asyncPipe](TranslatePipe.md#asyncpipe)
- [\_ref](TranslatePipe.md#_ref)
- [translationService](TranslatePipe.md#translationservice)

### Constructors

- [constructor](TranslatePipe.md#constructor)

### Methods

- [transform](TranslatePipe.md#transform)

## Properties

### asyncPipe

• `Private` **asyncPipe**: `AsyncPipe`

___

### \_ref

• `Private` **\_ref**: ``null`` \| `ChangeDetectorRef`

___

### translationService

• `Private` **translationService**: [`TranslationsService`](TranslationsService.md)

## Constructors

### constructor

• **new TranslatePipe**(`translationService`, `ref`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `translationService` | [`TranslationsService`](TranslationsService.md) |
| `ref` | `ChangeDetectorRef` |

## Methods

### transform

▸ **transform**(`value?`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `string` |

#### Returns

``null`` \| `string`

#### Implementation of

PipeTransform.transform
