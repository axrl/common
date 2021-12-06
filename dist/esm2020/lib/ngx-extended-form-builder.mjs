import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
;
function getValidatorsOrNull(key, keysValidator, internal = false) {
    return keysValidator?.has(key) && !internal ?
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
                    disabled: keysValidator?.has(key) && 'disabled' in keysValidator.get(key) ? keysValidator.get(key).disabled : false,
                    value: !!value && typeof value == 'string' && (value.includes('0001-01-01') || value.includes('1970-01-01')) ? null : value
                }, getValidatorsOrNull(key, keysValidator), getValidatorsOrNull(key, asyncKeysValidator)));
        }
        ;
        return accumulator;
    }, new FormGroup({}, getValidatorsOrNull('mainFormValidators', keysValidator, internal), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)));
}
export function makeForm(source, keysValidator, asyncKeysValidator, internal = false) {
    const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
        source instanceof Array ?
            new FormArray(source.map(item => {
                const itemForm = makeForm(item, keysValidator, asyncKeysValidator, true);
                return itemForm;
            }), getValidatorsOrNull('mainFormValidators', keysValidator, internal), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal)) :
            makeFormGroup(source, keysValidator, asyncKeysValidator, internal) :
        new FormControl({
            disabled: keysValidator?.has('mainFormValidators') && 'disabled' in (keysValidator.get('mainFormValidators')) ?
                keysValidator.get('mainFormValidators').disabled :
                false,
            value: source
        }, getValidatorsOrNull('mainFormValidators', keysValidator, internal), getValidatorsOrNull('mainFormValidators', asyncKeysValidator, internal));
    return form;
}
;
export function liftValidationErrors(control) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWV4dGVuZGVkLWZvcm0tYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL25neC1leHRlbmRlZC1mb3JtLWJ1aWxkZXIvc3JjL2xpYi9uZ3gtZXh0ZW5kZWQtZm9ybS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJakMsQ0FBQztBQUlGLFNBQVMsbUJBQW1CLENBQUMsR0FBVyxFQUFFLGFBQStGLEVBQUUsV0FBb0IsS0FBSztJQUNsSyxPQUFPLGFBQWEsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFBO0FBQ1IsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUNwQixNQUFXLEVBQ1gsYUFBMEUsRUFDMUUsa0JBQTJELEVBQzNELFdBQW9CLEtBQUs7SUFFekIsT0FBTyxNQUFNLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUN6RSxDQUFDLFdBQXNCLEVBQUUsS0FBd0IsRUFBRSxFQUFFO1FBQ25ELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLFVBQVUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxVQUFVLENBQ3BCLEdBQUcsRUFDSCxDQUFDLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FB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LGNBQWdDLEVBQUUsYUFBK0I7SUFDNUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQ3BDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDNUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSwgRm9ybUNvbnRyb2wgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB0eXBlIHsgVmFsaWRhdG9yRm4sIFZhbGlkYXRpb25FcnJvcnMsIEFic3RyYWN0Q29udHJvbCwgQXN5bmNWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sT3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmludGVyZmFjZSBFeHRlbmRlZENvbnRyb2xPcHRpb25zIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sT3B0aW9ucyB7XG4gIGRpc2FibGVkPzogYm9vbGVhbixcbn07XG5cbmZ1bmN0aW9uIGdldFZhbGlkYXRvcnNPck51bGwoa2V5OiBzdHJpbmcsIGtleXNWYWxpZGF0b3I/OiBNYXA8c3RyaW5nLCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsPiwgaW50ZXJuYWw/OiBib29sZWFuKTogQXN5bmNWYWxpZGF0b3JGbltdIHwgbnVsbFxuZnVuY3Rpb24gZ2V0VmFsaWRhdG9yc09yTnVsbChrZXk6IHN0cmluZywga2V5c1ZhbGlkYXRvcj86IE1hcDxzdHJpbmcsIFZhbGlkYXRvckZuW10gfCBFeHRlbmRlZENvbnRyb2xPcHRpb25zIHwgbnVsbD4sIGludGVybmFsPzogYm9vbGVhbik6IFZhbGlkYXRvckZuW10gfCBFeHRlbmRlZENvbnRyb2xPcHRpb25zIHwgbnVsbFxuZnVuY3Rpb24gZ2V0VmFsaWRhdG9yc09yTnVsbChrZXk6IHN0cmluZywga2V5c1ZhbGlkYXRvcj86IE1hcDxzdHJpbmcsIFZhbGlkYXRvckZuW10gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBFeHRlbmRlZENvbnRyb2xPcHRpb25zIHwgbnVsbD4sIGludGVybmFsOiBib29sZWFuID0gZmFsc2UpOiBWYWxpZGF0b3JGbltdIHwgRXh0ZW5kZWRDb250cm9sT3B0aW9ucyB8IEFzeW5jVmFsaWRhdG9yRm5bXSB8IG51bGwgfCB1bmRlZmluZWQge1xuICByZXR1cm4ga2V5c1ZhbGlkYXRvcj8uaGFzKGtleSkgJiYgIWludGVybmFsID9cbiAgICBrZXlzVmFsaWRhdG9yLmdldChrZXkpIDpcbiAgICBudWxsXG59XG5cbmZ1bmN0aW9uIG1ha2VGb3JtR3JvdXAoXG4gIHNvdXJjZTogYW55LFxuICBrZXlzVmFsaWRhdG9yPzogTWFwPHN0cmluZywgVmFsaWRhdG9yRm5bXSB8IEV4dGVuZGVkQ29udHJvbE9wdGlvbnMgfCBudWxsPixcbiAgYXN5bmNLZXlzVmFsaWRhdG9yPzogTWFwPHN0cmluZywgQXN5bmNWYWxpZGF0b3JGbltdIHwgbnVsbD4sXG4gIGludGVybmFsOiBib29sZWFuID0gZmFsc2Vcbik6IEZvcm1Hcm91cCB7XG4gIHJldHVybiBzb3VyY2UgaW5zdGFuY2VvZiBGb3JtR3JvdXAgPyBzb3VyY2UgOiBPYmplY3QuZW50cmllcyhzb3VyY2UpLnJlZHVjZShcbiAgICAoYWNjdW11bGF0b3I6IEZvcm1Hcm91cCwgZW50cnk6IFtzdHJpbmcsIHVua25vd25dKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBlbnRyeVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbMV07XG4gICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpKSB7XG4gICAgICAgIGFjY3VtdWxhdG9yLmFkZENvbnRyb2woXG4gICAgICAgICAga2V5LFxuICAgICAgICAgICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSA/XG4gICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIEZvcm1Db250cm9sIHx8IHZhbHVlIGluc3RhbmNlb2YgRm9ybUdyb3VwIHx8IHZhbHVlIGluc3RhbmNlb2YgRm9ybUFycmF5ID9cbiAgICAgICAgICAgICAgdmFsdWUgOlxuICAgICAgICAgICAgICBtYWtlRm9ybSh2YWx1ZSwga2V5c1ZhbGlkYXRvciwgYXN5bmNLZXlzVmFsaWRhdG9yLCB0cnVlKSA6XG4gICAgICAgICAgICBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDoga2V5c1ZhbGlkYXRvcj8uaGFzKGtleSkgJiYgJ2Rpc2FibGVkJyBpbiBrZXlzVmFsaWRhdG9yLmdldChrZXkpISA/ICg8RXh0ZW5kZWRDb250cm9sT3B0aW9ucz5rZXlzVmFsaWRhdG9yLmdldChrZXkpKS5kaXNhYmxlZCA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyAmJiAodmFsdWUuaW5jbHVkZXMoJzAwMDEtMDEtMDEnKSB8fCB2YWx1ZS5pbmNsdWRlcygnMTk3MC0wMS0wMScpKSA/IG51bGwgOiB2YWx1ZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBnZXRWYWxpZGF0b3JzT3JOdWxsKGtleSwga2V5c1ZhbGlkYXRvciksXG4gICAgICAgICAgICAgIGdldFZhbGlkYXRvcnNPck51bGwoa2V5LCBhc3luY0tleXNWYWxpZGF0b3IpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgIH0sIG5ldyBGb3JtR3JvdXAoe30sXG4gICAgICBnZXRWYWxpZGF0b3JzT3JOdWxsKCdtYWluRm9ybVZhbGlkYXRvcnMnLCBrZXlzVmFsaWRhdG9yLCBpbnRlcm5hbCksXG4gICAgICBnZXRWYWxpZGF0b3JzT3JOdWxsKCdtYWluRm9ybVZhbGlkYXRvcnMnLCBhc3luY0tleXNWYWxpZGF0b3IsIGludGVybmFsKVxuICAgIClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VGb3JtPFQgZXh0ZW5kcyB1bmtub3duLCBSIGV4dGVuZHMgKFQgZXh0ZW5kcyBBcnJheTxhbnk+ID8gRm9ybUFycmF5IDogVCBleHRlbmRzIHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBzeW1ib2wgPyBGb3JtQ29udHJvbCA6IEZvcm1Hcm91cCk+KFxuICBzb3VyY2U6IFQsXG4gIGtleXNWYWxpZGF0b3I/OiBNYXA8c3RyaW5nLCBWYWxpZGF0b3JGbltdIHwgRXh0ZW5kZWRDb250cm9sT3B0aW9ucyB8IG51bGw+LFxuICBhc3luY0tleXNWYWxpZGF0b3I/OiBNYXA8c3RyaW5nLCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsPixcbiAgaW50ZXJuYWw6IGJvb2xlYW4gPSBmYWxzZVxuKTogUiB7XG4gIGNvbnN0IGZvcm0gPSAhIXNvdXJjZSAmJiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIHNvdXJjZSBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgIG5ldyBGb3JtQXJyYXkoXG4gICAgICAgIHNvdXJjZS5tYXAoXG4gICAgICAgICAgaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtRm9ybSA9IG1ha2VGb3JtKGl0ZW0sIGtleXNWYWxpZGF0b3IsIGFzeW5jS2V5c1ZhbGlkYXRvciwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUZvcm07XG4gICAgICAgICAgfSksXG4gICAgICAgIGdldFZhbGlkYXRvcnNPck51bGwoJ21haW5Gb3JtVmFsaWRhdG9ycycsIGtleXNWYWxpZGF0b3IsIGludGVybmFsKSxcbiAgICAgICAgZ2V0VmFsaWRhdG9yc09yTnVsbCgnbWFpbkZvcm1WYWxpZGF0b3JzJywgYXN5bmNLZXlzVmFsaWRhdG9yLCBpbnRlcm5hbClcbiAgICAgICkgOlxuICAgICAgbWFrZUZvcm1Hcm91cChzb3VyY2UsIGtleXNWYWxpZGF0b3IsIGFzeW5jS2V5c1ZhbGlkYXRvciwgaW50ZXJuYWwpIDpcbiAgICBuZXcgRm9ybUNvbnRyb2woe1xuICAgICAgZGlzYWJsZWQ6IGtleXNWYWxpZGF0b3I/LmhhcygnbWFpbkZvcm1WYWxpZGF0b3JzJykgJiYgJ2Rpc2FibGVkJyBpbiAoa2V5c1ZhbGlkYXRvci5nZXQoJ21haW5Gb3JtVmFsaWRhdG9ycycpISkgP1xuICAgICAgICAoPEV4dGVuZGVkQ29udHJvbE9wdGlvbnM+a2V5c1ZhbGlkYXRvci5nZXQoJ21haW5Gb3JtVmFsaWRhdG9ycycpKS5kaXNhYmxlZCA6XG4gICAgICAgIGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0sXG4gICAgICBnZXRWYWxpZGF0b3JzT3JOdWxsKCdtYWluRm9ybVZhbGlkYXRvcnMnLCBrZXlzVmFsaWRhdG9yLCBpbnRlcm5hbCksXG4gICAgICBnZXRWYWxpZGF0b3JzT3JOdWxsKCdtYWluRm9ybVZhbGlkYXRvcnMnLCBhc3luY0tleXNWYWxpZGF0b3IsIGludGVybmFsKVxuICAgICk7XG4gIHJldHVybiA8Uj5mb3JtO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxpZnRWYWxpZGF0aW9uRXJyb3JzKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgY29uc3QgYWxsQ29udHJvbHMgPSBjb250cm9sIGluc3RhbmNlb2YgRm9ybUdyb3VwID9cbiAgICBPYmplY3QudmFsdWVzKGNvbnRyb2wuY29udHJvbHMpIDpcbiAgICBjb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5ID9cbiAgICAgIGNvbnRyb2wuY29udHJvbHMgOlxuICAgICAgW107XG4gIGNvbnN0IGludmFsaWRDb250cm9scyA9IGFsbENvbnRyb2xzLmZpbHRlcihjb250cm9sID0+IGNvbnRyb2wuc3RhdHVzID09PSAnSU5WQUxJRCcpO1xuICBjb25zdCBlcnJvcnM6IFZhbGlkYXRpb25FcnJvcnMgPSBpbnZhbGlkQ29udHJvbHMubGVuZ3RoID09PSAwID8ge30gOiBpbnZhbGlkQ29udHJvbHMucmVkdWNlKFxuICAgIChhY2N1bXVsYXRvciwgY3VycmVudCkgPT4ge1xuICAgICAgaWYgKGN1cnJlbnQuZXJyb3JzKSB7XG4gICAgICAgIGFkZFZhbGlkYXRpb25FcnJvcnMoY3VycmVudC5lcnJvcnMsIGFjY3VtdWxhdG9yKTtcblxuICAgICAgfTtcbiAgICAgIGNvbnN0IGlubmVyRXJyb3JzID0gbGlmdFZhbGlkYXRpb25FcnJvcnMoY3VycmVudCk7XG4gICAgICBpZiAoaW5uZXJFcnJvcnMpIHtcbiAgICAgICAgYWRkVmFsaWRhdGlvbkVycm9ycyhpbm5lckVycm9ycywgYWNjdW11bGF0b3IpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICB9LCA8VmFsaWRhdGlvbkVycm9ycz57fVxuICApO1xuICByZXR1cm4gT2JqZWN0LnZhbHVlcyhlcnJvcnMpLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBlcnJvcnM7XG59O1xuXG5mdW5jdGlvbiBhZGRWYWxpZGF0aW9uRXJyb3JzKGFkZGl0aW9uRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzLCBjdXJyZW50RXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzKSB7XG4gIE9iamVjdC5lbnRyaWVzKGFkZGl0aW9uRXJyb3JzKS5mb3JFYWNoKFxuICAgIGVudHJ5ID0+IGN1cnJlbnRFcnJvcnNbZW50cnlbMF1dID0gZW50cnlbMV1cbiAgKTtcbn0iXX0=