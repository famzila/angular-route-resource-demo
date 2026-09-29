import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section>
      <h2>Not found</h2>
      <p>Reached via <code>RedirectCommand</code> from a blocking resource loader.</p>
      <a routerLink="/">Back home</a>
    </section>
  `,
})
export class NotFound {}
