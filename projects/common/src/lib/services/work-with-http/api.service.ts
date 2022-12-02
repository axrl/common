import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeHttpParams } from './params-and-header';
import type { ParamsAndHeaders } from './params-and-header';
import { map, catchError, throwError, BehaviorSubject } from 'rxjs';
import type { Observable, } from 'rxjs';
import { SnackService } from '../snack.service';

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
    private snack: SnackService
  ) { }

  private _isLoadingResults: BehaviorSubject<LoadingIndicator> = new BehaviorSubject<LoadingIndicator>(new LoadingIndicator());
  isLoadingResults$ = this._isLoadingResults.asObservable().pipe(
    map(
      indicator => indicator.isLoading
    )
  );

  changeLoadingStatus(start: boolean = false) {
    const loading = this._isLoadingResults.value;
    if (start) {
      loading.increment();
    } else {
      loading.decrement();
    };
    this._isLoadingResults.next(loading);
  };

  getData<T>(
    url: string,
    options: ParamsAndHeaders & { responseType?: 'json' | 'blob'; } = {}
  ): Observable<T> {
    this.changeLoadingStatus(true);
    return this.http.get<T>(url, {
      headers: options.headers,
      params: makeHttpParams(options?.params!, {})
    }).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
          return throwError(() => message);
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
    this.changeLoadingStatus(true);
    return this.http.post<TResponse>(url, body, options).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
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
    this.changeLoadingStatus(true);
    return this.http.post(url, body, { ...options, responseType: 'blob' }).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return <File>res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
          return throwError(() => message);
        })
    );
  }

  postNoData<TResponse>(
    url: string,
    options: ParamsAndHeaders = {}
  ): Observable<TResponse> {
    this.changeLoadingStatus(true);
    return this.postData<TResponse, null>(url, null, options ? options : {}).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
          return throwError(() => message);
        })
    );
  }

  delete<T>(url: string,
    params: { [param: string]: string | any; }
      = {}): Observable<T> {
    this.changeLoadingStatus(true);
    return this.http.delete<T>(url, { params: makeHttpParams(params, {}) }).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
          return throwError(() => message);
        })
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
    this.changeLoadingStatus(true);
    return this.http.put<TResponse>(url, body, options).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
          return throwError(() => message);
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
    this.changeLoadingStatus(true);
    return this.http.get<File>(url, options).pipe(
      map(
        res => {
          this.changeLoadingStatus();
          return res;
        }),
      catchError(
        (message: string) => {
          this.snack.showText(message, true);
          this.changeLoadingStatus();
          return throwError(() => message);
        })
    );
  }

}
