import { AbstractControl, ValidationErrors } from '@angular/forms';

import {
  KeValidationError,
  KeValidationMessage,
  KeValidationMessageOptions,
  KeValidationMessages,
} from './validation-error.types';

export class KeValidationErrors {
  /**
   * Check whether a control has a specific validation error.
   */
  static has(control: AbstractControl | null | undefined, errorKey: string): boolean {
    if (!control) {
      return false;
    }

    return control.hasError(errorKey);
  }

  /**
   * Get a specific validation error.
   */
  static get(control: AbstractControl | null | undefined, errorKey: string): unknown {
    if (!control) {
      return null;
    }

    return control.getError(errorKey);
  }

  /**
   * Get all validation errors.
   */
  static all(control: AbstractControl | null | undefined): ValidationErrors | null {
    if (!control) {
      return null;
    }

    return control.errors;
  }

  /**
   * Check whether the control is invalid.
   */
  static isInvalid(control: AbstractControl | null | undefined): boolean {
    return !!control?.invalid;
  }

  /**
   * Check whether the control is valid.
   */
  static isValid(control: AbstractControl | null | undefined): boolean {
    return !!control && control.valid;
  }

  /**
   * Check whether the control has any errors.
   */
  static hasErrors(control: AbstractControl | null | undefined): boolean {
    return !!control?.errors;
  }

  /**
   * Get the first validation error.
   */
  static first(control: AbstractControl | null | undefined): KeValidationError | null {
    if (!control?.errors) {
      return null;
    }

    const entries = Object.entries(control.errors);

    if (entries.length === 0) {
      return null;
    }

    const [key, value] = entries[0];

    return {
      key,
      value,
    };
  }

  /**
   * Get all validation errors as an array.
   */
  static list(control: AbstractControl | null | undefined): KeValidationError[] {
    if (!control?.errors) {
      return [];
    }

    return Object.entries(control.errors).map(([key, value]) => ({
      key,
      value,
    }));
  }

  /**
   * Get the first validation error key.
   */
  static firstKey(control: AbstractControl | null | undefined): string | null {
    return this.first(control)?.key ?? null;
  }

  /**
   * Get a human-readable validation message.
   */
  static message(
    control: AbstractControl | null | undefined,
    options: KeValidationMessageOptions = {},
  ): string | null {
    const firstError = this.first(control);

    if (!firstError) {
      return null;
    }

    const message = this.resolveMessage(
      firstError.key,
      firstError.value,
      control?.value,
      options.messages,
    );

    return message ?? options.fallback ?? 'Invalid value.';
  }

  /**
   * Get all validation messages.
   */
  static messages(
    control: AbstractControl | null | undefined,
    options: KeValidationMessageOptions = {},
  ): string[] {
    const errors = this.list(control);

    return errors.map(
      ({ key, value }) =>
        this.resolveMessage(key, value, control?.value, options.messages) ??
        options.fallback ??
        'Invalid value.',
    );
  }

  /**
   * Resolve a validation message.
   */
  private static resolveMessage(
    key: string,
    error: unknown,
    controlValue: unknown,
    messages?: KeValidationMessages,
  ): string | null {
    const customMessage = messages?.[key];

    if (customMessage) {
      return this.resolveCustomMessage(customMessage, error, controlValue);
    }

    return this.getDefaultMessage(key, error);
  }

  /**
   * Resolve custom string/function message.
   */
  private static resolveCustomMessage(
    message: KeValidationMessage,
    error: unknown,
    controlValue: unknown,
  ): string {
    if (typeof message === 'function') {
      return message(error, controlValue);
    }

    return message;
  }

  /**
   * Default validation messages.
   */
  private static getDefaultMessage(key: string, error: unknown): string | null {
    switch (key) {
      case 'required':
        return 'This field is required.';

      case 'email':
        return 'Please enter a valid email address.';

      case 'url':
        return 'Please enter a valid URL.';

      case 'phone':
        return 'Please enter a valid phone number.';

      case 'min':
        return this.getMinMessage(error);

      case 'max':
        return this.getMaxMessage(error);

      case 'minLength':
        return this.getMinLengthMessage(error);

      case 'maxLength':
        return this.getMaxLengthMessage(error);

      case 'pattern':
        return 'Please enter a valid value.';

      case 'passwordStrength':
        return 'Password does not meet the required strength.';

      case 'matchFields':
        return 'The fields do not match.';

      case 'unique':
        return 'This value is already in use.';

      case 'exists':
        return 'This value does not exist.';

      case 'asyncValidation':
        return 'Validation failed.';

      default:
        return null;
    }
  }

  private static getMinMessage(error: unknown): string {
    if (this.isRecord(error) && typeof error['min'] === 'number') {
      return `Value must be at least ${error['min']}.`;
    }

    return 'Value is below the minimum allowed.';
  }

  private static getMaxMessage(error: unknown): string {
    if (this.isRecord(error) && typeof error['max'] === 'number') {
      return `Value must be at most ${error['max']}.`;
    }

    return 'Value exceeds the maximum allowed.';
  }

  private static getMinLengthMessage(error: unknown): string {
    if (this.isRecord(error) && typeof error['requiredLength'] === 'number') {
      return `Minimum length is ${error['requiredLength']} characters.`;
    }

    return 'Value is too short.';
  }

  private static getMaxLengthMessage(error: unknown): string {
    if (this.isRecord(error) && typeof error['requiredLength'] === 'number') {
      return `Maximum length is ${error['requiredLength']} characters.`;
    }

    return 'Value is too long.';
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
