import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { KUDO_HTTP_CONFIG } from './http-config.token';

import { KUDO_HTTP_ERROR_HANDLER } from './error-handler.token';

import { KudoHttpConfig } from './http-config.model';

import { KUDO_HTTP_DEFAULTS } from './defaults';

export function provideKudoHttp(config: KudoHttpConfig = {}): EnvironmentProviders {
  const finalConfig: KudoHttpConfig = {
    ...KUDO_HTTP_DEFAULTS,
    ...config,
  };

  return makeEnvironmentProviders([
    {
      provide: KUDO_HTTP_CONFIG,
      useValue: finalConfig,
    },

    {
      provide: KUDO_HTTP_ERROR_HANDLER,
      useValue: finalConfig.onError,
    },
  ]);
}
