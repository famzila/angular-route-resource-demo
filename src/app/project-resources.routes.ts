import { computed, inject, resource } from '@angular/core';
import { nonBlocking, RedirectCommand, Router, Routes } from '@angular/router';

import { AbortLab } from './abort-lab';
import { BlockingProject } from './blocking-project';
import { DocumentDetail } from './document-detail';
import { FreezeProject } from './freeze-project';
import { NonBlockingProject } from './nonblocking-project';
import { ProjectSummary } from './project-summary';
import { ProjectApiService } from './project.service';
import { QueryParamsLab } from './query-params-lab';

export const projectResourceRoutes: Routes = [
  {
    path: 'projects/:projectId',
    component: BlockingProject,
    resources: (ctx) => {
      const api = inject(ProjectApiService);
      return {
        project: resource({
          params: () => ctx.params()['projectId'],
          loader: ({ params: projectId }) => api.fetchProject(projectId, 250),
        }),
      };
    },
    children: [
      {
        path: 'documents/:documentId',
        component: DocumentDetail,
        resources: (ctx) => {
          const api = inject(ProjectApiService);
          return {
            document: resource({
              params: () => ({
                projectId: ctx.params()['projectId'] as string,
                documentId: ctx.params()['documentId'] as string,
              }),
              loader: ({ params }) => api.fetchDocument(params.projectId, params.documentId, 400),
            }),
          };
        },
      },
    ],
  },
  {
    path: 'nonblocking/projects/:projectId',
    component: NonBlockingProject,
    resources: (ctx) => {
      const api = inject(ProjectApiService);
      return {
        project: nonBlocking(
          resource({
            params: () => ctx.params()['projectId'],
            loader: ({ params: projectId }) => api.fetchProject(projectId, 800),
          }),
        ),
      };
    },
  },
  {
    path: 'error-blocking',
    component: ProjectSummary,
    resources: () => {
      const api = inject(ProjectApiService);
      return {
        project: resource({
          loader: () => api.fetchProjectFailing(200),
        }),
      };
    },
  },
  {
    path: 'error-nonblocking',
    component: NonBlockingProject,
    resources: () => {
      const api = inject(ProjectApiService);
      return {
        project: nonBlocking(
          resource({
            loader: () => api.fetchProjectFailing(200),
          }),
        ),
      };
    },
  },
  {
    path: 'redirect/projects/:projectId',
    component: ProjectSummary,
    resources: (ctx) => {
      const api = inject(ProjectApiService);
      const router = inject(Router);
      return {
        project: resource({
          params: () => ctx.params()['projectId'],
          loader: async ({ params: projectId }) => {
            if (projectId === 'missing') {
              throw new RedirectCommand(router.parseUrl('/not-found'));
            }
            return api.fetchProject(projectId, 150);
          },
        }),
      };
    },
  },
  {
    path: 'freeze/projects/:projectId',
    component: FreezeProject,
    resources: (ctx) => {
      const api = inject(ProjectApiService);
      return {
        project: resource({
          params: () => ctx.params()['projectId'],
          loader: ({ params: projectId }) => api.fetchProject(projectId, 1500),
        }),
      };
    },
  },
  {
    path: 'query',
    component: QueryParamsLab,
    resources: (ctx) => {
      const api = inject(ProjectApiService);
      const category = computed(() => ctx.queryParams()['category'] ?? 'all');
      const sort = computed(() => ctx.queryParams()['sort'] ?? 'asc');

      return {
        byCategory: resource({
          params: category,
          loader: ({ params }) => api.fetchByCategory(params),
        }),
        bySort: resource({
          params: sort,
          loader: ({ params }) => api.fetchBySort(params),
        }),
        // Same key read inline instead of through a computed: reruns on any query param change.
        byCategoryInline: resource({
          params: () => ctx.queryParams()['category'] ?? 'all',
          loader: ({ params }) => api.fetchByCategory(params, 'category-inline'),
        }),
      };
    },
  },
  {
    path: 'abort',
    component: AbortLab,
  },
  {
    path: 'abort/projects/:projectId',
    component: ProjectSummary,
    resources: (ctx) => {
      const api = inject(ProjectApiService);
      return {
        project: resource({
          params: () => ctx.params()['projectId'],
          loader: ({ params: projectId, abortSignal }) =>
            api.fetchProject(projectId, 2000, { signal: abortSignal }),
        }),
      };
    },
  },
];
