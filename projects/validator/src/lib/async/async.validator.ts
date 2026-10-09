import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { Observable, catchError, defer, map, of } from 'rxjs';

export type KeAsyncValidationResponse = boolean | null | ValidationErrors;

export type KeAsyncValidatorFn<T = unknown> = (
  value: T,
  control: AbstractControl,
) => Observable<KeAsyncValidationResponse> | Promise<KeAsyncValidationResponse>;

export interface KeAsyncValidatorOptions {
  errorKey?: string;
  skipEmpty?: boolean;
}

export function asyncValidator<T = unknown>(
  validator: KeAsyncValidatorFn<T>,
  options: KeAsyncValidatorOptions = {},
): AsyncValidatorFn {
  const { errorKey = 'asyncValidation', skipEmpty = true } = options;

  return (control: AbstractControl) => {
    const value = control.value;

    if (skipEmpty && (value === null || value === undefined || value === '')) {
      return of(null);
    }

    return defer(() => validator(value, control)).pipe(
      map((result) => {
        if (result === null || result === true) {
          return null;
        }

        if (result === false) {
          return {
            [errorKey]: true,
          };
        }

        return result;
      }),
      catchError(() =>
        of({
          [errorKey]: true,
        }),
      ),
    );
  };
}
