import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {makeForm} from './ngx-extended-form-builder';

interface TestOrder {
    total: number;
    state: 'CART' | 'ORDER';
    address: {
        streetId: undefined;
        street: null;
        home: null;
        apartment: null;
        entrance: null;
        doorphone: null;
        floor: null;
    };
    dishes: {
        id: string;
        name: string;
        description: string;
        price: number;
    }[];
    selfService: boolean;
}

describe('тесты создания формы функцией makeForm', () => {
    const testObject: TestOrder = {
        total: 1247,
        state: 'CART',
        address: {
            streetId: undefined,
            street: null,
            home: null,
            apartment: null,
            entrance: null,
            doorphone: null,
            floor: null,
        },
        dishes: [
            {
                id: 'uniq10aaa8693-f7dc-58de-823b-9cabed3174a2',
                name: 'Блинчик Фирменный',
                description: '150гр  тигровые креветки, авокадо, соус фирменный ',
                price: 539,
            },
        ],
        selfService: false,
    };

    const expectedForm = makeForm(testObject);

    it(`Для undefined - создан FormControl`, () => {
        const control = expectedForm.controls.address.controls.streetId;
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для null - создан FormControl`, () => {
        const control = expectedForm.controls.address.controls.street;
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для литерала - создан FormControl<тип литерала>`, () => {
        const control: FormControl<'CART' | 'ORDER'> = expectedForm.controls.state;
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для boolean - создан FormControl<boolean>`, () => {
        const control = expectedForm.controls.selfService;
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для number - создан FormControl<number|null>`, () => {
        const control = expectedForm.controls.total;
        expect(control instanceof FormControl).toBeTrue();
    });

    it(`Для массива - создан FormArray`, () => {
        const control = expectedForm.controls.dishes;
        expect(control instanceof FormArray).toBeTrue();
    });

    it(`Для объекта - создан FormGroup`, () => {
        expect(expectedForm instanceof FormGroup).toBeTrue();
    });
});
