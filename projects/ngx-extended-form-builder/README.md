# @axrl/ngx-extended-form-builder

Библиотека для облегчения создания Angular Reactive Form из объекта, как расширенная альтернатива встроенному FormBuilder.

В отличие от стандартного FormBuilder-а, при создании формы из сложных объектов, сохраняется вложенность контролов - каждый вложенный объект превращается во вложенную FormGroup, обычные свойства объектов становятся FormControl-ами, а массивы - FormArray-ми.

## Install

```bash
npm i @axrl/ngx-extended-form-builder
```

## Usage
Импортируем функцию из библиотеки и используем в коде:

```ts
...
import { makeForm } from '@axrl/ngx-extended-form-builder';

const data = {
  key:"value",
  key1: {
    key2:"value"
  }
}
const form:FormGroup = makeForm(data);

...
```

```ts
import { makeForm } from '@axrl/ngx-extended-form-builder';

...
export class SomeComponent {
  data = {
    key:"value",
    key1: {
      key2:"value"
    }
  };
  form:FormGroup = makeForm(data);
  ...
}
```
## API

См. в [документации.](docs/README.md)
