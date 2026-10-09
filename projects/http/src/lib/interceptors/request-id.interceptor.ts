import { inject } from '@angular/core';

import { HttpInterceptorFn } from '@angular/common/http';

import { KUDO_HTTP_REQUEST_ID_CONFIG, DEFAULT_REQUEST_ID_CONFIG } from './request-id.config';

import { generateRequestId } from '../utils/request-id';

export const kudoRequestIdInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(KUDO_HTTP_REQUEST_ID_CONFIG, {
    optional: true,
  });

  const finalConfig = {
    ...DEFAULT_REQUEST_ID_CONFIG,
    ...(config ?? {}),
  };

  if (!finalConfig.enabled) {
    return next(req);
  }

  const existingRequestId = req.headers.get(finalConfig.headerName);

  if (existingRequestId) {
    return next(req);
  }

  const requestId = generateRequestId();

  const request = req.clone({
    setHeaders: {
      [finalConfig.headerName]: requestId,
    },
  });

  return next(request);
};
