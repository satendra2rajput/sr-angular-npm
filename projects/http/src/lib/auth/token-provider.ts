export interface KudoTokenProvider {
  getAccessToken(): string | null | Promise<string | null>;
}
