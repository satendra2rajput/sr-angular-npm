import { HttpParams } from '@angular/common/http';

export type KudoHttpParams = HttpParams | Record<string, string | number | boolean>;

export function createHttpParams(params?: KudoHttpParams): HttpParams {
  if (!params) {
    return new HttpParams();
  }

  if (params instanceof HttpParams) {
    return params;
  }

  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    httpParams = httpParams.set(key, String(value));
  });

  return httpParams;
}
