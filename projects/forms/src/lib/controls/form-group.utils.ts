import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Get a control from a form group.
 */
export function getFormControl(form: FormGroup, controlName: string): AbstractControl | null {
  return form.get(controlName);
}

/**
 * Check whether a control exists in the form group.
 */
export function hasFormControl(form: FormGroup, controlName: string): boolean {
  return form.get(controlName) !== null;
}

/**
 * Set form group value.
 */
export function setFormValue(
  form: FormGroup,
  value: Record<string, unknown>,
  emitEvent = true,
): void {
  form.setValue(value, {
    emitEvent,
  });
}

/**
 * Patch form group value.
 */
export function patchFormValue(
  form: FormGroup,
  value: Record<string, unknown>,
  emitEvent = true,
): void {
  form.patchValue(value, {
    emitEvent,
  });
}

/**
 * Reset the complete form.
 */
export function resetForm(
  form: FormGroup,
  value?: Record<string, unknown>,
  emitEvent = true,
): void {
  form.reset(value, {
    emitEvent,
  });
}

/**
 * Mark all controls as touched.
 */
export function markFormAsTouched(form: FormGroup): void {
  form.markAllAsTouched();
}

/**
 * Mark the form as dirty.
 */
export function markFormAsDirty(form: FormGroup): void {
  form.markAsDirty();
}

/**
 * Mark the form as pristine.
 */
export function markFormAsPristine(form: FormGroup): void {
  form.markAsPristine();
}

/**
 * Mark the form as untouched.
 */
export function markFormAsUntouched(form: FormGroup): void {
  form.markAsUntouched();
}

/**
 * Enable the complete form.
 */
export function enableForm(form: FormGroup, emitEvent = true): void {
  form.enable({
    emitEvent,
  });
}

/**
 * Disable the complete form.
 */
export function disableForm(form: FormGroup, emitEvent = true): void {
  form.disable({
    emitEvent,
  });
}

/**
 * Check whether the form is valid.
 */
export function isFormValid(form: FormGroup): boolean {
  return form.valid;
}

/**
 * Check whether the form is invalid.
 */
export function isFormInvalid(form: FormGroup): boolean {
  return form.invalid;
}

/**
 * Check whether the form is dirty.
 */
export function isFormDirty(form: FormGroup): boolean {
  return form.dirty;
}

/**
 * Check whether the form is touched.
 */
export function isFormTouched(form: FormGroup): boolean {
  return form.touched;
}

/**
 * Update form validation.
 */
export function updateFormValidity(form: FormGroup, emitEvent = true): void {
  form.updateValueAndValidity({
    emitEvent,
  });
}
