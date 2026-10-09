import { DestroyRef, Injectable, inject } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, startWith } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SeoConfig } from '../models/seo-config';

import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class SeoRouteService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Starts automatic route-based SEO handling.
   *
   * Route configuration example:
   *
   * {
   *   path: 'angular',
   *   component: AngularComponent,
   *   data: {
   *     seo: {
   *       title: 'Angular Tutorial',
   *       description: 'Learn Angular step by step.'
   *     }
   *   }
   * }
   */
  init(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.applyRouteSeo();
      });
  }

  /**
   * Reads SEO configuration from the deepest
   * activated route.
   */
  private applyRouteSeo(): void {
    const route = this.getDeepestRoute(this.activatedRoute);

    const seoConfig = route.snapshot.data['seo'] as SeoConfig | undefined;

    if (!seoConfig) {
      return;
    }

    this.seoService.set(seoConfig);
  }

  /**
   * Finds the deepest activated child route.
   *
   * Example:
   *
   * /courses/angular/signals
   *
   * root
   *   ↓
   * courses
   *   ↓
   * angular
   *   ↓
   * signals  ← deepest route
   */
  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }
}
