import { Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { isValue } from '../functions';
import { FormatDatePipeMemoryService } from '../services/format-date.service';

@Pipe({
  name: 'ruDateMedium',
  standalone: true
})

/**
* На вход принимается value в UTC-time. Пайп может принимать как уже готовую JS-дату, так и строковые представления дат либо timestamp.
* Для корректного рназбора значение в любом случае приводится к timestamp в миллисекундах.
* Далее вычисляется текущее смещение локального времени пользователя от UTC (в минутах) и умножается на 60 000 для приведения значения к миллисекундам.
* Поскольку getTimezoneOffset() возвращает отрицательное значение, умножение происходит также на -60000.
* Сложив timestamp, рассчитанный из value с вычисленным смещением получаем value, приведенное к локальному для пользователя времени и форматируем его,
* используя встроенный в angular функционал - функцию formatDate()
* @param value - время UTC
*/
export class RuDateMediumPipe implements PipeTransform {

  constructor(
    /** @internal */
    private formatDatePipeMemoryService: FormatDatePipeMemoryService,
  ) { }

  transform(value: string | number | Date | undefined, mode: 'short' | 'long' | 'time' = 'short'): string {
    const valueToString = String(value);
    const memoryValue = this.formatDatePipeMemoryService.getFromMemory(valueToString);
    if (isValue(memoryValue)) {
      return memoryValue;
    } else {
      const dateRegExp = /(^(\d{4})[-\\\/\.](\d\d)[-\\\/\.](\d\d))|(^(\d\d)[-\\\/\.](\d\d)[-\\\/\.](\d{4}))/;
      const result = value == null || value == undefined || value === '' ?
        /** для невалидных значений - возвращаем пустую строку */
        '' :
        /**
         * Возвращаем результат работы функции форматирования даты в случаях:
         * - если value - объект Date,
         * - если value - число, при этом:
         *    1. преобразование этого числа в дату вернет дату позднее 1.1.2000 года (для этого число должно быть больше 946684800000)
         *    2. Если число больше 946684800000 - оно не является GTIN ( не проходит проверку контрольной цифры) - проверяется в методе isGtin()
         * - если value - строка, соответствующая регулярному выражению dateRegExp
         * Иначе возвращаем результат преобразования исходного значения в строку
        */
        value instanceof Date || (typeof value === 'number' && value > 946684800000) || dateRegExp.test(valueToString) ?
          formatDate(
            (
              typeof value == 'number' ? value : Date.parse(valueToString)
            ) + new Date().getTimezoneOffset() * (-60000), mode == 'long' ? 'dd.MM.yyyy HH:mm' : mode == 'time' ? 'HH:mm' : 'dd.MM.yyyy', 'en'
          ) :
          /** иначе - возвращаем исходное значение */
          valueToString;
      this.formatDatePipeMemoryService.saveToMemory(valueToString, result);
      return result;
    }
  }

}