import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AsyncValidatorFn, AbstractControl } from "@angular/forms";
export declare type FormGroupType<T> = FormGroup<{
    [K in keyof T]: ScanFormType<T[K]>;
}>;
export declare type ScanFormType<T> = T extends FormGroup<infer U> ? FormGroup<U> : T extends FormArray<infer U> ? FormArray<U> : T extends FormControl<infer U> ? FormControl<U> : T extends Array<infer U> ? FormArray<ScanFormType<U>> : T extends null | undefined ? never : T extends (string | number | boolean | symbol | null | undefined) ? FormControl<T> : FormGroupType<T>;
export declare function makeForm<T>(source: T, keysValidator?: Map<string, ValidatorFn[] | null>, asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>): ScanFormType<T>;
export declare function liftValidationErrors(control: AbstractControl): ValidationErrors | null;
