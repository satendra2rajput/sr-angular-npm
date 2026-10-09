/**
 * Base JSON-LD structured data.
 *
 * JSON-LD follows Schema.org vocabulary.
 */
export interface JsonLdData {
  '@context'?: string;
  '@type'?: string | string[];

  [key: string]: unknown;
}

/**
 * JSON-LD graph structure.
 *
 * Useful when multiple Schema.org entities
 * need to be represented together.
 */
export interface JsonLdGraph extends JsonLdData {
  '@graph': JsonLdData[];
}

/**
 * Supported JSON-LD input.
 *
 * A package consumer can provide either:
 *
 * 1. One schema
 * 2. Multiple schemas
 * 3. A @graph structure
 */
export type SeoJsonLd = JsonLdData | JsonLdData[] | JsonLdGraph;
