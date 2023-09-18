import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {makeForm} from './ngx-extended-form-builder';

describe('тесты создания формы функцией makeForm', () => {
    const testSource = [
        {engineVersion: '1.1.0', transmissionVersion: '1.2.0'},
        {engineVersion: '1.1.0', transmissionVersion: '1.4.0'},
        {engineVersion: '1.3.0', transmissionVersion: '1.4.0'},
        {engineVersion: '1.3.0', transmissionVersion: '1.5.0'},
        {engineVersion: '2.0.0', transmissionVersion: '1.5.0'},
    ];
    it(`Для undefined - создан FormControl`, () => {
        const control = makeForm(undefined);
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для null - создан FormControl`, () => {
        const control = makeForm(null);
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для boolean - создан FormControl<boolean>`, () => {
        const control: FormControl<boolean> = makeForm(true);
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для литерала - создан FormControl<тип литерала>`, () => {
        const control: FormControl<'true' | 'false'> = makeForm<'true' | 'false'>('true');
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для number - создан FormControl<number>`, () => {
        const control: FormControl<number> = makeForm(100);
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для массива - создан FormArray`, () => {
        const control = makeForm(testSource);
        expect(control instanceof FormArray).toBeTrue();
    });

    it(`Для объекта - создан FormGroup`, () => {
        const control = makeForm(testSource[1]);
        expect(control instanceof FormGroup).toBeTrue();
    });
});
