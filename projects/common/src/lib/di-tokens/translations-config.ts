import {InjectionToken} from '@angular/core';

/**
 * Настройка конфигурации TranslationsService
 */
export type TranslationConfig = {
    /**
     * Требуется ли добавлять '.json' в конце пути url, по которому сервис будет запрашивать данные для переводов.
     * Если для получения переводов используется endpoint некоего сервиса rest-api - установите значение false.
     * Если для получения переводов используется набор статичных файлов JSON, расположенных по некоему URL - установите true.
     * По умолчанию - true.
     * @default true
     */
    includeDotJsonToPath?: boolean;

    /**
     * Первая часть пути url, на который сервис будет делать запрос для получения словаря переводов.
     * Итоговый url, на который будет обращаться сервис за конкретным переводом получается по формуле :
     *      translationsFolderUrl +
     *      одно из значений в списке языков languages +
     *      '.json' (только если для includeDotJsonToPath установлено значение true)
     *  @default 'assets/translations'
     */
    translationsFolderUrl: string;

    /**
     * Язык, который будет использоватьcя сервисом в качестве языка по умолчанию - к примеру, при старте приложения.
     * @default 'ru'
     */
    defaultLanguage?: string;

    /**
     * Список языков, для которых доступны данные для перевода.
     *  @default ['ru']
     */
    languages: string[];
};

/**
 * InjectionToken с объектом конфигурации TranslationConfig.
 * @default {
 *  includeDotJsonToPath: true,
 *  translationsFolderUrl: 'assets/translations',
 *  defaultLanguage: 'ru',
 *  languages: ['ru']
 * }
 */
export const TRANSLATIONS_CONFIG = new InjectionToken<TranslationConfig>('TRANSLATIONS_CONFIG', {
    providedIn: 'root',
    factory: (): TranslationConfig => ({
        includeDotJsonToPath: true,
        translationsFolderUrl: 'assets/translations',
        defaultLanguage: 'ru',
        languages: ['ru'],
    }),
});
