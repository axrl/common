/**
 * Типизированная версия стандартного метода Object.keys
 * @param source любой объект
 * @returns массив ключей в source
 */
export function objectKeys<T extends {}>(source: T): Array<keyof T> {
  return <Array<keyof T>>Object.keys(source)
}