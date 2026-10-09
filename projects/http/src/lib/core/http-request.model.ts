import { HttpHeaders, HttpParams } from '@angular/common/http';

import { KudoRetryPolicy } from '../retry/retry-policy.model';
import { KudoCacheOptions } from '../cache/cache-policy.model';

export interface KudoHttpRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;

  params?: HttpParams | Record<string, string | number | boolean>;

  withCredentials?: boolean;

  timeout?: number;

  retry?: KudoRetryPolicy;

  cache?: KudoCacheOptions;

  deduplicate?: boolean;
  /**
   * Optional AbortSignal used to cancel the request.
   */
  signal?: AbortSignal;
}
