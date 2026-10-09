import { InjectionToken } from '@angular/core';

export interface KudoHttpLoggingConfig {
  enabled?: boolean;
  logRequest?: boolean;
  logResponse?: boolean;
  logError?: boolean;
  includeHeaders?: boolean;
  includeBody?: boolean;
  deduplication?: boolean;
}

export const DEFAULT_LOGGING_CONFIG: Required<KudoHttpLoggingConfig> = {
  enabled: false,
  logRequest: true,
  logResponse: true,
  logError: true,
  includeHeaders: false,
  includeBody: false,
  deduplication: true,
};

export const KUDO_HTTP_LOGGING_CONFIG = new InjectionToken<KudoHttpLoggingConfig>(
  'KUDO_HTTP_LOGGING_CONFIG',
);
