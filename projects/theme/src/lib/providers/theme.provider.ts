import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import { ThemeOptions } from '../models/theme-options.model';
import { ThemeService } from '../services/theme.service';

export const THEME_OPTIONS = new InjectionToken<ThemeOptions>('KE_THEME_OPTIONS');

export function provideTheme(options: ThemeOptions = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: THEME_OPTIONS,
      useValue: options,
    },
    ThemeService,
  ]);
}
