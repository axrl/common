import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
export declare type ControlsNames<T> = 'mainFormValidators' | 'mainFormValidatorsItems' | PropertyesKeys<T>;
declare type PropertyesKeys<T> = T extends undefined | null | number | boolean | symbol ? never : T extends string ? T : {
    [K in keyof T]-?: K extends string ? T[K] extends (string | number | boolean | symbol) ? K : T[K] extends undefined | null ? K : T[K] extends Observable<any> ? never : T[K] extends Array<infer U> ? K | `${K}Items` | `${K}.${PropertyesKeys<U>}` : K | `${K}.${PropertyesKeys<T[K]>}` : never;
}[keyof T];
export declare type FormGroupType<T> = FormGroup<{
    [K in (keyof T & string)]: ScanFormType<T[K]>;
}>;
export declare type ScanFormType<T> = T extends FormGroup<infer U> ? FormGroup<U> : T extends FormArray<infer U> ? FormArray<U> : T extends FormControl<infer U> ? FormControl<U> : T extends Array<infer U> ? FormArray<ScanFormType<U>> : T extends null | undefined ? never : T extends (string | number | boolean | symbol | null | undefined) ? FormControl<T | null> : FormGroupType<T>;
export declare function makeForm<T>(source: T, keysValidator?: Map<ControlsNames<T>, ValidatorFn[] | null>, asyncKeysValidator?: Map<ControlsNames<T>, AsyncValidatorFn[] | null>): ScanFormType<T>;
export declare function liftValidationErrors(control: AbstractControl): ValidationErrors | null;
export {};
