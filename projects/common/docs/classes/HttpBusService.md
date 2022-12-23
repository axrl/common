# Class: HttpBusService

## Table of contents

### Constructors

- [constructor](HttpBusService.md#constructor)

### Properties

- [api](HttpBusService.md#api)
- [\_httpBus$](HttpBusService.md#_httpbus$)
- [httpBus$](HttpBusService.md#httpbus$)

### Methods

- [reducer](HttpBusService.md#reducer)
- [sendEventToBus](HttpBusService.md#sendeventtobus)
- [destroyBus](HttpBusService.md#destroybus)

## Constructors

### constructor

• **new HttpBusService**(`api`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | [`ApiService`](ApiService.md) |

## Properties

### api

• `Private` **api**: [`ApiService`](ApiService.md)

___

### \_httpBus$

• `Private` **\_httpBus$**: `EventEmitter`<[`HttpBusEventData`](../README.md#httpbuseventdata)<`any`\>\>

___

### httpBus$

• **httpBus$**: `Observable`<`void`\>

## Methods

### reducer

▸ `Private` **reducer**<`T`\>(`e`): `Observable`<`unknown`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`HttpBusEventData`](../README.md#httpbuseventdata)<`T`\> |

#### Returns

`Observable`<`unknown`\>

___

### sendEventToBus

▸ **sendEventToBus**<`TResponse`\>(`options`): `void`

#### Type parameters

| Name |
| :------ |
| `TResponse` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SendEventToBusFnParams`](../interfaces/SendEventToBusFnParams.md)<`TResponse`\> |

#### Returns

`void`

___

### destroyBus

▸ **destroyBus**(): `void`

#### Returns

`void`
