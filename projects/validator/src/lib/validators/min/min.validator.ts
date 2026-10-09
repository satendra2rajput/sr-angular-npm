import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function min(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue) || numericValue < minValue) {
      return {
        min: {
          min: minValue,
          actual: value,
        },
      };
    }

    return null;
  };
}
