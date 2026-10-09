import { HttpHeaders } from '@angular/common/http';

import { KudoRetryPolicy } from '../retry/retry-policy.model';

import { KudoHttpError } from '../core/http-error.model';

export interface KudoHttpConfig {
  baseUrl?: string;

  headers?: HttpHeaders | Record<string, string | string[]>;

  withCredentials?: boolean;

  timeout?: number;

  onError?: (error: KudoHttpError) => void;

  retry?: KudoRetryPolicy;
}
