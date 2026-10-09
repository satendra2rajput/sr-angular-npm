import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Observable, firstValueFrom, isObservable } from 'rxjs';

export interface KudoFormSubmitOptions {
  markAllAsTouched?: boolean;
  resetAfterSuccess?: boolean;
  emitEventOnReset?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class KudoFormSubmitService {
  async submit<T>(
    control: AbstractControl,
    callback: () => Promise<T> | Observable<T>,
    options: KudoFormSubmitOptions = {},
  ): Promise<T | null> {
    const { markAllAsTouched = true, resetAfterSuccess = false, emitEventOnReset = true } = options;

    if (markAllAsTouched) {
      control.markAllAsTouched();
    }

    control.updateValueAndValidity();

    if (control.invalid || control.pending) {
      return null;
    }

    const result = await this.resolve(callback());

    if (resetAfterSuccess) {
      control.reset(undefined, {
        emitEvent: emitEventOnReset,
      });
    }

    return result;
  }

  private async resolve<T>(result: Promise<T> | Observable<T>): Promise<T> {
    if (isObservable(result)) {
      return firstValueFrom(result);
    }

    return result;
  }
}
