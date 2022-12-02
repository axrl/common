# Class: ApiService

## Table of contents

### Constructors

- [constructor](ApiService.md#constructor)

### Properties

- [isLoadingResults$](ApiService.md#isloadingresults$)

### Methods

- [changeLoadingStatus](ApiService.md#changeloadingstatus)
- [getData](ApiService.md#getdata)
- [postData](ApiService.md#postdata)
- [postBlobData](ApiService.md#postblobdata)
- [postNoData](ApiService.md#postnodata)
- [delete](ApiService.md#delete)
- [putData](ApiService.md#putdata)
- [getBlobData](ApiService.md#getblobdata)

## Constructors

### constructor

• **new ApiService**(`http`, `snack`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `snack` | [`SnackService`](SnackService.md) |

## Properties

### isLoadingResults$

• **isLoadingResults$**: `Observable`<`boolean`\>

## Methods

### changeLoadingStatus

▸ **changeLoadingStatus**(`start?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `boolean` | `false` |

#### Returns

`void`

___

### getData

▸ **getData**<`T`\>(`url`, `options?`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) & { `responseType?`: ``"json"`` \| ``"blob"``  } |

#### Returns

`Observable`<`T`\>

___

### postData

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
| `options` | [`ParamsAndHeaders`](../README.md#paramsandheaders) |

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
