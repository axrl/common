import {fakeAsync, tick} from '@angular/core/testing';
import {Subject, of} from 'rxjs';
import {distinctUntilObjectChanged} from './distinctUntilObjectChanged';

describe('distinctUntilObjectChanged', () => {
    const testSource = [
        {engineVersion: '1.1.0', transmissionVersion: '1.2.0'},
        {engineVersion: '1.1.0', transmissionVersion: '1.2.0'},

        {engineVersion: '1.1.0', transmissionVersion: '1.4.0'},
        {engineVersion: '1.1.0', transmissionVersion: '1.4.0'},

        {engineVersion: '1.3.0', transmissionVersion: '1.4.0'},
        {engineVersion: '1.3.0', transmissionVersion: '1.4.0'},

        {engineVersion: '1.3.0', transmissionVersion: '1.5.0'},
        {engineVersion: '1.3.0', transmissionVersion: '1.5.0'},

        {engineVersion: '2.0.0', transmissionVersion: '1.5.0'},
        {engineVersion: '2.0.0', transmissionVersion: '1.5.0'},
    ];
    it(`Проверяем, сколько раз был вызыван метод next() у подписчика потока Observable.
    В потоке 10 значений, но изменяется оно только 5 раз.`, fakeAsync(() => {
        const stream = of(...testSource).pipe(distinctUntilObjectChanged());
        const subscriber = new Subject();
        const spy = spyOn(subscriber, 'next');
        stream.subscribe(subscriber);
        tick(2000);
        expect(spy.calls.count()).toEqual(5);
    }));
});
