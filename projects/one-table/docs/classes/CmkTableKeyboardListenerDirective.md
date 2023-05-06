# Class: CmkTableKeyboardListenerDirective<T, Q\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md) |

## Implements

- `OnDestroy`

## Table of contents

### Constructors

- [constructor](CmkTableKeyboardListenerDirective.md#constructor)

### Properties

- [dataSourceTrigger](CmkTableKeyboardListenerDirective.md#datasourcetrigger)
- [sourceData](CmkTableKeyboardListenerDirective.md#sourcedata)
- [selectedItemIndexSubject](CmkTableKeyboardListenerDirective.md#selecteditemindexsubject)
- [isInnerTable](CmkTableKeyboardListenerDirective.md#isinnertable)
- [spaceEvent](CmkTableKeyboardListenerDirective.md#spaceevent)

### Methods

- [eventHandlerMatcher](CmkTableKeyboardListenerDirective.md#eventhandlermatcher)
- [onEscapeHandler](CmkTableKeyboardListenerDirective.md#onescapehandler)
- [onEnterHandler](CmkTableKeyboardListenerDirective.md#onenterhandler)
- [onArrowHandler](CmkTableKeyboardListenerDirective.md#onarrowhandler)
- [ngOnDestroy](CmkTableKeyboardListenerDirective.md#ngondestroy)

## Constructors

### constructor

• **new CmkTableKeyboardListenerDirective**<`T`, `Q`\>(`elementRef`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](BaseListRequest.md)<`Q`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elementRef` | `ElementRef`<`any`\> |

## Properties

### dataSourceTrigger

• **dataSourceTrigger**: `undefined` \| `BehaviorSubject`<`Q`\>

___

### sourceData

• **sourceData**: `undefined` \| ``null`` \| [`CountAndRows`](../interfaces/CountAndRows.md)<`T`\>

___

### selectedItemIndexSubject

• **selectedItemIndexSubject**: `undefined` \| `BehaviorSubject`<``null`` \| `number`\>

___

### isInnerTable

• **isInnerTable**: `boolean` = `false`

___

### spaceEvent

• **spaceEvent**: `EventEmitter`<`T`\>

## Methods

### eventHandlerMatcher

▸ **eventHandlerMatcher**(): `boolean`

#### Returns

`boolean`

___

### onEscapeHandler

▸ **onEscapeHandler**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### onEnterHandler

▸ **onEnterHandler**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### onArrowHandler

▸ **onArrowHandler**(`arrow`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrow` | ``"up"`` \| ``"down"`` |

#### Returns

`Promise`<`void`\>

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy
