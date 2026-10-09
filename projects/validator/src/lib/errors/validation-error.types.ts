import { ValidationErrors } from '@angular/forms';

export type KeValidationMessage = string | ((error: unknown, controlValue: unknown) => string);

export type KeValidationMessages = Record<string, KeValidationMessage>;

export interface KeValidationError {
  key: string;
  value: unknown;
}

export interface KeValidationMessageOptions {
  messages?: KeValidationMessages;
  fallback?: string;
}
