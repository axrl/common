import type {Observable} from 'rxjs';
import {filter} from 'rxjs';
import {isValue} from './is-value';

export function getFilteredData<T>(nonFilteredData: Observable<T | null>): Observable<T> {
    return nonFilteredData.pipe(filter((data): data is T => isValue(data)));
}
