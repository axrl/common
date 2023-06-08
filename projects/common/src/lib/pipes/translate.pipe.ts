import { ChangeDetectorRef, Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { TranslationsService } from '../services';
import { isValue } from '../functions';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private asyncPipe: AsyncPipe;
  private _ref: ChangeDetectorRef | null;

  constructor(
    private translationService: TranslationsService,
    ref: ChangeDetectorRef
  ) {
    this._ref = ref;
    this.asyncPipe = new AsyncPipe(this._ref);
  }

  transform(value?: string | null) {
    return !isValue(value)
      ? null
      : this.asyncPipe.transform(
          this.translationService.translations$.pipe(
            map((translations) =>
              this.translationService.translate(translations, value)
            )
          )
        );
  }
}
