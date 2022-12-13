import { Injectable } from '@angular/core';
import type { TemplateRef } from '@angular/core';
import type { ComponentType } from '@angular/cdk/portal';
import type { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { isValue } from '../is-value';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  closeAllDialogs(dialog: MatDialog) {
    dialog.closeAll();
  }

  getDialogOptions<D>(config?: MatDialogConfig<D>): MatDialogConfig<D> {
    const options: MatDialogConfig<D> = {
      autoFocus: 'dialog',
      maxWidth: '87vw',
      width: '87vw',
      closeOnNavigation: true,
      backdropClass: ['dialog-backdrop']
    };
    if (isValue(config)) {
      (<[keyof MatDialogConfig<D>, MatDialogConfig<D>[keyof MatDialogConfig<D>]][]>Object.entries(config)).forEach(
        ([key, value]) => {
          if (key == 'backdropClass') {
            if (Array.isArray(value)) {
              (<string[]>options.backdropClass).push(...value);
            } else {
              (<string[]>options.backdropClass).push(<string>config.backdropClass);
            };
          } else {
            Object.assign(options, { [key]: value });
          };
        });
    };
    return options;
  }

  openWindow<T, D = any, R = any>(dialog: MatDialog, T: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>) {
    return dialog.open<T, D, R>(
      T,
      this.getDialogOptions(config)
    );
  }

  openWindowAndWaitPromise<T, D = any, R = any>(dialog: MatDialog, T: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): Promise<R | undefined> {
    return firstValueFrom(
      dialog.open<T, D, R>(
        T,
        this.getDialogOptions(config)
      ).afterClosed()
    );
  }

}
