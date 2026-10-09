import { inject } from '@angular/core';

import { HttpInterceptorFn } from '@angular/common/http';

import { catchError, finalize, tap } from 'rxjs';

import { KUDO_HTTP_LOGGING_CONFIG, DEFAULT_LOGGING_CONFIG } from './logging.config';

export const kudoLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(KUDO_HTTP_LOGGING_CONFIG, {
    optional: true,
  });

  const finalConfig = {
    ...DEFAULT_LOGGING_CONFIG,
    ...(config ?? {}),
  };

  if (!finalConfig.enabled) {
    return next(req);
  }

  const startTime = performance.now();

  const requestId = req.headers.get('X-Request-ID');

  if (finalConfig.logRequest) {
    logRequest(req, requestId, finalConfig);
  }

  return next(req).pipe(
    tap((response) => {
      if (finalConfig.logResponse) {
        logResponse(req, response, requestId, performance.now() - startTime);
      }
    }),

    catchError((error) => {
      if (finalConfig.logError) {
        logError(req, error, requestId, performance.now() - startTime);
      }

      throw error;
    }),

    finalize(() => {
      // Request lifecycle completed.
    }),
  );
};

function logRequest(
  req: Parameters<HttpInterceptorFn>[0],
  requestId: string | null,
  config: typeof DEFAULT_LOGGING_CONFIG,
): void {
  const data: Record<string, unknown> = {
    type: 'HTTP_REQUEST',
    method: req.method,
    url: req.urlWithParams,
    requestId,
  };

  if (config.includeHeaders) {
    data['headers'] = req.headers.keys().reduce(
      (headers, key) => {
        headers[key] = req.headers.getAll(key) ?? [];

        return headers;
      },
      {} as Record<string, string[]>,
    );
  }

  if (config.includeBody) {
    data['body'] = req.body;
  }

  console.info('[KudoHttp]', data);
}

function logResponse(
  req: Parameters<HttpInterceptorFn>[0],
  response: unknown,
  requestId: string | null,
  duration: number,
): void {
  const httpResponse = response as {
    status?: number;
    statusText?: string;
  };

  console.info('[KudoHttp]', {
    type: 'HTTP_RESPONSE',
    method: req.method,
    url: req.urlWithParams,
    status: httpResponse.status,
    statusText: httpResponse.statusText,
    duration: `${Math.round(duration)}ms`,
    requestId,
  });
}

function logError(
  req: Parameters<HttpInterceptorFn>[0],
  error: unknown,
  requestId: string | null,
  duration: number,
): void {
  const httpError = error as {
    status?: number;
    statusText?: string;
    message?: string;
  };

  console.error('[KudoHttp]', {
    type: 'HTTP_ERROR',
    method: req.method,
    url: req.urlWithParams,
    status: httpError.status,
    statusText: httpError.statusText,
    message: httpError.message,
    duration: `${Math.round(duration)}ms`,
    requestId,
  });
}
