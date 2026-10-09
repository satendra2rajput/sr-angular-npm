import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

/**
 * Get the current value of a control.
 */
export function getControlValue<T = unknown>(control: AbstractControl): T {
  return control.value as T;
}

/**
 * Get the complete value of a FormGroup.
 *
 * Disabled controls are excluded.
 */
export function getFormValue<T = Record<string, unknown>>(form: FormGroup): T {
  return form.value as T;
}

/**
 * Get the complete raw value of a FormGroup.
 *
 * Disabled controls are included.
 */
export function getFormRawValue<T = Record<string, unknown>>(form: FormGroup): T {
  return form.getRawValue() as T;
}

/**
 * Get a specific control value.
 */
export function getFormControlValue<T = unknown>(form: FormGroup, controlName: string): T | null {
  const control = form.get(controlName);

  if (!control) {
    return null;
  }

  return control.value as T;
}

/**
 * Get a specific control raw value.
 */
export function getFormControlRawValue<T = unknown>(
  form: FormGroup,
  controlName: string,
): T | null {
  const control = form.get(controlName);

  if (!control) {
    return null;
  }

  return control.getRawValue() as T;
}

/**
 * Get FormArray values.
 */
export function getFormArrayValues<T = unknown>(formArray: FormArray): T[] {
  return formArray.value as T[];
}

/**
 * Get FormArray raw values.
 */
export function getFormArrayRawValues<T = unknown>(formArray: FormArray): T[] {
  return formArray.getRawValue() as T[];
}

/**
 * Check whether a form has a specific value.
 */
export function hasFormValue(form: FormGroup, controlName: string): boolean {
  const control = form.get(controlName);

  if (!control) {
    return false;
  }

  const value = control.value;

  return value !== null && value !== undefined && value !== '';
}

/**
 * Get values of dirty controls only.
 */
export function getDirtyValues(control: AbstractControl): unknown {
  if (control instanceof FormGroup) {
    const result: Record<string, unknown> = {};

    Object.entries(control.controls).forEach(([key, childControl]) => {
      if (childControl instanceof FormGroup || childControl instanceof FormArray) {
        const value = getDirtyValues(childControl);

        if (value !== undefined && hasValue(value)) {
          result[key] = value;
        }

        return;
      }

      if (childControl.dirty) {
        result[key] = childControl.value;
      }
    });

    return result;
  }

  if (control instanceof FormArray) {
    return control.controls.map((childControl) => getDirtyValues(childControl));
  }

  return control.dirty ? control.value : undefined;
}

/**
 * Check whether a value contains data.
 */
function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value as Record<string, unknown>).length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}
