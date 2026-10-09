import { HttpHeaders } from '@angular/common/http';

export type KudoHttpHeaders = HttpHeaders | Record<string, string | string[]>;

export function createHttpHeaders(headers?: KudoHttpHeaders): HttpHeaders {
  if (!headers) {
    return new HttpHeaders();
  }

  if (headers instanceof HttpHeaders) {
    return headers;
  }

  return new HttpHeaders(headers);
}
