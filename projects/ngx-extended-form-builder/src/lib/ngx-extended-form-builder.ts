import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
import { Observable } from "rxjs";

interface ExtendedControlOptions extends AbstractControlOptions {
  disabled?: boolean,
};

//function getValidatorsOrNull(key: string, keysValidator?: Map<string, AsyncValidatorFn[] | null>, internal?: boolean): AsyncValidatorFn[] | null
//function getValidatorsOrNull(key: string, keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>, internal?: boolean): ValidatorFn[] | ExtendedControlOptions | null
function getValidatorsOrNull<T extends ValidatorFn[] | AsyncValidatorFn[] | ExtendedControlOptions | null>(
  key: string, keysValidator?: Map<string, T>
): T | undefined | null {
  return keysValidator && keysValidator.has(key) ? keysValidator.get(key) : null
}

function makeFormGroup(
  source: any,
  internalKey: string,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>
): FormGroup {
  return source instanceof FormGroup ? source : Object.entries(source).reduce(
    (accumulator: FormGroup, entry: [string, unknown]) => {
      const key = entry[0];
      const value = entry[1];
      if (!(value instanceof Observable)) {
        accumulator.addControl(
          key,
          !!value && value instanceof FormControl || value instanceof FormGroup || value instanceof FormArray ?
            value :
            makeForm(
              value,
              makeNewMainFormValidatorsMap(key, keysValidator),
              makeNewMainFormValidatorsMap(key, asyncKeysValidator),
            )
        );
      };
      return accumulator;
    }, new FormGroup({},
      getValidatorsOrNull(internalKey, keysValidator),
      getValidatorsOrNull(internalKey, asyncKeysValidator)
    )
  );
}

function makeNewMainFormValidatorsMap<T extends ValidatorFn[] | AsyncValidatorFn[] | ExtendedControlOptions | null>(
  key: string, oldMap?: Map<string, T>,
): Map<string, T> | undefined {
  if (!oldMap || key === 'mainFormValidators' || key === 'mainFormValidatorsItems') {
    return oldMap;
  } else {
    if (!oldMap.has(key) && !oldMap.has(`${key}Items`)) {
      return new Map<string, T>(
        Array.from(
          oldMap.entries()
        ).filter(
          item => item[0] !== 'mainFormValidators' && item[0] !== 'mainFormValidatorsItems'
        )
      );
    } else {
      const filterPredicate = oldMap.has('mainFormValidators') ?
        oldMap.has('mainFormValidatorsItems') ?
          (item: [string, T]) => item[0] !== key && item[0] !== 'mainFormValidators' && item[0] !== 'mainFormValidatorsItems' :
          (item: [string, T]) => item[0] !== key && item[0] !== 'mainFormValidators' :
        oldMap.has('mainFormValidatorsItems') ?
          (item: [string, T]) => item[0] !== key && item[0] !== 'mainFormValidatorsItems' :
          (item: [string, T]) => item[0] !== key;
      const newMainValidatorsArray: [string, T][] = oldMap.has(key) ?
        oldMap.has(`${key}Items`) ?
          [
            ['mainFormValidators', oldMap.get(key)!],
            ['mainFormValidatorsItems', oldMap.get(`${key}Items`)!]
          ] :
          [
            ['mainFormValidators', oldMap.get(key)!],
          ] :
        oldMap.has(`${key}Items`) ?
          [
            ['mainFormValidatorsItems', oldMap.get(`${key}Items`)!]
          ] :
          [];
      return new Map<string, T>([
        ...newMainValidatorsArray,
        ...Array.from(
          oldMap.entries()
        ).filter(filterPredicate)
      ]);
    };
  };
}

export function makeForm<T extends unknown, R extends (T extends Array<any> ? FormArray : T extends string | number | boolean | symbol ? FormControl : FormGroup)>(
  source: T,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
): R {
  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array ?
      new FormArray(
        source.map(
          item => {
            const itemForm = makeForm(
              item,
              makeNewMainFormValidatorsMap('mainFormValidatorsItems', keysValidator),
              makeNewMainFormValidatorsMap('mainFormValidatorsItems', asyncKeysValidator)
            );
            return itemForm;
          }),
        getValidatorsOrNull('mainFormValidators', keysValidator),
        getValidatorsOrNull('mainFormValidators', asyncKeysValidator)
      ) :
      makeFormGroup(source, 'mainFormValidators', keysValidator, asyncKeysValidator) :
    new FormControl({
      disabled: keysValidator?.has('mainFormValidators') && 'disabled' in (keysValidator.get('mainFormValidators')!) ?
        (<ExtendedControlOptions>keysValidator.get('mainFormValidators')).disabled :
        false,
      value: !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
    },
      getValidatorsOrNull('mainFormValidators', keysValidator),
      getValidatorsOrNull('mainFormValidators', asyncKeysValidator)
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