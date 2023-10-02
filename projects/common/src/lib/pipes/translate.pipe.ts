import {AsyncPipe} from '@angular/common';
import type {PipeTransform} from '@angular/core';
import {ChangeDetectorRef, Pipe} from '@angular/core';
import {map} from 'rxjs';
import {isValue} from '../functions';
import {TranslationsService} from '../services';

@Pipe({
    name: 'translate',
    // eslint-disable-next-line @angular-eslint/no-pipe-impure
    pure: false,
    standalone: true,
})
export class TranslatePipe implements PipeTransform {
    private asyncPipe: AsyncPipe;
    private _ref: ChangeDetectorRef | null;

    constructor(
        private translationService: TranslationsService,
        ref: ChangeDetectorRef,
    ) {
        this._ref = ref;
        this.asyncPipe = new AsyncPipe(this._ref);
    }

    transform(value?: string | null): string | null {
        return !isValue(value)
            ? null
            : this.asyncPipe.transform(
                  this.translationService.translations$.pipe(
                      map(translations => this.translationService.translate(translations, value)),
                  ),
              );
    }
}
