import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxLength(maxLengthValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value !== 'string' && !Array.isArray(value)) {
      return {
        maxLength: {
          requiredLength: maxLengthValue,
          actualLength: 0,
        },
      };
    }

    const actualLength = value.length;

    if (actualLength > maxLengthValue) {
      return {
        maxLength: {
          requiredLength: maxLengthValue,
          actualLength,
        },
      };
    }

    return null;
  };
}
