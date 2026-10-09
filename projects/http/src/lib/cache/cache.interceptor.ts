import { inject } from '@angular/core';

import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { KUDO_HTTP_CACHE_CONTEXT } from '../cache/cache-context';

import { KudoCacheOptions } from '../cache/cache-policy.model';

import { KudoCacheStore } from '../cache/cache-store';

const DEFAULT_CACHE_OPTIONS: Required<KudoCacheOptions> = {
  policy: 'cache-first',
  ttl: 60000,
};

export const kudoCacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const options = req.context.get(KUDO_HTTP_CACHE_CONTEXT);

  if (!options) {
    return next(req);
  }

  const config = {
    ...DEFAULT_CACHE_OPTIONS,
    ...options,
  };

  if (config.policy === 'no-cache') {
    return next(req);
  }

  const cacheStore = inject(KudoCacheStore);

  const cacheKey = createCacheKey(req.urlWithParams);

  const cached = cacheStore.get<unknown>(cacheKey);

  // cache-first / force-cache
  if (cached && (config.policy === 'cache-first' || config.policy === 'force-cache')) {
    return of(createCachedResponse(cached));
  }

  // network-first
  if (config.policy === 'network-first') {
    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          saveResponse(cacheStore, cacheKey, event, config.ttl);
        }
      }),

      catchError((error) => {
        if (cached) {
          return of(createCachedResponse(cached));
        }

        return throwError(() => error);
      }),
    );
  }

  // cache-first miss / force-cache miss
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        saveResponse(cacheStore, cacheKey, event, config.ttl);
      }
    }),
  );
};

function saveResponse<T>(
  cacheStore: KudoCacheStore,
  key: string,
  response: HttpResponse<T>,
  ttl: number,
): void {
  if (ttl <= 0) {
    return;
  }

  const now = Date.now();

  cacheStore.set(key, {
    data: response.body as T,
    timestamp: now,
    expiresAt: now + ttl,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    url: response.url,
  });
}

function createCachedResponse<T>(entry: {
  data: T;
  status: number;
  statusText: string;
  headers: import('@angular/common/http').HttpHeaders;
  url: string | null;
}): HttpResponse<T> {
  return new HttpResponse<T>({
    body: entry.data,
    status: entry.status,
    statusText: entry.statusText,
    headers: entry.headers,
    url: entry.url ?? undefined,
  });
}

function createCacheKey(url: string): string {
  return `GET:${url}`;
}
