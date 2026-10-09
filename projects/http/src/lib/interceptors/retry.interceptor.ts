import { inject } from '@angular/core';

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { Observable, throwError, timer } from 'rxjs';

import { retry } from 'rxjs/operators';

import { KUDO_HTTP_CONFIG } from '../config/http-config.token';

import { KudoRetryPolicy } from '../retry/retry-policy.model';

import { DEFAULT_RETRY_POLICY, shouldRetry } from '../retry/retry-policy';

import { calculateBackoff } from '../retry/backoff';
import { KUDO_HTTP_RETRY_CONTEXT } from '../retry/retry-context';

export const kudoRetryInterceptor: HttpInterceptorFn = (req, next) => {
  const httpConfig = inject(KUDO_HTTP_CONFIG, {
    optional: true,
  });

  const requestRetry = getRequestRetryPolicy(req);

  const globalRetry = httpConfig?.retry;

  const policy: Required<KudoRetryPolicy> = {
    ...DEFAULT_RETRY_POLICY,
    ...(globalRetry ?? {}),
    ...(requestRetry ?? {}),
  };

  if (!policy.enabled) {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: policy.count,

      delay: (error: unknown, retryCount: number): Observable<number> => {
        if (!shouldRetry(error, policy)) {
          return throwError(() => error);
        }

        const delay = calculateBackoff(retryCount, policy.delay, policy.maxDelay);

        return timer(delay);
      },
    }),
  );
};

function getRequestRetryPolicy(req: Parameters<HttpInterceptorFn>[0]): KudoRetryPolicy | undefined {
  return req.context.get(KUDO_HTTP_RETRY_CONTEXT);
}
