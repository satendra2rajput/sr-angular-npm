import { Injectable } from '@angular/core';

import { StorageOptions } from '../models/storage-options';
import { StorageType } from '../models/storage-type';

import {
  createStorageKey,
  deserializeStorageItem,
  isStorageItemExpired,
  serializeStorageItem,
} from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly defaultOptions: StorageOptions = {
    storage: 'local',
  };

  /**
   * Store a value.
   */
  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    const config: Required<Pick<StorageOptions, 'storage'>> & Omit<StorageOptions, 'storage'> = {
      ...options,
      storage: options.storage ?? this.defaultOptions.storage!,
    };

    const storageKey = createStorageKey(key, config.prefix);

    const serializedValue = serializeStorageItem(value, config.ttl);

    const storage = this.getStorage(config.storage);

    if (!storage) {
      return;
    }

    storage.setItem(storageKey, serializedValue);
  }

  /**
   * Get a stored value.
   */
  get<T>(key: string, options: StorageOptions = {}): T | null {
    const storageType: StorageType = options.storage ?? 'local';

    const storageKey = createStorageKey(key, options.prefix);

    const storage = this.getStorage(storageType);

    if (!storage) {
      return null;
    }

    const storedValue = storage.getItem(storageKey);

    if (storedValue === null) {
      return null;
    }

    const item = deserializeStorageItem<T>(storedValue);

    if (!item) {
      return null;
    }

    if (isStorageItemExpired(item)) {
      storage.removeItem(storageKey);
      return null;
    }

    return item.value;
  }

  /**
   * Check whether a key exists.
   */
  has(key: string, options: StorageOptions = {}): boolean {
    return this.get(key, options) !== null;
  }

  /**
   * Remove a stored value.
   */
  remove(key: string, options: StorageOptions = {}): void {
    const storageType: StorageType = options.storage ?? 'local';

    const storageKey = createStorageKey(key, options.prefix);

    const storage = this.getStorage(storageType);

    if (!storage) {
      return;
    }

    storage.removeItem(storageKey);
  }

  /**
   * Clear all values from selected storage.
   */
  clear(type: StorageType = 'local'): void {
    const storage = this.getStorage(type);

    if (!storage) {
      return;
    }

    storage.clear();
  }

  /**
   * Get browser storage safely.
   * Returns null during SSR or when storage is unavailable.
   */
  private getStorage(type: StorageType): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      switch (type) {
        case 'session':
          return window.sessionStorage;

        case 'local':
          return window.localStorage;

        case 'cookie':
          // Cookie support will be implemented
          // in the next step.
          return null;

        default:
          return window.localStorage;
      }
    } catch {
      return null;
    }
  }
}
