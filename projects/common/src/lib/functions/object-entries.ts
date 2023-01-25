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


type Permutation<T, U = T> =
  [T] extends [never] ?
  [] :
  U extends infer C
  ?
  [C, ...Permutation<Exclude<T, C>>] :
  [];

interface BaseListRequest {
  Next: number;
  Offset: number;
  filter: any;
  orderBy?: string | undefined;
  orderDirection?: 'asc' | 'desc' | '' | undefined;
}

const a: Permutation<{ [K in keyof BaseListRequest]: K }[keyof BaseListRequest]> = []



