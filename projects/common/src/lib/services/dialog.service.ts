import type {ComponentType} from '@angular/cdk/portal';
import type {TemplateRef} from '@angular/core';
import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {firstValueFrom} from 'rxjs';
import {isValue, objectEntries} from '../functions';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private _dialog: MatDialog | null;

    constructor() {
        this._dialog =
            inject(MatDialog, {optional: true, skipSelf: true}) ??
            inject(MatDialog, {optional: true});
    }

    closeAllDialogs(dialog?: MatDialog): void {
        if (isValue(dialog)) {
            dialog.closeAll();
        } else {
            if (isValue(this._dialog)) {
                this._dialog.closeAll();
            } else {
                throw new Error('MatDialog не передан при вызове метода и не был обнаружен в DI.');
            }
        }
    }

    getDialogOptions<D>(config?: MatDialogConfig<D>): MatDialogConfig<D> {
        const options: MatDialogConfig<D> = {
            autoFocus: 'dialog',
            maxWidth: '87vw',
            closeOnNavigation: true,
        };

        if (isValue(config)) {
            objectEntries(config).forEach(([key, value]) => {
                Object.assign(options, {[key]: value});
            });
        }

        return options;
    }

    openWindow<T, D = any, R = any>(
        T: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>,
        dialog?: MatDialog,
    ): MatDialogRef<T, R> {
        if (isValue(dialog)) {
            return dialog.open<T, D, R>(T, this.getDialogOptions(config));
        } else {
            if (isValue(this._dialog)) {
                return this._dialog.open<T, D, R>(T, this.getDialogOptions(config));
            } else {
                throw new Error('MatDialog не передан при вызове метода и не был обнаружен в DI.');
            }
        }
    }

    openWindowAndWaitPromise<T, D = any, R = any>(
        T: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>,
        dialog?: MatDialog,
    ): Promise<R | undefined> {
        if (isValue(dialog)) {
            return firstValueFrom(
                dialog.open<T, D, R>(T, this.getDialogOptions(config)).afterClosed(),
            );
        } else {
            if (isValue(this._dialog)) {
                return firstValueFrom(
                    this._dialog.open<T, D, R>(T, this.getDialogOptions(config)).afterClosed(),
                );
            } else {
                throw new Error('MatDialog не передан при вызове метода и не был обнаружен в DI.');
            }
        }
    }
}
