# Class: TranslatePipe

## Implements

- `PipeTransform`

## Table of contents

### Constructors

- [constructor](TranslatePipe.md#constructor)

### Properties

- [asyncPipe](TranslatePipe.md#asyncpipe)
- [\_ref](TranslatePipe.md#_ref)
- [translationService](TranslatePipe.md#translationservice)

### Methods

- [transform](TranslatePipe.md#transform)

## Constructors

### constructor

• **new TranslatePipe**(`translationService`, `ref`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `translationService` | [`TranslationsService`](TranslationsService.md) |
| `ref` | `ChangeDetectorRef` |

## Properties

### asyncPipe

• `Private` **asyncPipe**: `AsyncPipe`

___

### \_ref

• `Private` **\_ref**: ``null`` \| `ChangeDetectorRef`

___

### translationService

• `Private` **translationService**: [`TranslationsService`](TranslationsService.md)

## Methods

### transform

▸ **transform**(`value?`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | ``null`` \| `string` |

#### Returns

``null`` \| `string`

#### Implementation of

PipeTransform.transform
