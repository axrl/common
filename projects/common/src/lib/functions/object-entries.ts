import { isValue } from "./is-value"

/**
 * Типизированная версия стандартного метода Object.entries
 * @param source любой объект
 * @returns массив пар ключ-значение в source
 */
export function objectEntries<T extends {}>(source: T) {
  if (isValue(source) && source instanceof Object) {

    return <{ [K in keyof T]: [K, T[K]] }[keyof T][]>Object.entries(source);

  } else {

    throw 'source - не объект и не массив.'
  }
}