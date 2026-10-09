import { FormArray, FormControl, FormGroup, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KudoFormBuilderService {
  control<T>(
    value: T,
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<T | null> {
    return new FormControl<T | null>(value, {
      validators,
      asyncValidators,
    });
  }

  group<T extends Record<string, unknown>>(controls: {
    [K in keyof T]: FormControl<T[K] | null> | FormGroup | FormArray;
  }): FormGroup {
    return new FormGroup(controls);
  }

  array<T>(controls: Array<FormControl<T | null> | FormGroup | FormArray> = []): FormArray {
    return new FormArray(controls);
  }

  requiredControl<T>(
    value: T | null = null,
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<T | null> {
    return this.control(value, validators, asyncValidators);
  }
}
