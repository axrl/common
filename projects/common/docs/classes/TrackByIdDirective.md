# Class: TrackByIdDirective\<T\>

Частный случай TrackByPropertyDirective - трекинг на основе значения свойства `id`

**`Usage`**

В классе компонента:

```*.component.ts
...
items = [{id: 1}, {id: 2}, {id: 3}]
...
```

И теперь в шаблоне:

```*.component.html
...
<ul>
  <li *ngFor="let item of items; trackById">{{ item.id }}</li>
 </ul>
...
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Table of contents

### Constructors

- [constructor](TrackByIdDirective.md#constructor)

### Properties

- [\_ngFor](TrackByIdDirective.md#_ngfor)

## Constructors

### constructor

• **new TrackByIdDirective**\<`T`\>(`_ngFor`): [`TrackByIdDirective`](TrackByIdDirective.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ngFor` | `NgForOf`\<`T`, `NgIterable`\<`T`\>\> |

#### Returns

[`TrackByIdDirective`](TrackByIdDirective.md)\<`T`\>

## Properties

### \_ngFor

• `Protected` `Readonly` **\_ngFor**: `NgForOf`\<`T`, `NgIterable`\<`T`\>\>
