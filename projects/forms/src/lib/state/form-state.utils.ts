import { AbstractControl } from "@angular/forms";
import { SRFormState } from "../models/form-error.model";

/**
 * Get the current state of a form control.
 */
export function getFormState(
  control: AbstractControl,
  submitted = false,
  submitting = false,
): SRFormState {
  return {
    valid: control.valid,

    invalid: control.invalid,

    pristine: control.pristine,

    dirty: control.dirty,

    touched: control.touched,

    untouched: control.untouched,

    submitted,

    submitting,

    disabled: control.disabled,

    pending: control.pending,
  };
}

/**
 * Check whether the form is ready for submission.
 */
export function isFormReadyForSubmit(
  control: AbstractControl,
  submitting = false,
): boolean {
  return control.valid && !control.disabled && !control.pending && !submitting;
}

/**
 * Check whether the form can currently be submitted.
 */
export function canSubmitForm(
  control: AbstractControl,
  submitting = false,
): boolean {
  return isFormReadyForSubmit(control, submitting);
}

/**
 * Check whether the form has been interacted with.
 */
export function hasFormInteraction(control: AbstractControl): boolean {
  return control.dirty || control.touched;
}

/**
 * Check whether the form is currently processing.
 */
export function isFormProcessing(
  control: AbstractControl,
  submitting = false,
): boolean {
  return control.pending || submitting;
}
