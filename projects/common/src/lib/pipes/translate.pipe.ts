import { ChangeDetectorRef, Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { TranslationsService } from '../services';
import { AsyncPipe } from '@angular/common';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  private asyncPipe: AsyncPipe
  private _ref: ChangeDetectorRef | null

  constructor(
    private translationService: TranslationsService,
    ref: ChangeDetectorRef
  ) {
    this._ref = ref;
    this.asyncPipe = new AsyncPipe(this._ref);
  }

  transform(value?: string) {

    return this.asyncPipe.transform(
      this.translationService.translations$.pipe(
        map(
          translations => {
            this._ref?.markForCheck();
            return this.translationService.translate(translations, value)
          }
        )
      )
    )
  }

}
