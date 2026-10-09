import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pattern(patternValue: string | RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const regex = typeof patternValue === 'string' ? new RegExp(patternValue) : patternValue;

    regex.lastIndex = 0;

    const isValid = regex.test(String(value));

    regex.lastIndex = 0;

    if (!isValid) {
      return {
        pattern: {
          requiredPattern: regex.toString(),
          actualValue: value,
        },
      };
    }

    return null;
  };
}
