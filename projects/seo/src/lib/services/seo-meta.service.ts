import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { META_NAMES } from '../constants/meta.constants';
import { SeoConfig } from '../models/seo-config';
import { removeMetaTag, updateMetaTag } from '../utils/meta.util';

@Injectable({
  providedIn: 'root',
})
export class SeoMetaService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
  ) {}

  /**
   * Updates the page title.
   */
  setTitle(value?: string): void {
    if (!value?.trim()) {
      return;
    }

    this.title.setTitle(value.trim());
  }

  /**
   * Updates the meta description.
   */
  setDescription(value?: string): void {
    this.setMeta(META_NAMES.DESCRIPTION, value);
  }

  /**
   * Updates the meta keywords.
   */
  setKeywords(value?: string[]): void {
    if (!value?.length) {
      return;
    }

    const keywords = value
      .map((keyword) => keyword.trim())
      .filter(Boolean)
      .join(', ');

    if (!keywords) {
      return;
    }

    this.setMeta(META_NAMES.KEYWORDS, keywords);
  }

  /**
   * Updates the robots meta tag.
   */
  setRobots(value?: string): void {
    this.setMeta(META_NAMES.ROBOTS, value);
  }

  /**
   * Updates the author meta tag.
   */
  setAuthor(value?: string): void {
    this.setMeta(META_NAMES.AUTHOR, value);
  }

  /**
   * Updates the theme-color meta tag.
   */
  setThemeColor(value?: string): void {
    this.setMeta(META_NAMES.THEME_COLOR, value);
  }

  /**
   * Updates the HTML document language.
   */
  setLanguage(document: Document, language?: string): void {
    if (!language?.trim()) {
      return;
    }

    document.documentElement.lang = language.trim();
  }

  /**
   * Applies all standard SEO metadata.
   */
  set(config: SeoConfig): void {
    this.setTitle(config.title);

    this.setDescription(config.description);

    this.setKeywords(config.keywords);

    this.setRobots(config.robots);

    this.setAuthor(config.author);

    this.setThemeColor(config.themeColor);
  }

  /**
   * Removes standard SEO metadata.
   *
   * Title is reset separately because Angular's
   * Title service manages the document title.
   */
  reset(): void {
    this.title.setTitle('');

    removeMetaTag(this.meta, META_NAMES.DESCRIPTION);

    removeMetaTag(this.meta, META_NAMES.KEYWORDS);

    removeMetaTag(this.meta, META_NAMES.ROBOTS);

    removeMetaTag(this.meta, META_NAMES.AUTHOR);

    removeMetaTag(this.meta, META_NAMES.THEME_COLOR);
  }

  /**
   * Internal helper for standard meta tags.
   */
  private setMeta(name: string, content?: string): void {
    if (!content?.trim()) {
      return;
    }

    updateMetaTag(this.meta, name, content);
  }
}
