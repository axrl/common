import type { Observable } from 'rxjs';
import { isValue } from '@axrl/common';
import { BehaviorSubject, of, catchError, map, shareReplay, switchMap } from 'rxjs';
import type { ColumnsType, ColumnType, CountAndRows, ActionButton, ColumnName } from './models';
import { BaseListRequest } from './models';
import type { ValidatorFn } from '@angular/forms';
import type { FormGroupType } from '@axrl/ngx-extended-form-builder';
import { makeForm } from '@axrl/ngx-extended-form-builder';
import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

export interface TableFilterOption<T> {
  translateName: string;
  canShow?: (values: any) => boolean;
  hidden?: boolean;
  translateKey?: (item: T) => string;
  dateControl?: boolean;
  arrayParam?: boolean;
  required?: boolean;
  values?: T[];
}

export type TableFilterOptionsData<T> = {
  [key: string]: TableFilterOption<T>;
};

export type TableFilterUpdateFn<Q extends BaseListRequest> = (req: Q, values: any) => void;

export class TableFilterOptions<Q extends BaseListRequest> {
  constructor(
    public options: TableFilterOptionsData<string | number | string[]>,
    public filterUpdate: TableFilterUpdateFn<Q> = (req, values) => req.filter = values
  ) { };
};

type FilterFormValueType = Record<string, string | number | undefined | null>;
type FormKey = keyof FilterFormValueType & string;

interface AvailableFilterItem {
  key: string;
  translateName: string | undefined
}

export class OneTableData<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  showedColumns$: Observable<ColumnsType<T>>;
  showedColumnsNames$: Observable<ColumnName<T>[]>;
  dataSource: Observable<CountAndRows<T>>;
  dataSourceRows: Observable<T[]>;
  dataSourceCount: Observable<number>;
  _trigger: BehaviorSubject<Q>;
  trigger: Observable<Q>;
  filterForm: FormGroupType<FilterFormValueType> | undefined;
  withExtendedRow: () => boolean;
  id = uuidv4();
  shortColumnsNames?: ColumnsType<T>;
  defaultColumns: ColumnsType<T>;
  sourceFn: (req: Q) => Observable<CountAndRows<T>>;
  componentName: string;
  action?: ActionButton<T>[];
  filterOptions?: TableFilterOptions<Q>;
  exportXlsxFileNameGenerationFn: (req?: Q) => string;
  extendedRowPredicate?: (row: T) => boolean;
  shortColumns?: ColumnsType<T>;
  isInnerTable: boolean;
  columnsForXlsxExport: 'all' | 'default' | ColumnsType<T>;
  columnsForCopy: ColumnName<T>[];

  constructor(config: {
    paginatorDefaultSize: number,
    defaultColumns: ColumnsType<T>,
    showedColumns$: Observable<ColumnsType<T>>,
    sourceFn: (req: Q) => Observable<CountAndRows<T>>,
    componentName: string,
    filter?: any,
    orderBy: ColumnType<T>,
    action?: ActionButton<T>[],
    additionParams?: Partial<Omit<Q, keyof BaseListRequest>>,
    filterOptions?: TableFilterOptions<Q>,
    exportXlsxFileNameGenerationFn?: (req?: Q) => string,
    extendedRowPredicate?: (row: T) => boolean,
    orderDirection?: 'asc' | 'desc',
    shortColumns?: ColumnsType<T>,
    isInnerTable?: boolean,
    columnsForXlsxExport?: 'all' | 'default' | ColumnsType<T>,
    columnsForCopy?: ColumnName<T>[]
  }) {
    this.defaultColumns = config.defaultColumns;
    this.sourceFn = config.sourceFn;
    this.action = config.action;
    this.componentName = config.componentName;
    const defaultExportXlsxFileNameGenerationFn = () => 'exportedData';
    this.exportXlsxFileNameGenerationFn = config.exportXlsxFileNameGenerationFn ?? defaultExportXlsxFileNameGenerationFn;
    this.extendedRowPredicate = config.extendedRowPredicate;
    this.isInnerTable = config.isInnerTable ?? false;
    this.columnsForXlsxExport = config.columnsForXlsxExport ?? 'all';
    this.columnsForCopy = config.columnsForCopy ?? []
    this.withExtendedRow = isValue(config.extendedRowPredicate) ? () => true : () => false;
    this.showedColumns$ = config.showedColumns$;
    this.showedColumnsNames$ = this.showedColumns$.pipe(
      map(
        columns => columns.map(
          columnData => typeof columnData === 'string' ? columnData : columnData.column
        )
      )
    );
    this.shortColumns = config.shortColumns;
    if (isValue(this.shortColumns)) {
      this.shortColumnsNames = this.shortColumns.map(
        columnData => typeof columnData === 'string' ? columnData : columnData.column
      );
    };
    this._trigger = new BehaviorSubject<Q>(
      <Q>{
        ... new BaseListRequest(
          config.paginatorDefaultSize,
          0,
          config.filter ?? '',
          typeof config.orderBy === 'string' ? config.orderBy : config.orderBy.column,
          config.orderDirection ?? 'desc'
        ),
        ... (config.additionParams ?? {})
      }
    );
    this.trigger = this._trigger.asObservable();
    this.dataSource = this._trigger.pipe(
      switchMap(config.sourceFn),
      catchError(
        () => of({
          Count: 0,
          Rows: []
        })
      ),
      shareReplay(1)
    );
    this.dataSourceCount = this.dataSource.pipe(
      map(data => data.Count),
    );
    this.dataSourceRows = this.dataSource.pipe(
      map(data => data.Rows),
    );
    this.filterOptions = config.filterOptions;
    if (isValue(this.filterOptions)) {
      const startValue = this._trigger.value;
      const optionsKeys: (keyof TableFilterOptions<Q>['options'])[] = Object.keys(this.filterOptions.options);
      const oneKey: keyof Q | keyof Q['filter'] = optionsKeys[0];
      const triggerFilter = optionsKeys.length == 1 ? {
        [oneKey]: oneKey in startValue ? startValue[oneKey] : startValue.filter
      } : { ...startValue.filter };

      Object.keys(triggerFilter).forEach(
        key => {
          if (this.getOption(key)?.arrayParam) {
            triggerFilter[key] = triggerFilter[key].join(',');
          };
          if (this.isDateControl(key)) {
            triggerFilter[key] = formatDate(triggerFilter[key], 'yyyy-MM-dd', 'en');
          };
        }
      );

      const optionsValidators = optionsKeys.filter(
        optionKey => this.filterOptions?.options[optionKey].required
      ).map(
        optionKey => [
          String(optionKey), {
            validators: <ValidatorFn[]>[
              control => isValue(control.value) ? null : {
                [optionKey]: 'field_is_required'
              }
            ]
          }
        ] as const
      );

      this.filterForm = makeForm<FilterFormValueType>(triggerFilter, new Map(optionsValidators));
    }

  };

  getOption(name: keyof TableFilterOptions<Q>['options']): TableFilterOption<string | number | string[]> | undefined {
    return this.filterOptions?.options[String(name).replace(/From|To/, '')];
  }

  isDateControl(controlName: string): boolean {
    return isValue(this.getOption(controlName)?.dateControl);
  }

  isSelectable(controlName: string): boolean {
    return isValue(this.getOption(controlName)?.values);
  }

  addFilter(name: FormKey) {

    if (isValue(this.filterOptions) && isValue(this.filterForm)) {
      if (this.isDateControl(name)) {
        ['From', 'To'].forEach(
          partKey => this.filterForm?.addControl(
            name + partKey,
            makeForm(
              formatDate(
                (partKey == 'From' ? Date.now() - 2629743000 : Date.now())
                , 'yyyy-MM-dd', 'en'
              )
            )
          )
        );
      } else {
        this.filterForm.addControl(name, makeForm<FilterFormValueType[FormKey]>(this._trigger.value.filter[name] || null));
      };

    };
  }

  delFilter(name: FormKey) {
    if (isValue(this.filterOptions)) {
      const normalizedName = String(name).replace(/From|To/, '');
      if (this.isDateControl(String(name))) {
        ['From', 'To'].forEach(partkey => {
          if (this.filterForm?.contains(name)) {
            const formKey = (normalizedName + partkey);
            this.filterForm.removeControl(<never>formKey);
          }
        });
      } else {
        if (this.filterForm?.contains(name)) {
          this.filterForm.removeControl(<never>name);
        }
      };

      this.submit();
    };
  }

  submit() {
    if (isValue(this.filterOptions) && isValue(this.filterForm) && this.filterForm.valid) {
      const val = this._trigger.value;
      this.filterOptions.filterUpdate(val, { ...this.filterForm.getRawValue() });
      val.Offset = 0;
      Object.keys(val.filter).forEach(
        key => {
          if (this.getOption(key)?.arrayParam) {
            val.filter[key] = val.filter[key].toString().includes(',') ? val.filter[key].split(',') : [val.filter[key]];
          };
          if (this.isDateControl(key)) {
            val.filter[key] = formatDate(
              val.filter[key],
              key.endsWith('From') ? 'yyyy-MM-dd 00:00:00' : 'yyyy-MM-dd 23:59:59',
              'en'
            );
          };
        });
      this._trigger.next(val);
    };
  }

  get usedFilters(): string[] {
    return isValue(this.filterOptions) && isValue(this.filterForm) ?
      Object.keys(this.filterForm.controls).filter(el => !this.getOption(el)?.hidden) : [];
  }

  get showedUsedFilters(): string[] {
    return isValue(this.filterOptions) && isValue(this.filterForm) ? this.usedFilters.filter(
      filterName => {
        const canShow = this.getOption(filterName)?.canShow;
        return canShow ? canShow(this.filterForm!.getRawValue()) : true;
      }) : [];
  }

  get availableFilters(): AvailableFilterItem[] {
    return isValue(this.filterOptions) && isValue(this.filterForm) ?
      Object.keys(this.filterOptions.options).filter(
        key => !this.getOption(key)?.hidden && !this.usedFilters.some(used => used.includes(key))
      ).map(
        key => ({ key, translateName: this.filterOptions?.options[key].translateName })
      ) :
      [];
  }
}