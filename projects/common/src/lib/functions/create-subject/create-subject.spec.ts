import {fakeAsync, tick} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs';
import {createSubject} from './create-subject';

describe('createSubject', () => {
    const testSource = {engineVersion: '1.1.0', transmissionVersion: '1.2.0'};
    const subject = createSubject(testSource);

    it(`Проверяем результат выполнения`, fakeAsync(() => {
        expect(subject instanceof BehaviorSubject).toBeTrue();
    }));

    it('Проверяем значение созданного BehaviorSubject', fakeAsync(() => {
        subject.subscribe(data => {
            expect(data).toEqual(testSource);
        });

        tick();
    }));
});
