/**
 * Finds the canonical link element.
 */
export function getCanonicalLink(document: Document): HTMLLinkElement | null {
  return document.querySelector('link[rel="canonical"]');
}

/**
 * Creates or updates the canonical URL.
 *
 * Result:
 * <link rel="canonical" href="https://example.com/page">
 */
export function updateCanonicalLink(document: Document, url: string | undefined | null): void {
  if (!url?.trim()) {
    return;
  }

  let link = getCanonicalLink(document);

  if (!link) {
    link = document.createElement('link');

    link.setAttribute('rel', 'canonical');

    document.head.appendChild(link);
  }

  link.setAttribute('href', url.trim());
}

/**
 * Removes the canonical link from the document.
 */
export function removeCanonicalLink(document: Document): void {
  const link = getCanonicalLink(document);

  link?.remove();
}

/**
 * Returns the current canonical URL.
 */
export function getCanonicalUrl(document: Document): string | null {
  const link = getCanonicalLink(document);

  return link?.getAttribute('href') ?? null;
}
