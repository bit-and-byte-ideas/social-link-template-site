# social-link-template-site

A white-label "link in bio" page for streamers: one screen with your avatar,
your bio, and buttons to every platform you're on. Fork it, edit one file,
deploy. React 19 + TypeScript + Vite, with linting, type-checking, unit tests,
Conventional Commits, and CI wired up out of the box.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) (this repo pins it via the `packageManager` field —
  run `corepack enable pnpm` if you don't have it)

## Getting started

```bash
pnpm install
# install git hooks (commit-msg + pre-commit) — requires the pre-commit tool
# (https://pre-commit.com): `brew install pre-commit` or `pipx install pre-commit`
pre-commit install --hook-type pre-commit --hook-type commit-msg
pnpm dev
```

## Making it yours

Everything a streamer needs to edit lives in **one file**:
[`src/config/profile.ts`](src/config/profile.ts). No other source file needs
to change for the common case of "new streamer, same layout."

### Profile (avatar, name, bio, live status)

```ts
export const profile: StreamerProfile = {
  displayName: 'Nova Ridley',
  tagline: 'Variety streamer · cozy games & late-night chats',
  bio: 'Streaming games, art, and way too much chatting since 2019. ...',
  avatarSrc: avatarPlaceholder,
  avatarAlt: 'Nova Ridley',
  status: 'offline',
}
```

- `avatarSrc` — swap `avatarPlaceholder` for your own photo. Drop an image in
  `src/assets/` (e.g. `avatar.jpg`), import it at the top of `profile.ts`
  (`import avatar from '../assets/avatar.jpg'`), and set `avatarSrc: avatar`.
- `status` — `'live'` or `'offline'`. This is a plain flag you flip by hand
  when you start/end a stream; it isn't wired to any platform API in this
  phase. Set it to `'live'` before you go live and back to `'offline'` after,
  or leave it on whichever value fits your workflow.

### Social links

`socialLinks` is an array — add, remove, or reorder entries freely, the page
renders whatever's in the list:

```ts
{
  id: 'twitch',
  label: 'Twitch',
  url: 'https://twitch.tv/your-channel',
  icon: { kind: 'sprite', id: 'twitch-icon' },
  brandColor: '#9146ff',
}
```

- `id` — unique key, used internally (React list key).
- `label` — the visible button text.
- `url` — where the button links. Opens in a new tab automatically.
- `brandColor` — optional. The button's border/icon/glow color on hover and
  keyboard focus. Leave it off to use the site's default accent color
  instead.
- `icon` — see below.

Built in platforms: Twitch, YouTube, Instagram, TikTok, X, and Discord. Add
more entries for anything else (Kick, Patreon, Ko-fi, your own website, an
email address, ...) using the generic `link-icon` or a custom icon.

## Customizing icons

Each link's `icon` field is one of two shapes:

**A symbol from the built-in sprite** (`public/icons.svg`):

```ts
icon: { kind: 'sprite', id: 'twitch-icon' }
```

The sprite ships with `twitch-icon`, `youtube-icon`, `instagram-icon`,
`tiktok-icon`, `x-icon`, `discord-icon`, `bluesky-icon`, and a generic
`link-icon` fallback. To add another platform's mark:

1. Grab an SVG path for it — [simple-icons](https://simpleicons.dev/) is a
   good source of free, accurate brand glyphs.
2. Add a new `<symbol id="…" viewBox="…">` to `public/icons.svg`, using
   `fill="currentColor"` (or `stroke="currentColor"`) instead of a hardcoded
   color, so it inherits the button's hover color correctly.
3. Reference it from `profile.ts` as `{ kind: 'sprite', id: 'your-new-id' }`.

**A standalone image file**, for a logo that doesn't fit the sprite pattern:

```ts
icon: { kind: 'image', src: myIcon, alt: 'Kick' }
```

Drop the file in `src/assets/`, import it at the top of `profile.ts`
(`import myIcon from '../assets/kick.svg'`), and reference the import as
`src`.

## Design

The page is themed as a broadcast monitor — a bezelled card with faint
scanlines, a status pill wired to `profile.status`, and platform buttons that
only reveal their brand color when you hover or focus them. Shared colors and
type live as CSS custom properties in `src/index.css` (`--ink`, `--panel`,
`--signal`, etc.) — change them there to reskin the whole page at once, no
component edits required. Component-level styles are in `src/App.css`.

## Commands

| Command            | What it does                                                       |
| ------------------- | ------------------------------------------------------------------- |
| `pnpm dev`         | Start the Vite dev server with HMR.                                 |
| `pnpm build`       | Type-check (`tsc -b`) and build the production bundle to `dist/`.   |
| `pnpm preview`     | Serve the built `dist/` locally to verify the production output.    |
| `pnpm lint`        | Run ESLint across the repo.                                         |
| `pnpm typecheck`   | Type-check only (`tsc -b`), no build output.                        |
| `pnpm test`        | Run the Vitest unit suite once.                                     |
| `pnpm test:watch`  | Run Vitest in watch mode.                                           |

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
and are validated by commitlint via a git hook. The same `lint`, `build`, and
`test` commands run in CI on every push and pull request.

## Deploying

`pnpm build` produces a static `dist/` folder — host it anywhere that serves
static files (Vercel, Netlify, GitHub Pages, Cloudflare Pages, a plain S3
bucket, ...). There's no server-side code and no environment variables to
configure.
