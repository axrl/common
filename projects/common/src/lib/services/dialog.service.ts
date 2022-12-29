import { inject, Injectable } from '@angular/core';
import type { TemplateRef } from '@angular/core';
import type { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { isValue } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialog: MatDialog | null = inject(MatDialog, { optional: true, skipSelf: true }) ?? inject(MatDialog, { optional: true });

  constructor() { }

  closeAllDialogs(dialog?: MatDialog) {

    if (isValue(dialog)) {
      dialog.closeAll();
    } else {

      if (isValue(this.dialog)) {
        this.dialog.closeAll();
      } else {

        throw new Error('MatDialog не передан при вызове метода и не был обнаружен в DI.');
      };
    };
  }

  getDialogOptions<D>(config?: MatDialogConfig<D>): MatDialogConfig<D> {
    const options: MatDialogConfig<D> = {
      autoFocus: 'dialog',
      maxWidth: '87vw',
      closeOnNavigation: true,
    };

    if (isValue(config)) {
      (<[keyof MatDialogConfig<D>, MatDialogConfig<D>[keyof MatDialogConfig<D>]][]>Object.entries(config)).forEach(
        ([key, value]) => Object.assign(options, { [key]: value })
      );
    };

    return options;
  }

  openWindow<T, D = any, R = any>(T: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>, dialog?: MatDialog) {

    if (isValue(dialog)) {

      return dialog.open<T, D, R>(
        T,
        this.getDialogOptions(config)
      );
    } else {

      if (isValue(this.dialog)) {

        return this.dialog.open<T, D, R>(
          T,
          this.getDialogOptions(config)
        );
      } else {

        throw new Error('MatDialog не передан при вызове метода и не был обнаружен в DI.')
      };
    };
  }

  openWindowAndWaitPromise<T, D = any, R = any>(T: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>, dialog?: MatDialog): Promise<R | undefined> {

    if (isValue(dialog)) {

      return firstValueFrom(
        dialog.open<T, D, R>(
          T,
          this.getDialogOptions(config)
        ).afterClosed()
      );
    } else {

      if (isValue(this.dialog)) {

        return firstValueFrom(
          this.dialog.open<T, D, R>(
            T,
            this.getDialogOptions(config)
          ).afterClosed()
        );
      } else {

        throw new Error('MatDialog не передан при вызове метода и не был обнаружен в DI.')
      };
    };
  }

}
