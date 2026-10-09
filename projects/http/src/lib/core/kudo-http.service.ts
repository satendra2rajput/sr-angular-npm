import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';

import { Observable, map, timeout } from 'rxjs';

import { KudoHttpRequestOptions } from './http-request.model';

import { KUDO_HTTP_CONFIG } from '../config/http-config.token';

import { KudoHttpConfig } from '../config/http-config.model';

import { createHttpHeaders } from '../utils/headers';

import { createHttpParams } from '../utils/params';

import { applyCancellation } from './cancellation/cancellation';

import { KUDO_HTTP_RETRY_CONTEXT } from '../retry/retry-context';

import { KUDO_HTTP_CACHE_CONTEXT } from '../cache/cache-context';
import { KUDO_HTTP_DEDUPLICATION_CONTEXT } from '../cache/deduplication-context';

@Injectable({
  providedIn: 'root',
})
export class KudoHttpService {
  constructor(
    private readonly http: HttpClient,

    @Inject(KUDO_HTTP_CONFIG)
    private readonly config: KudoHttpConfig,
  ) {}

  get<T>(url: string, options?: KudoHttpRequestOptions): Observable<T> {
    const request$ = this.http.get<T>(this.buildUrl(url), this.buildOptions(options));

    return this.execute(request$, options?.timeout, options?.signal);
  }

  post<T>(url: string, body?: unknown, options?: KudoHttpRequestOptions): Observable<T> {
    const request$ = this.http.post<T>(this.buildUrl(url), body, this.buildOptions(options));

    return this.execute(request$, options?.timeout, options?.signal);
  }

  put<T>(url: string, body?: unknown, options?: KudoHttpRequestOptions): Observable<T> {
    const request$ = this.http.put<T>(this.buildUrl(url), body, this.buildOptions(options));

    return this.execute(request$, options?.timeout, options?.signal);
  }

  patch<T>(url: string, body?: unknown, options?: KudoHttpRequestOptions): Observable<T> {
    const request$ = this.http.patch<T>(this.buildUrl(url), body, this.buildOptions(options));

    return this.execute(request$, options?.timeout, options?.signal);
  }

  delete<T = void>(url: string, options?: KudoHttpRequestOptions): Observable<T> {
    const request$ = this.http.delete<T>(this.buildUrl(url), this.buildOptions(options));

    return this.execute(request$, options?.timeout, options?.signal);
  }

  head(url: string, options?: KudoHttpRequestOptions): Observable<HttpHeaders> {
    const request$ = this.http
      .head(this.buildUrl(url), {
        ...this.buildOptions(options),
        observe: 'response',
      })
      .pipe(map((response) => response.headers));

    return this.execute(request$, options?.timeout, options?.signal);
  }

  options<T>(url: string, options?: KudoHttpRequestOptions): Observable<T> {
    const context = new HttpContext();

    if (options?.retry) {
      context.set(KUDO_HTTP_RETRY_CONTEXT, options.retry);
    }

    if (options?.cache) {
      context.set(KUDO_HTTP_CACHE_CONTEXT, options.cache);
    }

    const request$ = this.http.options<T>(this.buildUrl(url), {
      ...this.buildOptions(options),
      context,
    });

    return this.execute(request$, options?.timeout, options?.signal);
  }

  private execute<T>(
    request$: Observable<T>,
    requestTimeout?: number,
    signal?: AbortSignal,
  ): Observable<T> {
    const effectiveTimeout = requestTimeout ?? this.config.timeout;

    let source$ = request$;

    if (effectiveTimeout !== undefined && effectiveTimeout > 0) {
      source$ = source$.pipe(timeout(effectiveTimeout));
    }

    source$ = applyCancellation(source$, signal);

    return source$;
  }

  private buildUrl(url: string): string {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    const baseUrl = this.config.baseUrl ?? '';

    if (!baseUrl) {
      return url;
    }

    return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
  }

  private buildOptions(options?: KudoHttpRequestOptions) {
    let headers = createHttpHeaders(this.config.headers);

    const requestHeaders = createHttpHeaders(options?.headers);

    requestHeaders.keys().forEach((key) => {
      const values = requestHeaders.getAll(key);

      if (values) {
        headers = headers.set(key, values);
      }
    });

    const context = new HttpContext();

    if (options?.retry) {
      context.set(KUDO_HTTP_RETRY_CONTEXT, options.retry);
    }

    if (options?.deduplicate) {
      context.set(KUDO_HTTP_DEDUPLICATION_CONTEXT, true);
    }

    return {
      headers,

      params: createHttpParams(options?.params),

      withCredentials: options?.withCredentials ?? this.config.withCredentials ?? false,

      context,
    };
  }
}
