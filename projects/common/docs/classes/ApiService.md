# Class: ApiService

## Table of contents

### Constructors

- [constructor](ApiService.md#constructor)

### Properties

- [loadingIndicator$](ApiService.md#loadingindicator$)
- [isLoadingResults$](ApiService.md#isloadingresults$)

### Methods

- [updateLoadingIndicator](ApiService.md#updateloadingindicator)
- [getData](ApiService.md#getdata)
- [getBlobData](ApiService.md#getblobdata)
- [postData](ApiService.md#postdata)
- [postBlobData](ApiService.md#postblobdata)
- [postNoData](ApiService.md#postnodata)
- [putData](ApiService.md#putdata)
- [delete](ApiService.md#delete)

## Constructors

### constructor

• **new ApiService**(`http`, `snack`, `methodGetMapFn`, `methodPostMapFn`, `methodPutMapFn`, `methodDeleteMapFn`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `snack` | [`SnackService`](SnackService.md) |
| `methodGetMapFn` | `TransformIncomingDataFn` |
| `methodPostMapFn` | `TransformIncomingDataFn` |
| `methodPutMapFn` | `TransformIncomingDataFn` |
| `methodDeleteMapFn` | `TransformIncomingDataFn` |

## Properties

### loadingIndicator$

• **loadingIndicator$**: `Observable`<`LoadingIndicator`\>

___

### isLoadingResults$

• **isLoadingResults$**: `Observable`<`boolean`\>

## Methods

### updateLoadingIndicator

▸ **updateLoadingIndicator**(`newIndicator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newIndicator` | `LoadingIndicator` |

#### Returns

`void`

___

### getData

▸ **getData**<`T`\>(`url`, `options`): `Observable`<`string`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"text"``  } |

#### Returns

`Observable`<`string`\>

▸ **getData**<`T`\>(`url`, `options`): `Observable`<`ArrayBuffer`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"arraybuffer"``  } |

#### Returns

`Observable`<`ArrayBuffer`\>

▸ **getData**<`T`\>(`url`, `options`): `Observable`<`File`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"blob"``  } |

#### Returns

`Observable`<`File`\>

▸ **getData**<`T`\>(`url`, `options?`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options?` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType?`: ``"json"``  } |

#### Returns

`Observable`<`T`\>

___

### getBlobData

▸ **getBlobData**(`url`, `params?`, `headers?`): `Observable`<`File`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `params` | `Object` |
| `headers?` | `Object` |

#### Returns

`Observable`<`File`\>

___

### postData

▸ **postData**<`TResponse`, `TBody`\>(`url`, `body`, `options`): `Observable`<`string`\>

#### Type parameters

| Name |
| :------ |
| `TResponse` |
| `TBody` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `body` | `TBody` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"text"``  } |

#### Returns

`Observable`<`string`\>

▸ **postData**<`TResponse`, `TBody`\>(`url`, `body`, `options`): `Observable`<`ArrayBuffer`\>

#### Type parameters

| Name |
| :------ |
| `TResponse` |
| `TBody` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `body` | `TBody` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"arraybuffer"``  } |

#### Returns

`Observable`<`ArrayBuffer`\>

▸ **postData**<`TResponse`, `TBody`\>(`url`, `body`, `options`): `Observable`<`File`\>

#### Type parameters

| Name |
| :------ |
| `TResponse` |
| `TBody` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `body` | `TBody` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"blob"``  } |

#### Returns

`Observable`<`File`\>

▸ **postData**<`TResponse`, `TBody`\>(`url`, `body`, `options?`): `Observable`<`TResponse`\>

#### Type parameters

| Name |
| :------ |
| `TResponse` |
| `TBody` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `body` | `TBody` |
| `options?` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType?`: ``"json"``  } |

#### Returns

`Observable`<`TResponse`\>

___

### postBlobData

▸ **postBlobData**<`TBody`\>(`url`, `body`, `options?`): `Observable`<`File`\>

#### Type parameters

| Name |
| :------ |
| `TBody` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `body` | `TBody` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) |

#### Returns

`Observable`<`File`\>

___

### postNoData

▸ **postNoData**<`TResponse`\>(`url`, `options?`): `Observable`<`TResponse`\>

#### Type parameters

| Name |
| :------ |
| `TResponse` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) |

#### Returns

`Observable`<`TResponse`\>

___

### putData

▸ **putData**<`TResponse`, `TBody`\>(`url`, `body`, `options?`): `Observable`<`TResponse`\>

#### Type parameters

| Name |
| :------ |
| `TResponse` |
| `TBody` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `body` | `TBody` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) |

#### Returns

`Observable`<`TResponse`\>

___

### delete

▸ **delete**<`T`\>(`url`, `params?`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `params` | `Object` |

#### Returns

`Observable`<`T`\>
