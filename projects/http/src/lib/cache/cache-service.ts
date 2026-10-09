import { Injectable } from '@angular/core';

import { KudoCacheStore } from './cache-store';

@Injectable({
  providedIn: 'root',
})
export class KudoCacheService {
  constructor(private readonly store: KudoCacheStore) {}

  clear(): void {
    this.store.clear();
  }

  invalidate(url: string): void {
    this.store.deleteByUrl(url);
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  size(): number {
    return this.store.size();
  }

  keys(): string[] {
    return this.store.keys();
  }
}
