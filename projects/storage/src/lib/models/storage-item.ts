export interface StorageItem<T> {
  /**
   * Actual value stored by the package.
   */
  value: T;

  /**
   * Expiration timestamp in milliseconds.
   * null means the item never expires.
   */
  expiresAt: number | null;
}
