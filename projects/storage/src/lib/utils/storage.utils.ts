import { StorageItem } from '../models/storage-item';

export function createStorageKey(key: string, prefix?: string): string {
  return prefix ? `${prefix}:${key}` : key;
}

export function serializeStorageItem<T>(value: T, ttl?: number): string {
  const item: StorageItem<T> = {
    value,
    expiresAt: ttl !== undefined && ttl > 0 ? Date.now() + ttl : null,
  };

  return JSON.stringify(item);
}

export function deserializeStorageItem<T>(value: string): StorageItem<T> | null {
  try {
    return JSON.parse(value) as StorageItem<T>;
  } catch {
    return null;
  }
}

export function isStorageItemExpired(item: StorageItem<unknown>): boolean {
  if (item.expiresAt === null) {
    return false;
  }

  return Date.now() >= item.expiresAt;
}
