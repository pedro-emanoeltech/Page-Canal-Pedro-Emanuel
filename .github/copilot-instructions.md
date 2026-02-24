# Copilot instructions — quick reference

This repo runs a single TypeScript codebase that serves both the API and the client from one process. Use these notes to get productive quickly.

**Big picture**
- **Server + Client in one repo:** Express server boots at [server/index.ts](server/index.ts) and either attaches Vite in dev (middleware mode) or serves built assets in production.
- **Dev vs Prod:** Dev uses `npm run dev` (runs `tsx server/index.ts`) which starts Vite middleware; production uses `npm run build` then `npm start` (bundled server at `dist/index.cjs`). See [package.json](package.json).
- **Single port:** API routes and client are served on the same port (env `PORT`, default 5000).

**Build & run workflows**
- Dev: `npm run dev` — starts the Express server which in turn sets up Vite middleware. Relevant code: [server/vite.ts](server/vite.ts) and [vite.config.ts](vite.config.ts).
- Build: `npm run build` — runs `script/build.ts` which runs `vite build` for the client then bundles the server with `esbuild` into `dist/index.cjs`. See [script/build.ts](script/build.ts).
- Start (prod): `npm start` — ensure you run `npm run build` first and provide `DATABASE_URL`.
- Database migrations: `npm run db:push` (uses `drizzle-kit`). See `drizzle.config.ts`.

**Key integrations & env**
- Postgres via `DATABASE_URL`. Server fails fast if not provided. See [server/db.ts](server/db.ts).
- Vite dev middleware path/HMR: HMR uses `/vite-hmr` and index HTML is proxied via `vite.transformIndexHtml` in [server/vite.ts](server/vite.ts).
- Static build output: Vite builds into `dist/public` and the server serves it from `server/public` in production. See [vite.config.ts](vite.config.ts) and [server/static.ts](server/static.ts).

**API surface & data model**
- Canonical API definitions live in [shared/routes.ts](shared/routes.ts). The server implements those routes in [server/routes.ts](server/routes.ts).
- Data model and types are in [shared/schema.ts](shared/schema.ts) and persisted via Drizzle ORM in [server/storage.ts](server/storage.ts).
- Seed data is inserted on startup if the tutorials table is empty (see [server/routes.ts](server/routes.ts)).

**Project-specific patterns & conventions**
- **Aliases:** `@` -> `client/src`, `@shared` -> `shared`, `@assets` -> `attached_assets` (configured in [vite.config.ts](vite.config.ts)). Prefer these aliases in new client/server code.
- **Error handling:** The server uses a centralized error middleware in [server/index.ts](server/index.ts). Throw objects with `status`/`statusCode` where appropriate.
- **Request logging:** API responses are logged with timing and, when present, the JSON response body. See the logging wrapper in [server/index.ts](server/index.ts).
- **Raw body capture:** `express.json` uses `verify` to attach `rawBody` to requests when needed (e.g., signature verification). See [server/index.ts](server/index.ts).
- **Module format:** `package.json` sets `type: "module"` for source. The production bundle is a CommonJS file (`dist/index.cjs`) built by esbuild — note mixed module target.

**Client notes**
- Routing: client uses `wouter` and defines routes in `client/src/App.tsx` (see [client/src/App.tsx](client/src/App.tsx)).
- Data fetching: `@tanstack/react-query` with `client/src/lib/queryClient.ts`.
- Component library: UI components live under `client/src/components` and follow a composable pattern (see `client/src/components/ui/*`).

**What to look for when editing/adding features**
- If you add new API routes, update the canonical `shared/routes.ts` first and then implement in `server/routes.ts` to keep client/server in sync.
- If routes return new shapes, update `shared/schema.ts` and adjust the client types accordingly.
- For changes that touch both client and server, prefer `npm run dev` for fast feedback (Vite middleware + HMR).

**Quick troubleshooting**
- If production static serve fails, confirm `dist/public` exists. Run `npm run build` locally to reproduce. See [server/static.ts](server/static.ts).
- If migrations or DB calls fail, ensure `DATABASE_URL` is valid and `drizzle-kit` is configured.
- If Vite HMR doesn't work in dev, check `server/vite.ts` middleware wiring and that `PORT` isn't blocked.

If anything here is unclear or you want examples expanded (e.g., typical PR tasks or testing commands), tell me which sections to expand. I can iterate quickly.
