import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minLength(minLengthValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value !== 'string' && !Array.isArray(value)) {
      return {
        minLength: {
          requiredLength: minLengthValue,
          actualLength: 0,
        },
      };
    }

    const actualLength = value.length;

    if (actualLength < minLengthValue) {
      return {
        minLength: {
          requiredLength: minLengthValue,
          actualLength,
        },
      };
    }

    return null;
  };
}
