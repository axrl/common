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
| `translationService` | [`TranslationsService`](TranslationsService.md) |

## Methods

### create

▸ **create**<`T`\>(`data`, `filename`, `keys`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |
| `filename` | `string` |
| `keys` | `Object` |

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
