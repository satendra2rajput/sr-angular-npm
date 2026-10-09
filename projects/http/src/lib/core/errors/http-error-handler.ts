import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

import { KudoHttpError, KudoHttpErrorCode } from '../http-error.model';

export type KudoHttpErrorHandler = (error: KudoHttpError) => void;

export function normalizeHttpError(error: unknown): KudoHttpError {
  if (error instanceof KudoHttpError) {
    return error;
  }

  if (error instanceof TimeoutError) {
    const timeoutError = new HttpErrorResponse({
      status: 0,
      statusText: 'Request Timeout',
      error,
    });

    return new KudoHttpError(timeoutError, 'TIMEOUT');
  }

  if (error instanceof HttpErrorResponse) {
    const code: KudoHttpErrorCode = error.status === 0 ? 'NETWORK_ERROR' : 'HTTP_ERROR';

    return new KudoHttpError(error, code);
  }

  const fallback = new HttpErrorResponse({
    status: 0,
    statusText: 'Unknown Error',
    error,
  });

  return new KudoHttpError(fallback, 'UNKNOWN_ERROR');
}
