import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar) { }

  showText(message: string, isError: boolean = false, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'OK', {
      duration: isError ? 5000 : 2000,
      ...config
    });
  }

}
