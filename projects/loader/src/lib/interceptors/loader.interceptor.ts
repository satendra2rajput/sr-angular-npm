import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoaderService } from '../services/loader.service';
import { SKIP_LOADER } from '../tokens/loader.tokens';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  // Skip loader for this request
  if (req.context.get(SKIP_LOADER)) {
    return next(req);
  }

  // Start loader
  loader.startRequest({
    type: 'spinner',
    text: 'Loading...',
    overlay: true,
    overlayOpacity: 0.2,
    showContainer: false,
  });

  return next(req).pipe(
    finalize(() => {
      loader.endRequest();
    }),
  );
};
