/** Хелпер-утилита типа - для всех полей типа разрешает установить в качестве значения null */
export type MakeNullable<T> = {
  [K in keyof T]: T[K] extends
    | string
    | number
    | boolean
    | bigint
    | null
    | undefined
    ? T[K] | null
    : MakeNullable<T[K]>;
};
