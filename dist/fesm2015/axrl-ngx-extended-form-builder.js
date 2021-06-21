import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

;
function makeFormGroup(source, keysValidator, asyncKeysValidator, internal = false) {
    const keys = source instanceof FormControl || source instanceof FormGroup || source instanceof FormArray ?
        Object.keys(source.value) :
        Object.keys(source);
    return keys.reduce((accumulator, key) => {
        if (!(source[key] instanceof Observable)) {
            accumulator.addControl(key, !!source[key] && typeof source[key] == 'object' && !(source[key] instanceof Date) ?
                source[key] instanceof FormControl || source[key] instanceof FormGroup || source[key] instanceof FormArray ?
                    source[key] :
                    makeForm(source[key], keysValidator, asyncKeysValidator, true) :
                new FormControl({
                    disabled: (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has(key)) && 'disabled' in keysValidator.get(key) ? keysValidator.get(key).disabled : false,
                    value: !!source[key] && typeof source[key] == 'string' && (source[key].includes('0001-01-01') || source[key].includes('1970-01-01')) ? null : source[key]
                }, (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has(key)) ? keysValidator.get(key) : null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has(key)) ? asyncKeysValidator.get(key) : null));
        }
        ;
        return accumulator;
    }, new FormGroup({}, (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && !internal ?
        keysValidator.get('mainFormValidators') :
        null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has('mainFormValidators')) && !internal ?
        asyncKeysValidator.get('mainFormValidators') :
        null));
}
function makeForm(source, keysValidator, asyncKeysValidator, internal = false) {
    const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
        source instanceof Array ?
            new FormArray(source.map(item => makeForm(item, keysValidator, asyncKeysValidator, true)), (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && !internal ?
                keysValidator.get('mainFormValidators') :
                null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has('mainFormValidators')) && !internal ?
                asyncKeysValidator.get('mainFormValidators') :
                null) :
            makeFormGroup(source, keysValidator, asyncKeysValidator, internal) :
        new FormControl({
            disabled: (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && 'disabled' in (keysValidator.get('mainFormValidators')) ?
                keysValidator.get('mainFormValidators').disabled :
                false,
            value: source
        }, (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && !internal ?
            keysValidator.get('mainFormValidators') :
            null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has('mainFormValidators')) && !internal ?
            asyncKeysValidator.get('mainFormValidators') :
            null);
    return form;
}
;

/*
 * Public API Surface of ngx-extended-form-builder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { makeForm };
//# sourceMappingURL=axrl-ngx-extended-form-builder.js.map
