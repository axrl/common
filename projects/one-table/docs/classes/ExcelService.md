# Class: ExcelService

## Table of contents

### Constructors

- [constructor](ExcelService.md#constructor)

### Methods

- [create](ExcelService.md#create)
- [translateAndCreate](ExcelService.md#translateandcreate)
- [base64FromSheetFileToArrayJson](ExcelService.md#base64fromsheetfiletoarrayjson)

## Constructors

### constructor

• **new ExcelService**(`translationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `translationService` | `TranslationsService` |

## Methods

### create

▸ **create**<`T`\>(`data`, `filename`, `keys`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T`[] | Массив объектов с данными типа T, которые требуется отобразить в таблице |
| `filename` | `string` | Название для генерируемого файла |
| `keys` | `Object` | Объект, в качестве ключей которого выступают названия ключей в типе T, а в качестве значений : 1. Если в DOM для данного ключа существует таблица с элементом th, id которого соответствует шаблону "th-"+некое_значение, то можно указать его здесь. В таком случае при создании таблицы сервис найдет этот элемент в DOM и в сгенерированном файле ширина столбца будет соответствовать ширине такого столбца в DOM. 2. Если поведение из пункта 1 не требуется, можно указать любое строковое значение, для которого не найдется элемента th с соответствующим шаблону идентификатором. Ширина для столбца в сгенерированном файле в таком случае будет установлена по умолчанию - 150px |

#### Returns

`void`

___

### translateAndCreate

▸ **translateAndCreate**<`T`\>(`data`, `filename`): `Observable`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |
| `filename` | `string` |

#### Returns

`Observable`<`void`\>

___

### base64FromSheetFileToArrayJson

▸ **base64FromSheetFileToArrayJson**<`T`\>(`file`, `header?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` | Base64 строка, представляющая прочитанный файл .csv |
| `header?` | `number` \| `string`[] \| ``"A"`` | - |

#### Returns

`T`[]

Массив элементов, прочитанный из таблицы.
