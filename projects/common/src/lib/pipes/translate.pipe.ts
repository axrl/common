import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
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

  constructor(
    private translationService: TranslationsService,
    ref: ChangeDetectorRef
  ) {
    this.asyncPipe = new AsyncPipe(ref);
  }

  transform(value?: string) {

    return this.asyncPipe.transform(
      this.translationService.translations$.pipe(
        map(
          translations => this.translationService.translate(translations, value)
        )
      )
    )
  }

}
