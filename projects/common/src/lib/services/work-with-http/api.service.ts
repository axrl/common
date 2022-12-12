import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeHttpParams } from './params-and-header';
import type { ParamsAndHeaders } from './params-and-header';
import { map, catchError, throwError, BehaviorSubject, of, switchMap } from 'rxjs';
import type { Observable, } from 'rxjs';
import { SnackService } from '../snack.service';
import { isValue } from '../../is-value';

const noTransFormIncomingDataFn = <T>(res: unknown): T => res as T;

type TransformIncomingDataFn = <T>(res: unknown) => T;

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании @method `ApiService.getData<T>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_GET_MAP_FN = new InjectionToken<TransformIncomingDataFn>('API_SERVICE_GET_MAP_FN', {
  providedIn: 'root',
  factory: () => noTransFormIncomingDataFn
});

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании 
 * @method `ApiService.postData<TResponse,TBody>` и @method `ApiService.postNoData<TResponse>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_POST_MAP_FN = new InjectionToken<TransformIncomingDataFn>('API_SERVICE_POST_MAP_FN', {
  providedIn: 'root',
  factory: () => noTransFormIncomingDataFn
});

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании 
 * @method `ApiService.putData<TResponse,TBody>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_PUT_MAP_FN = new InjectionToken<TransformIncomingDataFn>('API_SERVICE_PUT_MAP_FN', {
  providedIn: 'root',
  factory: () => noTransFormIncomingDataFn
});

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании 
 * @method `ApiService.delete<T>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_DELETE_MAP_FN = new InjectionToken<TransformIncomingDataFn>('API_SERVICE_DELETE_MAP_FN', {
  providedIn: 'root',
  factory: () => noTransFormIncomingDataFn
});

class LoadingIndicator {
  private count: number = 0;
  get isLoading(): boolean {
    return this.count > 0
  };

  increment() {
    this.count += 1;
  };

  decrement() {
    if (this.count !== 0) {
      this.count -= 1;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private snack: SnackService,
    @Inject(API_SERVICE_GET_MAP_FN) private methodGetMapFn: TransformIncomingDataFn,
    @Inject(API_SERVICE_POST_MAP_FN) private methodPostMapFn: TransformIncomingDataFn,
    @Inject(API_SERVICE_PUT_MAP_FN) private methodPutMapFn: TransformIncomingDataFn,
    @Inject(API_SERVICE_DELETE_MAP_FN) private methodDeleteMapFn: TransformIncomingDataFn
  ) { }

  private _isLoadingResults: BehaviorSubject<LoadingIndicator> = new BehaviorSubject<LoadingIndicator>(new LoadingIndicator());
  loadingIndicator$ = this._isLoadingResults.asObservable();
  isLoadingResults$ = this.loadingIndicator$.pipe(
    map(
      indicator => indicator.isLoading
    )
  );

  updateLoadingIndicator(newIndicator: LoadingIndicator) {
    this._isLoadingResults.next(newIndicator);
  }

  getData<T>(url: string, options: ParamsAndHeaders & { responseType: 'text' },): Observable<string>;
  getData<T>(url: string, options: ParamsAndHeaders & { responseType: 'arraybuffer' },): Observable<ArrayBuffer>;
  getData<T>(url: string, options: ParamsAndHeaders & { responseType: 'blob' },): Observable<File>;
  getData<T>(url: string, options?: ParamsAndHeaders & { responseType?: 'json' },): Observable<T>;
  getData<T>(url: string, options: ParamsAndHeaders & { responseType?: 'json' | 'blob' | 'text' | 'arraybuffer' } = {}) {
    const config = {
      headers: options.headers,
      params: makeHttpParams(options?.params!, {}),
      responseType: options.responseType ?? 'json'
    };
    const loading = this._isLoadingResults.value;
    return of(null).pipe(
      switchMap(
        () => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return options.responseType === 'text' ?
            this.http.get(url, { ...config, responseType: options.responseType }) :
            options.responseType === 'arraybuffer' ?
              this.http.get(url, { ...config, responseType: 'arraybuffer' }) :
              options.responseType === 'blob' ?
                this.http.get(url, { ...config, responseType: 'blob' }) :
                this.http.get<T>(url, { ...config, responseType: 'json' });
        }),
      map(
        res => {
          loading.decrement();
          this.updateLoadingIndicator(loading);
          return isValue(options.responseType) && ['text', 'arraybuffer', 'blob'].includes(options.responseType) ?
            res :
            this.methodGetMapFn<T>(res);
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          loading.decrement();
          this.updateLoadingIndicator(loading);
          return throwError(() => message);
        })


    )
  }

  getBlobData(url: string, params: { [param: string]: string | any; } = {}, headers?: { [header: string]: string; }) {
    const options: Record<string, string | any> = {
      responseType: 'blob', params: makeHttpParams(params, {})
    };
    if (headers) {
      options['headers'] = headers;
    };

    return this.getData<File>(url, options);
  }

  postData<TResponse, TBody>(url: string, body: TBody, options: ParamsAndHeaders & { responseType: 'text' },): Observable<string>;
  postData<TResponse, TBody>(url: string, body: TBody, options: ParamsAndHeaders & { responseType: 'arraybuffer' },): Observable<ArrayBuffer>;
  postData<TResponse, TBody>(url: string, body: TBody, options: ParamsAndHeaders & { responseType: 'blob' },): Observable<File>;
  postData<TResponse, TBody>(url: string, body: TBody, options?: ParamsAndHeaders & { responseType?: 'json' },): Observable<TResponse>;
  postData<TResponse, TBody>(url: string, body: TBody, options: ParamsAndHeaders & { responseType?: 'json' | 'blob' | 'text' | 'arraybuffer' } = {},) {
    const config = {
      headers: options.headers,
      params: makeHttpParams(options?.params!, {}),
      responseType: options.responseType ?? 'json'
    };
    const loading = this._isLoadingResults.value;

    return of(null).pipe(
      switchMap(
        () => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return options.responseType === 'text' ?
            this.http.post(url, body, { ...config, responseType: 'text' }) :
            options.responseType === 'arraybuffer' ?
              this.http.post(url, body, { ...config, responseType: 'arraybuffer' }) :
              options.responseType === 'blob' ?
                this.http.post(url, body, { ...config, responseType: 'blob' }) :
                this.http.post<TResponse>(url, body, { ...config, responseType: 'json' });
        }),
      map(
        res => {
          loading.decrement();
          this.updateLoadingIndicator(loading);;
          return this.methodPostMapFn<TResponse>(res);
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          loading.decrement();
          this.updateLoadingIndicator(loading);;
          return throwError(() => message);
        })
    );
  }

  postBlobData<TBody>(
    url: string,
    body: TBody,
    options: ParamsAndHeaders = {},
  ): Observable<File> {
    if (options) {
      if (options.params) {
        options.params = makeHttpParams(options.params, {});
      }
    };
    return this.postData<File, TBody>(url, body, { ...options, responseType: 'blob' });
  }

  postNoData<TResponse>(
    url: string,
    options: ParamsAndHeaders = {}
  ): Observable<TResponse> {

    return this.postData<TResponse, null>(url, null, options ? options : {}).pipe(
      map(
        res => this.methodPostMapFn<TResponse>(res)
      ),
    );
  }

  putData<TResponse, TBody>(
    url: string,
    body: TBody,
    options: ParamsAndHeaders = {}
  ): Observable<TResponse> {
    if (options && options.params) {
      options.params = makeHttpParams(options.params, {});
    };
    const loading = this._isLoadingResults.value;
    return of(null).pipe(
      switchMap(
        () => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.put<TResponse>(url, body, options);
        }),
      map(
        res => {
          loading.decrement();
          this.updateLoadingIndicator(loading);;
          return this.methodPutMapFn<TResponse>(res);
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          loading.decrement();
          this.updateLoadingIndicator(loading);;
          return throwError(() => message);
        })
    );
  }

  delete<T>(url: string,
    params: { [param: string]: string | any; }
      = {}): Observable<T> {
    const loading = this._isLoadingResults.value;

    return of(null).pipe(
      switchMap(
        () => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.delete<T>(url, { params: makeHttpParams(params, {}) });
        }),
      map(
        res => {
          loading.decrement();
          this.updateLoadingIndicator(loading);
          return this.methodDeleteMapFn<T>(res);
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          loading.decrement();
          this.updateLoadingIndicator(loading);
          return throwError(() => message);
        })
    );
  }

}
