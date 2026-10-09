import { InjectionToken } from '@angular/core';

import { KudoSeoConfig } from '../providers/seo.providers';

/**
 * Injection token for the global
 * @kudoengineer/seo configuration.
 *
 * This allows Angular's dependency injection
 * system to provide default SEO configuration
 * throughout the application.
 */
export const SEO_CONFIG = new InjectionToken<KudoSeoConfig>('KUDO_SEO_CONFIG', {
  factory: () => ({}),
});
