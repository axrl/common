(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@axrl/ngx-extended-form-builder', ['exports', '@angular/forms', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.axrl = global.axrl || {}, global.axrl['ngx-extended-form-builder'] = {}), global.ng.forms, global.rxjs));
}(this, (function (exports, forms, rxjs) { 'use strict';

    ;
    function makeFormGroup(source, keysValidator, asyncKeysValidator, internal) {
        if (internal === void 0) { internal = false; }
        var keys = source instanceof forms.FormControl || source instanceof forms.FormGroup || source instanceof forms.FormArray ?
            Object.keys(source.value) :
            Object.keys(source);
        return keys.reduce(function (accumulator, key) {
            if (!(source[key] instanceof rxjs.Observable)) {
                accumulator.addControl(key, !!source[key] && typeof source[key] == 'object' && !(source[key] instanceof Date) ?
                    source[key] instanceof forms.FormControl || source[key] instanceof forms.FormGroup || source[key] instanceof forms.FormArray ?
                        source[key] :
                        makeForm(source[key], keysValidator, asyncKeysValidator, true) :
                    new forms.FormControl({
                        disabled: (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has(key)) && 'disabled' in keysValidator.get(key) ? keysValidator.get(key).disabled : false,
                        value: !!source[key] && typeof source[key] == 'string' && (source[key].includes('0001-01-01') || source[key].includes('1970-01-01')) ? null : source[key]
                    }, (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has(key)) ? keysValidator.get(key) : null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has(key)) ? asyncKeysValidator.get(key) : null));
            }
            ;
            return accumulator;
        }, new forms.FormGroup({}, (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && !internal ?
            keysValidator.get('mainFormValidators') :
            null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has('mainFormValidators')) && !internal ?
            asyncKeysValidator.get('mainFormValidators') :
            null));
    }
    function makeForm(source, keysValidator, asyncKeysValidator, internal) {
        if (internal === void 0) { internal = false; }
        var form = !!source && (typeof source === 'object' || typeof source === 'function') ?
            source instanceof Array ?
                new forms.FormArray(source.map(function (item) { return makeForm(item, keysValidator, asyncKeysValidator, true); }), (keysValidator === null || keysValidator === void 0 ? void 0 : keysValidator.has('mainFormValidators')) && !internal ?
                    keysValidator.get('mainFormValidators') :
                    null, (asyncKeysValidator === null || asyncKeysValidator === void 0 ? void 0 : asyncKeysValidator.has('mainFormValidators')) && !internal ?
                    asyncKeysValidator.get('mainFormValidators') :
                    null) :
                makeFormGroup(source, keysValidator, asyncKeysValidator, internal) :
            new forms.FormControl({
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

    exports.makeForm = makeForm;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=axrl-ngx-extended-form-builder.umd.js.map
