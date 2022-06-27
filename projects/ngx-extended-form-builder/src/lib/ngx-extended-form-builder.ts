import { FormGroup, FormArray, FormControl } from "@angular/forms";
import type { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

function getValidatorsOrNull<T extends ValidatorFn[] | AsyncValidatorFn[] | null>(
  key: string, keysValidator?: Map<string, T>, addLift: boolean = false
): T | undefined | null {
  const result = keysValidator && keysValidator.has(key) ? keysValidator.get(key) : null;
  if (addLift) {
    if (result && Array.isArray(result)) {
      (<ValidatorFn[]> result).push(<ValidatorFn> liftErrors);
      return <T> result;
    } else {
      return result ? result : <T>[ liftErrors ];
    }
  } else {
    return result;
  };
}

function makeFormGroup<T>(
  source: T,
  internalKey: string,
  keysValidator?: Map<string, ValidatorFn[] | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>
): FormGroup<{ [ K in keyof T ]: AbstractControl<T[ K ], T[ K ]>; }> {
  return source instanceof FormGroup ? source : Object.entries(source).reduce(
    (accumulator: FormGroup, entry: [ string, unknown ]) => {
      const key = entry[ 0 ];
      const value = entry[ 1 ];
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
      getValidatorsOrNull(internalKey, keysValidator, true),
      getValidatorsOrNull(internalKey, asyncKeysValidator, false)
    )
  );
}

function makeNewMainFormValidatorsMap<T extends ValidatorFn[] | AsyncValidatorFn[] | null>(
  key: string, oldMap?: Map<string, T>,
): Map<string, T> | undefined {
  if (!oldMap || key === 'mainFormValidators' || key === 'mainFormValidatorsItems') {
    return oldMap;
  } else {
    if (!oldMap.has(key) && !oldMap.has(`${ key }Items`)) {
      return new Map<string, T>(
        Array.from(
          oldMap.entries()
        ).filter(
          item => item[ 0 ] !== 'mainFormValidators' && item[ 0 ] !== 'mainFormValidatorsItems'
        ).map(
          ([ entryKey, entryValue ]) => [ entryKey.startsWith(`${ key }.`) ? entryKey.replace(`${ key }.`, '') : entryKey, entryValue ]
        )
      );
    } else {
      const filterPredicate = oldMap.has('mainFormValidators') ?
        oldMap.has('mainFormValidatorsItems') ?
          (item: [ string, T ]) => item[ 0 ] !== key && item[ 0 ] !== 'mainFormValidators' && item[ 0 ] !== 'mainFormValidatorsItems' :
          (item: [ string, T ]) => item[ 0 ] !== key && item[ 0 ] !== 'mainFormValidators' :
        oldMap.has('mainFormValidatorsItems') ?
          (item: [ string, T ]) => item[ 0 ] !== key && item[ 0 ] !== 'mainFormValidatorsItems' :
          (item: [ string, T ]) => item[ 0 ] !== key;
      const newMainValidatorsArray: [ string, T ][] = oldMap.has(key) ?
        oldMap.has(`${ key }Items`) ?
          [
            [ 'mainFormValidators', oldMap.get(key)! ],
            [ 'mainFormValidatorsItems', oldMap.get(`${ key }Items`)! ]
          ] :
          [
            [ 'mainFormValidators', oldMap.get(key)! ],
          ] :
        oldMap.has(`${ key }Items`) ?
          [
            [ 'mainFormValidatorsItems', oldMap.get(`${ key }Items`)! ]
          ] :
          [];
      return new Map<string, T>([
        ...newMainValidatorsArray,
        ...Array.from(
          oldMap.entries()
        ).filter(filterPredicate).map<[ string, T ]>(
          ([ entryKey, entryValue ]) => [ entryKey.startsWith(`${ key }.`) ? entryKey.replace(`${ key }.`, '') : entryKey, entryValue ]
        )
      ]);
    };
  };
}

export function makeForm<T>(
  source: T,
  keysValidator?: Map<string, ValidatorFn[] | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
): T extends Array<infer U> ?
  FormArray<
    U extends Array<any> ?
    FormArray<AbstractControl<U, U>> :
    U extends string | number | boolean | symbol | null | undefined ?
    FormControl<U | null> :
    FormGroup<{ [ KU in keyof U ]: AbstractControl<U[ KU ], U[ KU ]>; }>
  >:
  T extends string | number | boolean | symbol | null | undefined ?
  FormControl<T | null> :
  FormGroup<{ [ K in keyof T ]: AbstractControl<T[ K ], T[ K ]>; }> {
  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array<infer U> ?
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
        getValidatorsOrNull('mainFormValidators', keysValidator, true),
        getValidatorsOrNull('mainFormValidators', asyncKeysValidator, false)
      ) :
      makeFormGroup<T>(source, 'mainFormValidators', keysValidator, asyncKeysValidator) :
    new FormControl<T | null>(
      !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
      ,
      getValidatorsOrNull('mainFormValidators', keysValidator, false),
      getValidatorsOrNull('mainFormValidators', asyncKeysValidator, false)
    );
  return <T extends Array<infer U> ?
    FormArray<
      U extends Array<any> ?
      FormArray<AbstractControl<U, U>> :
      U extends string | number | boolean | symbol | null | undefined ? FormControl<U | null> :
      FormGroup<{ [ KU in keyof U ]: AbstractControl<U[ KU ], U[ KU ]>; }>
    > :
    T extends string | number | boolean | symbol | null | undefined ?
    FormControl<T | null> :
    FormGroup<{ [ K in keyof T ]: AbstractControl<T[ K ], T[ K ]>; }>> form;
};

function liftErrors(control: AbstractControl): ValidationErrors | null {
  if (control instanceof FormControl) {
    return null;
  } else {
    const allControls = control instanceof FormGroup ?
      Object.values(control.controls) :
      control instanceof FormArray ?
        control.controls :
        [];
    const invalidControls = allControls.filter(control => control.status === 'INVALID');
    return invalidControls.length === 0 ? null : invalidControls.reduce(
      (accumulator, current) => {
        if (current.errors) {
          addValidationErrors(current.errors, accumulator);
        };
        return accumulator;
      }, <ValidationErrors> {}
    );
  }
}

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
    }, <ValidationErrors> {}
  );
  return Object.values(errors).length === 0 ? null : errors;
};

function addValidationErrors(additionErrors: ValidationErrors, currentErrors: ValidationErrors) {
  Object.entries(additionErrors).forEach(
    entry => currentErrors[ entry[ 0 ] ] = entry[ 1 ]
  );
}