import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { OG_PROPERTIES } from '../constants/meta.constants';
import { SeoOpenGraph } from '../models/seo-config';
import { removePropertyMetaTag, updatePropertyMetaTag } from '../utils/meta.util';

@Injectable({
  providedIn: 'root',
})
export class SeoOgService {
  constructor(private readonly meta: Meta) {}

  /**
   * Sets Open Graph title.
   *
   * <meta property="og:title" content="...">
   */
  setTitle(value?: string): void {
    this.setProperty(OG_PROPERTIES.TITLE, value);
  }

  /**
   * Sets Open Graph description.
   */
  setDescription(value?: string): void {
    this.setProperty(OG_PROPERTIES.DESCRIPTION, value);
  }

  /**
   * Sets Open Graph image.
   */
  setImage(value?: string): void {
    this.setProperty(OG_PROPERTIES.IMAGE, value);
  }

  /**
   * Sets Open Graph URL.
   */
  setUrl(value?: string): void {
    this.setProperty(OG_PROPERTIES.URL, value);
  }

  /**
   * Sets Open Graph type.
   */
  setType(value?: string): void {
    this.setProperty(OG_PROPERTIES.TYPE, value);
  }

  /**
   * Sets Open Graph site name.
   */
  setSiteName(value?: string): void {
    this.setProperty(OG_PROPERTIES.SITE_NAME, value);
  }

  /**
   * Sets Open Graph locale.
   *
   * Example:
   * en_IN
   * en_US
   * hi_IN
   */
  setLocale(value?: string): void {
    this.setProperty(OG_PROPERTIES.LOCALE, value);
  }

  /**
   * Applies the complete Open Graph configuration.
   */
  set(config?: SeoOpenGraph): void {
    if (!config) {
      return;
    }

    this.setTitle(config.title);
    this.setDescription(config.description);
    this.setImage(config.image);
    this.setUrl(config.url);
    this.setType(config.type);
    this.setSiteName(config.siteName);
    this.setLocale(config.locale);
  }

  /**
   * Removes all Open Graph metadata.
   */
  reset(): void {
    removePropertyMetaTag(this.meta, OG_PROPERTIES.TITLE);

    removePropertyMetaTag(this.meta, OG_PROPERTIES.DESCRIPTION);

    removePropertyMetaTag(this.meta, OG_PROPERTIES.IMAGE);

    removePropertyMetaTag(this.meta, OG_PROPERTIES.URL);

    removePropertyMetaTag(this.meta, OG_PROPERTIES.TYPE);

    removePropertyMetaTag(this.meta, OG_PROPERTIES.SITE_NAME);

    removePropertyMetaTag(this.meta, OG_PROPERTIES.LOCALE);
  }

  /**
   * Internal helper for Open Graph properties.
   */
  private setProperty(property: string, content?: string): void {
    if (!content?.trim()) {
      return;
    }

    updatePropertyMetaTag(this.meta, property, content);
  }
}
