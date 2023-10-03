import {Observable} from 'rxjs';
import {isValue} from '../is-value';
import {objectKeys} from '../object-keys';

type ArrayElement<T> = T extends Array<infer U> ? U : never;

/**
 * @function deepClone()
 * Функция для "глубокого" рекурсивного клонирования любых объектов
 * @param source - объект, который требуется скопировать
 * @returns полная копия объекта объекта, полученного в качестве аргумента
 */
export function deepClone<T extends unknown>(source: T): T {
    return Array.isArray(source)
        ? <T>source.map((sourceItem: ArrayElement<T>) => deepClone<ArrayElement<T>>(sourceItem))
        : isValue(source) && !(source instanceof Observable) && typeof source === 'object'
        ? objectKeys(source).reduce(
              (accumulator, current) => {
                  accumulator[current] = deepClone(source[current]);

                  return accumulator;
              },
              <T>{},
          )
        : source;
}
