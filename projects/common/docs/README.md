# @axrl/common

## Table of contents

### Functions

- [createObservable](README.md#createobservable)
- [isValue](README.md#isvalue)
- [isEqualItems](README.md#isequalitems)
- [blobDownloader](README.md#blobdownloader)
- [makeHttpParams](README.md#makehttpparams)
- [trackByFn](README.md#trackbyfn)

### Classes

- [RuDateMediumPipe](classes/RuDateMediumPipe.md)
- [TranslatePipe](classes/TranslatePipe.md)
- [SnackService](classes/SnackService.md)
- [TranslationsService](classes/TranslationsService.md)
- [ExcelService](classes/ExcelService.md)
- [FileLoaderAndReaderService](classes/FileLoaderAndReaderService.md)
- [ApiService](classes/ApiService.md)
- [HttpBusService](classes/HttpBusService.md)

### Variables

- [SNACK\_SERVICE\_COMPONENT](README.md#snack_service_component)
- [TRANSLATIONS\_JSON\_URL](README.md#translations_json_url)
- [API\_SERVICE\_GET\_MAP\_FN](README.md#api_service_get_map_fn)
- [API\_SERVICE\_POST\_MAP\_FN](README.md#api_service_post_map_fn)
- [API\_SERVICE\_PUT\_MAP\_FN](README.md#api_service_put_map_fn)
- [API\_SERVICE\_DELETE\_MAP\_FN](README.md#api_service_delete_map_fn)

### Interfaces

- [SendEventToBusFnParams](interfaces/SendEventToBusFnParams.md)

### Type Aliases

- [HttpBusEventData](README.md#httpbuseventdata)
- [AdditionalActionCallbackFn](README.md#additionalactioncallbackfn)
- [ParamsAndHeaders](README.md#paramsandheaders)

## Functions

### createObservable

▸ **createObservable**<`T`\>(`initValue`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initValue` | `T` |

#### Returns

`Observable`<`T`\>

___

### isValue

▸ **isValue**<`T`\>(`value`): value is NonNullable<T\>

**`Function`**

isValue

Функция-хелпер для проверки, что переданное значение не является null или undefined.
Может пригодиться в ситуациях, где требуется более сложная проверка, чем при использовании optional chaining (оператора "??"),
либо защиты от ложно-положительных срабатываний при проверке наличия значения
Например :

```typescript
   interface Foo {
   value? :number | undefinded
   }
   const a:Foo = {
     value: 0
   };
   if (a) {
    <block_a>
   } else {
     <block_b>
    };
```

В этом примере block_a не будет выполнен, поскольку приведение к типу boolean значения 0 в результате дает false.
А проверка isValue(a) - вернет true.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| ``null`` \| `T` |

#### Returns

value is NonNullable<T\>

___

### isEqualItems

▸ **isEqualItems**<`T`\>(`a`, `b`): `boolean`

Функция для сравнения двух переменных.
Осуществляет "глубокое" сравнение для непримитивных типов по значениям их свойств, а не по ссылке на объект.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` |  |
| `b` | `T` | сравниваемые объекты. |

#### Returns

`boolean`

true, если объекты идентичны и false, если объекты различаются.

___

### blobDownloader

▸ **blobDownloader**(`res`, `filename?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `File` |
| `filename?` | `string` |

#### Returns

`void`

___

### makeHttpParams

▸ **makeHttpParams**(`value`, `params`, `firstKey?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |
| `params` | `Object` |
| `firstKey?` | `string` |

#### Returns

`Object`

___

### trackByFn

▸ **trackByFn**<`T`\>(`index`, `item`): `number`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `item` | `T` |

#### Returns

`number`

## Variables

### SNACK\_SERVICE\_COMPONENT

• `Const` **SNACK\_SERVICE\_COMPONENT**: `InjectionToken`<`undefined` \| `SnackServiceConfig`<`unknown`, `any`\>\>

InjectionToken с компонентом, который будет отображаться в качестве Snackbar.
По умолчанию задано значение undefined - сервис использует встроенный в Angular Material компонент по умолчанию, иначе - используется компонент из токена.

___

### TRANSLATIONS\_JSON\_URL

• `Const` **TRANSLATIONS\_JSON\_URL**: `InjectionToken`<`string`\>

InjectionToken со строкой URL, по которому расположен файл со словарем переводов.
По умолчанию - 'assets/translations/ru.json';

___

### API\_SERVICE\_GET\_MAP\_FN

• `Const` **API\_SERVICE\_GET\_MAP\_FN**: `InjectionToken`<`TransformIncomingDataFn`\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.getData<T>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### API\_SERVICE\_POST\_MAP\_FN

• `Const` **API\_SERVICE\_POST\_MAP\_FN**: `InjectionToken`<`TransformIncomingDataFn`\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.postData<TResponse,TBody>` и

**`Method`**

`ApiService.postNoData<TResponse>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### API\_SERVICE\_PUT\_MAP\_FN

• `Const` **API\_SERVICE\_PUT\_MAP\_FN**: `InjectionToken`<`TransformIncomingDataFn`\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.putData<TResponse,TBody>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### API\_SERVICE\_DELETE\_MAP\_FN

• `Const` **API\_SERVICE\_DELETE\_MAP\_FN**: `InjectionToken`<`TransformIncomingDataFn`\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.delete<T>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

## Type Aliases

### HttpBusEventData

Ƭ **HttpBusEventData**<`T`\>: `HttpBusBaseEventData`<`T`\> & { `method`: ``"post"`` \| ``"post-blob"`` \| ``"post-text"`` \| ``"put"`` ; `url`: `string` ; `body?`: `unknown` \| ``null`` ; `options`: [`ParamsAndHeaders`](README.md#paramsandheaders) ; `filename?`: `string`  } \| { `method`: ``"custom"`` ; `customObservable`: `Observable`<`T`\>  } \| { `method`: ``"get"`` \| ``"get-blob"`` \| ``"get-text"`` \| ``"delete"`` ; `url`: `string` ; `options`: [`ParamsAndHeaders`](README.md#paramsandheaders) ; `filename?`: `string`  }

#### Type parameters

| Name |
| :------ |
| `T` |

___

### AdditionalActionCallbackFn

Ƭ **AdditionalActionCallbackFn**<`T`\>: (`result?`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result?` | `T` |

##### Returns

`void`

___

### ParamsAndHeaders

Ƭ **ParamsAndHeaders**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers?` | { `[header: string]`: `string`;  } |
| `params?` | { `[params: string]`: `any`;  } |
