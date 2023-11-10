import {NgForOf} from '@angular/common';
import {Directive, Host, Input} from '@angular/core';

/**
 *  Трекинг для ngFor на основе кастомного свойства
 *
 * @usage
 *
 * В классе компонента:
 *
 *
 * ```*.component.ts
 * ...
 * items = [{id: 1}, {id: 2}, {id: 3}]
 * ...
 * ```
 *
 * И теперь в шаблоне:
 *
 *```*.component.html
 * ...
 * <ul>
 *   <li *ngFor="let item of items; trackByProperty: 'id'">{{ item.id }}</li>
 *  </ul>
 * ...
 *```
 */
@Directive({
    selector: '[ngForTrackByProperty]',
    standalone: true,
})
export class TrackByPropertyDirective<T extends unknown> {
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

/**
 * Частный случай TrackByPropertyDirective - трекинг на основе значения свойства `id`
 * @usage
 *
 * В классе компонента:
 *
 *
 * ```*.component.ts
 * ...
 * items = [{id: 1}, {id: 2}, {id: 3}]
 * ...
 * ```
 *
 * И теперь в шаблоне:
 *
 *```*.component.html
 * ...
 * <ul>
 *   <li *ngFor="let item of items; trackById">{{ item.id }}</li>
 *  </ul>
 * ...
 *```
 */
@Directive({
    selector: '[ngForTrackById]',
    standalone: true,
})
export class TrackByIdDirective<T extends {id: unknown}> {
    public constructor(@Host() protected readonly _ngFor: NgForOf<T>) {
        this._ngFor.ngForTrackBy = (_: number, item: T): T['id'] => item.id;
    }
}

/**
 * Трекинг для ngFor на основе индекса
 * @usage
 *
 * В классе компонента:
 *
 *
 * ```*.component.ts
 * ...
 * items = [1, 2, 3];
 * ...
 * ```
 *
 * И теперь в шаблоне:
 *
 *```*.component.html
 * ...
 * <ul>
 *   <li *ngFor="let item of items; trackByIndex">{{ item.id }}</li>
 *  </ul>
 * ...
 *```
 */
@Directive({
    selector: '[ngForTrackByIndex]',
    standalone: true,
})
export class TrackByIndexDirective<T extends unknown> {
    public constructor(@Host() protected readonly _ngFor: NgForOf<T>) {
        this._ngFor.ngForTrackBy = (i: number, _: T): number | T[keyof T] => i;
    }
}
