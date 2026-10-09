import { inject } from '@angular/core';

import { HttpInterceptorFn } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

import { KUDO_HTTP_ERROR_HANDLER } from '../config/error-handler.token';

import { normalizeHttpError } from '../core/errors/http-error-handler';

export const kudoErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(KUDO_HTTP_ERROR_HANDLER, {
    optional: true,
  });

  return next(req).pipe(
    catchError((error) => {
      const normalizedError = normalizeHttpError(error);

      errorHandler?.(normalizedError);

      return throwError(() => normalizedError);
    }),
  );
};
