/**
 * SEO-related DOM constants.
 */
export const SEO_CONSTANTS = {
  /**
   * Canonical link element.
   */
  CANONICAL_REL: 'canonical',

  /**
   * JSON-LD script element type.
   */
  JSON_LD_TYPE: 'application/ld+json',

  /**
   * HTML attribute for language.
   */
  HTML_LANG_ATTRIBUTE: 'lang',

  /**
   * Open Graph meta property prefix.
   */
  OG_PREFIX: 'og:',

  /**
   * Twitter/X meta name prefix.
   */
  TWITTER_PREFIX: 'twitter:',
} as const;

/**
 * Default SEO values.
 */
export const SEO_DEFAULTS = {
  /**
   * Default Open Graph type.
   */
  OG_TYPE: 'website',

  /**
   * Default Twitter/X card.
   */
  TWITTER_CARD: 'summary_large_image',

  /**
   * Default robots directive.
   */
  ROBOTS: 'index, follow',

  /**
   * Default language.
   */
  LANGUAGE: 'en',
} as const;

/**
 * Common Schema.org context.
 */
export const SCHEMA_ORG_CONTEXT = 'https://schema.org';
