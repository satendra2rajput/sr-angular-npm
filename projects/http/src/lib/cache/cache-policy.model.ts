export type KudoCachePolicy = 'no-cache' | 'cache-first' | 'network-first' | 'force-cache';

export interface KudoCacheOptions {
  policy?: KudoCachePolicy;
  ttl?: number;
}
