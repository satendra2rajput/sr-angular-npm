import { HttpErrorResponse } from '@angular/common/http';

import { KudoRetryPolicy } from './retry-policy.model';

export const DEFAULT_RETRY_POLICY: Required<KudoRetryPolicy> = {
  enabled: false,

  count: 3,

  delay: 500,

  maxDelay: 5000,

  retryableStatusCodes: [408, 429, 500, 502, 503, 504],

  retryNetworkErrors: true,
};

export function shouldRetry(error: unknown, policy: Required<KudoRetryPolicy>): boolean {
  if (!policy.enabled) {
    return false;
  }

  if (error instanceof HttpErrorResponse) {
    /**
     * status === 0 generally indicates
     * a network/client-side error.
     */
    if (error.status === 0) {
      return policy.retryNetworkErrors;
    }

    return policy.retryableStatusCodes.includes(error.status);
  }

  return false;
}
