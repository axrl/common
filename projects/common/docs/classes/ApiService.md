# Class: ApiService

## Table of contents

### Constructors

- [constructor](ApiService.md#constructor)

### Properties

- [\_isLoadingResults$](ApiService.md#_isloadingresults$)
- [isLoadingResults$](ApiService.md#isloadingresults$)
- [http](ApiService.md#http)
- [snack](ApiService.md#snack)
- [methodGetMapFn](ApiService.md#methodgetmapfn)
- [methodPostMapFn](ApiService.md#methodpostmapfn)
- [methodPutMapFn](ApiService.md#methodputmapfn)
- [methodDeleteMapFn](ApiService.md#methoddeletemapfn)

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

• **new ApiService**(`http`, `snack`, `methodGetMapFn`, `methodPostMapFn`, `methodPutMapFn`, `methodDeleteMapFn`): [`ApiService`](ApiService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `snack` | [`SnackService`](SnackService.md) |
| `methodGetMapFn` | [`TransformIncomingDataFn`](../README.md#transformincomingdatafn) |
| `methodPostMapFn` | [`TransformIncomingDataFn`](../README.md#transformincomingdatafn) |
| `methodPutMapFn` | [`TransformIncomingDataFn`](../README.md#transformincomingdatafn) |
| `methodDeleteMapFn` | [`TransformIncomingDataFn`](../README.md#transformincomingdatafn) |

#### Returns

[`ApiService`](ApiService.md)

## Properties

### \_isLoadingResults$

• `Private` **\_isLoadingResults$**: `BehaviorSubject`<`number`\>

___

### isLoadingResults$

• **isLoadingResults$**: `Observable`<`boolean`\>

___

### http

• `Private` **http**: `HttpClient`

___

### snack

• `Private` **snack**: [`SnackService`](SnackService.md)

___

### methodGetMapFn

• `Private` **methodGetMapFn**: [`TransformIncomingDataFn`](../README.md#transformincomingdatafn)

___

### methodPostMapFn

• `Private` **methodPostMapFn**: [`TransformIncomingDataFn`](../README.md#transformincomingdatafn)

___

### methodPutMapFn

• `Private` **methodPutMapFn**: [`TransformIncomingDataFn`](../README.md#transformincomingdatafn)

___

### methodDeleteMapFn

• `Private` **methodDeleteMapFn**: [`TransformIncomingDataFn`](../README.md#transformincomingdatafn)

## Methods

### updateLoadingIndicator

▸ **updateLoadingIndicator**(`start?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `boolean` | `false` |

#### Returns

`void`

___

### getData

▸ **getData**(`url`, `options`): `Observable`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"text"``  } |

#### Returns

`Observable`<`string`\>

▸ **getData**(`url`, `options`): `Observable`<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType`: ``"arraybuffer"``  } |

#### Returns

`Observable`<`ArrayBuffer`\>

▸ **getData**(`url`, `options`): `Observable`<`File`\>

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
