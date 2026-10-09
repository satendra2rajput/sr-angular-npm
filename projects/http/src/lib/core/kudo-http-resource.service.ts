import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { KudoHttpResource, KudoHttpResourceImpl } from './kudo-http-resource';

@Injectable({
  providedIn: 'root',
})
export class KudoHttpResourceService {
  create<T>(requestFactory: () => Observable<T>): KudoHttpResource<T> {
    return new KudoHttpResourceImpl(requestFactory);
  }
}
