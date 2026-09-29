import { Component, inject, input, OnInit, Resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LabLog } from './lab-log.service';
import { Project } from './models';

@Component({
  selector: 'app-nonblocking-project',
  template: `
    <section>
      <h2>Non-blocking project</h2>
      <p>Input is <code>Resource&lt;Project&gt;</code>. Status: {{ project().status() }}</p>

      @if (project().isLoading()) {
        <p>Loading…</p>
      } @else if (project().error(); as err) {
        <p role="alert">Error: {{ errorMessage(err) }}</p>
      } @else if (project().hasValue()) {
        <h3>Project {{ project().value().id }}</h3>
        <p>User: {{ project().value().user }}</p>
        <p>Status: {{ project().value().status }}</p>
      }

      <button type="button" (click)="reload()">Reload without renavigation</button>
    </section>
  `,
})
export class NonBlockingProject implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly labLog = inject(LabLog);

  project = input.required<Resource<Project>>();

  ngOnInit() {
    this.labLog.log(`[lifecycle] NonBlockingProject ngOnInit`);
    this.labLog.log(
      `[input:project Resource] status=${this.project().status()} hasValue=${this.project().hasValue()}`,
    );
  }

  reload() {
    const ok = this.route.resources?.['project']?.reload();
    this.labLog.log(
      `[reload] ActivatedRoute.resources['project'].reload() => ${ok} (expect no NavigationStart)`,
    );
  }

  errorMessage(err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}
