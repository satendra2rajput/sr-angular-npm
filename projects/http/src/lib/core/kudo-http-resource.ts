import { Signal, WritableSignal, signal } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { KudoHttpError } from './http-error.model';

import { normalizeHttpError } from './errors/http-error-handler';

export interface KudoHttpResource<T> {
  readonly data: Signal<T | null>;
  readonly loading: Signal<boolean>;
  readonly success: Signal<boolean>;
  readonly error: Signal<KudoHttpError | null>;
  readonly status: Signal<number | null>;

  execute(): void;
  reset(): void;
  destroy(): void;
}

export class KudoHttpResourceImpl<T> implements KudoHttpResource<T> {
  private readonly dataSignal: WritableSignal<T | null> = signal<T | null>(null);

  private readonly loadingSignal: WritableSignal<boolean> = signal(false);

  private readonly successSignal: WritableSignal<boolean> = signal(false);

  private readonly errorSignal: WritableSignal<KudoHttpError | null> = signal(null);

  private readonly statusSignal: WritableSignal<number | null> = signal(null);

  private subscription: Subscription | null = null;

  constructor(private readonly requestFactory: () => Observable<T>) {}

  readonly data = this.dataSignal.asReadonly();

  readonly loading = this.loadingSignal.asReadonly();

  readonly success = this.successSignal.asReadonly();

  readonly error = this.errorSignal.asReadonly();

  readonly status = this.statusSignal.asReadonly();

  execute(): void {
    this.subscription?.unsubscribe();

    this.loadingSignal.set(true);
    this.successSignal.set(false);
    this.errorSignal.set(null);

    this.subscription = this.requestFactory().subscribe({
      next: (data) => {
        this.dataSignal.set(data);
        this.successSignal.set(true);
      },

      error: (error) => {
        this.errorSignal.set(normalizeHttpError(error));

        this.successSignal.set(false);
        this.loadingSignal.set(false);
      },

      complete: () => {
        this.loadingSignal.set(false);
      },
    });
  }

  reset(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;

    this.dataSignal.set(null);
    this.loadingSignal.set(false);
    this.successSignal.set(false);
    this.errorSignal.set(null);
    this.statusSignal.set(null);
  }

  destroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}
