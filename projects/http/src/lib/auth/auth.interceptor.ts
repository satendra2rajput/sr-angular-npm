import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, of, from, switchMap } from 'rxjs';

import { KUDO_HTTP_TOKEN_PROVIDER } from '../auth/token-provider.token';

import { KUDO_HTTP_AUTH_CONFIG } from '../auth/auth-config.token';

export const kudoAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenProvider = inject(KUDO_HTTP_TOKEN_PROVIDER, {
    optional: true,
  });

  const config = inject(KUDO_HTTP_AUTH_CONFIG, {
    optional: true,
  });

  if (!config?.enabled || !tokenProvider) {
    return next(req);
  }

  if (shouldExcludeUrl(req.url, config.excludedUrls ?? [])) {
    return next(req);
  }

  if (config.includeUrls?.length && !shouldIncludeUrl(req.url, config.includeUrls)) {
    return next(req);
  }

  return toObservable(tokenProvider.getAccessToken()).pipe(
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      const authRequest = addAuthorizationHeader(
        req,
        token,
        config.headerName ?? 'Authorization',
        config.scheme ?? 'Bearer',
      );

      return next(authRequest);
    }),
  );
};

function toObservable(token: string | null | Promise<string | null>): Observable<string | null> {
  if (token instanceof Promise) {
    return from(token);
  }

  return of(token);
}

function addAuthorizationHeader(
  req: Parameters<HttpInterceptorFn>[0],
  token: string,
  headerName: string,
  scheme: string,
) {
  return req.clone({
    setHeaders: {
      [headerName]: scheme ? `${scheme} ${token}` : token,
    },
  });
}

function shouldExcludeUrl(url: string, excludedUrls: string[]): boolean {
  return excludedUrls.some((excluded) => url.includes(excluded));
}

function shouldIncludeUrl(url: string, includeUrls: string[]): boolean {
  return includeUrls.some((included) => url.includes(included));
}
