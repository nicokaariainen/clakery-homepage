# Project Overview

C.Clakery is a single-page portfolio site for a polymer clay artist, deployed at **www.clakery.page** via GitHub Pages.

## Stack

- **Vue 3** with `<script setup>` and TypeScript, built with **Vite 7**
- **vue-router** in history mode (single route, all sections on one page)
- **TinaCMS** (cloud-backed) for content editing, with content stored as markdown/JSON in `content/`
- **StaticForms** (`api.staticforms.xyz`) for the contact form
- **GitHub Pages** deploy via `.github/workflows/deploy.yml`, custom domain pinned through `public/CNAME`

## Repo Layout

```
content/              # CMS-managed content (markdown + json)
  about/, blog/, catalog/, contact/, footer/, home/, products/
src/
  components/         # Vue components (one per section)
  content/index.ts    # Content loader: parses frontmatter, exposes typed accessors
  views/HomeView.vue  # Single page that composes all sections
  router/             # Vue router config
  assets/             # Global CSS (base.css, main.css)
public/
  admin/              # TinaCMS admin (regenerated on build, do not edit)
  CNAME               # GitHub Pages custom domain (deployed with site)
  images/             # Static image assets
tina/
  config.ts           # TinaCMS schema and config (single source of truth)
  tina-lock.json      # Compiled schema, MUST be committed
  __generated__/      # Auto-generated GraphQL types/client (gitignored)
.github/workflows/
  deploy.yml          # Build + deploy to GitHub Pages on push to main
```

## Local Development

Run both Vite and the local Tina server with:

```
npm run dev
```

This starts `tinacms dev -c "vite"`, which serves:
- Site: `http://localhost:5173/`
- Admin: `http://localhost:5173/admin/index.html`

Locally, the admin writes directly to the markdown files in `content/`. No round-trip to GitHub or TinaCloud is involved.

If you only want Vite without Tina (faster startup), use `npm run dev:vite`.

## Content Loading Pattern

`src/content/index.ts` is the single content access layer. It uses `import.meta.glob` to bundle all markdown/JSON files at build time, parses YAML frontmatter (with `js-yaml`), resolves asset paths relative to the Vite base URL, and exposes typed accessor functions:

- `getHomeContent()`, `getCatalogSection()`, `getContactSection()` — singleton sections
- `getProducts()` — sorted by frontmatter `order` field
- `getAboutContent()`, `getFooterSettings()`, `getBlogPosts()`

Components receive content via props from `HomeView.vue`, which loads everything in one `Promise.all` on mount. **Components do not read content directly.** This keeps content access typed in one place and avoids redundant reads.

## TinaCMS Schema Workflow (Critical)

The schema lives in `tina/config.ts`. The compiled lock file lives in `tina/tina-lock.json`. **TinaCloud uses the lock file from the repo to determine the production schema** — not the TS config directly.

**After ANY change to `tina/config.ts`:**

1. Run `npm run dev` (or `npx tinacms dev` directly) at least once. This regenerates `tina/tina-lock.json`.
2. **Commit the regenerated `tina/tina-lock.json` alongside the config change.** Skipping this step is the most common reason TinaCloud falls out of sync with the deployed admin.
3. Push. The CI build uses `--skip-cloud-checks` to avoid race conditions during indexing, but TinaCloud will reindex against the new lock file once it sees the push.

`npx tinacms build` does NOT regenerate the lock file. Only `tinacms dev` does.

After deploy, give TinaCloud a minute or two to reindex. If the admin shows a "Schema mismatch" banner or fields appear empty for content that's clearly in the markdown, the lock file is almost certainly out of date in the repo.

## TinaCloud Version Sync

TinaCloud serves a GraphQL API whose version is determined by the version of `@tinacms/graphql` (a transitive dependency of `@tinacms/cli`) that produced the lock file in your repo. If TinaCloud's runtime is newer than the version in the repo, you'll see a "Local GraphQL version X / Remote GraphQL version Y" mismatch error.

To fix: `npm install tinacms@latest @tinacms/cli@latest`, then run `npm run dev` to regenerate the lock file, then commit and push everything (`package.json`, `package-lock.json`, `tina/tina-lock.json`).

## Deploy

`main` branch pushes trigger `.github/workflows/deploy.yml`:
1. `npx tinacms build --skip-cloud-checks` (regenerates admin from existing lock file)
2. `npm run build` (Vite build → `dist/`)
3. `cp dist/index.html dist/404.html` (SPA fallback for direct URL hits)
4. Upload `dist/` and deploy via `actions/deploy-pages`

Pages **Source** must be set to "GitHub Actions" in the repo settings, not "Deploy from a branch". Setting it to a branch will serve unbuilt source files and 404 on every TinaCMS edit.

The custom domain `www.clakery.page` is pinned via `public/CNAME`, which gets copied into `dist/` on build. The repo-root `CNAME` file is not deployed (only `dist/` is).

## Build & Test Commands

- `npm run dev` — Tina + Vite dev server
- `npm run dev:vite` — Vite only
- `npm run build` — type-check + Vite build (run this to verify changes compile)
- `npm run preview` — serve the production build locally
- `npm run test` — Vitest, single run

## Conventions

- **Filenames as IDs:** Product markdown filenames are stable slugs treated as IDs. Display order is controlled by the `order` frontmatter field. Don't rename files just to change ordering.
- **Image carousel pattern:** Both products and the about section use the same crossfade carousel approach: `images: string[]` in frontmatter, absolute-positioned `<img>` elements stacked inside a relative parent, opacity transitions, timer driven by a `watch` on the prop (not `onMounted` — props arrive async from the parent), pauses on hover, respects `prefers-reduced-motion`.
- **Section header pattern:** Catalog and Contact sections use a small singleton TinaCMS collection (`label`, `title`, `subtitle`) with `allowedActions: { create: false, delete: false }` so editors only get edit access, not creation/deletion.
- **Component props for content:** Components accept content via typed props with sensible string defaults (`{{ value || 'Fallback copy' }}`), never read from `src/content/index.ts` directly.
- **Vite base path:** Set to `/` because the site is served from a custom domain root, not a GitHub Pages subpath.

## Environment Variables

Defined in `.env` (gitignored) and mirrored in CI as secrets/vars:

- `VITE_STATICFORMS_ACCESS_KEY` — StaticForms access key (the recipient email is set in the StaticForms dashboard against this key, NOT in code)
- `VITE_RECIPIENT_EMAIL` — declared in `env.d.ts` but not currently consumed by any component; informational only
- `TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN`, `TINA_SEARCH_TOKEN` — TinaCloud credentials

## Common Gotchas

- **Schema changes without lock file commit** → TinaCloud out of sync (see above)
- **Async content props** → use `watch` (not `onMounted`) when timing matters; `HomeView` populates props after a `Promise.all`, so components receive empty data first
- **GitHub Pages source setting** → must be "GitHub Actions"; "Deploy from a branch" breaks everything
- **DNS for custom domain** → `www` must be a CNAME to `nicokaariainen.github.io`, apex needs four A records to GitHub's Pages IPs
- **StaticForms recipient** → only changeable in the StaticForms.io dashboard, not via env vars or code

## CI / Deploy Gotchas (hard-won)

- **Pin Node to 20 in CI.** Bumping `setup-node` to `node-version: 22` caused `actions/deploy-pages@v4` to fail with `401 Requires authentication` at the deployment step (build and artifact upload succeeded; only the final deploy 401'd). Reverting to Node 20 fixed it. Do not bump the CI Node version without verifying the deploy step still authenticates.
- **`node_modules` cache key must track the Node version.** The deploy workflow caches `node_modules` keyed on `runner.os` + Node version + `package-lock.json` hash. If you change the Node version, update the version in the cache key too, otherwise CI restores a cache built with native binaries (esbuild, rollup) for the wrong Node version and the build fails. Keep the key's Node version in sync with `setup-node`'s `node-version`.
- **Cache save is split from restore.** The workflow uses `actions/cache/restore` + a separate `actions/cache/save` (run right after `npm ci`) rather than the combined `actions/cache`. This is deliberate: the combined action only saves in a post-job step, which gets skipped when a later step (like deploy) fails — so a failing deploy would prevent the cache from ever populating. Saving right after install decouples caching from deploy success.
