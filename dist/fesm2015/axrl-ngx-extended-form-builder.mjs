import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

function getValidatorsOrNull(key, options, addLift = false) {
    const result = options && options.has(key) ? options.get(key) : null;
    if (addLift) {
        if (result && result.validators) {
            result.validators.push(liftErrors);
            return result;
        }
        else {
            if (result) {
                result.validators = [liftErrors];
                return result;
            }
            else {
                return {
                    validators: [liftErrors]
                };
            }
            ;
        }
    }
    else {
        return result;
    }
    ;
}
function makeNewMainMap(key, oldMap) {
    if (!oldMap || key === 'main') {
        return oldMap;
    }
    else {
        if (!oldMap.has(key) && !oldMap.has(`${key}Items`)) {
            return new Map(Array.from(oldMap.entries()).filter(item => item[0] !== 'main' && item[0] !== 'mainItems').map(([entryKey, entryValue]) => [(entryKey.startsWith(`${key}.`) ? entryKey.replace(`${key}.`, '') : entryKey), entryValue]));
        }
        else {
            const filterPredicate = oldMap.has('main') ?
                oldMap.has('mainItems') ?
                    (item) => {
                        const pre = item[0] !== (key + 'Items');
                        return item[0] !== key && pre && item[0] !== 'main' && item[0] !== 'mainItems';
                    } :
                    (item) => {
                        const pre = item[0] !== (key + 'Items');
                        return item[0] !== key && key[0] !== (key + 'Items') && item[0] !== 'main';
                    } :
                oldMap.has('mainItems') ?
                    (item) => {
                        const pre = item[0] !== (key + 'Items');
                        return item[0] !== key && pre && item[0] !== 'mainItems';
                    } :
                    (item) => {
                        const pre = item[0] !== (key + 'Items');
                        return item[0] !== key && pre;
                    };
            const newMainValidatorsArray = oldMap.has(key) ?
                oldMap.has(`${key}Items`) ?
                    [
                        ['main', oldMap.get(key)],
                        ['mainItems', oldMap.get(`${key}Items`)]
                    ] :
                    [
                        ['main', oldMap.get(key)],
                    ] :
                oldMap.has(`${key}Items`) ?
                    [
                        ['mainItems', oldMap.get(`${key}Items`)]
                    ] :
                    [];
            const filtered = Array.from(oldMap.entries()).filter(filterPredicate);
            const result = new Map([
                ...newMainValidatorsArray,
                ...filtered.map(([entryKey, entryValue]) => [(entryKey.startsWith(`${key}.`) ?
                        entryKey.replace(`${key}.`, '') :
                        entryKey.startsWith(`${key}Items.`) ?
                            entryKey.replace(`${key}Items.`, '') :
                            entryKey), entryValue])
            ]);
            console.log(key, oldMap, filtered, result);
            return result;
        }
        ;
    }
    ;
}
/**
@function makeForm<T>
  Фабричная функция для создания Angular Reactive Form.
В отличие от стандартного FormBuilder - а в пакете @angular/forms, при создании формы из сложных объектов,
сохраняется вложенность контролов - каждый вложенный объект превращается во вложенную FormGroup,
  обычные свойства объектов становятся FormControl - ами, а массивы - FormArray - ми.
При этом создаваемая форма имеет более строгую типизацию.

  ВАЖНО!
   Чтобы избежать ошибки переполнения стэка вызовов в рекурсивном процессе создания формы, для любых;
Observable - значений(в т.ч., к примеру, Subject * и EventEmitter) соответствующий элемент формы не создается.
 * @param source  источник данных типа T для создания формы.
 * @param keysValidator объект Map с конфигурацией синхронных валидаторов контролов формы.
 * В качестве ключей могут быть указаны следующие значения:
 *  PropertyesKeys<T> - строковые ключи в типе T, включая строковые ключи всех вложенных типов, разделенные "." - точкой.
    Например имеется такой тип:
    ```ts
                    interface User {
                      firstname: string;
                      lastname: string;
                      phone:  {
                        code: string;
                        number: string;
                        }
                      };
    ```
    Для формы, которая будет создана из объекта User в конфигурации валидаторов названия контролов можно будет указать так:
    `lastname` или`phone`, или`phone.code`.

   'main' - специальное значение, являющееся признаком того, что массив валидаторов необходимо
    назначить самому объекту формы, а не вложеным контролам.

   'mainItems' - используется только если source является массивом. Специальное значение, являющееся признаком того,
  что массив валидаторов необходимо назначить для всех элементов массива FormArray.
 * @param asyncKeysValidator объект Map, аналогичный keysValidator, но для асинхронных валидаторов
 * @returns объект типизированной формы - FormGroup, FormArray или FormControl в зависимости от типа значения source.
 */
function makeForm(source, options) {
    const form = !!source && (typeof source === 'object' || typeof source === 'function') ?
        source instanceof (Array) ?
            makeArray(source, options) :
            makeGroup(source, 'main', options) :
        makeControl(source, options);
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
function makeControl(source, options) {
    const controlOptions = getValidatorsOrNull('main', options, false);
    const result = source instanceof FormControl ?
        source :
        new FormControl(!!source && typeof source == 'string' && (source.includes('0001-01-01') || source.includes('1970-01-01')) ? null : source, {
            validators: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.validators,
            asyncValidators: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.asyncValidators,
            updateOn: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.updateOn,
            nonNullable: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.nonNullable
        });
    if (controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.disabled) {
        result.disable();
    }
    ;
    return result;
}
function makeGroup(source, internalKey, options) {
    const controlOptions = getValidatorsOrNull(internalKey, options, false);
    const result = source instanceof (FormGroup) ?
        source :
        Object.entries(source).reduce((accumulator, entry) => {
            const key = entry[0];
            const value = entry[1];
            if (!(value instanceof Observable)) {
                accumulator.addControl(key, !!value && (value instanceof FormGroup || value instanceof FormArray || value instanceof FormControl) ?
                    value :
                    makeForm(value, makeNewMainMap(key, options)));
            }
            ;
            return accumulator;
        }, new FormGroup({}, {
            validators: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.validators,
            asyncValidators: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.asyncValidators,
            updateOn: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.updateOn,
        }));
    if (controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.disabled) {
        result.disable();
    }
    ;
    return result;
}
function makeArray(source, options) {
    const controlOptions = getValidatorsOrNull('main', options, false);
    const result = source instanceof FormArray ?
        source :
        new FormArray(source.map((item) => {
            const itemForm = makeForm(item, makeNewMainMap('mainItems', options));
            return itemForm;
        }), {
            validators: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.validators,
            asyncValidators: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.asyncValidators,
            updateOn: controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.updateOn
        });
    if (controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.disabled) {
        result.disable();
    }
    ;
    return result;
}

/*
 * Public API Surface of ngx-extended-form-builder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { liftValidationErrors, makeForm };
//# sourceMappingURL=axrl-ngx-extended-form-builder.mjs.map
