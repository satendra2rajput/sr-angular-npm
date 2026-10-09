import { KudoHttpAuthConfig } from './auth-config.model';

export const DEFAULT_AUTH_CONFIG: Required<KudoHttpAuthConfig> = {
  enabled: true,

  headerName: 'Authorization',

  scheme: 'Bearer',

  excludedUrls: [],

  includeUrls: [],
};
