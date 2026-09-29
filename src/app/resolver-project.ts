import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LabLog } from './lab-log.service';
import { Project } from './models';

@Component({
  selector: 'app-resolver-project',
  imports: [RouterOutlet, RouterLink],
  template: `
    <section>
      @if (project(); as p) {
        <h2>Resolver project {{ p.id }}</h2>
        <p>User: {{ p.user }}</p>
        <p>Status: {{ p.status }}</p>
        <p>Resolved data is already bound when <code>ngOnInit</code> runs.</p>

        <nav aria-label="Documents">
          <a [routerLink]="['documents', 'A']">Document A</a>
          <a [routerLink]="['documents', 'B']">Document B</a>
        </nav>

        <router-outlet />
      }
    </section>
  `,
})
export class ResolverProject implements OnInit {
  private readonly labLog = inject(LabLog);

  project = input<Project>();

  ngOnInit() {
    const value = this.project();
    this.labLog.log(`[input:project] ${value ? JSON.stringify(value) : '(not bound yet)'}`);
  }
}
