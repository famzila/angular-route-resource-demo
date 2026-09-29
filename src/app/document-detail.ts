import { afterNextRender, Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LabLog } from './lab-log.service';
import { ProjectDocument } from './models';

@Component({
  selector: 'app-document-detail',
  template: `
    <article>
      @if (document(); as doc) {
        <h3>{{ doc.name }}</h3>
        <p>Type: {{ doc.type }}</p>
        <p>Parent project: {{ doc.projectId }}</p>
        <button type="button" (click)="reload()">Reload without renavigation</button>
      } @else {
        <p>Waiting for document…</p>
      }
    </article>
  `,
})
export class DocumentDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly labLog = inject(LabLog);

  document = input<ProjectDocument>();

  constructor() {
    afterNextRender(() => {
      const value = this.document();
      this.labLog.log(
        `[afterNextRender] input:document ${value ? `bound ${JSON.stringify(value)}` : '(still not bound)'}`,
      );
    });
  }

  ngOnInit() {
    this.labLog.log(`[lifecycle] DocumentDetail ngOnInit`);
    const value = this.document();
    this.labLog.log(`[input:document] ${value ? JSON.stringify(value) : '(not bound yet)'}`);
  }

  reload() {
    const ok = this.route.resources?.['document']?.reload();
    this.labLog.log(`[reload] ActivatedRoute.resources['document'].reload() => ${ok}`);
  }
}
