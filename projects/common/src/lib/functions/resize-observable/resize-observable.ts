import {Observable} from 'rxjs';

export function resizeObservable(element: Element): Observable<ResizeObserverEntry[]> {
    return new Observable(subscriber => {
        const resize = new ResizeObserver(entries => {
            subscriber.next(entries);
        });

        resize.observe(element);

        return function unsubscribe() {
            resize.unobserve(element);
        };
    });
}
