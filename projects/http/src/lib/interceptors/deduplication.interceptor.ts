import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';

import { Observable } from 'rxjs';

import { KudoRequestDeduplication } from '../cache/request-deduplication';

import { KUDO_HTTP_DEDUPLICATION_CONTEXT } from '../cache/deduplication-context';

export const kudoDeduplicationInterceptor: HttpInterceptorFn = (req, next) => {
  // Deduplication only for GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const enabled = req.context.get(KUDO_HTTP_DEDUPLICATION_CONTEXT);

  if (!enabled) {
    return next(req);
  }

  const deduplication = inject(KudoRequestDeduplication);

  const key = createDeduplicationKey(req);

  const existing = deduplication.get<HttpEvent<unknown>>(key);

  if (existing) {
    return existing;
  }

  const request$ = next(req);

  return deduplication.set(key, request$);
};

function createDeduplicationKey(req: Parameters<HttpInterceptorFn>[0]): string {
  return [req.method, req.urlWithParams].join(':');
}
