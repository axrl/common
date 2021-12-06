import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

;
function getValidatorsOrNull(key, keysValidator, internal = false) {
    return (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has(key)) && !internal ?
        keysValidator.get(key) :
        null;
}
function makeFormGroup(source, keysValidator, asyncKeysValidator, internal = false) {
    return source instanceof FormGroup ? source : Object.entries(source).reduce((accumulator, entry) => {
        const key = entry[0];
        const value = entry[1];
        if (!(value instanceof Observable)) {
            accumulator.addControl(key, !!value && typeof value == 'object' && !(value instanceof Date) ?
                value instanceof FormControl || value instanceof FormGroup || value instanceof FormArray ?
                    value :
                    makeForm(value, keysValidator, asyncKeysValidator, true) :
                new FormControl({
                    disabled: (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has(key)) && 'disabled' in keysValidator.get(key) ? keysValidator.get(key).disabled : false,
                    value: !!value && typeof value == 'string' && (value.includes('0001-01-01') || value.includes('1970-01-01')) ? null : value
                }, getValidatorsOrNull(key, keysValidator), getValidatorsOrNull(key, asyncKeysValidator)));
        }
        ;
        return accumulator;
    }, new FormGroup({}, getValidatorsOrNull('mainFormValidators', keysValidator, internal), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)));
}
function makeForm(source, keysValidator, asyncKeysValidator, internal = false) {
    const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
        source instanceof Array ?
            new FormArray(source.map(item => {
                const itemForm = makeForm(item, keysValidator, asyncKeysValidator, true);
                return itemForm;
            }), getValidatorsOrNull('mainFormValidators', keysValidator, internal), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)) :
            makeFormGroup(source, keysValidator, asyncKeysValidator, internal) :
        new FormControl({
            disabled: (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && 'disabled' in (keysValidator.get('mainFormValidators')) ?
                keysValidator.get('mainFormValidators').disabled :
                false,
            value: source
        }, getValidatorsOrNull('mainFormValidators', keysValidator, internal), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal));
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
