# Class: CommonBaseControl\<TValue\>

Базовый класс для компонентов, реализующих функционал ControlValueAccessor.

## Type parameters

| Name |
| :------ |
| `TValue` |

## Hierarchy

- `DefaultValueAccessor`

  ↳ **`CommonBaseControl`**

## Implements

- `ControlValueAccessor`

## Table of contents

### Constructors

- [constructor](CommonBaseControl.md#constructor)

### Properties

- [onChange](CommonBaseControl.md#onchange)
- [onTouched](CommonBaseControl.md#ontouched)
- [ɵfac](CommonBaseControl.md#ɵfac)
- [ɵdir](CommonBaseControl.md#ɵdir)
- [\_generateUUIDHelper](CommonBaseControl.md#_generateuuidhelper)
- [\_\_elementRef](CommonBaseControl.md#__elementref)
- [\_cdr](CommonBaseControl.md#_cdr)
- [\_\_renderer](CommonBaseControl.md#__renderer)
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

- [setProperty](CommonBaseControl.md#setproperty)
- [registerOnTouched](CommonBaseControl.md#registerontouched)
- [registerOnChange](CommonBaseControl.md#registeronchange)
- [setDisabledState](CommonBaseControl.md#setdisabledstate)
- [writeValue](CommonBaseControl.md#writevalue)

## Constructors

### constructor

• **new CommonBaseControl**\<`TValue`\>(`inj`, `_renderer`, `_elementRef`, `_compositionMode`): [`CommonBaseControl`](CommonBaseControl.md)\<`TValue`\>

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inj` | `Injector` | - |
| `_renderer` | `Renderer2` | Renderer2, Доступный для вызова любым классом-наследником |
| `_elementRef` | `ElementRef`\<`HTMLElement`\> | Ссылка на DOM-элемент, соответствующий компоненту |
| `_compositionMode` | `boolean` | - |

#### Returns

[`CommonBaseControl`](CommonBaseControl.md)\<`TValue`\>

#### Overrides

DefaultValueAccessor.constructor

## Properties

### onChange

• **onChange**: (`_`: `any`) => `void`

The registered callback function called when a change or input event occurs on the input
element.

**`Nodoc`**

#### Type declaration

▸ (`_`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `any` |

##### Returns

`void`

#### Inherited from

DefaultValueAccessor.onChange

___

### onTouched

• **onTouched**: () => `void`

The registered callback function called when a blur event occurs on the input element.

**`Nodoc`**

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

DefaultValueAccessor.onTouched

___

### ɵfac

▪ `Static` **ɵfac**: `unknown`

#### Inherited from

DefaultValueAccessor.ɵfac

___

### ɵdir

▪ `Static` **ɵdir**: `unknown`

#### Inherited from

DefaultValueAccessor.ɵdir

___

### \_generateUUIDHelper

• `Protected` `Readonly` **\_generateUUIDHelper**: [`GenerateUUIDService`](GenerateUUIDService.md)

Сервис для генерации GUID

___

### \_\_elementRef

• `Protected` `Readonly` **\_\_elementRef**: `ElementRef`\<`HTMLElement`\>

Ссылка на DOM-элемент, соответствующий компоненту

___

### \_cdr

• `Protected` `Readonly` **\_cdr**: `ChangeDetectorRef`

ChangeDetectorRef, Доступный для вызова любым классом-наследником

___

### \_\_renderer

• `Protected` `Readonly` **\_\_renderer**: `Renderer2`

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

### setProperty

▸ **setProperty**(`key`, `value`): `void`

Helper method that sets a property on a target element using the current Renderer
implementation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`void`

**`Nodoc`**

#### Inherited from

DefaultValueAccessor.setProperty

___

### registerOnTouched

▸ **registerOnTouched**(`fn`): `void`

Registers a function called when the control is touched.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `void` |

#### Returns

`void`

**`Nodoc`**

#### Implementation of

ControlValueAccessor.registerOnTouched

#### Inherited from

DefaultValueAccessor.registerOnTouched

___

### registerOnChange

▸ **registerOnChange**(`fn`): `void`

Registers a function called when the control value changes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`_`: `any`) => {} |

#### Returns

`void`

**`Nodoc`**

#### Implementation of

ControlValueAccessor.registerOnChange

#### Inherited from

DefaultValueAccessor.registerOnChange

___

### setDisabledState

▸ **setDisabledState**(`isDisabled`): `void`

Sets the "disabled" property on the range input element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `isDisabled` | `boolean` |

#### Returns

`void`

**`Nodoc`**

#### Implementation of

ControlValueAccessor.setDisabledState

#### Inherited from

DefaultValueAccessor.setDisabledState

___

### writeValue

▸ **writeValue**(`value`): `void`

Sets the "value" property on the input element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

**`Nodoc`**

#### Implementation of

ControlValueAccessor.writeValue

#### Inherited from

DefaultValueAccessor.writeValue
