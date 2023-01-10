import { inject, InjectionToken } from '@angular/core';
import { isValue, TRANSLATIONS_CONFIG } from '@axrl/common';
import type { LanguagePersonSettings, TranslationConfig } from '@axrl/common';
import { ColumnsType } from './columns-type';
import { BaseListRequest } from './all-items-data-source';

export interface BasePersonSettings extends LanguagePersonSettings {
  paginatorDefaultSize: number;
  uiLayouts: Record<string, {
    columns: ColumnsType<any>;
    req?: BaseListRequest;
  }> | null;
}

/**
 * InjectionToken со стартовым значением для потока с настройками пользователя.
 * По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.
 * 
 * Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение 
 * будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.
 */
export const PERSON_SETTINGS_START_VALUE = new InjectionToken<BasePersonSettings | null>('PERSON_SETTINGS_START_VALUE', {
  providedIn: 'root',
  factory: () => {
    const storageValue = window.localStorage.getItem('one-table:user-settings');
    const translationsConfig: TranslationConfig = inject(TRANSLATIONS_CONFIG);

    const defaultSettings: BasePersonSettings = {
      paginatorDefaultSize: 10,
      lang: translationsConfig.defaultLanguage ?? 'ru',
      uiLayouts: {}
    };
    if (isValue(storageValue)) {
      try {
        return JSON.parse(storageValue);
      } catch (error) {
        console.log(error);
        localStorage.setItem('one-table:user-settings', JSON.stringify(defaultSettings));
        return defaultSettings;
      }
    } else {
      localStorage.setItem('one-table:user-settings', JSON.stringify(defaultSettings));
      return defaultSettings;
    }
  }
});