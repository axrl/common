# Class: TrackByPropertyDirective\<T\>

Трекинг для ngFor на основе кастомного свойства

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
  <li *ngFor="let item of items; trackByProperty: 'id'">{{ item.id }}</li>
 </ul>
...
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

## Table of contents

### Constructors

- [constructor](TrackByPropertyDirective.md#constructor)

### Properties

- [\_property](TrackByPropertyDirective.md#_property)
- [\_ngFor](TrackByPropertyDirective.md#_ngfor)

## Constructors

### constructor

• **new TrackByPropertyDirective**\<`T`\>(`_ngFor`): [`TrackByPropertyDirective`](TrackByPropertyDirective.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ngFor` | `NgForOf`\<`T`, `NgIterable`\<`T`\>\> |

#### Returns

[`TrackByPropertyDirective`](TrackByPropertyDirective.md)\<`T`\>

## Properties

### \_property

• `Optional` **\_property**: keyof `T`

Название уникального свойства объекта

___

### \_ngFor

• `Protected` `Readonly` **\_ngFor**: `NgForOf`\<`T`, `NgIterable`\<`T`\>\>
