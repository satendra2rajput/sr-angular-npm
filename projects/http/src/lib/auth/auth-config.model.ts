export interface KudoHttpAuthConfig {
  enabled?: boolean;

  headerName?: string;

  scheme?: string;

  excludedUrls?: string[];

  includeUrls?: string[];
}
