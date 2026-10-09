import { InjectionToken } from '@angular/core';

export interface KudoRequestIdConfig {
  enabled?: boolean;
  headerName?: string;
}

export const DEFAULT_REQUEST_ID_CONFIG: Required<KudoRequestIdConfig> = {
  enabled: true,
  headerName: 'X-Request-ID',
};

export const KUDO_HTTP_REQUEST_ID_CONFIG = new InjectionToken<KudoRequestIdConfig>(
  'KUDO_HTTP_REQUEST_ID_CONFIG',
);
