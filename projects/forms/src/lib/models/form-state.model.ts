export interface KudoFormError {
  controlName: string;

  errorKey: string;

  message: string;

  value?: unknown;

  params?: Record<string, unknown>;
}
