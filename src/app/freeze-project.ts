import { Component, effect, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LabLog } from './lab-log.service';
import { Project } from './models';

@Component({
  selector: 'app-freeze-project',
  imports: [RouterLink],
  template: `
    <section>
      @if (project(); as p) {
        <h2>Freeze lab — project {{ p.id }}</h2>
        <p>User: {{ p.user }}</p>
        <p>
          Navigate 1 → 2 while the slow loader runs. The UI should keep showing project 1 until
          project 2 resolves (no loading flash). <code>ngOnInit</code> should log once on reuse.
        </p>

        <nav aria-label="Freeze project ids">
          <a [routerLink]="['/resources-demo/freeze/projects', '1']">Project 1</a>
          <a [routerLink]="['/resources-demo/freeze/projects', '2']">Project 2</a>
        </nav>

        <button type="button" (click)="navigateThenReload(p.id)">
          Navigate to other id, then reload during flight
        </button>
      } @else {
        <p>Waiting for blocking resource value…</p>
      }
    </section>
  `,
})
export class FreezeProject implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly labLog = inject(LabLog);

  project = input<Project>();

  constructor() {
    effect(() => {
      const value = this.project();
      if (value) {
        this.labLog.log(`[input:freeze-project] ${JSON.stringify(value)}`);
      }
    });
  }

  ngOnInit() {
    this.labLog.log(`[lifecycle] FreezeProject ngOnInit (reuse => one log across ids)`);
  }

  navigateThenReload(currentId: string) {
    const next = currentId === '1' ? '2' : '1';
    this.labLog.log(`[freeze] starting navigation to project ${next}`);
    void this.router.navigate(['/resources-demo/freeze/projects', next]);
    const ok = this.route.resources?.['project']?.reload();
    this.labLog.log(`[freeze] reload() during pending navigation => ${ok} (expect false)`);
  }
}
