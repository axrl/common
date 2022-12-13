# Class: AllItemsOneTableDataSource<T, Q\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md) = [`BaseListRequest`](BaseListRequest.md) |

## Table of contents

### Constructors

- [constructor](AllItemsOneTableDataSource.md#constructor)

### Properties

- [data](AllItemsOneTableDataSource.md#data)
- [previousTriggerValue](AllItemsOneTableDataSource.md#previoustriggervalue)

### Methods

- [getRequestedData](AllItemsOneTableDataSource.md#getrequesteddata)

## Constructors

### constructor

• **new AllItemsOneTableDataSource**<`T`, `Q`\>(`data`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> = [`BaseListRequest`](BaseListRequest.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |

## Properties

### data

• **data**: `T`[]

___

### previousTriggerValue

• `Optional` **previousTriggerValue**: `Q`

## Methods

### getRequestedData

▸ **getRequestedData**(`req`): `Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Q` |

#### Returns

`Observable`<[`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>\>
