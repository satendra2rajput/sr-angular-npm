import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function max(maxValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue) || numericValue > maxValue) {
      return {
        max: {
          max: maxValue,
          actual: value,
        },
      };
    }

    return null;
  };
}
