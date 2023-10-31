# Class: ControlErrorMessagePipe

## Implements

- `PipeTransform`

## Table of contents

### Constructors

- [constructor](ControlErrorMessagePipe.md#constructor)

### Properties

- [controlErrorsMessagesPipeDictionary](ControlErrorMessagePipe.md#controlerrorsmessagespipedictionary)

### Methods

- [transform](ControlErrorMessagePipe.md#transform)

## Constructors

### constructor

• **new ControlErrorMessagePipe**(`controlErrorsMessagesPipeDictionary`): [`ControlErrorMessagePipe`](ControlErrorMessagePipe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlErrorsMessagesPipeDictionary` | `Record`<`string`, `string`\> |

#### Returns

[`ControlErrorMessagePipe`](ControlErrorMessagePipe.md)

## Properties

### controlErrorsMessagesPipeDictionary

• `Private` **controlErrorsMessagesPipeDictionary**: `Record`<`string`, `string`\>

## Methods

### transform

▸ **transform**(`control?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `control?` | ``null`` \| `AbstractControl`<`any`, `any`\> |

#### Returns

`string`

#### Implementation of

PipeTransform.transform
