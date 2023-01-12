# Interface: MakeOneTableConfig<T, Q\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Q` | extends [`BaseListRequest`](../classes/BaseListRequest.md) = [`BaseListRequest`](../classes/BaseListRequest.md) |

## Table of contents

### Properties

- [defaultColumns](MakeOneTableConfig.md#defaultcolumns)
- [sourceFn](MakeOneTableConfig.md#sourcefn)
- [componentName](MakeOneTableConfig.md#componentname)
- [filter](MakeOneTableConfig.md#filter)
- [orderBy](MakeOneTableConfig.md#orderby)
- [actions](MakeOneTableConfig.md#actions)
- [additionParams](MakeOneTableConfig.md#additionparams)
- [filterOptions](MakeOneTableConfig.md#filteroptions)
- [updateFilterFn](MakeOneTableConfig.md#updatefilterfn)
- [exportXlsxFileNameGenerationFn](MakeOneTableConfig.md#exportxlsxfilenamegenerationfn)
- [extendedRowPredicate](MakeOneTableConfig.md#extendedrowpredicate)
- [orderDirection](MakeOneTableConfig.md#orderdirection)
- [shortColumns](MakeOneTableConfig.md#shortcolumns)
- [isInnerTable](MakeOneTableConfig.md#isinnertable)
- [columnsForXlsxExport](MakeOneTableConfig.md#columnsforxlsxexport)
- [columnsForCopy](MakeOneTableConfig.md#columnsforcopy)

## Properties

### defaultColumns

• **defaultColumns**: [`ColumnsType`](../README.md#columnstype)<`T`\>

Массив с конфигурациями всех колонок, которые могут отображаться в таблице либо быть спрятанными пользователем.

___

### sourceFn

• **sourceFn**: (`req`: `Q`) => `Observable`<[`CountAndRows`](CountAndRows.md)<`T`\>\>

#### Type declaration

▸ (`req`): `Observable`<[`CountAndRows`](CountAndRows.md)<`T`\>\>

Функция, которая будет вызываться для загрузки очередной порции данных в таблицу.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Q` |

##### Returns

`Observable`<[`CountAndRows`](CountAndRows.md)<`T`\>\>

___

### componentName

• **componentName**: `string`

Название компонента, содержащего таблицу. Должно быть уникальным для каждой отдельной таблицйы, поскольку именно с этим 
ключом настройки той или иной таблицы будут сохраняться в пользовательских настройках.

___

### filter

• **filter**: `unknown`

Объект с параметрами, которые будут использоваться для задания начальных значений в форме фильтрации таблицы и, как следствие,
передаваться в качестве значения поля filter в объекте BaseListRequest при вызове sourceFn

___

### orderBy

• **orderBy**: [`ColumnType`](../README.md#columntype)<`T`\>

Колонка, по которой изначально будут отсортированы данные таблицы

___

### actions

• `Optional` **actions**: [`ActionButton`](../classes/ActionButton.md)<`T`\>[]

Массив action-ов, символизирующих действия, доступные для той или иной строки таблицы.
Используется только в случае, если в списке defaultColumns для таблицы была определена колонка "action"

___

### additionParams

• `Optional` **additionParams**: `Partial`<`Omit`<`Q`, keyof [`BaseListRequest`](../classes/BaseListRequest.md)\>\>

Дополнительные параметры, которые могут или должны присутствовать в параметрах запроса очередной порции данных таблицы, отсутсвующие в типе BaseListRequest,
но объявленные в типе Q. Не используется, если Q = BaseListRequest (т.е. практически никогда :) )

___

### filterOptions

• `Optional` **filterOptions**: [`TableFilterOptionsData`](../README.md#tablefilteroptionsdata)<`string` \| `number` \| `string`[]\>

Конфигурация для полей формы фильтрации данных в таблице.

___

### updateFilterFn

• `Optional` **updateFilterFn**: [`TableFilterUpdateFn`](../README.md#tablefilterupdatefn)<`Q`\>

Функция, которая будет вызываться при каждой отправке данных формы фильтрации. Используется в случаях, если требуется дополнительное преобразование данных
фильтра перед тем, как выполнить запросить очередную порцию данных в sourceFn.
Первый параметр функции - объект BaseListRequest, который будет в дальнейшем передан в sourceFn.
Второй параметр - текущее значение формы с фильтрами.

___

### exportXlsxFileNameGenerationFn

• `Optional` **exportXlsxFileNameGenerationFn**: (`req?`: `Q`) => `string`

#### Type declaration

▸ (`req?`): `string`

Функция, при помощи которой будет формироваться название для xlsx-файла с экспортируемыми данными таблицы.
Если ничего не задано - файл будет экспортироваться с названием по умолчанием.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | `Q` |

##### Returns

`string`

___

### extendedRowPredicate

• `Optional` **extendedRowPredicate**: (`row`: `T`) => `boolean`

#### Type declaration

▸ (`row`): `boolean`

Функция, определяющая условие, при выполнении которого для каждой строки таблицы будет отображаться раскрывающаяся строка с дополнительной информацией.

##### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `T` |

##### Returns

`boolean`

___

### orderDirection

• `Optional` **orderDirection**: ``"asc"`` \| ``"desc"``

Изначальное направление сортировки данных в таблице.

___

### shortColumns

• `Optional` **shortColumns**: [`ColumnsType`](../README.md#columnstype)<`T`\>

Используется в случае, когда таблицу нужно вывести в частичном представлении -
 В левой части (50% доступного пространства) - будут отображаться только колонки из списка shortColumns.
 Справа - отдельный компонент, в котором вертикальным списком будут выведены данные для всех полей, объявленных в defaultColumns.
В верху этого компонента будут выведены кнопки всех доступных action-действий для данной строки (в случае, если такие действия были определены в массиве action)

___

### isInnerTable

• `Optional` **isInnerTable**: `boolean`

Признак, является ли данная таблица вложенной внутрь другой таблицы (например, отображается в extendedRow).

___

### columnsForXlsxExport

• `Optional` **columnsForXlsxExport**: [`ColumnsType`](../README.md#columnstype)<`T`\> \| ``"all"``

Используется в случае, если требуется ограничить количество данных, которые будут экспортироваться в xlsx.

___

### columnsForCopy

• `Optional` **columnsForCopy**: [`ColumnName`](../README.md#columnname)<`T`\>[]

Список колонок, внутри которых рядом с данными будет дополнительно выведена кнопка, позволящая скопировать значение ячейки таблицы.
