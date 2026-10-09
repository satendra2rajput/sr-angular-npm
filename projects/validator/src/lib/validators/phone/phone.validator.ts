import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface PhoneValidatorOptions {
  minLength?: number;
  maxLength?: number;
  allowSpaces?: boolean;
  allowPlus?: boolean;
  allowHyphens?: boolean;
}

export function phone(options: PhoneValidatorOptions = {}): ValidatorFn {
  const {
    minLength = 10,
    maxLength = 15,
    allowSpaces = true,
    allowPlus = true,
    allowHyphens = true,
  } = options;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value !== 'string') {
      return {
        phone: {
          value,
        },
      };
    }

    const normalized = value.trim();

    const allowedCharacters = new RegExp(
      `^[0-9${allowPlus ? '+' : ''}${allowSpaces ? '\\s' : ''}${allowHyphens ? '-' : ''}]+$`,
    );

    if (!allowedCharacters.test(normalized)) {
      return {
        phone: {
          value,
          reason: 'invalidCharacters',
        },
      };
    }

    const digits = normalized.replace(/\D/g, '');

    if (digits.length < minLength || digits.length > maxLength) {
      return {
        phone: {
          value,
          minLength,
          maxLength,
        },
      };
    }

    return null;
  };
}
