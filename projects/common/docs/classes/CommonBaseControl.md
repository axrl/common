# Class: CommonBaseControl\<TValue\>

Базовый класс для компонентов, реализующих функционал ControlValueAccessor.

## Type parameters

| Name |
| :------ |
| `TValue` |

## Implements

- `ControlValueAccessor`

## Table of contents

### Constructors

- [constructor](CommonBaseControl.md#constructor)

### Properties

- [\_generateUUIDHelper](CommonBaseControl.md#_generateuuidhelper)
- [\_elementRef](CommonBaseControl.md#_elementref)
- [\_cdr](CommonBaseControl.md#_cdr)
- [\_renderer](CommonBaseControl.md#_renderer)
- [\_disabled](CommonBaseControl.md#_disabled)
- [\_value](CommonBaseControl.md#_value)
- [ngControl](CommonBaseControl.md#ngcontrol)
- [tabIndex](CommonBaseControl.md#tabindex)
- [name](CommonBaseControl.md#name)
- [id](CommonBaseControl.md#id)
- [valueChanges](CommonBaseControl.md#valuechanges)

### Accessors

- [value](CommonBaseControl.md#value)
- [disabled](CommonBaseControl.md#disabled)
- [focusable](CommonBaseControl.md#focusable)

### Methods

- [writeValue](CommonBaseControl.md#writevalue)
- [registerOnChange](CommonBaseControl.md#registeronchange)
- [registerOnTouched](CommonBaseControl.md#registerontouched)
- [setDisabledState](CommonBaseControl.md#setdisabledstate)
- [\_onChange](CommonBaseControl.md#_onchange)
- [\_onTouched](CommonBaseControl.md#_ontouched)

## Constructors

### constructor

• **new CommonBaseControl**\<`TValue`\>(`inj`): [`CommonBaseControl`](CommonBaseControl.md)\<`TValue`\>

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `inj` | `Injector` |

#### Returns

[`CommonBaseControl`](CommonBaseControl.md)\<`TValue`\>

## Properties

### \_generateUUIDHelper

• `Protected` **\_generateUUIDHelper**: [`GenerateUUIDService`](GenerateUUIDService.md)

Сервис для генерации GUID

___

### \_elementRef

• `Protected` **\_elementRef**: `ElementRef`\<`HTMLElement`\>

Ссылка на DOM-элемент, соответствующий компоненту

___

### \_cdr

• `Protected` **\_cdr**: `ChangeDetectorRef`

ChangeDetectorRef, Доступный для вызова любым классом-наследником

___

### \_renderer

• `Protected` **\_renderer**: `Renderer2`

Renderer2, Доступный для вызова любым классом-наследником

___

### \_disabled

• `Protected` **\_disabled**: `boolean` = `false`

Отключение компонента

___

### \_value

• `Protected` **\_value**: ``null`` \| `TValue` = `null`

___

### ngControl

• **ngControl**: ``null`` \| `NgControl`

ngControl, ассоциированный с компонентом

___

### tabIndex

• **tabIndex**: `number` = `0`

Tabindex attribute

___

### name

• **name**: ``null`` \| `string` = `null`

Атрибут name

___

### id

• **id**: `string`

Атрибут id

___

### valueChanges

• `Readonly` **valueChanges**: `EventEmitter`\<``null`` \| `TValue`\>

Emit changes in control

## Accessors

### value

• `get` **value**(): ``null`` \| `TValue`

Получить значение

#### Returns

``null`` \| `TValue`

• `set` **value**(`value`): `void`

Установить значение

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | ``null`` \| `TValue` |

#### Returns

`void`

___

### disabled

• `get` **disabled**(): `boolean`

Текущее значение disabled

#### Returns

`boolean`

• `set` **disabled**(`disabled`): `void`

Установить значение disabled

#### Parameters

| Name | Type |
| :------ | :------ |
| `disabled` | `boolean` |

#### Returns

`void`

___

### focusable

• `get` **focusable**(): `boolean`

Флаг возможности фокусировки на компоненте

#### Returns

`boolean`

## Methods

### writeValue

▸ **writeValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | ``null`` \| `TValue` |

#### Returns

`void`

**`Inherit Doc`**

#### Implementation of

ControlValueAccessor.writeValue

___

### registerOnChange

▸ **registerOnChange**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `any` |

#### Returns

`void`

**`Inherit Doc`**

#### Implementation of

ControlValueAccessor.registerOnChange

___

### registerOnTouched

▸ **registerOnTouched**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `any` |

#### Returns

`void`

**`Inherit Doc`**

#### Implementation of

ControlValueAccessor.registerOnTouched

___

### setDisabledState

▸ **setDisabledState**(`isDisabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isDisabled` | `boolean` |

#### Returns

`void`

**`Inherit Doc`**

#### Implementation of

ControlValueAccessor.setDisabledState

___

### \_onChange

▸ **_onChange**(`_`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `any` |

#### Returns

`void`

**`Inherit Doc`**

___

### \_onTouched

▸ **_onTouched**(): `void`

#### Returns

`void`

**`Inherit Doc`**
