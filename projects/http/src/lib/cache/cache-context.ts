import { HttpContextToken } from '@angular/common/http';

import { KudoCacheOptions } from './cache-policy.model';

export const KUDO_HTTP_CACHE_CONTEXT = new HttpContextToken<KudoCacheOptions | undefined>(
  () => undefined,
);
