export interface SRFormConfig {
  validateOn?: "change" | "blur" | "submit";

  markAllAsTouchedOnSubmit?: boolean;

  resetAfterSubmit?: boolean;

  emitEventOnReset?: boolean;

  emitEventOnPatch?: boolean;

  scrollToFirstError?: boolean;

  errorMessages?: Record<string, string>;
}
