import { Component, inject, input, OnInit } from '@angular/core';

import { LabLog } from './lab-log.service';
import { ProjectDocument } from './models';

@Component({
  selector: 'app-resolver-document',
  template: `
    <article>
      @if (document(); as doc) {
        <h3>{{ doc.name }}</h3>
        <p>Type: {{ doc.type }}</p>
        <p>Parent project: {{ doc.projectId }}</p>
      }
    </article>
  `,
})
export class ResolverDocument implements OnInit {
  private readonly labLog = inject(LabLog);

  document = input<ProjectDocument>();

  ngOnInit() {
    const value = this.document();
    this.labLog.log(`[input:document] ${value ? JSON.stringify(value) : '(not bound yet)'}`);
  }
}
