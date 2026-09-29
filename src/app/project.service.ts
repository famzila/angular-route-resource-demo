import { inject, Service } from '@angular/core';

import { LabLog } from './lab-log.service';
import { CategoryResult, LoaderOptions, Project, ProjectDocument, SortResult } from './models';

@Service()
export class ProjectApiService {
  private readonly labLog = inject(LabLog);

  fetchProject(id: string, ms = 250, options: LoaderOptions = {}): Promise<Project> {
    this.labLog.log(`[loader:project] start id=${id} delay=${ms}ms`);
    return this.delay(ms, options.signal).then(() => {
      this.labLog.log(`[loader:project] done id=${id}`);
      return { id, user: `User ${id}`, status: 'in_review' as const };
    });
  }

  fetchDocument(
    projectId: string,
    documentId: string,
    ms = 400,
    options: LoaderOptions = {},
  ): Promise<ProjectDocument> {
    this.labLog.log(`[loader:document] start project=${projectId} doc=${documentId} delay=${ms}ms`);
    return this.delay(ms, options.signal).then(() => {
      this.labLog.log(`[loader:document] done project=${projectId} doc=${documentId}`);
      return {
        id: documentId,
        projectId,
        type: 'id_card',
        name: `Document ${documentId}`,
      };
    });
  }

  fetchProjectFailing(ms = 200): Promise<Project> {
    this.labLog.log(`[loader:project] start FAILING delay=${ms}ms`);
    return this.delay(ms).then(() => {
      throw new Error('Simulated project fetch failure');
    });
  }

  fetchByCategory(category: string, label = 'category', ms = 300): Promise<CategoryResult> {
    this.labLog.log(`[loader:${label}] start category=${category} delay=${ms}ms`);
    return this.delay(ms).then(() => {
      this.labLog.log(`[loader:${label}] done category=${category}`);
      return { category, items: [`${category}-a`, `${category}-b`] };
    });
  }

  fetchBySort(sort: string, ms = 300): Promise<SortResult> {
    this.labLog.log(`[loader:sort] start sort=${sort} delay=${ms}ms`);
    return this.delay(ms).then(() => {
      this.labLog.log(`[loader:sort] done sort=${sort}`);
      return { sort, items: sort === 'desc' ? ['z', 'a'] : ['a', 'z'] };
    });
  }

  private delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        this.labLog.log(`[loader] aborted before start`);
        reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
        return;
      }

      const timer = setTimeout(() => resolve(), ms);
      signal?.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);
          this.labLog.log(`[loader] aborted during wait`);
          reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
        },
        { once: true },
      );
    });
  }
}
