import { AbstractControl, FormArray } from '@angular/forms';

/**
 * Add a control to the FormArray.
 */
export function addToFormArray(
  formArray: FormArray,
  control: AbstractControl,
  emitEvent = true,
): void {
  formArray.push(control, {
    emitEvent,
  });
}

/**
 * Insert a control at a specific index.
 */
export function insertIntoFormArray(
  formArray: FormArray,
  index: number,
  control: AbstractControl,
  emitEvent = true,
): void {
  formArray.insert(index, control, {
    emitEvent,
  });
}

/**
 * Remove a control from the FormArray.
 */
export function removeFromFormArray(formArray: FormArray, index: number, emitEvent = true): void {
  if (index < 0 || index >= formArray.length) {
    return;
  }

  formArray.removeAt(index, {
    emitEvent,
  });
}

/**
 * Replace a control at a specific index.
 */
export function setFormArrayControl(
  formArray: FormArray,
  index: number,
  control: AbstractControl,
  emitEvent = true,
): void {
  if (index < 0 || index >= formArray.length) {
    return;
  }

  formArray.setControl(index, control, {
    emitEvent,
  });
}

/**
 * Move a control from one index to another.
 */
export function moveFormArrayControl(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number,
  emitEvent = true,
): void {
  if (
    fromIndex < 0 ||
    fromIndex >= formArray.length ||
    toIndex < 0 ||
    toIndex >= formArray.length ||
    fromIndex === toIndex
  ) {
    return;
  }

  const control = formArray.at(fromIndex);

  formArray.removeAt(fromIndex, {
    emitEvent: false,
  });

  formArray.insert(toIndex, control, {
    emitEvent,
  });
}

/**
 * Get a control from the FormArray.
 */
export function getFormArrayControl(formArray: FormArray, index: number): AbstractControl | null {
  if (index < 0 || index >= formArray.length) {
    return null;
  }

  return formArray.at(index);
}

/**
 * Check whether an index exists.
 */
export function hasFormArrayIndex(formArray: FormArray, index: number): boolean {
  return index >= 0 && index < formArray.length;
}

/**
 * Clear all controls from the FormArray.
 */
export function clearFormArray(formArray: FormArray, emitEvent = true): void {
  formArray.clear({
    emitEvent,
  });
}

/**
 * Get the current FormArray length.
 */
export function getFormArrayLength(formArray: FormArray): number {
  return formArray.length;
}

/**
 * Mark all FormArray controls as touched.
 */
export function markFormArrayAsTouched(formArray: FormArray): void {
  formArray.markAllAsTouched();
}

/**
 * Mark all FormArray controls as dirty.
 */
export function markFormArrayAsDirty(formArray: FormArray): void {
  formArray.markAsDirty();
}

/**
 * Check whether the FormArray is valid.
 */
export function isFormArrayValid(formArray: FormArray): boolean {
  return formArray.valid;
}

/**
 * Check whether the FormArray is invalid.
 */
export function isFormArrayInvalid(formArray: FormArray): boolean {
  return formArray.invalid;
}
