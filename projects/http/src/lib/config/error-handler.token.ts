import { InjectionToken } from '@angular/core';
import { KudoHttpError } from '../core/http-error.model';

export const KUDO_HTTP_ERROR_HANDLER = new InjectionToken<(error: KudoHttpError) => void>(
  'KUDO_HTTP_ERROR_HANDLER',
);
