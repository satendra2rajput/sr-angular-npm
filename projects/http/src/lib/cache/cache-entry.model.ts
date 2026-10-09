import { HttpHeaders } from '@angular/common/http';

export interface KudoCacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;

  status: number;
  statusText: string;
  headers: HttpHeaders;
  url: string | null;
}
