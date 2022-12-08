import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilKeyChanged, map } from 'rxjs';
import type { Observable } from 'rxjs';
import { OneTableData, TableFilterOptions } from './models';
import type { ActionButton, BaseListRequest, ColumnsType, ColumnType, ColumnName, CountAndRows, TableFilterUpdateFn, TableFilterOptionsData } from './models';
import { isValue } from '@axrl/common';

export interface BasePersonSettings<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  paginatorDefaultSize: number;
  uiLayouts: {
    [componentName: string]: {
      columns: ColumnsType<T>;
      req?: Q;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class OneTableService {

  constructor() { }

  private memory = new Map<string | number | Date, string>([]);

  getFromMemory(key: string) {
    return this.memory.get(key);
  }

  saveToMemory(key: string, value: string) {
    this.memory.set(key, value);
  }

  private get storageBasePersonSettings(): BasePersonSettings<{}, BaseListRequest> {
    const storageValue = window.localStorage.getItem('one-table:user-settings');
    const defaultSettings = {
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


  private _basePersonSettings$: BehaviorSubject<BasePersonSettings<{}, BaseListRequest>> = new BehaviorSubject<BasePersonSettings<{}, BaseListRequest>>(this.storageBasePersonSettings);
  basePersonSettings$: Observable<BasePersonSettings<{}, BaseListRequest>> = this._basePersonSettings$.asObservable();

  updatePersonSettings<S extends BasePersonSettings<{}, BaseListRequest>>(newSettings: S) {
    this._basePersonSettings$.next(newSettings);
  }

  updateUiLayoutFn<T extends {}, Q extends BaseListRequest = BaseListRequest>(
    componentName: string,
    newComponentLayout: BasePersonSettings<T, Q>['uiLayouts'][keyof BasePersonSettings<T, Q>['uiLayouts']]
  ) {
    const settings: BasePersonSettings<T, Q> = <BasePersonSettings<T, Q>>this._basePersonSettings$.value;
    if (settings) {
      const layout = settings.uiLayouts ? settings.uiLayouts : {};
      layout[componentName] = newComponentLayout;
      settings.uiLayouts = layout;
      localStorage.setItem('one-table:user-settings', JSON.stringify(settings));
      this._basePersonSettings$.next(<BasePersonSettings<{}, BaseListRequest>>settings);
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
    return this.basePersonSettings$.pipe(
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
    return this.basePersonSettings$.pipe(
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
