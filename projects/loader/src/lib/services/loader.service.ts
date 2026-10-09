import { Injectable, signal } from '@angular/core';

import { LoaderOptions, LoaderType, LoaderSize, LoaderPosition } from '../models/loader.types';

import { DEFAULT_LOADER_OPTIONS } from '../config/loader.config';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _visible = signal(false);

  private readonly _requestCount = signal(0);

  private readonly _options = signal<Required<LoaderOptions>>({
    ...DEFAULT_LOADER_OPTIONS,
  });

  readonly visible = this._visible.asReadonly();

  readonly options = this._options.asReadonly();

  readonly requestCount = this._requestCount.asReadonly();

  // ============================================
  // SHOW
  // ============================================

  show(options?: LoaderOptions | string): void {
    if (typeof options === 'string') {
      this._options.set({
        ...DEFAULT_LOADER_OPTIONS,
        text: options,
      });
    } else {
      this._options.set({
        ...DEFAULT_LOADER_OPTIONS,
        ...options,
      });
    }

    this._visible.set(true);
  }

  // ============================================
  // HIDE
  // ============================================

  hide(): void {
    this._visible.set(false);
  }

  // ============================================
  // HTTP REQUEST START
  // ============================================

  startRequest(options?: LoaderOptions | string): void {
    this._requestCount.update((count) => count + 1);

    if (!this._visible()) {
      this.show(options);
    }
  }

  // ============================================
  // HTTP REQUEST END
  // ============================================

  endRequest(): void {
    this._requestCount.update((count) => Math.max(0, count - 1));

    if (this._requestCount() === 0) {
      this.hide();
    }
  }

  // ============================================
  // TOGGLE
  // ============================================

  toggle(): void {
    this._visible.update((value) => !value);
  }

  // ============================================
  // STATUS
  // ============================================

  isLoading(): boolean {
    return this._visible();
  }

  // ============================================
  // SET TYPE
  // ============================================

  setType(type: LoaderType): void {
    this._options.update((options) => ({
      ...options,
      type,
    }));
  }

  // ============================================
  // SET SIZE
  // ============================================

  setSize(size: LoaderSize): void {
    this._options.update((options) => ({
      ...options,
      size,
    }));
  }

  // ============================================
  // SET TEXT
  // ============================================

  setText(text: string): void {
    this._options.update((options) => ({
      ...options,
      text,
    }));
  }

  // ============================================
  // SET POSITION
  // ============================================

  setPosition(position: LoaderPosition): void {
    this._options.update((options) => ({
      ...options,
      position,
    }));
  }

  // ============================================
  // RESET
  // ============================================

  reset(): void {
    this._requestCount.set(0);

    this._options.set({
      ...DEFAULT_LOADER_OPTIONS,
    });

    this._visible.set(false);
  }
}
