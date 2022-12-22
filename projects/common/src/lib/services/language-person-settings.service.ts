import { Inject, inject, Injectable, InjectionToken, EventEmitter } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import type { Observable } from 'rxjs';
import { isValue } from '../functions';
import { TRANSLATIONS_CONFIG } from '../di-tokens';
import type { TranslationConfig } from '../di-tokens';
import { TranslationsService } from './translations.service';

export interface LanguagePersonSettings {
  lang: string
}

/**
 * InjectionToken со стартовым значением для потока с настройками пользователя.
 * По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.
 * 
 * Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение 
 * будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.
 */
export const LANGUAGE_PERSON_SETTINGS_START_VALUE = new InjectionToken<LanguagePersonSettings | null>('LANGUAGE_PERSON_SETTINGS_START_VALUE', {
  providedIn: 'root',
  factory: () => {
    const storageKey = `${window.location.origin}:common:user-settings`;
    const storageValue = window.localStorage.getItem(storageKey);
    const translationsConfig: TranslationConfig = inject(TRANSLATIONS_CONFIG);
    const defaultSettings: LanguagePersonSettings = {
      lang: translationsConfig.defaultLanguage ?? 'ru'
    };

    if (isValue(storageValue)) {
      try {
        return JSON.parse(storageValue);
      } catch (error) {
        console.log(error);
        localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
        return defaultSettings;
      }
    } else {
      localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
  }
});

@Injectable()
export class LanguagePersonSettingsService<Settings extends LanguagePersonSettings = LanguagePersonSettings> {

  constructor(
    private translationsService: TranslationsService,
    @Inject(LANGUAGE_PERSON_SETTINGS_START_VALUE) private defaultPersonSettingsValue: Settings | null
  ) { }

  readonly storageKey = `${window.location.origin}:common:user-settings`;

  readonly _languagePersonSettings$: BehaviorSubject<Settings | null> = new BehaviorSubject<Settings | null>(this.defaultPersonSettingsValue);

  languagePersonSettings$: Observable<Settings | null> = this._languagePersonSettings$.asObservable();

  languagePersonSettingsFiltered$: Observable<Settings> = this.languagePersonSettings$.pipe(
    filter(
      (s): s is Settings => isValue(s)
    )
  );

  private _settingsChanges = new EventEmitter<Settings>();

  /** Поток с данными об обновлениях в настроках. */
  settingsChanges = this._settingsChanges.asObservable();

  updatePersonSettings(newSettings: Settings, emitEvent: boolean = true) {
    localStorage.setItem(this.storageKey, JSON.stringify(newSettings));
    const oldSettings = this._languagePersonSettings$.value;

    if (isValue(oldSettings) && oldSettings.lang !== newSettings.lang) {
      this.translationsService.changeCurrentLanguage(newSettings.lang);
    };

    this._languagePersonSettings$.next(newSettings);
    if (emitEvent) {
      this._settingsChanges.emit(newSettings);
    };
  }

}
