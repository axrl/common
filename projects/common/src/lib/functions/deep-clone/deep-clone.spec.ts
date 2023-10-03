import {deepClone} from './deep-clone';

describe('deepClone', () => {
    const testSource = {
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

    const clone = deepClone(testSource);

    it(`Проверяем, что клон эквивалентен клону`, () => {
        expect(clone).toEqual(testSource);
    });

    it(`Проверяем, что у клона и оригинала разные ссылки на объект в памяти`, () => {
        expect(testSource === clone).toBeFalse();
    });
});
