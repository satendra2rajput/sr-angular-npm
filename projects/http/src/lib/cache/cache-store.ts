import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';

import { KudoCacheEntry } from './cache-entry.model';

@Injectable({
  providedIn: 'root',
})
export class KudoCacheStore {
  private readonly cache = new Map<string, KudoCacheEntry<unknown>>();

  get<T>(key: string): KudoCacheEntry<T> | undefined {
    const entry = this.cache.get(key) as KudoCacheEntry<T> | undefined;

    if (!entry) {
      return undefined;
    }

    if (Date.now() >= entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry;
  }

  set<T>(key: string, entry: KudoCacheEntry<T>): void {
    this.cache.set(key, entry);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  deleteByUrl(url: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(url)) {
        this.cache.delete(key);
      }
    }
  }
}
