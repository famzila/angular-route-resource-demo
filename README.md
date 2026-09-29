# route-resource-demo

A practical Angular **v22.2** demo of [route resources](https://next.angular.dev/guide/routing/data-fetching-with-resources) (developer preview): parallel parent/child loading, blocking vs `nonBlocking`, reload without renavigation, redirects, frozen snapshots during navigation, fine-grained query params, and request cancellation via `abortSignal`.

Each example is a **project** screen with documents. The lab log shows when loaders start and when the page receives data.

## Learn more

For a full walkthrough of the feature (setup, resolver vs resource, reload, freeze, errors, and decision guide), read **[ARTICLE.md](./ARTICLE.md)**.

Official docs: [Data fetching with resources](https://next.angular.dev/guide/routing/data-fetching-with-resources).

## Requirements

- Node.js **22.22.3+** or **24.15.0+** (Angular CLI rejects some other Node majors)
- [pnpm](https://pnpm.io/)

```bash
pnpm install
pnpm start
```

Open [http://localhost:4200](http://localhost:4200).

## Examples

| Link on the home page                                        | What it shows                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| Resolver: load the project, then its document                | Parent → child resolvers run sequentially                  |
| Resources: load the project and document together            | Parent and child route resources run in parallel           |
| Open the page immediately…                                   | `nonBlocking` — input is `Resource<Project>`               |
| Keep the user on the current page when a required load fails | Blocking error → `NavigationError`                         |
| Show a load error on the page itself                         | Non-blocking error via `error()`                           |
| Redirect when the project does not exist                     | `RedirectCommand` from a blocking loader                   |
| Keep the current project on screen while the next one loads  | Frozen snapshot; `reload()` returns `false` mid-navigation |
| Refetch when a query parameter changes                       | `computed` keys for fine-grained tracking vs inline gotcha |
| Cancel the previous request when you move on                 | Forward `abortSignal` into the loader                      |

## Scripts

| Script             | Description         |
| ------------------ | ------------------- |
| `pnpm start`       | Development server  |
| `pnpm build`       | Production build    |
| `pnpm test`        | Unit tests (Vitest) |
| `pnpm lint`        | ESLint              |
| `pnpm lint:styles` | Stylelint           |
| `pnpm format`      | Prettier check      |

## License

UNLICENSED / private
