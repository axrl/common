import { Injectable, InjectionToken, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/portal';
import { isValue } from '../is-value';

interface SnackServiceConfig<T, D = any> {
  component: ComponentType<T>;
  snackBarConfig: MatSnackBarConfig<D>
}

/**
 * InjectionToken с компонентом, который будет отображаться в качестве Snackbar.
 * По умолчанию задано значение undefined - сервис использует встроенный в Angular Material компонент по умолчанию, иначе - используется компонент из токена.
 */
export const SNACK_SERVICE_COMPONENT = new InjectionToken<SnackServiceConfig<unknown> | undefined>('SNACK_SERVICE_COMPONENT', {
  providedIn: 'root',
  factory: () => undefined
});


@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private snackBar: MatSnackBar,
    @Inject(SNACK_SERVICE_COMPONENT) private snackServiceConfig: SnackServiceConfig<unknown> | undefined
  ) { }

  showText(message: string, isError: boolean = false, config?: MatSnackBarConfig) {
    return isValue(this.snackServiceConfig) ?
      this.snackBar.openFromComponent(this.snackServiceConfig.component, {
        duration: isError ? 5000 : 2000,
        ... this.snackServiceConfig.snackBarConfig,
        ...config
      }) :
      this.snackBar.open(message, 'OK', {
        duration: isError ? 5000 : 2000,
        ...config
      });
  }

}
