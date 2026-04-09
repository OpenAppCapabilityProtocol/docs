# Hark & OACP Docs

Documentation site for:

- OACP - the Open App Capability Protocol
- `oacp-android-sdk` - the Kotlin SDK for Android apps
- Hark - the open-source on-device AI assistant built on OACP

This repo is a customized TinaDocs site built with Next.js, TinaCMS, Tailwind, and Pagefind.

Intended GitHub home: the [OpenAppCapabilityProtocol](https://github.com/OpenAppCapabilityProtocol) GitHub org.

## What is in this repo

- Landing page at `/`
- Docs app at `/docs`
- OACP protocol docs
- Hark docs
- Kotlin SDK docs
- Placeholder docs for Flutter and React Native SDK work
- Roadmap and ecosystem pages

The current branding and content are specific to OACP and Hark. This is no longer a generic TinaDocs starter.

## Local development

Install dependencies:

```bash
pnpm install
```

Start the site locally:

```bash
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

Tina admin is available at `/admin`.

## Useful commands

Validate Tina schema locally without TinaCloud credentials:

```bash
pnpm tinacms build --local --skip-cloud-checks --skip-search-index
```

Run the normal lint check used in this repo:

```bash
pnpm lint
```

Build the local Pagefind search index:

```bash
pnpm build-local-pagefind
```

Static export without TinaCloud production setup:

```bash
pnpm export
```

Production build:

```bash
pnpm build
```

## Tina and environment setup

Production Tina builds need the environment variables from `.env.example`:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=***
TINA_TOKEN=***
NEXT_PUBLIC_TINA_BRANCH=***
```

If those are missing, `pnpm build` will fail. For local content work, use the local Tina build command shown above or `pnpm export`.

Optional variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_THEME_SELECTION=true
GITHUB_TOKEN=<optional>
GITHUB_OWNER=<optional>
GITHUB_REPO=<optional>
```

## Search

Search uses [Pagefind](https://pagefind.app/).

The dev server warns when the index is stale. Rebuild it with:

```bash
pnpm build-local-pagefind
```

Generated search files are written under `public/pagefind/`.

## Repo notes

- This local repo currently has no git remote configured.
- The site metadata still needs a final production domain once this repo is created in the org and deployed.
- The theme system has been narrowed to OACP-specific themes instead of the full Tina starter set.

## License

See the protocol repo for the current project license:
[OpenAppCapabilityProtocol/oacp](https://github.com/OpenAppCapabilityProtocol/oacp/blob/main/LICENSE)
