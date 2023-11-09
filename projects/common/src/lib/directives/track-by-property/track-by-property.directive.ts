import {NgForOf} from '@angular/common';
import {Directive, Host, Input} from '@angular/core';

@Directive({
    selector: '[ngForTrackByProperty]',
    standalone: true,
})
export class TrackByPropertyDirective<T = unknown> {
    /**
     * Название уникального свойства объекта
     */
    @Input('ngForTrackByProperty')
    _property?: keyof T;

    public constructor(@Host() protected readonly _ngFor: NgForOf<T>) {
        this._ngFor.ngForTrackBy = (i: number, item: T): number | T[keyof T] =>
            this._property ? item[this._property] : i;
    }
}
