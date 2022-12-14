import { Injectable } from '@angular/core';

/**
 * Сервис-хранилище, используемый RuDateMediumPipe для кэширования результатов вызова.
 * Использование этого сервиса кем-либо, кроме непосредственно RuDateMediumPipe - не предполагается.
 */
@Injectable({
  providedIn: 'root'
})
export class FormatDatePipeMemoryService {

  constructor() { }

  private memory = new Map<string | number | Date, string>([]);

  getFromMemory(key: string) {
    return this.memory.get(key);
  }

  saveToMemory(key: string, value: string) {
    this.memory.set(key, value);
  }

}
