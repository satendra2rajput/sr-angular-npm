import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

import { getDefaultErrorMessage } from "./form-error.utils";
import { SRFormError } from "../models/form-state.model";

@Injectable({
  providedIn: "root",
})
export class SRFormErrorService {
  /**
   * Get all validation errors from a form.
   */
  getErrors(
    form: FormGroup,
    messages: Record<string, string> = {},
  ): SRFormError[] {
    const errors: SRFormError[] = [];

    this.collectErrors(form, "", errors, messages);

    return errors;
  }

  /**
   * Get the first validation error from a form.
   */
  getFirstError(
    form: FormGroup,
    messages: Record<string, string> = {},
  ): SRFormError | null {
    const errors = this.getErrors(form, messages);

    return errors.length > 0 ? errors[0] : null;
  }

  /**
   * Check whether the form contains any validation errors.
   */
  hasErrors(form: FormGroup): boolean {
    return this.getFirstError(form) !== null;
  }

  /**
   * Collect errors recursively.
   */
  private collectErrors(
    control: AbstractControl,
    path: string,
    errors: SRFormError[],
    messages: Record<string, string>,
  ): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((controlName) => {
        const childControl = control.controls[controlName];

        const childPath = path ? `${path}.${controlName}` : controlName;

        this.collectErrors(childControl, childPath, errors, messages);
      });

      return;
    }

    if (control instanceof FormArray) {
      control.controls.forEach((childControl, index) => {
        const childPath = path ? `${path}[${index}]` : `[${index}]`;

        this.collectErrors(childControl, childPath, errors, messages);
      });

      return;
    }

    if (!control.errors) {
      return;
    }

    Object.keys(control.errors).forEach((errorKey) => {
      const errorValue = control.getError(errorKey);

      const message = messages[errorKey] ?? getDefaultErrorMessage(errorKey);

      errors.push({
        controlName: path,
        errorKey,
        message,
        value: errorValue,
      });
    });
  }
}
