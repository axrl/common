import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import type { MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Тип для InjectionToken с объектом конфигурации для SnackService для ситуации, в качестве Snackbar требуется отображать пользовательский компонент вместо 
 * встроенного в в Angular Material компонента по умолчанию.
 */
export interface SnackServiceConfig<T, D = any> {
  component: ComponentType<T>;
  snackBarConfig: MatSnackBarConfig<D>
}

/**
 * InjectionToken с объектом SnackServiceConfig - конфигурацией компонента , который будет отображаться в качестве Snackbar.
 * По умолчанию задано значение undefined - сервис использует встроенный в Angular Material компонент по умолчанию, иначе - используется компонент из токена.
 */
export const SNACK_SERVICE_CONFIG = new InjectionToken<SnackServiceConfig<unknown> | undefined>('SNACK_SERVICE_CONFIG', {
  providedIn: 'root',
  factory: () => undefined
});