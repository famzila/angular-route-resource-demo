import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LabLog } from './lab-log.service';

@Component({
  selector: 'app-abort-lab',
  imports: [RouterLink],
  template: `
    <section>
      <h2>abortSignal lab</h2>
      <p>
        Start the slow load for project 1, then immediately navigate to project 2. The first loader
        should log an abort.
      </p>
      <nav aria-label="Abort project ids">
        <a [routerLink]="['/resources-demo/abort/projects', '1']">Start project 1 (slow)</a>
        <a [routerLink]="['/resources-demo/abort/projects', '2']">Supersede with project 2</a>
      </nav>
      <button type="button" (click)="race()">Race: 1 then immediately 2</button>
    </section>
  `,
})
export class AbortLab {
  private readonly router = inject(Router);
  private readonly labLog = inject(LabLog);

  async race() {
    this.labLog.log(`[abort] navigating to project 1`);
    void this.router.navigate(['/resources-demo/abort/projects', '1']);
    // Give the first navigation time to start its loader before superseding.
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.labLog.log(`[abort] superseding with project 2`);
    void this.router.navigate(['/resources-demo/abort/projects', '2']);
  }
}
