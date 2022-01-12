import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

;
//function getValidatorsOrNull(key: string, keysValidator?: Map<string, AsyncValidatorFn[] | null>, internal?: boolean): AsyncValidatorFn[] | null
//function getValidatorsOrNull(key: string, keysValidator?: Map<string, ValidatorFn[] | ExtendedControlOptions | null>, internal?: boolean): ValidatorFn[] | ExtendedControlOptions | null
function getValidatorsOrNull(key, keysValidator) {
    return keysValidator && keysValidator.has(key) ? keysValidator.get(key) : null;
}
function makeFormGroup(source, internalKey, keysValidator, asyncKeysValidator) {
    return source instanceof FormGroup ? source : Object.entries(source).reduce((accumulator, entry) => {
        const key = entry[0];
        const value = entry[1];
        if (!(value instanceof Observable)) {
            accumulator.addControl(key, !!value && value instanceof FormControl || value instanceof FormGroup || value instanceof FormArray ?
                value :
                makeForm(value, makeNewMainFormValidatorsMap(key, keysValidator), makeNewMainFormValidatorsMap(key, asyncKeysValidator)));
        }
        ;
        return accumulator;
    }, new FormGroup({}, getValidatorsOrNull(internalKey, keysValidator), getValidatorsOrNull(internalKey, asyncKeysValidator)));
}
function makeNewMainFormValidatorsMap(key, oldMap) {
    if (!oldMap || key === 'mainFormValidators' || key === 'mainFormValidatorsItems') {
        return oldMap;
    }
    else {
        if (!oldMap.has(key) && !oldMap.has(`${key}Items`)) {
            return new Map(Array.from(oldMap.entries()).filter(item => item[0] !== 'mainFormValidators' && item[0] !== 'mainFormValidatorsItems'));
        }
        else {
            const filterPredicate = oldMap.has('mainFormValidators') ?
                oldMap.has('mainFormValidatorsItems') ?
                    (item) => item[0] !== key && item[0] !== 'mainFormValidators' && item[0] !== 'mainFormValidatorsItems' :
                    (item) => item[0] !== key && item[0] !== 'mainFormValidators' :
                oldMap.has('mainFormValidatorsItems') ?
                    (item) => item[0] !== key && item[0] !== 'mainFormValidatorsItems' :
                    (item) => item[0] !== key;
            const newMainValidatorsArray = oldMap.has(key) ?
                oldMap.has(`${key}Items`) ?
                    [
                        ['mainFormValidators', oldMap.get(key)],
                        ['mainFormValidatorsItems', oldMap.get(`${key}Items`)]
                    ] :
                    [
                        ['mainFormValidators', oldMap.get(key)],
                    ] :
                oldMap.has(`${key}Items`) ?
                    [
                        ['mainFormValidatorsItems', oldMap.get(`${key}Items`)]
                    ] :
                    [];
            return new Map([
                ...newMainValidatorsArray,
                ...Array.from(oldMap.entries()).filter(filterPredicate)
            ]);
        }
        ;
    }
    ;
}
function makeForm(source, keysValidator, asyncKeysValidator) {
    const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
        source instanceof Array ?
            new FormArray(source.map(item => {
                const itemForm = makeForm(item, makeNewMainFormValidatorsMap('mainFormValidatorsItems', keysValidator), makeNewMainFormValidatorsMap('mainFormValidatorsItems', asyncKeysValidator));
                return itemForm;
            }), getValidatorsOrNull('mainFormValidators', keysValidator), getValidatorsOrNull('mainFormValidators', asyncKeysValidator)) :
            makeFormGroup(source, 'mainFormValidators', keysValidator, asyncKeysValidator) :
        new FormControl({
            disabled: (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && 'disabled' in (keysValidator.get('mainFormValidators')) ?
                keysValidator.get('mainFormValidators').disabled :
                false,
            value: !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
        }, getValidatorsOrNull('mainFormValidators', keysValidator), getValidatorsOrNull('mainFormValidators', asyncKeysValidator));
    return form;
}
;
function liftValidationErrors(control) {
    const allControls = control instanceof FormGroup ?
        Object.values(control.controls) :
        control instanceof FormArray ?
            control.controls :
            [];
    const invalidControls = allControls.filter(control => control.status === 'INVALID');
    const errors = invalidControls.length === 0 ? {} : invalidControls.reduce((accumulator, current) => {
        if (current.errors) {
            addValidationErrors(current.errors, accumulator);
        }
        ;
        const innerErrors = liftValidationErrors(current);
        if (innerErrors) {
            addValidationErrors(innerErrors, accumulator);
        }
        ;
        return accumulator;
    }, {});
    return Object.values(errors).length === 0 ? null : errors;
}
;
function addValidationErrors(additionErrors, currentErrors) {
    Object.entries(additionErrors).forEach(entry => currentErrors[entry[0]] = entry[1]);
}

/*
 * Public API Surface of ngx-extended-form-builder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { liftValidationErrors, makeForm };
//# sourceMappingURL=axrl-ngx-extended-form-builder.mjs.map
