import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { deepClone, isValue, objectKeys } from '@axrl/common';

export class BaseListRequest {
  Next: number;
  Offset: number;
  filter: any;
  constructor(Next: number, Offset: number, filter?: any, public orderBy?: string | undefined, public orderDirection?: 'asc' | 'desc' | '' | undefined) {
    [this.Next, this.Offset, this.filter] = [Next, Offset, filter];
  }
}

export interface CountAndRows<T> {
  Count: number;
  Rows: T[];
}

export class AllItemsOneTableDataSource<T extends object, Q extends BaseListRequest = BaseListRequest> {
  constructor(public data: T[]) { }

  previousTriggerValue?: Q;

  getRequestedData(req: Q): Observable<CountAndRows<T>> {
    if (
      !isValue(this.previousTriggerValue) || (
        isValue(this.previousTriggerValue) && (
          this.previousTriggerValue.orderDirection !== req?.orderDirection || this.previousTriggerValue.orderBy !== req.orderBy
        )
      )
    ) {
      const dateRegExp = /(^(\d{4})[-\\\/\.](\d\d)[-\\\/\.](\d\d))|(^(\d\d)[-\\\/\.](\d\d)[-\\\/\.](\d{4}))/;
      const direction = req.orderDirection;
      this.data.sort(
        (a: T, b: T) => {
          const valueA = a[<keyof T>req.orderBy];
          const valueB = b[<keyof T>req.orderBy];
          switch (true) {
            case typeof valueA == 'number': return direction == 'asc' ?
              +valueA - +valueB :
              +valueB - +valueA;
            case dateRegExp.test(String(valueA)):
              return direction == 'asc' ?
                +new Date(String(valueA)) - +new Date(String(valueB)) :
                +new Date(String(valueB)) - +new Date(String(valueA));
            case typeof valueA == 'boolean': return valueA == valueB ?
              0 :
              direction == 'asc' && valueA > valueB || direction == 'desc' && valueA < valueB ?
                1 :
                -1;
            default: return direction == 'asc' ?
              String(valueA).localeCompare(String(valueB)) :
              String(valueB).localeCompare(String(valueA));
          };
        });
    };
    const value = !isValue(req.filter) || (typeof req.filter === 'object' && Object.keys(req.filter).length == 0) ? this.data.slice() : this.data.filter(
      el => {
        if (typeof req.filter !== 'string' || req.filter[0] == '{') {
          const filter: Record<keyof T, any> = req.filter[0] == '{' ? JSON.parse(req.filter) : req.filter;
          return objectKeys(filter).some(
            key => {
              const replacedKey = <keyof T>(<string>key).replace(/From|To/, '');
              switch (true) {
                case !isValue(el[replacedKey]): return false;
                case (String(key)).includes('From'): return Date.parse(String(el[replacedKey])) > Date.parse(filter[key]);
                case (String(key)).includes('To'): return Date.parse(String(el[replacedKey])) < Date.parse(filter[key]);
                case filter[key].includes('not_includes:'):
                  const find = String(filter[key]).replace('not_includes:', '');
                  return !String(el[key]).includes(find);
                default: return String(el[key]).includes(filter[key]);
              }
            }
          );
        } else {
          return objectKeys(el).some(key => String(el[key]).includes(req.filter));
        }
      });
    this.previousTriggerValue = deepClone(req);
    return of({
      Count: value.length,
      Rows: value.splice(req.Offset, req.Next)
    });
  }
}