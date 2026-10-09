import { KudoHttpError } from './http-error.model';

export interface KudoHttpState<T> {
  data: T | null;
  loading: boolean;
  success: boolean;
  error: KudoHttpError | null;
  status: number | null;
}
