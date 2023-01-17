import { Injectable } from '@angular/core';
import { distinctUntilKeyChanged, map } from 'rxjs';
import type { Observable } from 'rxjs';
import { AllItemsOneTableDataSource, BasePersonSettings, OneTableData, TableFilterOptions } from '../models';
import type { MakeOneTableConfig, MakeOneTableConfigWithoutApiPagination, BaseListRequest, ColumnsType } from '../models';
import { isValue, LanguagePersonSettingsService } from '@axrl/common';

export interface IconColumnData {
  icon: string;
  tooltip: string;
  color: string;
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

  /**
   * Создание OneTableData для данных, получаемых запросами API, поддерживающими пагинацию на стороне сервера.
   */
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
          filter: res.uiLayouts?.[config.componentName]?.req?.filter ?? config.filter,
          defaultFilter: config.filter,
          orderBy: config.orderBy,
          actions: config.actions,
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

  /**
   * Создание OneTableData для данных, получаемых запросами API, не поддерживающими пагинацию на стороне сервера 
   * т.е. в ситуациях, когда все данные загружаются в 1 запросе.
   */
  makeOneTableDataWithouApiPagination<T extends {}>(config: MakeOneTableConfigWithoutApiPagination<T>) {
    const instance = new AllItemsOneTableDataSource(config.data);
    return this.makeOneTableData<T, BaseListRequest>({
      sourceFn: req => instance.getRequestedData(req),
      ...config
    });
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
