export interface KudoRetryPolicy {
  /**
   * Enable or disable retry.
   */
  enabled?: boolean;

  /**
   * Maximum number of retry attempts.
   */
  count?: number;

  /**
   * Initial delay before first retry.
   * Value is in milliseconds.
   */
  delay?: number;

  /**
   * Maximum delay between retries.
   */
  maxDelay?: number;

  /**
   * HTTP status codes that can be retried.
   */
  retryableStatusCodes?: number[];

  /**
   * Retry requests when a network error occurs.
   */
  retryNetworkErrors?: boolean;
}
