import {Observable} from 'rxjs';
import {isValue} from './is-value';
import {objectKeys} from './object-keys';

/**
 * Функция для сравнения двух переменных.
 * Осуществляет "глубокое" сравнение для непримитивных типов по значениям их свойств, а не по ссылке на объект.
 * @param a @param b - сравниваемые объекты.
 *
 * @returns true, если объекты идентичны и false, если объекты различаются.
 */
export function isEqualItems<T>(a: T, b: T): boolean {
    if (!isValue(a) || !isValue(b)) {
        return (a === undefined && b === undefined) || (a === null && b === null);
    } else {
        if (Array.isArray(a)) {
            if (Array.isArray(b)) {
                return (
                    a.length === b.length &&
                    a.every((aItem, index) => isEqualItems(aItem, b[index]))
                );
            } else {
                return false;
            }
        } else {
            if (a instanceof Observable) {
                if (b instanceof Observable) {
                    return a == b;
                } else {
                    return false;
                }
            } else {
                if (typeof a == 'object') {
                    if (typeof b == 'object') {
                        const keysA = objectKeys(a);
                        const keysB = objectKeys(b);
                        return (
                            keysA.length === keysB.length &&
                            keysA.every(key => isEqualItems(a[key], b[key]))
                        );
                    } else {
                        return false;
                    }
                } else {
                    return a === b;
                }
            }
        }
    }
}
