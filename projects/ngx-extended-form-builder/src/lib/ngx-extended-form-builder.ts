import { UntypedFormGroup, UntypedFormArray, UntypedFormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
import { Observable } from "rxjs";

interface ExtendedControlOptions extends AbstractControlOptions {
  disabled?: boolean,
};

function getValidatorsOrNull<T extends ValidatorFn[] | AsyncValidatorFn[] | ExtendedControlOptions | null>(
  key: string, keysValidator?: Map<string, T>, addLift: boolean = false
): T | undefined | null {
  const result = keysValidator && keysValidator.has(key) ? keysValidator.get(key) : null;
  if (addLift) {
    if (result && Array.isArray(result)) {
      (<ValidatorFn[]>result).push(<ValidatorFn>liftErrors);
      return <T>result;
    } else {
      return result ? result : <T>[liftErrors]
    }
  } else {
    return result;
  };
}

function makeFormGroup(
  source: any,
  internalKey: string,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>
): UntypedFormGroup {
  return source instanceof UntypedFormGroup ? source : Object.entries(source).reduce(
    (accumulator: UntypedFormGroup, entry: [string, unknown]) => {
      const key = entry[0];
      const value = entry[1];
      if (!(value instanceof Observable)) {
        accumulator.addControl(
          key,
          !!value && value instanceof UntypedFormControl || value instanceof UntypedFormGroup || value instanceof UntypedFormArray ?
            value :
            makeForm(
              value,
              makeNewMainFormValidatorsMap(key, keysValidator),
              makeNewMainFormValidatorsMap(key, asyncKeysValidator),
            )
        );
      };
      return accumulator;
    }, new UntypedFormGroup({},
      getValidatorsOrNull(internalKey, keysValidator, true),
      getValidatorsOrNull(internalKey, asyncKeysValidator, false)
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
        ).map(
          ([entryKey, entryValue]) => [entryKey.startsWith(`${key}.`) ? entryKey.replace(`${key}.`, '') : entryKey, entryValue]
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
        ).filter(filterPredicate).map<[string, T]>(
          ([entryKey, entryValue]) => [entryKey.startsWith(`${key}.`) ? entryKey.replace(`${key}.`, '') : entryKey, entryValue]
        )
      ]);
    };
  };
}

export function makeForm<T,
  R extends (T extends Array<any> ? UntypedFormArray : T extends string | number | boolean | symbol | null | undefined ? UntypedFormControl : UntypedFormGroup
  )>(
    source: T,
    keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
    asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
): R {
  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array ?
      new UntypedFormArray(
        source.map(
          item => {
            const itemForm = makeForm(
              item,
              makeNewMainFormValidatorsMap('mainFormValidatorsItems', keysValidator),
              makeNewMainFormValidatorsMap('mainFormValidatorsItems', asyncKeysValidator)
            );
            return itemForm;
          }),
        getValidatorsOrNull('mainFormValidators', keysValidator, true),
        getValidatorsOrNull('mainFormValidators', asyncKeysValidator, false)
      ) :
      makeFormGroup(source, 'mainFormValidators', keysValidator, asyncKeysValidator) :
    new UntypedFormControl({
      disabled: keysValidator?.has('mainFormValidators') && 'disabled' in (keysValidator.get('mainFormValidators')!) ?
        (<ExtendedControlOptions>keysValidator.get('mainFormValidators')).disabled :
        false,
      value: !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
    },
      getValidatorsOrNull('mainFormValidators', keysValidator, false),
      getValidatorsOrNull('mainFormValidators', asyncKeysValidator, false)
    );
  return <R>form;
};

function liftErrors(control: AbstractControl): ValidationErrors | null {
  if (control instanceof UntypedFormControl) {
    return null;
  } else {
    const allControls = control instanceof UntypedFormGroup ?
      Object.values(control.controls) :
      control instanceof UntypedFormArray ?
        control.controls :
        [];
    const invalidControls = allControls.filter(control => control.status === 'INVALID');
    return invalidControls.length === 0 ? null : invalidControls.reduce(
      (accumulator, current) => {
        if (current.errors) {
          addValidationErrors(current.errors, accumulator);
        };
        return accumulator;
      }, <ValidationErrors>{}
    );
  }
}

export function liftValidationErrors(control: AbstractControl): ValidationErrors | null {
  const allControls = control instanceof UntypedFormGroup ?
    Object.values(control.controls) :
    control instanceof UntypedFormArray ?
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