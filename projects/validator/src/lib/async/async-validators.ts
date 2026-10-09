import { AsyncValidatorFn } from '@angular/forms';

import { asyncValidator, KeAsyncValidatorFn, KeAsyncValidatorOptions } from './async.validator';

import { unique, KeUniqueCheckFn, KeUniqueValidatorOptions } from './unique';

import { exists, KeExistsCheckFn, KeExistsValidatorOptions } from './exists';

export class KeAsyncValidators {
  static async<T = unknown>(
    validator: KeAsyncValidatorFn<T>,
    options?: KeAsyncValidatorOptions,
  ): AsyncValidatorFn {
    return asyncValidator(validator, options);
  }

  static unique<T = unknown>(
    check: KeUniqueCheckFn<T>,
    options?: KeUniqueValidatorOptions,
  ): AsyncValidatorFn {
    return unique(check, options);
  }

  static exists<T = unknown>(
    check: KeExistsCheckFn<T>,
    options?: KeExistsValidatorOptions,
  ): AsyncValidatorFn {
    return exists(check, options);
  }
}
