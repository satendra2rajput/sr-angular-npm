import { JsonLdData } from './json-ld';

export interface SeoOpenGraph {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export interface SeoTwitter {
  card?: 'summary' | 'summary_large_image';
  title?: string;
  description?: string;
  image?: string;
  site?: string;
  creator?: string;
}

export interface SeoConfig {
  /**
   * Page title
   */
  title?: string;

  /**
   * Meta description
   */
  description?: string;

  /**
   * Meta keywords
   */
  keywords?: string[];

  /**
   * Canonical URL
   */
  canonical?: string;

  /**
   * Robots meta content
   *
   * Example:
   * index, follow
   * noindex, nofollow
   */
  robots?: string;

  /**
   * Author name
   */
  author?: string;

  /**
   * HTML language attribute
   *
   * Example:
   * en
   * en-IN
   * hi-IN
   */
  language?: string;

  /**
   * Browser theme color
   */
  themeColor?: string;

  /**
   * Open Graph configuration
   */
  og?: SeoOpenGraph;

  /**
   * Twitter/X Card configuration
   */
  twitter?: SeoTwitter;

  /**
   * JSON-LD structured data
   */
  jsonLd?: JsonLdData | JsonLdData[];

  /**
   * Whether existing SEO values should
   * be removed when a new configuration
   * does not contain them.
   */
  resetMissing?: boolean;
}
