import {isValue} from '../is-value';

export type ObjectEntry<T extends {}> = {
    [K in keyof T & string]: [K, T[K]];
}[keyof T & string];

/**
 * Типизированная версия стандартного метода Object.entries
 * @param source любой объект
 * @returns массив пар ключ-значение в source
 */
export function objectEntries<T extends {}>(source: T): Array<ObjectEntry<T>> {
    if (isValue(source) && source instanceof Object) {
        return <Array<ObjectEntry<T>>>Object.entries(source);
    } else {
        throw new Error('source - не объект и не массив.');
    }
}
