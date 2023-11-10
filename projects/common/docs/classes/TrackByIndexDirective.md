# Class: TrackByIndexDirective\<T\>

Трекинг для ngFor на основе индекса

**`Usage`**

В классе компонента:

```*.component.ts
...
items = [1, 2, 3];
...
```

И теперь в шаблоне:

```*.component.html
...
<ul>
  <li *ngFor="let item of items; trackByIndex">{{ item.id }}</li>
 </ul>
...
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

## Table of contents

### Constructors

- [constructor](TrackByIndexDirective.md#constructor)

### Properties

- [\_ngFor](TrackByIndexDirective.md#_ngfor)

## Constructors

### constructor

• **new TrackByIndexDirective**\<`T`\>(`_ngFor`): [`TrackByIndexDirective`](TrackByIndexDirective.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ngFor` | `NgForOf`\<`T`, `NgIterable`\<`T`\>\> |

#### Returns

[`TrackByIndexDirective`](TrackByIndexDirective.md)\<`T`\>

## Properties

### \_ngFor

• `Protected` `Readonly` **\_ngFor**: `NgForOf`\<`T`, `NgIterable`\<`T`\>\>
