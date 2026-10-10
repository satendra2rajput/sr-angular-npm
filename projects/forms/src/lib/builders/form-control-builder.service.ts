import { Injectable } from "@angular/core";
import { FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class SRFormControlBuilderService {
  text(
    value: string = "",
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<string> {
    return new FormControl(value, {
      nonNullable: true,
      validators,
      asyncValidators,
    });
  }

  email(
    value: string = "",
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<string> {
    return new FormControl(value, {
      nonNullable: true,
      validators,
      asyncValidators,
    });
  }

  number(
    value: number = 0,
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<number> {
    return new FormControl(value, {
      nonNullable: true,
      validators,
      asyncValidators,
    });
  }

  boolean(
    value: boolean = false,
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<boolean> {
    return new FormControl(value, {
      nonNullable: true,
      validators,
      asyncValidators,
    });
  }

  nullable<T>(
    value: T | null = null,
    validators: ValidatorFn[] = [],
    asyncValidators: AsyncValidatorFn[] = [],
  ): FormControl<T | null> {
    return new FormControl(value, {
      validators,
      asyncValidators,
    });
  }
}
