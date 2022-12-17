import { Location } from '@angular/common';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { shareReplay, distinctUntilChanged, switchMap, map } from 'rxjs';
import { createSubject, isValue } from '../functions';
import { ApiService } from './work-with-http/api.service';

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
}

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
  factory: () => ({
    includeDotJsonToPath: true,
    translationsFolderUrl: 'assets/translations',
    defaultLanguage: 'ru',
    languages: ['ru']
  })
});

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  constructor(
    private api: ApiService,
    @Inject(TRANSLATIONS_CONFIG) private translationsConfig: TranslationConfig,
  ) { }

  private _currentLanguage = createSubject<string>(this.translationsConfig.defaultLanguage ?? 'ru');

  get languagesList() {
    return this.translationsConfig.languages;
  }

  currentLanguage$ = this._currentLanguage.asObservable().pipe(
    distinctUntilChanged()
  );

  changeCurrentLanguage(language: string) {
    this._currentLanguage.next(language);
  }

  translations$ = this.currentLanguage$.pipe(
    switchMap(
      currentLang => {
        const translationsJsonUrl = Location.joinWithSlash(
          this.translationsConfig.translationsFolderUrl,
          `${currentLang}${!isValue(this.translationsConfig.includeDotJsonToPath) || this.translationsConfig.includeDotJsonToPath ? '.json' : ''}`
        );
        return this.api.getData<Record<string, string>>(translationsJsonUrl).pipe(
          map(
            translations => {
              this.memory.clear();
              return translations;
            })
        );
      }),
    shareReplay(1)
  );

  translate(translations: Record<string, string>, value?: string): string {
    /** если в пайп не передано значение - вернем пустую строку */
    if (value === undefined) {

      return '';

    } else {

      /** проверяем наличие результата в кэше. если в кэше есть результат - сразу возвращаем его */
      const cachedResult = this.getFromMemory(value);

      if (cachedResult != undefined) {

        return cachedResult;
      } else {

        /** Если значение передано, проверяем наличие для него перевода целиком */
        const result = translations[value];

        if (result !== undefined) {

          /** Если удалось сразу найти перевод для всей строки целиком, возвращаем найденный результат, предварительно сохранив его в кэш */
          this.saveToMemory(value, result);
          return result;

        } else {
          /** Если для всей строки целиком перевод не найден, пытаемся перевести строку по частям.
           * Строка разбивается на части по символам пробела и запятой, поэтому если
           * в строке нет ни пробелов ни запятых - сделать перевод по частям не пытаемся и возвращаем исходную строку.
           * Если же в строке есть пробел или запятая - разбиваем строку на части по этим сиволам и пытаемся перевести каждую часть по отдельности.
           * Итоговая строка */

          if (value.match(/,\s/)) {

            let result = value;
            const valueArray = value.split(/,\s/);

            for (let i = 0; i < valueArray.length; i += 1) {
              const valuePart = valueArray[i];
              result = result.replace(valuePart, translations[valuePart] ?? valuePart);
            };

            this.saveToMemory(value, result);
            return result;

          } else {

            this.saveToMemory(value, value ?? '');
            return value ?? '';

          };
        };
      };
    };
  }

  private memory = new Map<string, string>([]);

  getFromMemory(key: string) {
    return this.memory.get(key);
  }

  saveToMemory(key: string, value: string) {
    this.memory.set(key, value);
  }
}
