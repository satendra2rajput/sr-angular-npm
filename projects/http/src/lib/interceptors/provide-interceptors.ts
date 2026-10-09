import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  KUDO_HTTP_INTERCEPTOR_CONFIG,
  KudoHttpInterceptorConfig,
  DEFAULT_INTERCEPTOR_CONFIG,
} from './interceptor.config';

import { kudoErrorInterceptor } from './error.interceptor';

import { kudoRetryInterceptor } from './retry.interceptor';
import { kudoRequestIdInterceptor } from './request-id.interceptor';
import { kudoAuthInterceptor } from '../auth/auth.interceptor';
import { KUDO_HTTP_REQUEST_ID_CONFIG } from './request-id.config';
import { kudoLoggingInterceptor } from './logging.interceptor';

import { kudoCacheInterceptor } from '../cache/cache.interceptor';
import { kudoDeduplicationInterceptor } from './deduplication.interceptor';

export function provideKudoHttpInterceptors(
  config: KudoHttpInterceptorConfig = {},
): EnvironmentProviders {
  const interceptorConfig: Required<KudoHttpInterceptorConfig> & {
    deduplication: boolean;
  } = {
    ...DEFAULT_INTERCEPTOR_CONFIG,
    deduplication: false,
    ...config,
  };

  const interceptors: HttpInterceptorFn[] = [];

  if (interceptorConfig.requestId) {
    interceptors.push(kudoRequestIdInterceptor);
  }

  if (interceptorConfig.auth) {
    interceptors.push(kudoAuthInterceptor);
  }

  if (interceptorConfig.logging) {
    interceptors.push(kudoLoggingInterceptor);
  }

  if (interceptorConfig.retry) {
    interceptors.push(kudoRetryInterceptor);
  }

  if (interceptorConfig.cache) {
    interceptors.push(kudoCacheInterceptor);
  }

  if (interceptorConfig.deduplication) {
    interceptors.push(kudoDeduplicationInterceptor);
  }

  if (interceptorConfig.error) {
    interceptors.push(kudoErrorInterceptor);
  }

  return makeEnvironmentProviders([
    {
      provide: KUDO_HTTP_INTERCEPTOR_CONFIG,
      useValue: interceptorConfig,
    },

    {
      provide: KUDO_HTTP_REQUEST_ID_CONFIG,
      useValue: {
        enabled: interceptorConfig.requestId,
        headerName: 'X-Request-ID',
      },
    },

    provideHttpClient(withInterceptors(interceptors)),
  ]);
}
