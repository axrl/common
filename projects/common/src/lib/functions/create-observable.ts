import type {Observable} from 'rxjs';
import {of} from 'rxjs';

export function createObservable<T>(initValue: T): Observable<T> {
    return of(initValue);
}
