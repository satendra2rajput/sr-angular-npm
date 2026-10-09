import { Observable, fromEvent, throwError } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { KudoHttpCancellationError } from './cancellation-error';

export function applyCancellation<T>(source$: Observable<T>, signal?: AbortSignal): Observable<T> {
  if (!signal) {
    return source$;
  }

  if (signal.aborted) {
    return throwError(() => new KudoHttpCancellationError());
  }

  const abort$ = fromEvent(signal, 'abort');

  return source$.pipe(takeUntil(abort$));
}
