import {EventEmitter, Injectable} from '@angular/core';
import {Observable, catchError, concatMap, map, of, switchMap} from 'rxjs';
import {createObservable, isValue} from '../../functions';
import {ApiService} from './api.service';
import type {AdditionalActionCallbackFn, ParamsAndHeaders} from './params-and-header';

/**
 * Базовый интерфейс для всех событий HttpBusEvent
 */
export interface HttpBusBaseEventData<T> {
    cb: AdditionalActionCallbackFn<T>;
    errCb: AdditionalActionCallbackFn<unknown>;
}

export interface SendEventToBusFnParams<TResponse> {
    method: 'post' | 'post-blob' | 'post-text' | 'put' | 'delete' | 'get' | 'get-blob' | 'get-text';
    url: string;
    body?: any | null | undefined;
    cb?: AdditionalActionCallbackFn<TResponse>;
    errCb?: AdditionalActionCallbackFn<unknown>;
    params?: {[params: string]: any};
    headers?: {[header: string]: string};
    filename?: string;
}

export type HttpBusEventData<T> = HttpBusBaseEventData<T> &
    (
        | {
              method: 'post' | 'post-blob' | 'post-text' | 'put';
              url: string;
              body?: unknown | null;
              options: ParamsAndHeaders;
              filename?: string;
          }
        | {
              method: 'custom';
              customObservable: Observable<T>;
          }
        | {
              method: 'get' | 'get-blob' | 'get-text' | 'delete';
              url: string;
              options: ParamsAndHeaders;
              filename?: string;
          }
    );

export function blobDownloader(res: File, filename?: string): void {
    let link: HTMLAnchorElement | null = document.createElement('a');
    link.download = filename ? filename : res.name ? res.name : '';
    link.href = URL.createObjectURL(res);
    link.click();
    URL.revokeObjectURL(link.href);
    link = null;
}

@Injectable({
    providedIn: 'root',
})
export class HttpBusService {
    private _httpBus$ = new EventEmitter<HttpBusEventData<any>>();

    httpBus$ = this._httpBus$.pipe(
        switchMap(event => {
            return this.reducer(event).pipe(
                concatMap(result => of(result)),
                map(result => {
                    event.cb(result);
                }),
                catchError(err => {
                    if (isValue(event.errCb)) {
                        event.errCb(err);
                    }
                    return createObservable<void>(((): void => {})());
                }),
            );
        }),
    );

    constructor(private api: ApiService) {}

    sendEventToBus<TResponse>(options: SendEventToBusFnParams<TResponse>): void {
        this._httpBus$.emit({
            method: options.method,
            url: options.url,
            cb: isValue(options.cb) ? options.cb : (): void => {},
            errCb: isValue(options.errCb) ? options.errCb : (): void => {},
            body: options.body,
            options: {
                params: options.params,
                headers: options.headers,
            },
            filename: options.filename,
        });
    }

    destroyBus(): void {
        this._httpBus$.complete();
    }

    private reducer<T>(e: HttpBusEventData<T>): Observable<unknown> {
        switch (e.method) {
            case 'put':
                return this.api.putData(e.url, e.body!, e.options);
            case 'delete':
                return this.api.delete(e.url, e.options.params);
            case 'post':
                return this.api.postData(e.url, e.body, e.options);
            case 'post-text':
                return this.api.postData(e.url, e.body!, {
                    ...e.options,
                    responseType: 'text',
                });
            case 'post-blob':
                return this.api.postBlobData(e.url, e.body!, e.options).pipe(
                    map(result => {
                        blobDownloader(result, e.filename);
                        return {IsOk: true};
                    }),
                );
            case 'get':
                return this.api.getData(e.url, e.options);
            case 'get-text':
                return this.api.getData(e.url, {...e.options, responseType: 'text'});
            case 'get-blob':
                return this.api.getBlobData(e.url, e.options.params, e.options.headers).pipe(
                    map(result => {
                        blobDownloader(result, e.filename);
                        return {IsOk: true};
                    }),
                );
            case 'custom':
                return e.customObservable;
        }
    }
}
