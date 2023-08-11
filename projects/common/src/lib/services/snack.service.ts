import {Inject, Injectable} from '@angular/core';
import type {MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import type {SnackServiceConfig} from '../di-tokens';
import {SNACK_SERVICE_CONFIG} from '../di-tokens';
import {isValue} from '../functions';

@Injectable({
    providedIn: 'root',
})
export class SnackService {
    constructor(
        private snackBar: MatSnackBar,
        @Inject(SNACK_SERVICE_CONFIG)
        private snackServiceConfig: SnackServiceConfig<unknown> | undefined,
    ) {}

    showText(
        message: string,
        isError: boolean = false,
        config?: MatSnackBarConfig,
    ): MatSnackBarRef<unknown> {
        return isValue(this.snackServiceConfig)
            ? this.snackBar.openFromComponent(this.snackServiceConfig.component, {
                  duration: isError ? 5000 : 2000,
                  ...this.snackServiceConfig.snackBarConfig(message, isError),
                  ...config,
              })
            : this.snackBar.open(message, 'OK', {
                  duration: isError ? 5000 : 2000,
                  ...config,
              });
    }
}
