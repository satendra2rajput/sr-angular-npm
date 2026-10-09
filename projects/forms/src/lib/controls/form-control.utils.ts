import { AbstractControl, FormControl } from '@angular/forms';

/**
 * Set a value and optionally emit the value change event.
 */
export function setControlValue<T>(control: FormControl<T>, value: T, emitEvent = true): void {
  control.setValue(value, {
    emitEvent,
  });
}

/**
 * Reset a form control to a specific value.
 */
export function resetControl<T>(control: FormControl<T>, value?: T, emitEvent = true): void {
  control.reset(value, {
    emitEvent,
  });
}

/**
 * Enable a form control.
 */
export function enableControl(control: AbstractControl, emitEvent = true): void {
  control.enable({
    emitEvent,
  });
}

/**
 * Disable a form control.
 */
export function disableControl(control: AbstractControl, emitEvent = true): void {
  control.disable({
    emitEvent,
  });
}

/**
 * Mark a control as touched.
 */
export function markControlAsTouched(control: AbstractControl): void {
  control.markAsTouched();
}

/**
 * Mark a control as untouched.
 */
export function markControlAsUntouched(control: AbstractControl): void {
  control.markAsUntouched();
}

/**
 * Mark a control as dirty.
 */
export function markControlAsDirty(control: AbstractControl): void {
  control.markAsDirty();
}

/**
 * Mark a control as pristine.
 */
export function markControlAsPristine(control: AbstractControl): void {
  control.markAsPristine();
}

/**
 * Check whether a control has a specific validation error.
 */
export function hasControlError(control: AbstractControl, errorKey: string): boolean {
  return control.hasError(errorKey);
}

/**
 * Get a specific validation error.
 */
export function getControlError(control: AbstractControl, errorKey: string): unknown {
  return control.getError(errorKey);
}

/**
 * Check whether the control is valid.
 */
export function isControlValid(control: AbstractControl): boolean {
  return control.valid;
}

/**
 * Check whether the control is invalid.
 */
export function isControlInvalid(control: AbstractControl): boolean {
  return control.invalid;
}

/**
 * Check whether the control is touched.
 */
export function isControlTouched(control: AbstractControl): boolean {
  return control.touched;
}

/**
 * Check whether the control is dirty.
 */
export function isControlDirty(control: AbstractControl): boolean {
  return control.dirty;
}

/**
 * Update control validation.
 */
export function updateControlValidity(control: AbstractControl, emitEvent = true): void {
  control.updateValueAndValidity({
    emitEvent,
  });
}
