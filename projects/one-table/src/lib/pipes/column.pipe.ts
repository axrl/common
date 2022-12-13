import { Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import type { ColumnType } from '../models';

@Pipe({
  name: 'helperColumn',
})
export class ColumnPipe<T extends {}> implements PipeTransform {

  transform(value: T, columnData: ColumnType<T>) {
    const column = typeof columnData === 'string' ? columnData : columnData.column;
    const columnArray = (
      column.includes('Icon-') ? column.replace('Icon-', '') : column
    ).split('.');
    switch (columnArray.length) {
      case 2:
        return value?.[
          <keyof T>columnArray[0]
        ]?.[
          <keyof T[keyof T]>columnArray[1]
        ];
      case 3:
        return value?.[
          <keyof T>columnArray[0]
        ]?.[
          <keyof T[keyof T]>columnArray[1]
        ]?.[
          <keyof T[keyof T][keyof T[keyof T]]>columnArray[2]
        ];
      default: return value?.[
        <keyof T>columnArray[0]
      ];
    }
  }

}
