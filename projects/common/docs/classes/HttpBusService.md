# Class: HttpBusService

## Table of contents

### Constructors

- [constructor](HttpBusService.md#constructor)

### Properties

- [\_httpBus$](HttpBusService.md#_httpbus$)
- [httpBus$](HttpBusService.md#httpbus$)
- [api](HttpBusService.md#api)

### Methods

- [sendEventToBus](HttpBusService.md#sendeventtobus)
- [destroyBus](HttpBusService.md#destroybus)
- [reducer](HttpBusService.md#reducer)

## Constructors

### constructor

• **new HttpBusService**(`api`): [`HttpBusService`](HttpBusService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | [`ApiService`](ApiService.md) |

#### Returns

[`HttpBusService`](HttpBusService.md)

## Properties

### \_httpBus$

• `Private` **\_httpBus$**: `EventEmitter`<[`HttpBusEventData`](../README.md#httpbuseventdata)<`any`\>\>

___

### httpBus$

• **httpBus$**: `Observable`<`void`\>

___

### api

• `Private` **api**: [`ApiService`](ApiService.md)

## Methods

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

___

### reducer

▸ **reducer**<`T`\>(`e`): `Observable`<`unknown`\>

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
