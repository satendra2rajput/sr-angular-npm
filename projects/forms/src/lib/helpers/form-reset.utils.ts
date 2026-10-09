import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Reset any Angular form control.
 */
export function resetFormControl(
  control: AbstractControl,
  value?: unknown,
  emitEvent = true,
): void {
  control.reset(value, {
    emitEvent,
  });
}

/**
 * Reset a FormGroup.
 */
export function resetFormGroup(
  form: FormGroup,
  value?: Record<string, unknown>,
  emitEvent = true,
): void {
  form.reset(value, {
    emitEvent,
  });
}

/**
 * Reset a FormArray.
 */
export function resetFormArray(formArray: FormArray, emitEvent = true): void {
  formArray.reset([], {
    emitEvent,
  });
}

/**
 * Reset a form and mark it as pristine and untouched.
 */
export function resetFormState(control: AbstractControl, value?: unknown, emitEvent = true): void {
  control.reset(value, {
    emitEvent,
  });

  control.markAsPristine({
    emitEvent,
  });

  control.markAsUntouched({
    emitEvent,
  });
}

/**
 * Reset form while keeping the current disabled/enabled state.
 */
export function resetFormPreserveState(
  control: AbstractControl,
  value?: unknown,
  emitEvent = true,
): void {
  const wasDisabled = control.disabled;

  control.reset(value, {
    emitEvent,
  });

  if (wasDisabled) {
    control.disable({
      emitEvent: false,
    });
  } else {
    control.enable({
      emitEvent: false,
    });
  }

  control.markAsPristine({
    emitEvent,
  });

  control.markAsUntouched({
    emitEvent,
  });
}

/**
 * Reset a FormControl to a specific value.
 */
export function resetControlToValue<T>(control: FormControl<T>, value: T, emitEvent = true): void {
  control.reset(value, {
    emitEvent,
  });
}
