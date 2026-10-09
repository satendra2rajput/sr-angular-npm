import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { Observable, catchError, defer, map, of } from 'rxjs';

export interface KeUniqueValidatorOptions {
  errorKey?: string;
  skipEmpty?: boolean;
}

export type KeUniqueCheckFn<T = unknown> = (
  value: T,
  control: AbstractControl,
) => Observable<boolean> | Promise<boolean>;

export function unique<T = unknown>(
  check: KeUniqueCheckFn<T>,
  options: KeUniqueValidatorOptions = {},
): AsyncValidatorFn {
  const { errorKey = 'unique', skipEmpty = true } = options;

  return (control: AbstractControl) => {
    const value = control.value;

    if (skipEmpty && (value === null || value === undefined || value === '')) {
      return of(null);
    }

    return defer(() => check(value, control)).pipe(
      map((isAvailable) =>
        isAvailable
          ? null
          : {
              [errorKey]: {
                value,
                available: false,
              },
            },
      ),
      catchError(() =>
        of({
          [errorKey]: {
            value,
            available: false,
          },
        }),
      ),
    );
  };
}
