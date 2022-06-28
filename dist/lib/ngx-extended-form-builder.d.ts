import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AsyncValidatorFn, AbstractControl } from "@angular/forms";
declare type ScanFormType<T> = T extends FormGroup<infer U> ? ScanFormType<U> : T extends FormArray<infer U> ? ScanFormType<U> : T extends FormControl<infer U> ? ScanFormType<U> : T extends Array<infer U> ? FormArray<ScanFormType<U>> : T extends string | number | boolean | symbol | null | undefined ? FormControl<T | null> : FormGroup<{
    [K in keyof T]: ScanFormType<T[K]>;
}>;
export declare function makeForm<T>(source: T, keysValidator?: Map<string, ValidatorFn[] | null>, asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>): ScanFormType<T>;
export declare function liftValidationErrors(control: AbstractControl): ValidationErrors | null;
export {};
