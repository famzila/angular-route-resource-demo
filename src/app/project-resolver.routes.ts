import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ProjectApiService } from './project.service';
import { ResolverDocument } from './resolver-document';
import { ResolverProject } from './resolver-project';

export const projectResolverRoutes: Routes = [
  {
    path: 'projects/:projectId',
    component: ResolverProject,
    resolve: {
      project: (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
        inject(ProjectApiService).fetchProject(route.paramMap.get('projectId')!, 250),
    },
    children: [
      {
        path: 'documents/:documentId',
        component: ResolverDocument,
        resolve: {
          document: (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
            inject(ProjectApiService).fetchDocument(
              route.parent?.paramMap.get('projectId') ?? route.paramMap.get('projectId')!,
              route.paramMap.get('documentId')!,
              400,
            ),
        },
      },
    ],
  },
];
