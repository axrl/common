import { FormGroup, FormArray, FormControl, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
interface ExtendedControlOptions extends AbstractControlOptions {
    disabled?: boolean;
}
export declare function makeForm<T extends FormGroup | FormArray | FormControl = FormGroup>(source: any, keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>, asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>, internal?: boolean): T;
export {};
