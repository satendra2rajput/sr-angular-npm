import { StorageType } from './storage-type';

export interface StorageOptions {
  /**
   * Storage mechanism to use.
   * Default: local
   */
  storage?: StorageType;

  /**
   * Optional namespace/prefix for storage keys.
   * Example: "kudo"
   */
  prefix?: string;

  /**
   * Time-to-live in milliseconds.
   * After expiration, the stored value is removed.
   */
  ttl?: number;
}
