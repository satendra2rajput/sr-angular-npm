import { KudoFormConfig } from '../models/form-config.model';

export const DEFAULT_FORM_CONFIG: Required<KudoFormConfig> = {
  validateOn: 'change',
  markAllAsTouchedOnSubmit: true,
  resetAfterSubmit: false,
  emitEventOnReset: true,
  emitEventOnPatch: true,
  scrollToFirstError: false,
  errorMessages: {},
};

export function mergeFormConfig(config?: KudoFormConfig): Required<KudoFormConfig> {
  return {
    ...DEFAULT_FORM_CONFIG,
    ...config,
    errorMessages: {
      ...DEFAULT_FORM_CONFIG.errorMessages,
      ...(config?.errorMessages ?? {}),
    },
  };
}
