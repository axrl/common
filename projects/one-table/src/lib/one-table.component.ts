import { EventEmitter, Inject, InjectionToken, OnDestroy, Component, Input, Output, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import type { PageEvent } from '@angular/material/paginator';
import type { Sort } from '@angular/material/sort';
import type { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Clipboard } from '@angular/cdk/clipboard';
import { OneTableExpandedRowContentProjectDirective } from './directives';
import type { Observable } from 'rxjs';
import { map, switchMap, BehaviorSubject } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import type { BaseListRequest, OneTableData, ActionEvent, ColumnType, ActionButton, ColumnsType, ColumnConfig } from './models';
import { createObservable, ExcelService, SnackService, isValue, trackByFn } from '@axrl/common';
import { OneTableService } from './one-table.service';
import { ColumnPipe } from './pipes/column.pipe';

interface TableIconsDataFn {
  getIconName?: <T extends {}>(value: string, row: T, key?: ColumnType<T>) => string | null;
  getTooltip?: <T extends {}>(value: string, row: T, key?: ColumnType<T>) => string | null;
  getColor?: <T extends {}>(value: string, row: T, key?: ColumnType<T>) => string | null;
}

export const TABLE_ICON_DATA_FN = new InjectionToken<TableIconsDataFn>('TABLE_ICON_DATA_FN', {
  factory: () => ({
    getIconName: id => null,
    getTooltip: id => null,
    getColor: id => null
  })
});

interface IconColumnData {
  icon: string;
  tooltip: string;
  color: string;
}

type ExportXlsxEvent<T extends {}, Q extends BaseListRequest> = {
  mode: 'current' | 'all';
  inputData: OneTableData<T, Q>,
  req: Q;
  data: T[];
  count: number;
};

@Component({
  selector: 'one-table',
  templateUrl: './one-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({ height: '*', maxHeight: '*', minHeight: '*', opacity: 1, })),
      state('closed', style({ height: '0px', maxHeight: '0px', minHeight: '0px', opacity: 0, background: 'transparent' })),
      transition('open <=> closed', [
        animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
    ])
  ],
})
export class OneTableComponent<T extends {}, Q extends BaseListRequest> implements OnDestroy {
  constructor(
    @Inject(TABLE_ICON_DATA_FN) private tableIconsDataFn: TableIconsDataFn,
    private oneTableService: OneTableService,
    private excelService: ExcelService,
    private clipboard: Clipboard,
    private snack: SnackService,
  ) {

  };

  @Input() inputData$: Observable<OneTableData<T, Q>> | undefined;
  @Output() tableAction: EventEmitter<ActionEvent<T, Q>> = new EventEmitter<ActionEvent<T, Q>>();
  @ContentChild(OneTableExpandedRowContentProjectDirective) expandedRowContent: OneTableExpandedRowContentProjectDirective | undefined;
  private columnPipe: ColumnPipe<T> = new ColumnPipe();

  log(event: any) {
    console.log(event);
  }

  selectedItemIndex$ = new BehaviorSubject<number | null>(null);

  cleanSelected() {
    this.selectedItemIndex$.next(null);
  }

  getColumnName(columnData: ColumnType<T>) {
    return typeof columnData === 'string' ? columnData : columnData.column;
  }

  getTranslatedColumnName(columnData: ColumnType<T>) {
    return typeof columnData === 'string' ? columnData : columnData.translateName;
  }

  /** to do  = счписок колонок убрать из хардкода */
  isSortedColumn(column: ColumnType<T>): boolean {
    const columnName = this.getColumnName(column);
    return !columnName.includes('Icon-') && !columnName.includes('.') && ![
      'action', 'taskNumber', 'completeDt', 'comment', 'docType', 'signer', 'ismtStatus', 'ismtUpdated', 'gtinCount', 'quantity', 'targetName'
    ].includes(columnName);
  }

  trackByFn = trackByFn;

  getActualAction(row: T, allAction?: ActionButton<T>[]): ActionButton<T>[] {
    return allAction ? allAction.filter(act => act.canShow(row)) : [];
  }

  isAvailableAction(action: string, allAction?: ActionButton<T>[]) {
    return allAction?.find(el => el.action === action);
  }

  clickedAction(action: string, element: T, inputData: OneTableData<T, Q>): void {
    this.tableAction.emit({ action, element, inputData });
  }

  onSelect(index: number): void {
    if (this.selectedItemIndex$.value !== index) {
      this.selectedItemIndex$.next(index);
    };
    return;
  }

  onDblClick(index: number | null, dataElement: T, inputData: OneTableData<T, Q>): void {
    this.selectedItemIndex$.next(index);
    const availableActions = inputData.action?.filter(action => action.canShow(dataElement));
    if (
      availableActions && availableActions.length > 0 &&
      (inputData.defaultColumns.includes('action') || ['selectSingle', 'selectItem', 'showKmInfo'].includes(availableActions[0]?.action)) &&
      document.querySelector('mat-dialog-container') == null
    ) {
      this.tableAction.emit({
        action: availableActions[0].action,
        element: dataElement,
        inputData
      });
    };
    return;
  }

  pageEvent(event: PageEvent, trigger: BehaviorSubject<Q>) {
    this.cleanSelected();
    const req: Q = trigger.value;
    req.Next = event.pageSize;
    req.Offset = event.pageIndex * event.pageSize;
    trigger.next(req);
  }

  sortEvent(event: Sort, trigger: BehaviorSubject<Q>) {
    this.cleanSelected();
    const req: Q = trigger.value;
    req.Offset = 0;
    req.orderBy = event.active;
    req.orderDirection = event.direction;
    trigger.next(req);
  }

  getPageIndex(req: Q): number {
    return (req.Offset / req.Next) | 0;
  }

  filterFormSubmit(customEventData: any, inputData: OneTableData<T, Q>, showedColumns: ColumnsType<T>) {
    this.cleanSelected();
    this.tableAction.emit({
      action: 'filterFormSubmit', element: null, inputData, customEventData
    });

    this.oneTableService.updateUiLayoutFn(inputData.componentName, {
      columns: showedColumns, req: inputData._trigger.value
    });
  }

  getMainRowClass(inputData: OneTableData<T, Q>, row: T, index: number, currentSelected: number | null): string {

    return inputData.withExtendedRow() ?
      index === currentSelected ?
        'isDarkBackground no-bottom-border' :
        'no-bottom-border' :
      index === currentSelected ?
        'isDarkBackground' :
        '';
  }

  ngOnDestroy() {
    [
      this.selectedItemIndex$,
      this.tableAction,
      this.openTrigger,
      this._exportXlsxBus$
    ].forEach(
      subject => subject.complete()
    );
  }

  getIconData(id: string, row: T, column: ColumnType<T>): IconColumnData {
    const getIconName = (id: string): string => {
      const icon = this.tableIconsDataFn.getIconName ? this.tableIconsDataFn.getIconName(id, row, column) : null;
      if (isValue(icon)) {
        return icon;
      } else {
        return '';
      };
    };
    const getTooltip = (id: string): string => {
      const tooltip = this.tableIconsDataFn.getTooltip ? this.tableIconsDataFn.getTooltip(id, row, column) : null;
      if (isValue(tooltip)) {
        return tooltip;
      } else {
        return '';
      };
    };
    const getColor = (id: string): string => {
      const color = this.tableIconsDataFn.getColor ? this.tableIconsDataFn.getColor(id, row, column) : null;
      if (isValue(color)) {
        return color;
      } else {
        return '';
      };
    };
    return {
      icon: getIconName(id),
      tooltip: getTooltip(id),
      color: getColor(id)
    };
  }

  openTrigger = new BehaviorSubject<boolean>(true);

  getColumnsForRightView(columns: ColumnsType<T>): ColumnsType<T> {
    return columns.filter(column => !['action', 'select'].includes(this.getColumnName(column)));
  }

  getSelectedItem(dataSourceRows: Observable<T[]>) {
    return this.selectedItemIndex$.pipe(
      switchMap(
        indexOrNull => dataSourceRows.pipe(
          map(
            sourceRows => isValue(indexOrNull) ?
              sourceRows[indexOrNull] ?? null :
              null
          )
        )
      )
    );
  }

  exportXlsxModes = ['current', 'all'] as const;
  private _exportXlsxBus$ = new EventEmitter<ExportXlsxEvent<T, Q>>();
  /**
   * Перед тем, как выгружать данные в Excel-таблицу, их нужно предварительно трансформировать. 
   * Делается это по двум причинам :
   *  1. У объектов могут быть еще какие-то другие свои данные, помимо тех, которые выводятся в таблице.
   *  2. Настройка колонок в таблице подразумевают, что какие-то значения в объекте определены не с тем ключом, с каким отображаются.
   * Поэтому данные трансформируются из исходного интерфейса так, чтобы сервис экспорта в Excel 
   * смог сделать правильный перевод для всех экспортируемых данных (в т.ч. названия колонок-ключей в первой строке).
   * В настройках таблицы определен специальный дополнительный параметр `columnsForXlsxExport`, управляющий порядком трансформации данных.
   * Возможные значения:
   *  - all - экспортировать все данные, имеющиеся в объектах таблицы
   *  - default - экспортировать только те данные, которые могут отображаться в таблице (в т.ч. скрытые пользователем от отоборажения)
   *  - массив ColumnsType<T> - массив со списком колонок, которые нужно экспортировать.
   *   */
  exportXlsxBus$: Observable<void> = this._exportXlsxBus$.pipe(
    switchMap(
      event => {

        const columnsForXlsxExport = event.inputData.columnsForXlsxExport === 'default' ?
          event.inputData.defaultColumns :
          Array.isArray(event.inputData.columnsForXlsxExport) ?
            event.inputData.columnsForXlsxExport :
            'all' as const;
        const replacedColumns = event.inputData.defaultColumns.filter((column): column is ColumnConfig<T> => typeof column !== 'string');

        return event.mode === 'current' || event.data?.length === event.count ?
          createObservable({
            data: <T[]>event.data,
            replacedColumns,
            columnsForXlsxExport,
            fileName: event.inputData.exportXlsxFileNameGenerationFn(event.req)
          }) :
          event.inputData.sourceFn({
            ...event.req, Offset: 0, Next: event.count
          }).pipe(
            map(
              data => ({
                data: data.Rows,
                replacedColumns,
                columnsForXlsxExport,
                fileName: event.inputData.exportXlsxFileNameGenerationFn(event.req)
              })
            )
          );
      }),
    switchMap(
      preparationResult => {

        const data = preparationResult.data.map(
          dataItem => {
            return preparationResult.columnsForXlsxExport === 'all' ?
              Object.entries(dataItem).reduce<Record<string, unknown>>(
                (accumulator, [key, value]) => {
                  const findSettings = preparationResult.replacedColumns.find(columnData => columnData.column === key);
                  if (isValue(findSettings)) {
                    accumulator[findSettings.translateName] = value ?? '';
                  } else {
                    accumulator[key] = value ?? '';
                  };
                  return accumulator
                }, {}
              ) :
              preparationResult.columnsForXlsxExport.reduce<Record<string, unknown>>(
                (accumulator, current) => {
                  accumulator[this.getTranslatedColumnName(current)] = this.columnPipe.transform(dataItem, current);
                  return accumulator;
                }, {}
              )
          });

        return this.excelService.translateAndCreate(data, preparationResult.fileName)
      })
  );

  exportXlsx(
    mode: 'current' | 'all',
    inputData: OneTableData<T, Q>,
    req: Q,
    data: T[],
    count: number
  ) {
    this._exportXlsxBus$.emit({ req, inputData, data, mode, count });
  }

  isSelectedColumn(columnData: ColumnType<T>, showedColumns: ColumnsType<T>) {
    return isValue(
      showedColumns.find(
        showedColumn => this.getColumnName(columnData) === this.getColumnName(showedColumn)
      )
    );
  }

  showColumn(column: ColumnType<T>, inputData: OneTableData<T, Q>, showedColumns: ColumnsType<T>) {

    if (this.isSelectedColumn(column, showedColumns)) {
      showedColumns.splice(showedColumns.findIndex(el => this.getColumnName(el) === this.getColumnName(column)), 1);
    } else {
      showedColumns.push(column);
    };


    this.oneTableService.updateUiLayoutFn(inputData.componentName, {
      columns: showedColumns, req: inputData._trigger.value
    });
  }

  drop(event: CdkDragDrop<string[]>, inputData: OneTableData<T, Q>, showedColumns: ColumnsType<T>) {
    moveItemInArray(showedColumns, event.previousIndex, event.currentIndex);
    this.oneTableService.updateUiLayoutFn(inputData.componentName, {
      columns: showedColumns, req: inputData._trigger.value
    });
  }

  resetColumnLayout(inputData: OneTableData<T, Q>) {
    this.oneTableService.updateUiLayoutFn(inputData.componentName, {
      columns: inputData.defaultColumns, req: inputData._trigger.value
    });
  }

  copy(text: string | number): void {
    this.clipboard.copy(String(text));
    this.snack.showText('Скопировано!');
    return;
  }

};
