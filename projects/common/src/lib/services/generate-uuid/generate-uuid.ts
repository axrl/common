import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {generateUUIDFn} from '../../functions';

/** Сервис для генерации UUID */
@Injectable({
    providedIn: 'root',
})
export class GenerateUUIDService {
    private readonly win: (Window & typeof globalThis) | null;

    constructor() {
        this.win = inject(DOCUMENT).defaultView;
    }

    /** Генерирует и возвращает UUID */
    getGUID(): string {
        return generateUUIDFn(this.win);
    }
}
