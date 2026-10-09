import { InjectionToken } from '@angular/core';

export interface KudoHttpInterceptorConfig {
  auth?: boolean;
  error?: boolean;
  retry?: boolean;
  cache?: boolean;
  logging?: boolean;
  requestId?: boolean;
}

export const DEFAULT_INTERCEPTOR_CONFIG: Required<KudoHttpInterceptorConfig> = {
  auth: true,
  error: true,
  retry: true,
  cache: true,
  logging: false,
  requestId: true,
};

export const KUDO_HTTP_INTERCEPTOR_CONFIG = new InjectionToken<KudoHttpInterceptorConfig>(
  'KUDO_HTTP_INTERCEPTOR_CONFIG',
);
