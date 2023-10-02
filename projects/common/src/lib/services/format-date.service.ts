import {Injectable} from '@angular/core';

/**
 * Сервис-хранилище, используемый RuDateMediumPipe для кэширования результатов вызова.
 * Использование этого сервиса кем-либо, кроме непосредственно RuDateMediumPipe - не предполагается.
 */
@Injectable({
    providedIn: 'root',
})
export class FormatDatePipeMemoryService {
    private memory = new Map<string | number | Date, string>([]);

    constructor() {}

    getFromMemory(key: string): string | undefined {
        return this.memory.get(key);
    }

    saveToMemory(key: string, value: string): void {
        this.memory.set(key, value);
    }
}
