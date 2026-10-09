import { HttpContextToken } from '@angular/common/http';
import { KudoRetryPolicy } from '.';

export const KUDO_HTTP_RETRY_CONTEXT = new HttpContextToken<KudoRetryPolicy | undefined>(
  () => undefined,
);
