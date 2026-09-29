import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoryResult, SortResult } from './models';

@Component({
  selector: 'app-query-params-lab',
  imports: [RouterLink],
  template: `
    <section>
      <h2>Fine-grained query params</h2>
      <p>
        <code>byCategory</code> and <code>bySort</code> each read one key through a
        <code>computed</code>, so changing the other key leaves them untouched.
        <code>byCategoryInline</code> reads <code>ctx.queryParams()['category']</code> directly
        inside <code>params</code>, which depends on the whole query param object.
      </p>
      <p>
        Change one parameter and watch the log: <code>[loader:category-inline]</code> runs every
        time, <code>[loader:category]</code> only when <code>category</code> itself changes.
      </p>

      @if (byCategory(); as cat) {
        <p>Category (computed): {{ cat.category }} → {{ cat.items.join(', ') }}</p>
      }
      @if (byCategoryInline(); as cat) {
        <p>Category (inline): {{ cat.category }} → {{ cat.items.join(', ') }}</p>
      }
      @if (bySort(); as sort) {
        <p>Sort (computed): {{ sort.sort }} → {{ sort.items.join(', ') }}</p>
      }

      <nav aria-label="Query param experiments">
        <ul>
          <li>
            <a [routerLink]="[]" [queryParams]="{ category: 'alpha', sort: 'asc' }"
              >category=alpha sort=asc</a
            >
          </li>
          <li>
            <a [routerLink]="[]" [queryParams]="{ category: 'beta' }" queryParamsHandling="merge"
              >change category only</a
            >
          </li>
          <li>
            <a [routerLink]="[]" [queryParams]="{ sort: 'desc' }" queryParamsHandling="merge"
              >change sort only</a
            >
          </li>
        </ul>
      </nav>
    </section>
  `,
})
export class QueryParamsLab {
  byCategory = input<CategoryResult>();
  byCategoryInline = input<CategoryResult>();
  bySort = input<SortResult>();
}
