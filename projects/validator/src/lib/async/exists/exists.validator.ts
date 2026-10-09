import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { Observable, catchError, defer, map, of } from 'rxjs';

export interface KeExistsValidatorOptions {
  errorKey?: string;
  skipEmpty?: boolean;
}

export type KeExistsCheckFn<T = unknown> = (
  value: T,
  control: AbstractControl,
) => Observable<boolean> | Promise<boolean>;

export function exists<T = unknown>(
  check: KeExistsCheckFn<T>,
  options: KeExistsValidatorOptions = {},
): AsyncValidatorFn {
  const { errorKey = 'exists', skipEmpty = true } = options;

  return (control: AbstractControl) => {
    const value = control.value;

    if (skipEmpty && (value === null || value === undefined || value === '')) {
      return of(null);
    }

    return defer(() => check(value, control)).pipe(
      map((doesExist) =>
        doesExist
          ? null
          : {
              [errorKey]: {
                value,
                exists: false,
              },
            },
      ),
      catchError(() =>
        of({
          [errorKey]: {
            value,
            exists: false,
          },
        }),
      ),
    );
  };
}
