import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';

import { SeoConfig } from '../models/seo-config';

import { SeoRouteService } from '../services/seo-route.service';

import { SEO_CONFIG } from '../tokens/seo.tokens';

/**
 * Options used to configure
 * @kudoengineer/seo.
 *
 * These values are used as the
 * application's default SEO configuration.
 */
export type KudoSeoConfig = Partial<SeoConfig>;

/**
 * Provides @kudoengineer/seo to an Angular application.
 *
 * Example:
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideKudoSeo({
 *       title: 'KudoEngineer',
 *       description: 'Developer Platform'
 *     })
 *   ]
 * });
 */
export function provideKudoSeo(config: KudoSeoConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SEO_CONFIG,
      useValue: config,
    },

    provideAppInitializer(() => {
      const routeSeo = inject(SeoRouteService);

      routeSeo.init();
    }),
  ]);
}
