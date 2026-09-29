import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter, tap } from 'rxjs';

import { LabLog } from './lab-log.service';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('route-resource-demo');
  protected readonly labLog = inject(LabLog);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (e): e is NavigationStart | NavigationEnd | NavigationCancel | NavigationError =>
            e instanceof NavigationStart ||
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError,
        ),
        tap((e) => {
          const detail =
            e instanceof NavigationError
              ? ` error=${e.error instanceof Error ? e.error.message : String(e.error)}`
              : '';
          this.labLog.log(`[router] ${e.constructor.name}${detail}`);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  clearLog() {
    this.labLog.clear();
  }
}
