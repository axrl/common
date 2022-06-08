import { UntypedFormGroup, UntypedFormArray, UntypedFormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
interface ExtendedControlOptions extends AbstractControlOptions {
    disabled?: boolean;
}
export declare function makeForm<T, R extends (T extends Array<any> ? UntypedFormArray : T extends string | number | boolean | symbol | null | undefined ? UntypedFormControl : UntypedFormGroup)>(source: T, keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>, asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>): R;
export declare function liftValidationErrors(control: AbstractControl): ValidationErrors | null;
export {};
