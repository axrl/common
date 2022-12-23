import { from, of, delay, concatMap } from "rxjs";
import type { Observable } from "rxjs";

/**
 * @param values Значения, которые требуется испускать с задержкой
 * @param delayInMs Задержка между событиями
 * @returns Функция создает Obsewrvable-поток, который будет по очереди испускать значения массива values с задержкой delayInMs между каждым событием.
 */
export function delayedObservable<T>(values: T[], delayInMs: number): Observable<T> {
  return from(values).pipe(
    concatMap(
      value => of(value).pipe(
        delay(delayInMs)
      )
    )
  );
}