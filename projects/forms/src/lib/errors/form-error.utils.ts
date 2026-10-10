import { AbstractControl, ValidationErrors } from "@angular/forms";
import { SRFormError } from "../models/form-state.model";

/**
 * Get all validation error keys from a control.
 */
export function getErrorKeys(control: AbstractControl): string[] {
  if (!control.errors) {
    return [];
  }

  return Object.keys(control.errors);
}

/**
 * Check whether a control has any validation error.
 */
export function hasAnyError(control: AbstractControl): boolean {
  return control.errors !== null;
}

/**
 * Get the first validation error key.
 */
export function getFirstErrorKey(control: AbstractControl): string | null {
  const keys = getErrorKeys(control);

  return keys.length > 0 ? keys[0] : null;
}

/**
 * Get the value of a specific validation error.
 */
export function getErrorValue(
  control: AbstractControl,
  errorKey: string,
): unknown {
  return control.getError(errorKey);
}

/**
 * Convert validation errors into a simple key-value object.
 */
export function normalizeErrors(
  errors: ValidationErrors | null,
): Record<string, unknown> {
  if (!errors) {
    return {};
  }

  return Object.fromEntries(Object.entries(errors));
}

/**
 * Create a SRFormError object.
 */
export function createFormError(
  controlName: string,
  errorKey: string,
  message: string,
  value?: unknown,
  params?: Record<string, unknown>,
): SRFormError {
  return {
    controlName,
    errorKey,
    message,
    value,
    params,
  };
}

/**
 * Get the first SRFormError from a control.
 */
export function getFirstFormError(
  control: AbstractControl,
  controlName: string,
  messages: Record<string, string> = {},
): SRFormError | null {
  const errorKey = getFirstErrorKey(control);

  if (!errorKey) {
    return null;
  }

  const value = getErrorValue(control, errorKey);

  const message = messages[errorKey] ?? getDefaultErrorMessage(errorKey);

  return createFormError(controlName, errorKey, message, value);
}

/**
 * Generate a default validation message.
 */
export function getDefaultErrorMessage(errorKey: string): string {
  const messages: Record<string, string> = {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    minlength: "The value is too short.",
    maxlength: "The value is too long.",
    min: "The value is below the minimum allowed.",
    max: "The value is above the maximum allowed.",
    pattern: "The value format is invalid.",
    mismatch: "The values do not match.",
    passwordMismatch: "Passwords do not match.",
  };

  return messages[errorKey] ?? "This field is invalid.";
}
