import { Meta } from '@angular/platform-browser';

/**
 * Updates or creates a standard `name` based meta tag.
 *
 * Example:
 * <meta name="description" content="Angular SEO library">
 */
export function updateMetaTag(meta: Meta, name: string, content: string | undefined | null): void {
  if (!content?.trim()) {
    return;
  }

  meta.updateTag(
    {
      name,
      content: content.trim(),
    },
    `name="${name}"`,
  );
}

/**
 * Removes a standard `name` based meta tag.
 */
export function removeMetaTag(meta: Meta, name: string): void {
  meta.removeTag(`name="${name}"`);
}

/**
 * Updates or creates a property based meta tag.
 *
 * Mainly used for Open Graph tags.
 *
 * Example:
 * <meta property="og:title" content="Angular Roadmap">
 */
export function updatePropertyMetaTag(
  meta: Meta,
  property: string,
  content: string | undefined | null,
): void {
  if (!content?.trim()) {
    return;
  }

  meta.updateTag(
    {
      property,
      content: content.trim(),
    },
    `property="${property}"`,
  );
}

/**
 * Removes a property based meta tag.
 */
export function removePropertyMetaTag(meta: Meta, property: string): void {
  meta.removeTag(`property="${property}"`);
}

/**
 * Updates a meta tag only when the value exists.
 *
 * Useful for optional SEO configuration values.
 */
export function updateOptionalMetaTag(meta: Meta, name: string, content?: string): void {
  if (content === undefined || content === null) {
    return;
  }

  updateMetaTag(meta, name, content);
}
