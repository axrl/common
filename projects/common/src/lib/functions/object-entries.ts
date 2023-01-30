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


type PermutationKeys<T> = [T] extends [never] ?
  [] :
  [T] extends [infer U, ... T[]] ?
  U extends undefined ?
  [...PermutationKeys<Exclude<T, U>>] :
  Partial<[U, ...PermutationKeys<Exclude<T, U>>]> :
  [];

type Permutation<T extends {}> = PermutationKeys<keyof T>;

interface Test {
  a: string;
  b: string;
  c: string;
}

const t: Permutation<Test> = ['c'];
