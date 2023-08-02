import {isValue} from './is-value';

/**
 * Типизированная версия стандартного метода Object.keys
 * @param source любой объект
 * @returns массив ключей в source
 */
export function objectKeys<T extends {}>(source: T): Array<keyof T> {
    if (isValue(source) && source instanceof Object) {
        return <Array<keyof T>>Object.keys(source);
    } else {
        throw new Error('source - не объект и не массив.');
    }
}
