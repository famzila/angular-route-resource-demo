import { Component, input } from '@angular/core';

import { Project } from './models';

@Component({
  selector: 'app-project-summary',
  template: `
    <section>
      @if (project(); as p) {
        <h2>Project {{ p.id }}</h2>
        <p>User: {{ p.user }}</p>
        <p>Status: {{ p.status }}</p>
      }
    </section>
  `,
})
export class ProjectSummary {
  project = input<Project>();
}
