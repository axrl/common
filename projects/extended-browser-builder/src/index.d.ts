import type { BrowserBuilderOptions } from '@angular-devkit/build-angular';
export interface ExtendedBrowserBuilderOptions extends BrowserBuilderOptions {
    /** массив комманд, которые требуется выполнить перед запуском оригинального builder-a Angular */
    beforeBuildCommands: string[];
    /** массив комманд, которые требуется выполнить после того, как оригинальный builder Angular завершит сборку проекта.*/
    afterBuildCommands: string[];
}
declare const _default: import("@angular-devkit/architect/src/internal").Builder<ExtendedBrowserBuilderOptions & import("@angular-devkit/core").JsonObject>;
export default _default;
