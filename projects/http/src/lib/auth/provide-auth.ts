import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { KUDO_HTTP_TOKEN_PROVIDER } from './token-provider.token';

import { KudoTokenProvider } from './token-provider';

import { KudoHttpAuthConfig } from './auth-config.model';

import { DEFAULT_AUTH_CONFIG } from './auth-defaults';
import { KUDO_HTTP_AUTH_CONFIG } from './auth-config.token';

export function provideKudoHttpAuth(
  tokenProvider: KudoTokenProvider,
  config: KudoHttpAuthConfig = {},
): EnvironmentProviders {
  const authConfig = {
    ...DEFAULT_AUTH_CONFIG,
    ...config,
  };

  return makeEnvironmentProviders([
    {
      provide: KUDO_HTTP_TOKEN_PROVIDER,
      useValue: tokenProvider,
    },
    {
      provide: KUDO_HTTP_AUTH_CONFIG,
      useValue: authConfig,
    },
  ]);
}
