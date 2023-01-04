import { inject, InjectionToken, Injectable } from '@angular/core';
import { distinctUntilKeyChanged, map } from 'rxjs';
import type { Observable } from 'rxjs';
import { OneTableData, TableFilterOptions } from '../models';
import type { ActionButton, BaseListRequest, ColumnsType, ColumnType, ColumnName, CountAndRows, TableFilterUpdateFn, TableFilterOptionsData } from '../models';
import { isValue, TRANSLATIONS_CONFIG, LanguagePersonSettingsService } from '@axrl/common';
import type { LanguagePersonSettings, TranslationConfig } from '@axrl/common';

export interface IconColumnData {
  icon: string;
  tooltip: string;
  color: string;
}

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

export interface MakeOneTableConfig<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  /**
   * Массив с конфигурациями всех колонок, которые могут отображаться в таблице либо быть спрятанными пользователем.
   */
  defaultColumns: ColumnsType<T>,

  /** Функция, которая будет вызываться для загрузки очередной порции данных в таблицу. */
  sourceFn: (req: Q) => Observable<CountAndRows<T>>,

  /** Название компонента, содержащего таблицу. Должно быть уникальным для каждой отдельной таблицйы, поскольку именно с этим 
   * ключом настройки той или иной таблицы будут сохраняться в пользовательских настройках.
   */
  componentName: string,

  /**
   * Объект с параметрами, которые будут использоваться для задания начальных значений в форме фильтрации таблицы и, как следствие,
   * передаваться в качестве значения поля filter в объекте BaseListRequest при вызове sourceFn
   */
  filter: any,

  /** Колонка, по которой изначально будут отсортированы данные таблицы */
  orderBy: ColumnType<T>,

  /**
   * Массив action-ов, символизирующих действия, доступные для той или иной строки таблицы.
   * Используется только в случае, если в списке defaultColumns для таблицы была определена колонка "action"
   */
  actions?: ActionButton<T>[],

  /**Дополнительные параметры, которые могут или должны присутствовать в параметрах запроса очередной порции данных таблицы, отсутсвующие в типе BaseListRequest,
   * но объявленные в типе Q. Не используется, если Q = BaseListRequest (т.е. практически никогда :) )
    */
  additionParams?: Partial<Omit<Q, keyof BaseListRequest>>,

  /**
   *Конфигурация для полей формы фильтрации данных в таблице. 
   */
  filterOptions?: TableFilterOptionsData<string | string[] | number>,

  /**
   * Функция, которая будет вызываться при каждой отправке данных формы фильтрации. Используется в случаях, если требуется дополнительное преобразование данных
   * фильтра перед тем, как выполнить запросить очередную порцию данных в sourceFn.
   * Первый параметр функции - объект BaseListRequest, который будет в дальнейшем передан в sourceFn.
   * Второй параметр - текущее значение формы с фильтрами.
   */
  updateFilterFn?: TableFilterUpdateFn<Q>,

  /** 
   * Функция, при помощи которой будет формироваться название для xlsx-файла с экспортируемыми данными таблицы.
   * Если ничего не задано - файл будет экспортироваться с названием по умолчанием.
   */
  exportXlsxFileNameGenerationFn?: (req?: Q) => string,

  /**
   * Функция, определяющая условие, при выполнении которого для каждой строки таблицы будет отображаться раскрывающаяся строка с дополнительной информацией.
   */
  extendedRowPredicate?: (row: T) => boolean;

  /**
   * Изначальное направление сортировки данных в таблице.
   */
  orderDirection?: 'asc' | 'desc';

  /**
   * Используется в случае, когда таблицу нужно вывести в частичном представлении -
   *  В левой части (50% доступного пространства) - будут отображаться только колонки из списка shortColumns.
   *  Справа - отдельный компонент, в котором вертикальным списком будут выведены данные для всех полей, объявленных в defaultColumns.
   * В верху этого компонента будут выведены кнопки всех доступных action-действий для данной строки (в случае, если такие действия были определены в массиве action)
   */
  shortColumns?: ColumnsType<T>;

  /**
   * Признак, является ли данная таблица вложенной внутрь другой таблицы (например, отображается в extendedRow).
   */
  isInnerTable?: boolean,

  /**
   * Используется в случае, если требуется ограничить количество данных, которые будут экспортироваться в xlsx.
   */
  columnsForXlsxExport?: 'all' | ColumnsType<T>,

  /**
   * Список колонок, внутри которых рядом с данными будет дополнительно выведена кнопка, позволящая скопировать значение ячейки таблицы.
   */
  columnsForCopy?: ColumnName<T>[]
}

@Injectable({
  providedIn: 'root',
})
export class OneTableService<Settings extends BasePersonSettings = BasePersonSettings> {

  constructor(
    private languagePersonSettingsService: LanguagePersonSettingsService<Settings>
  ) { }

  private memory = new Map<string, IconColumnData>([]);

  getFromMemory(key: string) {
    return this.memory.get(key);
  }

  saveToMemory(key: string, value: IconColumnData) {
    this.memory.set(key, value);
  }

  basePersonSettings$: Observable<Settings | null> = this.languagePersonSettingsService.languagePersonSettings$;

  basePersonSettingsFiltered$: Observable<Settings> = this.languagePersonSettingsService.languagePersonSettingsFiltered$;

  /** Поток с данными об обновлениях в настроках. */
  settingsChanges = this.languagePersonSettingsService.settingsChanges;

  updatePersonSettings(newSettings: Settings, emitEvent: boolean = true) {
    this.languagePersonSettingsService.updatePersonSettings(newSettings, emitEvent);
  }

  updateUiLayoutFn<T extends {}, Q extends BaseListRequest>(
    componentName: string,
    newComponentLayout: {
      columns: ColumnsType<T>;
      req?: Q;
    }
  ) {
    const settings = this.languagePersonSettingsService._languagePersonSettings$.value;
    if (settings) {
      const layout = settings.uiLayouts ? settings.uiLayouts : {};
      layout[componentName] = newComponentLayout;
      settings.uiLayouts = layout;
      this.updatePersonSettings(settings);
    };
  }

  makeOneTableData<T extends {}, Q extends BaseListRequest = BaseListRequest>(config: MakeOneTableConfig<T, Q>): Observable<OneTableData<T, Q>> {
    const filterOptions = config.filterOptions ? new TableFilterOptions<Q>(config.filterOptions, config.updateFilterFn) : undefined;
    return this.basePersonSettingsFiltered$.pipe(
      distinctUntilKeyChanged('paginatorDefaultSize'),
      map(
        res => new OneTableData<T, Q>({
          paginatorDefaultSize: res.paginatorDefaultSize,
          defaultColumns: config.defaultColumns,
          showedColumns$: this.getUserColumns(config.componentName, config.defaultColumns),
          sourceFn: config.sourceFn,
          componentName: config.componentName,
          filter: res.uiLayouts?.[config.componentName]?.req?.filter ?? config.filter ?? config.filter,
          orderBy: config.orderBy,
          action: config.actions,
          additionParams: config.additionParams,
          filterOptions,
          exportXlsxFileNameGenerationFn: config.exportXlsxFileNameGenerationFn,
          extendedRowPredicate: config.extendedRowPredicate,
          orderDirection: config.orderDirection,
          shortColumns: config.shortColumns,
          isInnerTable: config.isInnerTable,
          columnsForXlsxExport: config.columnsForXlsxExport,
          columnsForCopy: config.columnsForCopy
        })
      ),
    );
  }

  private getUserColumns<T extends {}>(
    componentName: string,
    defaultColumns: ColumnsType<T>
  ): Observable<ColumnsType<T>> {
    return this.basePersonSettingsFiltered$.pipe(
      map(
        settings => {
          const uiLayouts = settings.uiLayouts;
          return uiLayouts && uiLayouts[componentName] && isValue(uiLayouts[componentName].columns) ?
            [...  (<ColumnsType<T>>uiLayouts[componentName].columns ?? []).filter(
              (userColumnName) => !!defaultColumns.find(
                defaultColumn => typeof userColumnName === 'string' ?
                  typeof defaultColumn === 'string' ?
                    userColumnName === defaultColumn :
                    userColumnName === defaultColumn.column :
                  typeof defaultColumn === 'string' ?
                    userColumnName.column === defaultColumn :
                    userColumnName.column === defaultColumn.column
              )
            )] :
            [...defaultColumns];
        }
      )
    );
  }

}
