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

• **new ControlErrorMessagePipe**(`controlErrorsMessagesPipeDictionary`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlErrorsMessagesPipeDictionary` | `Record`<`string`, `string`\> |

## Properties

### controlErrorsMessagesPipeDictionary

• `Private` **controlErrorsMessagesPipeDictionary**: `Record`<`string`, `string`\>

## Methods

### transform

▸ **transform**(`control`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `AbstractControl`<`any`, `any`\> |

#### Returns

`string`

#### Implementation of

PipeTransform.transform
