import { Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import { isValue } from '@axrl/common';

@Pipe({
  name: 'controlErrorMessage',
  standalone: true
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(control: AbstractControl | undefined): string {
    const errors = control?.errors;
    if (isValue(control) && isValue(errors)) {
      const keys = Object.keys(errors);
      switch (true) {
        case keys.includes('required'): return 'field_is_required';
        case keys.includes('pattern'): return 'field_incorrect_pattern';
        case keys.includes('maxlength'): return 'field_incorrect_maxlength';
        case keys.includes('max'): return 'field_incorrect_max_value';
        case keys.includes('min'): return 'field_incorrect_min_value';
        case keys.includes('email'): return 'field_incorrect_email';
        default: return keys.length > 0 ? errors[keys[0]] : '';
      }
    } else {
      return '';
    };
  }

}
