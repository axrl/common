# Interface: SendEventToBusFnParams<TResponse\>

## Type parameters

| Name |
| :------ |
| `TResponse` |

## Table of contents

### Properties

- [method](SendEventToBusFnParams.md#method)
- [url](SendEventToBusFnParams.md#url)
- [body](SendEventToBusFnParams.md#body)
- [cb](SendEventToBusFnParams.md#cb)
- [errCb](SendEventToBusFnParams.md#errcb)
- [params](SendEventToBusFnParams.md#params)
- [headers](SendEventToBusFnParams.md#headers)
- [filename](SendEventToBusFnParams.md#filename)

## Properties

### method

• **method**: ``"post"`` \| ``"post-blob"`` \| ``"post-text"`` \| ``"put"`` \| ``"delete"`` \| ``"get"`` \| ``"get-blob"`` \| ``"get-text"``

___

### url

• **url**: `string`

___

### body

• `Optional` **body**: `any`

___

### cb

• `Optional` **cb**: [`AdditionalActionCallbackFn`](../README.md#additionalactioncallbackfn)<`TResponse`\>

___

### errCb

• `Optional` **errCb**: [`AdditionalActionCallbackFn`](../README.md#additionalactioncallbackfn)<`unknown`\>

___

### params

• `Optional` **params**: `Object`

#### Index signature

▪ [params: `string`]: `any`

___

### headers

• `Optional` **headers**: `Object`

#### Index signature

▪ [header: `string`]: `string`

___

### filename

• `Optional` **filename**: `string`
