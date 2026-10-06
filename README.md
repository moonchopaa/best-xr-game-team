# A Sip of Home

A browser-based branching story game about finding a taste of home. Players collect ingredients and reach different endings; a password-protected editor at `/edit` updates the shared story and scene artwork.

## Repository structure

- `public/`: game and editor HTML, CSS, JavaScript, bundled images, and audio.
- `server/worker.mjs`: worker entry point, API routes, authentication, story validation, and media serving.
- `server/default-story.json`: initial story used when the database has no saved story.
- `db/schema.ts`: Drizzle definitions for the story and login-attempt tables.
- `drizzle/`: generated SQL migrations and migration metadata. Keep these under version control.
- `scripts/build.mjs`: syntax checks and deployment packaging.
- `tests/`: regression checks using the Node.js test runner.
- `.openai/hosting.json`: hosting project configuration with `DB` and `BUCKET` bindings.
- `dist/`: generated deployment output, currently tracked. Edit the source files above and rebuild; do not edit generated files directly.

## Build and checks

Use Node.js 22 or newer for the build and test commands:

```sh
npm ci
npm run build
npm test
```

`npm run build` checks browser/server JavaScript syntax, embeds `public/` assets in `dist/server/assets.mjs`, converts the default story to a module, copies the worker entry point, and packages hosting configuration and database migrations. The build itself uses only Node.js built-ins.

`npm test` rebuilds first and runs story-validation, legacy-save compatibility, and recipe-ending regression checks. It does not connect to production storage.

There is no local development server or deployment command configured in `package.json`. The generated worker requires a worker-compatible runtime with the bindings below; opening `index.html` directly will not provide its story API.

## Runtime configuration

The deployment requires:

- `DB`: a D1-compatible database with the SQL migrations in `drizzle/` applied.
- `BUCKET`: an R2-compatible object bucket for uploaded images, stored under `images/<uuid>`.
- `EDITOR_PASSWORD`: the shared editor password.
- `EDITOR_SESSION_SECRET`: a secret for signing editor session cookies.

`.env.example` lists the secret names. Configure them in the runtime; the build does not load `.env`. Use HTTPS for editor sessions because the cookie is `Secure` and uses the `__Host-` prefix.

After changing `db/schema.ts`, run `npm run db:generate` and review the new migration. This generates migration files; it does not apply them to a database.

## Story and media behavior

`GET /api/story` returns the saved database story, or `server/default-story.json` when no save exists. Editor saves use revision checks to avoid silently overwriting another editor's changes. Updating the default JSON does not replace an existing saved story.

The game has dialogue scenes, image-only scenes, ingredient rewards, direct endings, and ingredient-dependent recipe endings. Legacy energy/recovery fields are removed when older saved stories are read or validated. Bundled legacy artwork remains available for saved stories that still reference it.

Many default scenes use `/media/<uuid>` images that are **not included in this repository**. The worker reads these from `BUCKET`, falling back to the original hosted site when an object is missing. A self-contained deployment needs those media objects migrated to its bucket; cloning and building alone does not copy them.

The editor's reset-image action still uses the bundled place images. Do not remove artwork solely because the current story displays uploaded images instead.
