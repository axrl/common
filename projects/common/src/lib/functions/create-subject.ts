import { BehaviorSubject } from "rxjs"


export function createSubject<T>(initValue: T): BehaviorSubject<T>;
export function createSubject<T>(initValue: null): BehaviorSubject<T | null>;
export function createSubject<T>(initValue: T | null): BehaviorSubject<T> | BehaviorSubject<T | null> {
  return initValue === null ? new BehaviorSubject<T | null>(initValue) : new BehaviorSubject<T>(initValue);
}