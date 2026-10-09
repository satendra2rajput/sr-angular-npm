import { HttpContextToken } from '@angular/common/http';

export const KUDO_HTTP_DEDUPLICATION_CONTEXT = new HttpContextToken<boolean>(() => false);
