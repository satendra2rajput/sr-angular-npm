import { HttpErrorResponse } from '@angular/common/http';

export type KudoHttpErrorCode = 'HTTP_ERROR' | 'NETWORK_ERROR' | 'TIMEOUT' | 'UNKNOWN_ERROR';

export class KudoHttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string | null;
  readonly error: unknown;
  readonly originalError: unknown;
  readonly code: KudoHttpErrorCode;

  constructor(error: HttpErrorResponse, code: KudoHttpErrorCode = 'HTTP_ERROR') {
    super(KudoHttpError.getMessage(error, code));

    this.name = 'KudoHttpError';

    this.status = error.status;
    this.statusText = error.statusText;
    this.url = error.url;
    this.error = error.error;
    this.originalError = error;
    this.code = code;
  }

  private static getMessage(error: HttpErrorResponse, code: KudoHttpErrorCode): string {
    if (code === 'TIMEOUT') {
      return 'HTTP request timed out.';
    }

    if (code === 'NETWORK_ERROR') {
      return 'Unable to connect to the server.';
    }

    if (typeof error.error === 'string') {
      return error.error;
    }

    if (error.error && typeof error.error === 'object' && 'message' in error.error) {
      return String((error.error as { message?: unknown }).message);
    }

    return error.message || 'HTTP request failed.';
  }

  get isTimeout(): boolean {
    return this.code === 'TIMEOUT';
  }

  get isNetworkError(): boolean {
    return this.code === 'NETWORK_ERROR';
  }
}
