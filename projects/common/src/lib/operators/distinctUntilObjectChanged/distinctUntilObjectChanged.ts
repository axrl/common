import {MonoTypeOperatorFunction, distinctUntilChanged} from 'rxjs';
import {isEqualItems} from '../../functions';

/**
 * Returns a result Observable that emits all values pushed by the source observable if they
 * are distinct in comparison to the last value the result observable emitted.
 * Works also for objects and arrays, not just primitive types.
 */
export function distinctUntilObjectChanged<T>(): MonoTypeOperatorFunction<T> {
    return distinctUntilChanged<T>((prev, curr) => isEqualItems(prev, curr));
}
