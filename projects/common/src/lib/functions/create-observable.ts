import { of } from 'rxjs';
import type { Observable } from 'rxjs';

export function createObservable<T>(initValue: T): Observable<T> {
  return of(initValue);
};
