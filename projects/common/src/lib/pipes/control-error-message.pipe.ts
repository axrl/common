import { Pipe, InjectionToken, Inject } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import { isValue } from '../functions';

/**
 * InjectionToken с объектом-словарем сообщений об ошибке валидации контролов формы, используемым ControlErrorMessagePipe для форматирования.
 * Пайп проверяет список ошибок контрола и возвращает сообщение для первой найденной ошибки.
 * Если для такой ошибки в словаре определено сообщение - оно будет возвращено пайпом, иначе - фактический текст ошибки из контрола.
 */
export const CONTROL_ERROR_MESSAGES_PIPE_DICTIONARY = new InjectionToken<Record<string, string>>('CONTROL_ERROR_MESSAGES_PIPE_DICTIONARY', {
  providedIn: 'root',
  factory: () => {
    return {
      required: 'field_is_required',
      pattern: 'field_incorrect_pattern',
      maxlength: 'field_incorrect_maxlength',
      max: 'field_incorrect_max_value',
      min: 'field_incorrect_min_value',
      email: 'field_incorrect_email'
    };
  }
});

@Pipe({
  name: 'controlErrorMessage',
  standalone: true
})
export class ControlErrorMessagePipe implements PipeTransform {

  constructor(
    @Inject(CONTROL_ERROR_MESSAGES_PIPE_DICTIONARY) private controlErrorsMessagesPipeDictionary: Record<string, string>
  ) { };

  transform(control: AbstractControl): string {
    const errors = control.errors;
    let result = '';
    if (isValue(control) && isValue(errors)) {
      const keys = Object.keys(errors);

      if (keys.length > 0) {

        const key = keys[0];
        result = this.controlErrorsMessagesPipeDictionary[key] ?? (typeof errors[key] === 'string' ? errors[key] : JSON.stringify(errors[key]));
      };

    };

    console.log(control, result);
    return result;
  }

}
