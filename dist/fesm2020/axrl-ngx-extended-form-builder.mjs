import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

;
function getValidatorsOrNull(key, keysValidator, addLift = false) {
    const result = keysValidator && keysValidator.has(key) ? keysValidator.get(key) : null;
    if (addLift) {
        if (result && Array.isArray(result)) {
            result.push(liftErrors);
            return result;
        }
        else {
            return result ? result : [liftErrors];
        }
    }
    else {
        return result;
    }
    ;
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
    }, new FormGroup({}, getValidatorsOrNull(internalKey, keysValidator, true), getValidatorsOrNull(internalKey, asyncKeysValidator, false)));
}
function makeNewMainFormValidatorsMap(key, oldMap) {
    if (!oldMap || key === 'mainFormValidators' || key === 'mainFormValidatorsItems') {
        return oldMap;
    }
    else {
        if (!oldMap.has(key) && !oldMap.has(`${key}Items`)) {
            return new Map(Array.from(oldMap.entries()).filter(item => item[0] !== 'mainFormValidators' && item[0] !== 'mainFormValidatorsItems').map(([entryKey, entryValue]) => [entryKey.startsWith(`${key}.`) ? entryKey.replace(`${key}.`, '') : entryKey, entryValue]));
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
                ...Array.from(oldMap.entries()).filter(filterPredicate).map(([entryKey, entryValue]) => [entryKey.startsWith(`${key}.`) ? entryKey.replace(`${key}.`, '') : entryKey, entryValue])
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
            }), getValidatorsOrNull('mainFormValidators', keysValidator, true), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, false)) :
            makeFormGroup(source, 'mainFormValidators', keysValidator, asyncKeysValidator) :
        new FormControl({
            disabled: keysValidator?.has('mainFormValidators') && 'disabled' in (keysValidator.get('mainFormValidators')) ?
                keysValidator.get('mainFormValidators').disabled :
                false,
            value: !!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source
        }, getValidatorsOrNull('mainFormValidators', keysValidator, false), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, false));
    return form;
}
;
function liftErrors(control) {
    if (control instanceof FormControl) {
        return null;
    }
    else {
        const allControls = control instanceof FormGroup ?
            Object.values(control.controls) :
            control instanceof FormArray ?
                control.controls :
                [];
        const invalidControls = allControls.filter(control => control.status === 'INVALID');
        return invalidControls.length === 0 ? null : invalidControls.reduce((accumulator, current) => {
            if (current.errors) {
                addValidationErrors(current.errors, accumulator);
            }
            ;
            return accumulator;
        }, {});
    }
}
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
