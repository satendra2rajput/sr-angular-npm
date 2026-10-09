import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

/**
 * Patch partial values into a FormGroup.
 */
export function patchFormGroup(
  form: FormGroup,
  value: Record<string, unknown>,
  emitEvent = true,
): void {
  form.patchValue(value, {
    emitEvent,
  });
}

/**
 * Patch a single control.
 */
export function patchFormControl(
  form: FormGroup,
  controlName: string,
  value: unknown,
  emitEvent = true,
): boolean {
  const control = form.get(controlName);

  if (!control) {
    return false;
  }

  control.patchValue(value, {
    emitEvent,
  });

  return true;
}

/**
 * Patch multiple controls individually.
 */
export function patchFormControls(
  form: FormGroup,
  values: Record<string, unknown>,
  emitEvent = true,
): string[] {
  const updatedControls: string[] = [];

  Object.entries(values).forEach(([controlName, value]) => {
    const control = form.get(controlName);

    if (!control) {
      return;
    }

    control.patchValue(value, {
      emitEvent,
    });

    updatedControls.push(controlName);
  });

  return updatedControls;
}

/**
 * Patch a control inside a FormArray.
 */
export function patchFormArrayControl(
  formArray: FormArray,
  index: number,
  value: unknown,
  emitEvent = true,
): boolean {
  if (index < 0 || index >= formArray.length) {
    return false;
  }

  const control = formArray.at(index);

  control.patchValue(value, {
    emitEvent,
  });

  return true;
}

/**
 * Patch a value and update validity.
 */
export function patchAndValidate(control: AbstractControl, value: unknown, emitEvent = true): void {
  control.patchValue(value, {
    emitEvent,
  });

  control.updateValueAndValidity({
    emitEvent,
  });
}
