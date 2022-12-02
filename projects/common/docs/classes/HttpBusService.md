# Class: HttpBusService

## Table of contents

### Constructors

- [constructor](HttpBusService.md#constructor)

### Properties

- [httpBus$](HttpBusService.md#httpbus$)

### Methods

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

### httpBus$

• **httpBus$**: `Observable`<`void`\>

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
