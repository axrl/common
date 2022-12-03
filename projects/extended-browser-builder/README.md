# @axrl/extended-browser-builder

Angular CLI Builder, являющийся оберткой над стандартным билдером, представляемым Angular CLI.

Для сборки непосредственно самого Angular fronend-приложения используется стандартный билдер.
Отличие только в том, что данный сборщик позволяет выполнить дополнительные скрипты коммандной строки непосредственно перед тем, как 
начнется сборка приложения, а также после того, как сборка будет завершена.

Комманды, которые нужно выполнить перед и после сборки указываются в 2-х новых свойствах в дополнение к уже имеющимся стандартным опциям оригинального сборщика в файле angular.json:

| Name | Type | Description |
| :------ | :------ | :------ |
| `beforeBuildCommands` | `Array`<[`string`]> | массив комманд, которые требуется выполнить перед запуском оригинального builder-a Angular |
| `afterBuildCommands` |  `Array`<[`string`]>] | массив комманд, которые требуется выполнить после того, как оригинальный builder Angular завершит сборку роекта |


```JSON angular.json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "<your_project_name>": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@axrl/extended-browser-builder", /// - замените название стандартного билдера на @axrl/extended-browser-builder
          "options": {
            "beforeBuildCommands": [], // комманды, которые требуется выполнить перед сборкой
            "afterBuildCommands": [], // комманды, которые требуется выполнить после сборки
            "outputPath": "dist",
            "index": "src/index.html"
            // ... остальные параметры вашей конфигурации сборки
          }
        }
      }
    }
  }
}
```