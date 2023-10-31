import {isValue} from './is-value';

describe('isValue', () => {
    const testArray: Array<string | null> = ['value', '', null];
    const testCases: Array<{value: unknown; expectResult: boolean}> = [
        {value: testArray[0], expectResult: true},
        {value: testArray[1], expectResult: true},
        {value: testArray[5], expectResult: false},
        {value: testArray[2], expectResult: false},
        {value: 0, expectResult: true},
        {value: 1000, expectResult: true},
        {value: [], expectResult: true},
        {value: {}, expectResult: true},
        {value: false, expectResult: true},
        {value: undefined, expectResult: false},
        {value: null, expectResult: false},
    ];

    testCases.forEach(testCase =>
        it(`Проверка для значения  ${testCase.value}.`, () => {
            expect(isValue(testCase.value)).toBe(testCase.expectResult);
        }),
    );
});
