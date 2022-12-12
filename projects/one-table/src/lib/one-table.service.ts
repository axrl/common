import { Inject, InjectionToken, Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, distinctUntilKeyChanged, filter, map } from 'rxjs';
import type { Observable } from 'rxjs';
import { OneTableData, TableFilterOptions } from './models';
import type { ActionButton, BaseListRequest, ColumnsType, ColumnType, ColumnName, CountAndRows, TableFilterUpdateFn, TableFilterOptionsData } from './models';
import { isValue } from '@axrl/common';

export interface BasePersonSettings<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  paginatorDefaultSize: number;
  uiLayouts: Record<string, {
    columns: ColumnsType<T>;
    req?: Q;
  }>;
}

/**
 * InjectionToken со стартовым значением для потока с настройками пользователя.
 * По умолчанию - использются данные, хранящиеся в localStorage, при их отсутствии - значение по умолчанию.
 * 
 * Если в приложении определена собственная логика хранения пользовательских настроек и стартовое значение 
 * будет передаваться в сервис извне - рекомендуется определить токен, используя в качестве стартового значения - null.
 */
export const PERSON_SETTINGS_START_VALUE = new InjectionToken<BasePersonSettings<{}, BaseListRequest> | null>('PERSON_SETTINGS_START_VALUE', {
  providedIn: 'root',
  factory: () => {
    const storageValue = window.localStorage.getItem('one-table:user-settings');
    const defaultSettings: BasePersonSettings<{}, BaseListRequest> = {
      paginatorDefaultSize: 10,
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

@Injectable({
  providedIn: 'root'
})
export class OneTableService {

  constructor(
    @Inject(PERSON_SETTINGS_START_VALUE) private defaultPersonSettingsValue: BasePersonSettings<{}, BaseListRequest> | null
  ) { }

  private memory = new Map<string | number | Date, string>([]);

  getFromMemory(key: string) {
    return this.memory.get(key);
  }

  saveToMemory(key: string, value: string) {
    this.memory.set(key, value);
  }

  private _basePersonSettings$: BehaviorSubject<
    BasePersonSettings<{}, BaseListRequest> | null
  > = new BehaviorSubject<BasePersonSettings<{}, BaseListRequest> | null>(this.defaultPersonSettingsValue);

  basePersonSettings$: Observable<
    BasePersonSettings<{}, BaseListRequest> | null
  > = this._basePersonSettings$.asObservable();

  basePersonSettingsFiltered$: Observable<
    BasePersonSettings<{}, BaseListRequest>
  > = this.basePersonSettings$.pipe(
    filter(
      (s): s is BasePersonSettings<{}, BaseListRequest> => isValue(s)
    )
  );

  /** Поток с данными об обновлениях настроек. */
  settingsChanges = new EventEmitter<BasePersonSettings<{}, BaseListRequest>>();

  updatePersonSettings<T extends {}, Q extends BaseListRequest>(newSettings: BasePersonSettings<T, Q>, emitEvent: boolean = true) {
    localStorage.setItem('one-table:user-settings', JSON.stringify(newSettings));
    this._basePersonSettings$.next(<BasePersonSettings<{}, BaseListRequest>>newSettings);
    if (emitEvent) {
      this.settingsChanges.emit(<BasePersonSettings<{}, BaseListRequest>>newSettings);
    };
  }

  updateUiLayoutFn<T extends {}, Q extends BaseListRequest = BaseListRequest>(
    componentName: string,
    newComponentLayout: BasePersonSettings<T, Q>['uiLayouts'][keyof BasePersonSettings<T, Q>['uiLayouts']]
  ) {
    const settings = <BasePersonSettings<T, Q>>this._basePersonSettings$.value;
    if (settings) {
      const layout = settings.uiLayouts ? settings.uiLayouts : {};
      layout[componentName] = newComponentLayout;
      settings.uiLayouts = layout;
      this.updatePersonSettings(<BasePersonSettings<{}, BaseListRequest>>settings);
    };
  }

  makeOneTableData<T extends {}, Q extends BaseListRequest = BaseListRequest>(config: {
    defaultColumns: ColumnsType<T>,
    sourceFn: (req: Q) => Observable<CountAndRows<T>>,
    componentName: string,
    filter: any,
    orderBy: ColumnType<T>,
    actions?: ActionButton<T>[],
    additionParams?: Partial<Omit<Q, keyof BaseListRequest>>,
    filterOptions?: TableFilterOptionsData<string | string[] | number>,
    updateFilterFn?: TableFilterUpdateFn<Q>,
    exportXlsxFileNameGenerationFn?: (req?: Q) => string,
    extendedRowPredicate?: (row: T) => boolean;
    orderDirection?: 'asc' | 'desc';
    shortColumns?: ColumnsType<T>;
    isInnerTable?: boolean,
    columnsForXlsxExport?: 'all' | ColumnsType<T>,
    columnsForCopy?: ColumnName<T>[]
  }): Observable<OneTableData<T, Q>> {
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
          filter: res.uiLayouts[config.componentName]?.req?.filter ?? config.filter ?? config.filter,
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
            [... (uiLayouts[componentName].columns ?? []).filter(
              userColumnName => !!defaultColumns.find(
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