import { InjectionToken } from '@angular/core';

import { KudoHttpAuthConfig } from './auth-config.model';

export const KUDO_HTTP_AUTH_CONFIG = new InjectionToken<KudoHttpAuthConfig>(
  'KUDO_HTTP_AUTH_CONFIG',
);
