# @axrl/common

## Table of contents

### Classes

- [ControlErrorMessagePipe](classes/ControlErrorMessagePipe.md)
- [RuDateMediumPipe](classes/RuDateMediumPipe.md)
- [TranslatePipe](classes/TranslatePipe.md)
- [DialogService](classes/DialogService.md)
- [LanguagePersonSettingsService](classes/LanguagePersonSettingsService.md)
- [SnackService](classes/SnackService.md)
- [TranslationsService](classes/TranslationsService.md)
- [FileLoaderAndReaderService](classes/FileLoaderAndReaderService.md)
- [ApiService](classes/ApiService.md)
- [HttpBusService](classes/HttpBusService.md)

### Interfaces

- [SnackServiceConfig](interfaces/SnackServiceConfig.md)
- [LanguagePersonSettings](interfaces/LanguagePersonSettings.md)
- [HttpBusBaseEventData](interfaces/HttpBusBaseEventData.md)
- [SendEventToBusFnParams](interfaces/SendEventToBusFnParams.md)

### Type Aliases

- [TransformIncomingDataFn](README.md#transformincomingdatafn)
- [TranslationConfig](README.md#translationconfig)
- [MakeNullable](README.md#makenullable)
- [HttpBusEventData](README.md#httpbuseventdata)
- [AdditionalActionCallbackFn](README.md#additionalactioncallbackfn)
- [ParamsAndHeaders](README.md#paramsandheaders)

### Variables

- [API\_SERVICE\_GET\_MAP\_FN](README.md#api_service_get_map_fn)
- [API\_SERVICE\_POST\_MAP\_FN](README.md#api_service_post_map_fn)
- [API\_SERVICE\_PUT\_MAP\_FN](README.md#api_service_put_map_fn)
- [API\_SERVICE\_DELETE\_MAP\_FN](README.md#api_service_delete_map_fn)
- [SNACK\_SERVICE\_CONFIG](README.md#snack_service_config)
- [TRANSLATIONS\_CONFIG](README.md#translations_config)
- [CONTROL\_ERROR\_MESSAGES\_PIPE\_DICTIONARY](README.md#control_error_messages_pipe_dictionary)
- [LANGUAGE\_PERSON\_SETTINGS\_START\_VALUE](README.md#language_person_settings_start_value)

### Functions

- [createObservable](README.md#createobservable)
- [createSubject](README.md#createsubject)
- [deepClone](README.md#deepclone)
- [delayedObservable](README.md#delayedobservable)
- [getFilteredData](README.md#getfiltereddata)
- [isEqualItems](README.md#isequalitems)
- [isValue](README.md#isvalue)
- [objectEntries](README.md#objectentries)
- [objectKeys](README.md#objectkeys)
- [resizeObservable](README.md#resizeobservable)
- [trackByFn](README.md#trackbyfn)
- [distinctUntilObjectChanged](README.md#distinctuntilobjectchanged)
- [returnFileSize](README.md#returnfilesize)
- [blobDownloader](README.md#blobdownloader)
- [makeHttpParams](README.md#makehttpparams)

## Type Aliases

### TransformIncomingDataFn

Ƭ **TransformIncomingDataFn**: <T\>(`res`: `unknown`) => `T`

#### Type declaration

▸ <`T`\>(`res`): `T`

Описание типа для функций трансформации данных, полученных при использовании методов

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `unknown` |

##### Returns

`T`

**`Method`**

`ApiService.getData<T>`

___

### TranslationConfig

Ƭ **TranslationConfig**: `Object`

Настройка конфигурации TranslationsService

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `includeDotJsonToPath?` | `boolean` | Требуется ли добавлять '.json' в конце пути url, по которому сервис будет запрашивать данные для переводов. Если для получения переводов используется endpoint некоего сервиса rest-api - установите значение false. Если для получения переводов используется набор статичных файлов JSON, расположенных по некоему URL - установите true. По умолчанию - true. **`Default`** ```ts true ``` |
| `translationsFolderUrl` | `string` | Первая часть пути url, на который сервис будет делать запрос для получения словаря переводов. Итоговый url, на который будет обращаться сервис за конкретным переводом получается по формуле : translationsFolderUrl + одно из значений в списке языков languages + '.json' (только если для includeDotJsonToPath установлено значение true) **`Default`** ```ts 'assets/translations' ``` |
| `defaultLanguage?` | `string` | Язык, который будет использоватьcя сервисом в качестве языка по умолчанию - к примеру, при старте приложения. **`Default`** ```ts 'ru' ``` |
| `languages` | `string`[] | Список языков, для которых доступны данные для перевода. **`Default`** ```ts ['ru'] ``` |

___

### MakeNullable

Ƭ **MakeNullable**<`T`\>: { [K in keyof T]: T[K] extends string \| number \| boolean \| bigint \| null \| undefined ? T[K] \| null : MakeNullable<T[K]\> }

Хелпер-утилита типа - для всех полей типа разрешает установить в качестве значения null

#### Type parameters

| Name |
| :------ |
| `T` |

___

### HttpBusEventData

Ƭ **HttpBusEventData**<`T`\>: [`HttpBusBaseEventData`](interfaces/HttpBusBaseEventData.md)<`T`\> & { `method`: ``"post"`` \| ``"post-blob"`` \| ``"post-text"`` \| ``"put"`` ; `url`: `string` ; `body?`: `unknown` \| ``null`` ; `options`: [`ParamsAndHeaders`](README.md#paramsandheaders) ; `filename?`: `string`  } \| { `method`: ``"custom"`` ; `customObservable`: `Observable`<`T`\>  } \| { `method`: ``"get"`` \| ``"get-blob"`` \| ``"get-text"`` \| ``"delete"`` ; `url`: `string` ; `options`: [`ParamsAndHeaders`](README.md#paramsandheaders) ; `filename?`: `string`  }

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

## Variables

### API\_SERVICE\_GET\_MAP\_FN

• `Const` **API\_SERVICE\_GET\_MAP\_FN**: `InjectionToken`<[`TransformIncomingDataFn`](README.md#transformincomingdatafn)\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании методов

**`Method`**

`ApiService.getData<T>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### API\_SERVICE\_POST\_MAP\_FN

• `Const` **API\_SERVICE\_POST\_MAP\_FN**: `InjectionToken`<[`TransformIncomingDataFn`](README.md#transformincomingdatafn)\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.postData<TResponse,TBody>` и

**`Method`**

`ApiService.postNoData<TResponse>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### API\_SERVICE\_PUT\_MAP\_FN

• `Const` **API\_SERVICE\_PUT\_MAP\_FN**: `InjectionToken`<[`TransformIncomingDataFn`](README.md#transformincomingdatafn)\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.putData<TResponse,TBody>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### API\_SERVICE\_DELETE\_MAP\_FN

• `Const` **API\_SERVICE\_DELETE\_MAP\_FN**: `InjectionToken`<[`TransformIncomingDataFn`](README.md#transformincomingdatafn)\>

InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании

**`Method`**

`ApiService.delete<T>` .
По умолчанию -  (data) => data (преобразование данных не происходит) ;

___

### SNACK\_SERVICE\_CONFIG

• `Const` **SNACK\_SERVICE\_CONFIG**: `InjectionToken`<`undefined` \| [`SnackServiceConfig`](interfaces/SnackServiceConfig.md)<`unknown`, `any`\>\>

InjectionToken с объектом SnackServiceConfig - конфигурацией компонента , который будет отображаться в качестве Snackbar.
По умолчанию задано значение undefined - сервис использует встроенный в Angular Material компонент по умолчанию, иначе - используется компонент из токена.

___

### TRANSLATIONS\_CONFIG

• `Const` **TRANSLATIONS\_CONFIG**: `InjectionToken`<[`TranslationConfig`](README.md#translationconfig)\>

InjectionToken с объектом конфигурации TranslationConfig.

**`Default`**

```ts
{
 *  includeDotJsonToPath: true,
 *  translationsFolderUrl: 'assets/translations',
 *  defaultLanguage: 'ru',
 *  languages: ['ru']
 * }
```

___

### CONTROL\_ERROR\_MESSAGES\_PIPE\_DICTIONARY

• `Const` **CONTROL\_ERROR\_MESSAGES\_PIPE\_DICTIONARY**: `InjectionToken`<`Record`<`string`, `string`\>\>

InjectionToken с объектом-словарем сообщений об ошибке валидации контролов формы, используемым ControlErrorMessagePipe для форматирования.
Пайп проверяет список ошибок контрола и возвращает сообщение для первой найденной ошибки.
Если для такой ошибки в словаре определено сообщение - оно будет возвращено пайпом, иначе - фактический текст ошибки из контрола.

___

### LANGUAGE\_PERSON\_SETTINGS\_START\_VALUE

• `Const` **LANGUAGE\_PERSON\_SETTINGS\_START\_VALUE**: `InjectionToken`<``null`` \| [`LanguagePersonSettings`](interfaces/LanguagePersonSettings.md)\>

InjectionToken со стартовым значением для потока с настройками пользователя.
По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.

Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение
будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.

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

### createSubject

▸ **createSubject**<`T`\>(`initValue`): `BehaviorSubject`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initValue` | `T` |

#### Returns

`BehaviorSubject`<`T`\>

▸ **createSubject**<`T`\>(`initValue`): `BehaviorSubject`<`T` \| ``null``\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initValue` | ``null`` |

#### Returns

`BehaviorSubject`<`T` \| ``null``\>

___

### deepClone

▸ **deepClone**<`T`\>(`source`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | объект, который требуется скопировать |

#### Returns

`T`

полная копия объекта объекта, полученного в качестве аргумента

**`Function`**

deepClone()
Функция для "глубокого" рекурсивного клонирования любых объектов

___

### delayedObservable

▸ **delayedObservable**<`T`\>(`values`, `delayInMs`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `T`[] | Значения, которые требуется испускать с задержкой |
| `delayInMs` | `number` | Задержка между событиями |

#### Returns

`Observable`<`T`\>

Функция создает Obsewrvable-поток, который будет по очереди испускать значения массива values с задержкой delayInMs между каждым событием.

___

### getFilteredData

▸ **getFilteredData**<`T`\>(`nonFilteredData`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nonFilteredData` | `Observable`<``null`` \| `T`\> |

#### Returns

`Observable`<`T`\>

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

### isValue

▸ **isValue**<`T`\>(`value`): value is NonNullable<T\>

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

___

### objectEntries

▸ **objectEntries**<`T`\>(`source`): `ObjectEntry`<`T`\>[]

Типизированная версия стандартного метода Object.entries

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | любой объект |

#### Returns

`ObjectEntry`<`T`\>[]

массив пар ключ-значение в source

___

### objectKeys

▸ **objectKeys**<`T`\>(`source`): keyof `T`[]

Типизированная версия стандартного метода Object.keys

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | любой объект |

#### Returns

keyof `T`[]

массив ключей в source

___

### resizeObservable

▸ **resizeObservable**(`element`): `Observable`<`ResizeObserverEntry`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |

#### Returns

`Observable`<`ResizeObserverEntry`[]\>

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

___

### distinctUntilObjectChanged

▸ **distinctUntilObjectChanged**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

Returns a result Observable that emits all values pushed by the source observable if they
are distinct in comparison to the last value the result observable emitted.
Works also for objects and arrays, not just primitive types.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

___

### returnFileSize

▸ **returnFileSize**(`size`): `number`

Форматирует размер файла из байтов в мегабайты

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`number`

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
