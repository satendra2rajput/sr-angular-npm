import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface UrlValidatorOptions {
  protocols?: string[];
  requireProtocol?: boolean;
}

export function url(options: UrlValidatorOptions = {}): ValidatorFn {
  const { protocols = ['http:', 'https:'], requireProtocol = true } = options;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value !== 'string') {
      return {
        url: {
          value,
        },
      };
    }

    const normalizedValue = value.trim();

    try {
      const urlValue = requireProtocol
        ? new URL(normalizedValue)
        : new URL(
            normalizedValue.match(/^[a-z][a-z\d+\-.]*:/i)
              ? normalizedValue
              : `https://${normalizedValue}`,
          );

      if (protocols.length > 0 && !protocols.includes(urlValue.protocol)) {
        return {
          url: {
            value,
            protocol: urlValue.protocol,
          },
        };
      }

      return null;
    } catch {
      return {
        url: {
          value,
        },
      };
    }
  };
}
