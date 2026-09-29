import { Routes } from '@angular/router';

import { NotFound } from './not-found';
import { projectResolverRoutes } from './project-resolver.routes';
import { projectResourceRoutes } from './project-resources.routes';

export const routes: Routes = [
  { path: 'resolver-demo', children: projectResolverRoutes },
  { path: 'resources-demo', children: projectResourceRoutes },
  { path: 'not-found', component: NotFound },
];
