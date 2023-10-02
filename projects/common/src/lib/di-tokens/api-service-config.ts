import {InjectionToken} from '@angular/core';

const noTransFormIncomingDataFn = <T>(res: unknown): T => res as T;

/**
 * Описание типа для функций трансформации данных, полученных при использовании методов @method `ApiService.getData<T>`
 */
export type TransformIncomingDataFn = <T>(res: unknown) => T;

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании методов @method `ApiService.getData<T>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_GET_MAP_FN = new InjectionToken<TransformIncomingDataFn>(
    'API_SERVICE_GET_MAP_FN',
    {
        providedIn: 'root',
        factory: (): TransformIncomingDataFn => noTransFormIncomingDataFn,
    },
);

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании
 * @method `ApiService.postData<TResponse,TBody>` и @method `ApiService.postNoData<TResponse>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_POST_MAP_FN = new InjectionToken<TransformIncomingDataFn>(
    'API_SERVICE_POST_MAP_FN',
    {
        providedIn: 'root',
        factory: (): TransformIncomingDataFn => noTransFormIncomingDataFn,
    },
);

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании
 * @method `ApiService.putData<TResponse,TBody>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_PUT_MAP_FN = new InjectionToken<TransformIncomingDataFn>(
    'API_SERVICE_PUT_MAP_FN',
    {
        providedIn: 'root',
        factory: (): TransformIncomingDataFn => noTransFormIncomingDataFn,
    },
);

/**
 * InjectionToken с функцией, которая будет применяться ко всем данным, полученным при использовании
 * @method `ApiService.delete<T>` .
 * По умолчанию -  (data) => data (преобразование данных не происходит) ;
 */
export const API_SERVICE_DELETE_MAP_FN = new InjectionToken<TransformIncomingDataFn>(
    'API_SERVICE_DELETE_MAP_FN',
    {
        providedIn: 'root',
        factory: (): TransformIncomingDataFn => noTransFormIncomingDataFn,
    },
);
