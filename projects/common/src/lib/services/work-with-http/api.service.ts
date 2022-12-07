import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeHttpParams } from './params-and-header';
import type { ParamsAndHeaders } from './params-and-header';
import { map, catchError, throwError, BehaviorSubject, exhaustMap } from 'rxjs';
import type { Observable, } from 'rxjs';
import { SnackService } from '../snack.service';

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

  getData<T>(
    url: string,
    options: ParamsAndHeaders & { responseType?: 'json' | 'blob'; } = {}
  ): Observable<T> {

    return this._isLoadingResults.pipe(
      exhaustMap(
        loading => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.get<T>(url, {
            headers: options.headers,
            params: makeHttpParams(options?.params!, {})
          }).pipe(
            map(
              res => {
                loading.decrement();
                this.updateLoadingIndicator(loading);
                return this.methodGetMapFn<T>(res);
              }),
            catchError(
              (message: string) => {
                this.snack.showText(message, true);
                loading.decrement();
                this.updateLoadingIndicator(loading);
                return throwError(() => message);
              })
          );
        })
    );
  }

  postData<TResponse, TBody>(
    url: string,
    body: TBody,
    options: ParamsAndHeaders = {},
  ): Observable<TResponse> {
    if (options) {
      if (options.params) {
        options.params = makeHttpParams(options.params, {});
      }
    };

    return this._isLoadingResults.pipe(
      exhaustMap(
        loading => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.post<TResponse>(url, body, options).pipe(
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

    return this._isLoadingResults.pipe(
      exhaustMap(
        loading => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.post(url, body, { ...options, responseType: 'blob' }).pipe(
            map(
              res => {
                loading.decrement();
                this.updateLoadingIndicator(loading);;
                return <File>res;
              }),
            catchError(
              (message: string) => {
                this.snack.showText(message, true);
                loading.decrement();
                this.updateLoadingIndicator(loading);;
                return throwError(() => message);
              })
          );
        })
    );
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

    return this._isLoadingResults.pipe(
      exhaustMap(
        loading => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.put<TResponse>(url, body, options).pipe(
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
        })
    );
  }

  delete<T>(url: string,
    params: { [param: string]: string | any; }
      = {}): Observable<T> {

    return this._isLoadingResults.pipe(
      exhaustMap(
        loading => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.delete<T>(url, { params: makeHttpParams(params, {}) }).pipe(
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
                this.updateLoadingIndicator(loading);;
                return throwError(() => message);
              })
          );
        })
    );
  }

  getBlobData(url: string, params: { [param: string]: string | any; } = {}, headers?: { [header: string]: string; }) {
    const options: { [params: string]: string | any; } = {
      responseType: 'blob', params: makeHttpParams(params, {})
    };
    if (headers) {
      options['headers'] = headers;
    };

    return this._isLoadingResults.pipe(
      exhaustMap(
        loading => {
          loading.increment();
          this.updateLoadingIndicator(loading);
          return this.http.get<File>(url, options).pipe(
            map(
              res => {
                loading.decrement();
                this.updateLoadingIndicator(loading);
                return res;
              }),
            catchError(
              (message: string) => {
                this.snack.showText(message, true);
                loading.decrement();
                this.updateLoadingIndicator(loading);
                return throwError(() => message);
              })
          );
        })
    );
  }

}
