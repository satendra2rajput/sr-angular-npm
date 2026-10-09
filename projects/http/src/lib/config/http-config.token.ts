import { InjectionToken } from '@angular/core';

import { KudoHttpConfig } from './http-config.model';

export const KUDO_HTTP_CONFIG = new InjectionToken<KudoHttpConfig>('KUDO_HTTP_CONFIG');
