import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function required(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return {
        required: true,
      };
    }

    if (typeof value === 'string' && value.trim().length === 0) {
      return {
        required: true,
      };
    }

    return null;
  };
}
