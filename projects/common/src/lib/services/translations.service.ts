import { Location } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { shareReplay, distinctUntilChanged, switchMap, map, filter } from 'rxjs';
import { TRANSLATIONS_CONFIG } from '../di-tokens';
import type { TranslationConfig } from '../di-tokens';
import { createSubject, isValue } from '../functions';
import { ApiService } from './work-with-http/api.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  constructor(
    private api: ApiService,
    @Inject(TRANSLATIONS_CONFIG) private translationsConfig: TranslationConfig,
  ) { }

  private _currentLanguage = createSubject<string | null>(this.translationsConfig.defaultLanguage ?? 'ru');

  get languagesList() {
    return this.translationsConfig.languages;
  }

  currentLanguage$ = this._currentLanguage.asObservable().pipe(
    filter((lang): lang is string => isValue(lang)),
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
