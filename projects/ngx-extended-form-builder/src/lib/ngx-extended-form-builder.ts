import { FormGroup, FormArray, FormControl, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
import { Observable } from "rxjs";

interface ExtendedControlOptions extends AbstractControlOptions {
  disabled?: boolean,
};

function makeFormGroup(
  source: any,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
  internal: boolean = false
): FormGroup {
  const keys = source instanceof FormControl || source instanceof FormGroup || source instanceof FormArray ?
    Object.keys(source.value) :
    Object.keys(source);
  return keys.reduce(
    (accumulator: FormGroup, key: string | any) => {
      if (!(source[key] instanceof Observable)) {
        accumulator.addControl(
          key,
          !!source[key] && typeof source[key] == 'object' && !(source[key] instanceof Date) ?
            source[key] instanceof FormControl || source[key] instanceof FormGroup || source[key] instanceof FormArray ?
              source[key] :
              makeForm(source[key], keysValidator, asyncKeysValidator, true) :
            new FormControl(
              {
                disabled: keysValidator?.has(key) && 'disabled' in keysValidator.get(key)! ? (<ExtendedControlOptions>keysValidator.get(key)).disabled : false,
                value: !!source[key] && typeof source[key] == 'string' && (source[key].includes('0001-01-01') || source[key].includes('1970-01-01')) ? null : source[key]
              },
              keysValidator?.has(key) ? keysValidator.get(key) : null,
              asyncKeysValidator?.has(key) ? asyncKeysValidator.get(key) : null,
            )
        );
      };
      return accumulator;
    }, new FormGroup({},
      keysValidator?.has('mainFormValidators') && !internal ?
        keysValidator.get('mainFormValidators') :
        null,
      asyncKeysValidator?.has('mainFormValidators') && !internal ?
        asyncKeysValidator.get('mainFormValidators') :
        null)
  );
}

export function makeForm<T extends FormGroup | FormArray | FormControl = FormGroup>(
  source: any,
  keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>,
  asyncKeysValidator?: Map<string, AsyncValidatorFn[] | null>,
  internal: boolean = false
): T {

  const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
    source instanceof Array ?
      new FormArray(source.map(item => makeForm(item, keysValidator, asyncKeysValidator, true)),
        keysValidator?.has('mainFormValidators') && !internal ?
          keysValidator.get('mainFormValidators') :
          null,
        asyncKeysValidator?.has('mainFormValidators') && !internal ?
          asyncKeysValidator.get('mainFormValidators') :
          null
      ) :
      makeFormGroup(source, keysValidator, asyncKeysValidator, internal) :
    new FormControl({
      disabled: keysValidator?.has('mainFormValidators') && 'disabled' in (keysValidator.get('mainFormValidators')!) ?
        (<ExtendedControlOptions>keysValidator.get('mainFormValidators')).disabled :
        false,
      value: source
    },
      keysValidator?.has('mainFormValidators') && !internal ?
        keysValidator.get('mainFormValidators') :
        null,
      asyncKeysValidator?.has('mainFormValidators') && !internal ?
        asyncKeysValidator.get('mainFormValidators') :
        null);
  return <T>form
};