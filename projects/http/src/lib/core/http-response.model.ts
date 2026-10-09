export interface KudoHttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  url: string | null;
}
