import type { Observable } from 'rxjs';
import { deepClone, isValue, objectKeys } from '@axrl/common';
import { BehaviorSubject, of, catchError, map, shareReplay, switchMap } from 'rxjs';
import { BaseListRequest } from './all-items-data-source';
import type { CountAndRows } from './all-items-data-source';
import type { ColumnsType, ColumnType, ColumnName } from './columns-type';
import type { ActionButton } from './action-button';
import type { ValidatorFn } from '@angular/forms';
import type { FormGroupType } from '@axrl/ngx-extended-form-builder';
import { makeForm } from '@axrl/ngx-extended-form-builder';
import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

export interface ActionEvent<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  action: string;
  element: T;
  inputData: OneTableData<T, Q>;
}

export interface TableFilterBaseParams<T> {
  translateName: string;

  /** Признак обязательности. Для таких фильтров будет недоступна кнопка "убрать фильтр" */
  required?: boolean;

  /** Используется, чтобы фильтр не отображался в форме (в т.ч. в списке доступных фильтров) */
  hidden?: boolean;
  canShow?: (values: any) => boolean;

  /**
   * Функция, которая будет применяться для перевода:
   *  - значений, доступных в массиве values (для фильтра с выбором значения из списка)
   *  - названий полей, соответствующих началу и концу нужного периода времени (для фильтра по дате)
   */
  translateKey?: (item: T) => string;
}

export interface TableFilterDateControlParams<T> extends TableFilterBaseParams<T> {
  /** 
 * Признак, что фильтр используется для поля, содержащего дату.
 * Для такого фильтра будет создано два контрола - с префиксами From и To для выбора начальной и конечной даты периода фильтрации
 */
  dateControl: boolean;
}

export interface TableFilterSelectControlParams<T> extends TableFilterBaseParams<T> {
  /** Список значений, доступных для выбора */
  values: T[];

  /**
   * Признак, что в качестве значений в values используются сериализованные в строку массивы (с разделителем ',' - запятой).
   */
  arrayParam?: boolean;
};

export type TableFilterOption<T> = TableFilterBaseParams<T> | TableFilterDateControlParams<T> | TableFilterSelectControlParams<T>;

export type TableFilterOptionsData<T> = Record<string, TableFilterOption<T>>;

export type TableFilterUpdateFn<Q extends BaseListRequest> = (req: Q, values: any) => void;

export class TableFilterOptions<Q extends BaseListRequest> {
  constructor(
    public options: TableFilterOptionsData<string | string[] | number | number[]>,
    public filterUpdate: TableFilterUpdateFn<Q> = (req, values) => req.filter = values
  ) { };
};

export type FilterFormValueType<Q extends BaseListRequest> = Record<keyof TableFilterOptions<Q>['options'] & string, string | number | undefined | null>;

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
  filter: unknown,

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
  filterOptions?: TableFilterOptionsData<string | string[] | number | number[]>,

  /**
   * Функция, которая будет вызываться при каждой отправке данных формы фильтрации. Используется в случаях, если требуется дополнительное преобразование данных
   * фильтра перед тем, как выполнить запрос очередной порции данных в sourceFn.
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
};

export type MakeOneTableConfigWithoutApiPagination<
  T extends {}
> = Omit<MakeOneTableConfig<T, BaseListRequest>, 'sourceFn' | 'additionParams'> & {

  /**
   * Массив данных, которые требуется отобразить в таблице.
   */
  data: T[]
};

/**
 * Alias-тип для объекта конфигурации таблицы, передаваемый в качестве параметра в конструктор класса OneTableData.
 */
export type OneTableDataConfig<
  T extends {},
  Q extends BaseListRequest = BaseListRequest
> = Omit<MakeOneTableConfig<T, Q>, 'filterOptions' | 'updateFilterFn'> & {

  /**
   * Объект, содержащий параметры для формы с фильтрами и метод filterUpdate для дополнительных преобразований значения формы фильтрации перед 
   */
  filterOptions?: TableFilterOptions<Q>;

  /** Кол-во строк на странице в момент первого отображения страницы */
  paginatorDefaultSize: number;

  /** Observable со списком колонок, которые требуется отобразить в таблице на основании настроек пользователя. */
  showedColumns$: Observable<ColumnsType<T>>;

  /** Данные фильтра "по умолчанию" - исходные данные, а не полученные из настроек пользователя */
  defaultFilter: unknown
};

export class OneTableData<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  showedColumns$: Observable<ColumnsType<T>>;
  showedColumnsNames$: Observable<ColumnName<T>[]>;
  dataSource: Observable<CountAndRows<T>>;
  dataSourceRows: Observable<T[]>;
  dataSourceCount: Observable<number>;
  _trigger: BehaviorSubject<Q>;
  trigger: Observable<Q>;
  filterForm: FormGroupType<FilterFormValueType<Q>> | undefined;
  withExtendedRow: () => boolean;
  id = uuidv4();
  shortColumnsNames?: ColumnsType<T>;
  defaultColumns: ColumnsType<T>;
  sourceFn: (req: Q) => Observable<CountAndRows<T>>;
  componentName: string;
  actions?: ActionButton<T>[];
  filterOptions?: TableFilterOptions<Q>;
  exportXlsxFileNameGenerationFn: (req?: Q) => string;
  extendedRowPredicate?: (row: T) => boolean;
  shortColumns?: ColumnsType<T>;
  isInnerTable: boolean;
  columnsForXlsxExport: 'all' | 'default' | ColumnsType<T>;
  columnsForCopy: ColumnName<T>[];

  constructor(private readonly config: OneTableDataConfig<T, Q>) {

    this.defaultColumns = config.defaultColumns;
    this.sourceFn = config.sourceFn;
    this.actions = config.actions;
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
      this._createTriggerValue()
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
      this.setFilterForm(this._trigger.value)
    };

    console.log(this);

  };

  /**
   * Фабричный метод создания объекта с типом Q.
   * Необходим для установки исходного значения потока @this._trigger.
   * @returns Объект с типом Q
   */
  private _createTriggerValue(): Q {
    return deepClone(<Q>{
      ... new BaseListRequest(
        this.config.paginatorDefaultSize,
        0,
        this.config.filter ?? '',
        typeof this.config.orderBy === 'string' ? this.config.orderBy : this.config.orderBy.column,
        this.config.orderDirection ?? 'desc'
      ),
      ... this.config.additionParams
    });
  }

  getOption<K extends keyof FilterFormValueType<Q>>(name: K): TableFilterOptions<Q>['options'][K] | undefined {
    return this.filterOptions?.options[String(name).replace(/From|To/, '')];
  }

  private checkDateControlOption<OptionItemType extends string | number | string[] | number[]>(option?: TableFilterOption<OptionItemType>): option is TableFilterDateControlParams<OptionItemType> {
    return isValue(option) && 'dateControl' in option && isValue(option.dateControl) && option.dateControl
  }

  isSelectable<OptionItemType extends string | number | string[] | number[]>(option?: TableFilterOption<OptionItemType>): option is TableFilterSelectControlParams<OptionItemType> {
    return isValue(option) && 'values' in option && isValue(option.values);
  }

  isDateControl<K extends keyof FilterFormValueType<Q>>(controlName: K) {
    const option = this.getOption(controlName);
    return this.checkDateControlOption(option);
  }

  private setFilterForm(startValue: Q): void {
    const options = this.filterOptions?.options;

    if (isValue(options)) {
      const optionsKeys = objectKeys(options);
      const oneKey: keyof Q | keyof Q['filter'] = optionsKeys[0];
      const triggerFilter = optionsKeys.length == 1 ?
        {
          [oneKey]: oneKey in startValue ? startValue[oneKey] : startValue.filter
        } :
        deepClone(startValue.filter);

      objectKeys(triggerFilter).forEach(
        key => {
          const option = this.getOption(String(key));
          if (isValue(option) && 'arrayParam' in option && isValue(option.arrayParam)) {
            triggerFilter[key] = triggerFilter[key].join(',');
          } else {
            if (this.isDateControl(String(key))) {
              triggerFilter[key] = formatDate(triggerFilter[key], 'yyyy-MM-dd', 'en');
            };
          };
        }
      );

      const optionsValidators = optionsKeys.filter(
        optionKey => options[optionKey].required
      ).map(
        optionKey => [
          optionKey, {
            validators: <ValidatorFn[]>[
              control => isValue(control.value) ? null : {
                [optionKey]: 'field_is_required'
              }
            ]
          }
        ] as const
      );

      this.filterForm = makeForm<FilterFormValueType<Q>>(triggerFilter, new Map(optionsValidators));

    }

  }

  resetFilterFormToDefault(afterTriggerUpdateCb: (triggerValue: Q) => void): void {
    const currentTriggerValue = deepClone(this._trigger.value);
    currentTriggerValue.filter = this.config.defaultFilter;
    this.setFilterForm(currentTriggerValue);
    this.submit(currentTriggerValue, afterTriggerUpdateCb);
  }

  addFilter<K extends keyof FilterFormValueType<Q>>(name: K) {

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
        this.filterForm.addControl(name, makeForm<FilterFormValueType<Q>[K]>(this._trigger.value.filter[name] || null));
      };

    };
  }

  delFilter<K extends keyof FilterFormValueType<Q>>(name: K, afterTriggerUpdateCb: (triggerValue: Q) => void) {
    if (isValue(this.filterOptions)) {
      const normalizedName = name.replace(/From|To/, '');
      if (this.isDateControl(name)) {
        ['From', 'To'].forEach(partkey => {
          const formKey = (normalizedName + partkey);
          if (this.filterForm?.contains(formKey)) {
            this.filterForm.removeControl(<never>formKey);
          }
        });
      } else {
        if (this.filterForm?.contains(name)) {
          this.filterForm.removeControl(<never>name);
        }
      };

      this.submit(this._trigger.value, afterTriggerUpdateCb);
    };
  }

  submit(triggerValue: Q, afterTriggerUpdateCb: (triggerValue: Q) => void) {
    if (isValue(this.filterOptions) && isValue(this.filterForm) && this.filterForm.valid) {
      this.filterOptions.filterUpdate(triggerValue, deepClone(this.filterForm.getRawValue()));
      triggerValue.Offset = 0;
      objectKeys(triggerValue.filter).forEach(
        key => {
          const option = this.getOption(String(key));
          if (isValue(option) && 'arrayParam' in option && isValue(option.arrayParam)) {
            triggerValue.filter[key] = triggerValue.filter[key].toString().includes(',') ? triggerValue.filter[key].split(',') : [triggerValue.filter[key]];
          } else {
            if (this.isDateControl(String(key))) {
              triggerValue.filter[key] = formatDate(
                triggerValue.filter[key],
                String(key).endsWith('From') ? 'yyyy-MM-ddT00:00:00' : 'yyyy-MM-ddT23:59:59',
                'en'
              );
            };
          };
        });
      this._trigger.next(triggerValue);
      afterTriggerUpdateCb(triggerValue);
    };
  }

  get usedFilters(): Array<keyof FilterFormValueType<Q>> {
    return isValue(this.filterOptions) && isValue(this.filterForm) ?
      objectKeys(this.filterForm.controls).filter(el => !this.getOption(el)?.hidden) : [];
  }

  get showedUsedFilters(): Array<keyof FilterFormValueType<Q>> {
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
      objectKeys(this.filterOptions.options).filter(
        key => !this.getOption(key)?.hidden && !this.usedFilters.some(used => used.includes(key))
      ).map(
        key => ({ key, translateName: this.filterOptions?.options[key].translateName })
      ) :
      [];
  }

}