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

export type FilterFormValueType = Record<string, string | number | undefined | null>;

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
    orderBy: ColumnType<T> | '',
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
    };

    console.log(this);

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

  addFilter(name: keyof FilterFormValueType) {

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
        this.filterForm.addControl(name, makeForm<FilterFormValueType[keyof FilterFormValueType]>(this._trigger.value.filter[name] || null));
      };

    };
  }

  delFilter(name: keyof FilterFormValueType) {
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
              key.endsWith('From') ? 'yyyy-MM-ddT00:00:00' : 'yyyy-MM-ddT23:59:59',
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

  get availableFilters(): Array<{
    key: string;
    translateName: string | undefined
  }> {
    return isValue(this.filterOptions) && isValue(this.filterForm) ?
      Object.keys(this.filterOptions.options).filter(
        key => !this.getOption(key)?.hidden && !this.usedFilters.some(used => used.includes(key))
      ).map(
        key => ({ key, translateName: this.filterOptions?.options[key].translateName })
      ) :
      [];
  }

}