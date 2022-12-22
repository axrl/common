import { Injectable, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { MatSnackBarConfig } from '@angular/material/snack-bar';
import { isValue } from '../functions';
import { SNACK_SERVICE_CONFIG } from '../di-tokens';
import type { SnackServiceConfig } from '../di-tokens';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private snackBar: MatSnackBar,
    @Inject(SNACK_SERVICE_CONFIG) private snackServiceConfig: SnackServiceConfig<unknown> | undefined
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
