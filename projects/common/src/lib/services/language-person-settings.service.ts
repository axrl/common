import {EventEmitter, Inject, Injectable, InjectionToken, inject} from '@angular/core';
import type {Observable} from 'rxjs';
import {BehaviorSubject, filter, firstValueFrom} from 'rxjs';
import type {TranslationConfig} from '../di-tokens';
import {TRANSLATIONS_CONFIG} from '../di-tokens';
import {isValue} from '../functions';
import {TranslationsService} from './translations.service';

export interface LanguagePersonSettings {
    lang: string;
}

/**
 * InjectionToken со стартовым значением для потока с настройками пользователя.
 * По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.
 *
 * Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение
 * будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.
 */
export const LANGUAGE_PERSON_SETTINGS_START_VALUE =
    new InjectionToken<LanguagePersonSettings | null>('LANGUAGE_PERSON_SETTINGS_START_VALUE', {
        providedIn: 'root',
        factory: (): LanguagePersonSettings => {
            const storageKey = `${window.location.origin}:common:user-settings`;
            const storageValue = window.localStorage.getItem(storageKey);
            const translationsConfig: TranslationConfig = inject(TRANSLATIONS_CONFIG);
            const defaultSettings: LanguagePersonSettings = {
                lang: translationsConfig.defaultLanguage ?? 'ru',
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
        },
    });

@Injectable()
export class LanguagePersonSettingsService<
    Settings extends LanguagePersonSettings = LanguagePersonSettings,
> {
    private _settingsChanges = new EventEmitter<Settings>();

    /** Поток с данными об обновлениях в настроках. */
    readonly settingsChanges = this._settingsChanges.asObservable();
    readonly storageKey = `${window.location.origin}:common:user-settings`;

    readonly _languagePersonSettings$: BehaviorSubject<Settings | null> =
        new BehaviorSubject<Settings | null>(this.defaultPersonSettingsValue);

    readonly languagePersonSettings$: Observable<Settings | null> =
        this._languagePersonSettings$.asObservable();

    readonly languagePersonSettingsFiltered$: Observable<Settings> =
        this.languagePersonSettings$.pipe(filter((s): s is Settings => isValue(s)));

    constructor(
        private translationsService: TranslationsService,
        @Inject(LANGUAGE_PERSON_SETTINGS_START_VALUE)
        private defaultPersonSettingsValue: Settings | null,
    ) {}

    async updatePersonSettings(newSettings: Settings, emitEvent: boolean = true): Promise<void> {
        localStorage.setItem(this.storageKey, JSON.stringify(newSettings));
        const oldSettings = await firstValueFrom(this._languagePersonSettings$);

        if (isValue(oldSettings) && oldSettings.lang !== newSettings.lang) {
            this.translationsService.changeCurrentLanguage(newSettings.lang);
        }

        this._languagePersonSettings$.next(newSettings);
        if (emitEvent) {
            this._settingsChanges.emit(newSettings);
        }
    }
}
