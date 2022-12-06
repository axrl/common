import type { AbstractControl } from '@angular/forms';
import type { Observable } from 'rxjs';

type PropertyesKeys<T> = T extends (undefined | null | number | boolean | symbol | Observable<unknown> | AbstractControl) ?
  never :
  T extends string ?
  T :
  T extends Array<infer U> ?
  PropertyesKeys<U> :
  {
    [K in keyof T]-?: K extends string ?
    T[K] extends (string | number | boolean | symbol | undefined | null) ?
    K :
    T[K] extends (Observable<unknown> | AbstractControl) ?
    never :
    `${K}.${PropertyesKeys<T[K] extends Array<infer U> ? U : T[K]>}` | K :
    never;
  }[keyof T];

export interface ColumnConfig<T> {
  column: ColumnName<T>;
  translateName: string;
}

export type ColumnName<T> = `Icon-${PropertyesKeys<T>}` | PropertyesKeys<T> | 'select' | 'action'
export type ColumnType<T> = ColumnName<T> | ColumnConfig<T>;
export type ColumnsType<T> = Array<ColumnType<T>>;