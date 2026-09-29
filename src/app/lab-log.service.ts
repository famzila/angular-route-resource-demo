import { Service, signal } from '@angular/core';

@Service()
export class LabLog {
  readonly entries = signal<string[]>([]);

  log(message: string) {
    const line = `[${(performance.now() / 1000).toFixed(3)}s] ${message}`;
    console.log(line);
    this.entries.update((entries) => [...entries, line]);
  }

  clear() {
    this.entries.set([]);
  }
}
