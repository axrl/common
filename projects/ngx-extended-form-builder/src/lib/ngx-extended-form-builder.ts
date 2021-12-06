import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
import { Observable } from "rxjs";

interface ExtendedControlOptions extends AbstractControlOptions {
  disabled?: boolean,
};

function getValidatorsOrNull(key: string, keysValidator?: Map<string, AsyncValidatorFn[] | null>, internal?: boolean): AsyncValidatorFn[] | null
function getValidatorsOrNull(key: string, keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>, internal?: boolean): ValidatorFn[] | ExtendedControlOptions | null
function getValidatorsOrNull(key: string, keysValidator?: Map<string, ValidatorFn[] | AsyncValidatorFn[] | ExtendedControlOptions | null>, internal: boolean = false): ValidatorFn[] | ExtendedControlOptions | AsyncValidatorFn[] | null | undefined {
  return keysValidator?.has(key) && !internal ?
    keysValidator.get(key) :
    null
}

function makeFormGroup(
  source: any,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
  internal: boolean = false
): FormGroup {
  return source instanceof FormGroup ? source : Object.entries(source).reduce(
    (accumulator: FormGroup, entry: [string, unknown]) => {
      const key = entry[0];
      const value = entry[1];
      if (!(value instanceof Observable)) {
        accumulator.addControl(
          key,
          !!value && typeof value == 'object' && !(value instanceof Date) ?
            value instanceof FormControl || value instanceof FormGroup || value instanceof FormArray ?
              value :
              makeForm(value, keysValidator, asyncKeysValidator, true) :
            new FormControl(
              {
                disabled: keysValidator?.has(key) && 'disabled' in keysValidator.get(key)! ? (<ExtendedControlOptions>keysValidator.get(key)).disabled : false,
                value: !!value && typeof value == 'string' && (value.includes('0001-01-01') || value.includes('1970-01-01')) ? null : value
              },
              getValidatorsOrNull(key, keysValidator),
              getValidatorsOrNull(key, asyncKeysValidator)
            )
        );
      };
      return accumulator;
    }, new FormGroup({},
      getValidatorsOrNull('mainFormValidators', keysValidator, internal),
      getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)
    )
  );
}

export function makeForm<T extends unknown, R extends (T extends Array<any> ? FormArray : T extends string | number | boolean | symbol ? FormControl : FormGroup)>(
  source: T,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
  internal: boolean = false
): R {
  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array ?
      new FormArray(
        source.map(
          item => {
            const itemForm = makeForm(item, keysValidator, asyncKeysValidator, true);
            return itemForm;
          }),
        getValidatorsOrNull('mainFormValidators', keysValidator, internal),
        getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)
      ) :
      makeFormGroup(source, keysValidator, asyncKeysValidator, internal) :
    new FormControl({
      disabled: keysValidator?.has('mainFormValidators') && 'disabled' in (keysValidator.get('mainFormValidators')!) ?
        (<ExtendedControlOptions>keysValidator.get('mainFormValidators')).disabled :
        false,
      value: source
    },
      getValidatorsOrNull('mainFormValidators', keysValidator, internal),
      getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)
    );
  return <R>form;
};

export function liftValidationErrors(control: AbstractControl): ValidationErrors | null {
  const allControls = control instanceof FormGroup ?
    Object.values(control.controls) :
    control instanceof FormArray ?
      control.controls :
      [];
  const invalidControls = allControls.filter(control => control.status === 'INVALID');
  const errors: ValidationErrors = invalidControls.length === 0 ? {} : invalidControls.reduce(
    (accumulator, current) => {
      if (current.errors) {
        addValidationErrors(current.errors, accumulator);

      };
      const innerErrors = liftValidationErrors(current);
      if (innerErrors) {
        addValidationErrors(innerErrors, accumulator);
      };
      return accumulator;
    }, <ValidationErrors>{}
  );
  return Object.values(errors).length === 0 ? null : errors;
};

function addValidationErrors(additionErrors: ValidationErrors, currentErrors: ValidationErrors) {
  Object.entries(additionErrors).forEach(
    entry => currentErrors[entry[0]] = entry[1]
  );
}