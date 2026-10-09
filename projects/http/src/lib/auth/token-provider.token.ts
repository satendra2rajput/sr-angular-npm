import { InjectionToken } from '@angular/core';

import { KudoTokenProvider } from './token-provider';

export const KUDO_HTTP_TOKEN_PROVIDER = new InjectionToken<KudoTokenProvider>(
  'KUDO_HTTP_TOKEN_PROVIDER',
);
