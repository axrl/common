import { Injectable, InjectionToken, Inject } from '@angular/core';
import { shareReplay } from 'rxjs';
import { ApiService } from './work-with-http/api.service';


/**
 * InjectionToken со строкой URL, по которому расположен файл со словарем переводов.
 * По умолчанию - 'assets/translations/ru.json';
 */
export const TRANSLATIONS_JSON_URL = new InjectionToken('TRANSLATIONS_JSON_URL', {
  providedIn: 'root',
  factory: () => 'assets/translations/ru.json'
});

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  constructor(
    private api: ApiService,
    @Inject(TRANSLATIONS_JSON_URL) private translationsJsonUrl: string
  ) { }

  translations$ = this.api.getData<Record<string, string>>(this.translationsJsonUrl).pipe(
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
