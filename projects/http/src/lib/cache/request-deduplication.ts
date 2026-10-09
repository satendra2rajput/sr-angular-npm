import { Injectable } from '@angular/core';
import { Observable, finalize, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KudoRequestDeduplication {
  private readonly requests = new Map<string, Observable<unknown>>();

  get<T>(key: string): Observable<T> | undefined {
    return this.requests.get(key) as Observable<T> | undefined;
  }

  set<T>(key: string, request$: Observable<T>): Observable<T> {
    const shared$ = request$.pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
      finalize(() => {
        this.requests.delete(key);
      }),
    );

    this.requests.set(key, shared$);

    return shared$;
  }

  has(key: string): boolean {
    return this.requests.has(key);
  }

  clear(): void {
    this.requests.clear();
  }

  size(): number {
    return this.requests.size;
  }
}
