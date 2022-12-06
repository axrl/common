import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import type { Observable } from 'rxjs';
import { TranslationsService } from '../services';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationsService) { }

  transform(value?: string): Observable<string> {
    return this.translationService.translations$.pipe(
      map(
        translations => this.translationService.translate(translations, value)
      )
    );
  }

}
