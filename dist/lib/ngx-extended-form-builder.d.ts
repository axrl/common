import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn } from "@angular/forms";
export declare function makeForm<T>(source: T, keysValidator?: Map<string, ValidatorFn[] | null>, asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>): T extends Array<infer U> ? FormArray<U extends Array<any> ? FormArray<AbstractControl<U, U>> : U extends string | number | boolean | symbol | null | undefined ? FormControl<U | null> : FormGroup<{
    [KU in keyof U]: AbstractControl<U[KU], U[KU]>;
}>> : T extends string | number | boolean | symbol | null | undefined ? FormControl<T | null> : FormGroup<{
    [K in keyof T]: AbstractControl<T[K], T[K]>;
}>;
export declare function liftValidationErrors(control: AbstractControl): ValidationErrors | null;
