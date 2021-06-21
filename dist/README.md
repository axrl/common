# NgxExtendedFormBuilder

Библиотека для облегчения создания Angular Reactive Form из объекта, как расширенная альтернатива встроенному FormBuilder.

В отличие от стандартного FormBuilder-а, при создании формы из сложных объектов, сохраняется вложенность контролов - каждый вложенный объект превращается во вложенную FormGroup, обычные свойства объектов становятся FormControl-ами, а массивы - FormArray-ми.

## Install

```bash
npm i @axrl/ngx-extended-form-builder
```

## Usage
Импортируем функцию из библиотеки:
```ts
import { makeForm } from '@axrl/ngx-extended-form-builder';
```
Используем в коде :

```ts
...
const data = {
  key:"value",
  key1: {
    key2:"value"
  }
}
const form:FormGroup = makeForm<FormGroup>(data);

...
```

```ts
...
export class SomeComponent {
  makeForm = makeForm;
  data = {
  key:"value",
  key1: {
    key2:"value"
  }
};
  form:FormGroup = makeForm<FormGroup>(data);

  ...
}

```

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
