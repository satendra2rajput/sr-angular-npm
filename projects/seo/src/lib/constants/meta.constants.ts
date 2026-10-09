/**
 * Standard HTML meta tag names.
 */
export const META_NAMES = {
  DESCRIPTION: 'description',
  KEYWORDS: 'keywords',
  AUTHOR: 'author',
  ROBOTS: 'robots',
  THEME_COLOR: 'theme-color',
  VIEWPORT: 'viewport',

  // Twitter / X
  TWITTER_CARD: 'twitter:card',
  TWITTER_TITLE: 'twitter:title',
  TWITTER_DESCRIPTION: 'twitter:description',
  TWITTER_IMAGE: 'twitter:image',
  TWITTER_SITE: 'twitter:site',
  TWITTER_CREATOR: 'twitter:creator',
} as const;

/**
 * Open Graph property names.
 */
export const OG_PROPERTIES = {
  TITLE: 'og:title',
  DESCRIPTION: 'og:description',
  IMAGE: 'og:image',
  URL: 'og:url',
  TYPE: 'og:type',
  SITE_NAME: 'og:site_name',
  LOCALE: 'og:locale',
} as const;

/**
 * Link relationship values used by SEO.
 */
export const LINK_RELATIONS = {
  CANONICAL: 'canonical',
} as const;

/**
 * JSON-LD script MIME type.
 */
export const JSON_LD_TYPE = 'application/ld+json';

/**
 * Default Open Graph type.
 */
export const DEFAULT_OG_TYPE = 'website';

/**
 * Default Twitter card.
 */
export const DEFAULT_TWITTER_CARD = 'summary_large_image';
