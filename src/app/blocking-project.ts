import { afterNextRender, Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { LabLog } from './lab-log.service';
import { Project } from './models';

@Component({
  selector: 'app-blocking-project',
  imports: [RouterOutlet, RouterLink],
  template: `
    <section>
      @if (project(); as p) {
        <h2>Blocking project {{ p.id }}</h2>
        <p>User: {{ p.user }}</p>
        <p>Status: {{ p.status }}</p>
        <p>Input is the value <code>T</code> (bound after the blocking resource resolves).</p>

        <nav aria-label="Documents">
          <a [routerLink]="['documents', 'A']">Document A</a>
          <a [routerLink]="['documents', 'B']">Document B</a>
        </nav>

        <button type="button" (click)="reload()">Reload via ActivatedRoute.resources</button>

        <router-outlet />
      } @else {
        <p>Waiting for blocking resource value…</p>
      }
    </section>
  `,
})
export class BlockingProject implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly labLog = inject(LabLog);

  /** Bound as T by the router once the blocking resource has a value. */
  project = input<Project>();

  constructor() {
    afterNextRender(() => {
      const value = this.project();
      this.labLog.log(
        `[afterNextRender] input:project ${value ? `bound ${JSON.stringify(value)}` : '(still not bound)'}`,
      );
    });
  }

  ngOnInit() {
    this.labLog.log(`[lifecycle] BlockingProject ngOnInit`);
    const value = this.project();
    this.labLog.log(`[input:project] ${value ? JSON.stringify(value) : '(not bound yet)'}`);
  }

  reload() {
    const ok = this.route.resources?.['project']?.reload();
    this.labLog.log(`[reload] ActivatedRoute.resources['project'].reload() => ${ok}`);
  }
}
