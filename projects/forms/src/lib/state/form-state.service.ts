import { Injectable, computed, signal } from "@angular/core";

import { AbstractControl } from "@angular/forms";

import { getFormState } from "./form-state.utils";
import { SRFormState } from "../models/form-error.model";

@Injectable({
  providedIn: "root",
})
export class SRFormStateService {
  private readonly _state = signal<SRFormState>({
    valid: false,
    invalid: false,
    pristine: true,
    dirty: false,
    touched: false,
    untouched: true,
    submitted: false,
    submitting: false,
    disabled: false,
    pending: false,
  });

  readonly state = this._state.asReadonly();

  readonly valid = computed(() => this._state().valid);

  readonly invalid = computed(() => this._state().invalid);

  readonly pristine = computed(() => this._state().pristine);

  readonly dirty = computed(() => this._state().dirty);

  readonly touched = computed(() => this._state().touched);

  readonly untouched = computed(() => this._state().untouched);

  readonly submitted = computed(() => this._state().submitted);

  readonly submitting = computed(() => this._state().submitting);

  readonly disabled = computed(() => this._state().disabled);

  readonly pending = computed(() => this._state().pending);

  /**
   * Connect an Angular control/form to the state service.
   */
  update(
    control: AbstractControl,
    submitted = false,
    submitting = false,
  ): void {
    this._state.set(getFormState(control, submitted, submitting));
  }

  /**
   * Set submitted state.
   */
  setSubmitted(submitted: boolean): void {
    this._state.update((state) => ({
      ...state,
      submitted,
    }));
  }

  /**
   * Set submitting state.
   */
  setSubmitting(submitting: boolean): void {
    this._state.update((state) => ({
      ...state,
      submitting,
    }));
  }

  /**
   * Reset service state.
   */
  reset(): void {
    this._state.set({
      valid: false,
      invalid: false,
      pristine: true,
      dirty: false,
      touched: false,
      untouched: true,
      submitted: false,
      submitting: false,
      disabled: false,
      pending: false,
    });
  }
}
