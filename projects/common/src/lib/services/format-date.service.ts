import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  constructor() { }

  private memory = new Map<string | number | Date, string>([]);

  getFromMemory(key: string) {
    return this.memory.get(key);
  }

  saveToMemory(key: string, value: string) {
    this.memory.set(key, value);
  }


}
