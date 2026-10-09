import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { ToastConfig } from '../models/toast-config';
import { DEFAULT_TOAST_CONFIG, TOAST_CONFIG } from '../tokens/toast-config.token';

export function provideToast(config: ToastConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: TOAST_CONFIG,
      useValue: {
        ...DEFAULT_TOAST_CONFIG,
        ...config,
      },
    },
  ]);
}
