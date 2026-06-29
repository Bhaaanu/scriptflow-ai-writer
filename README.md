# ScriptFlow

> A full-stack script writing application built on React 18, TypeScript, Supabase, and shadcn/ui — deployed on Vercel.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://scriptflow-ai-writer.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-96.6%25-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-backend-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)

---

## Overview

ScriptFlow is a web application for writing, organizing, and managing scripts. The frontend is a fully type-safe React SPA bundled with Vite and styled using Tailwind CSS and the shadcn/ui component system. The backend is Supabase — providing a Postgres database, auth, and row-level security — all connected via the `@supabase/supabase-js` client.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Language** | TypeScript 5 (strict) |
| **Bundler** | Vite 5 + SWC (`@vitejs/plugin-react-swc`) |
| **Styling** | Tailwind CSS 3 + `tailwindcss-animate` |
| **Component Library** | shadcn/ui (Radix UI primitives) |
| **Backend / DB** | Supabase (Postgres + Auth + RLS) |
| **Data Fetching** | TanStack Query v5 |
| **Routing** | React Router DOM v6 |
| **Forms** | React Hook Form + Zod validation |
| **Animations** | Framer Motion 12 |
| **Package Manager** | Bun (lock file present) / npm compatible |
| **Linting** | ESLint 9 + typescript-eslint |
| **Deployment** | Vercel |

---

## Project Structure

```
scriptflow-ai-writer/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ui/           # shadcn/ui generated components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities (cn helper, supabase client)
│   ├── pages/            # Route-level page components
│   └── App.tsx           # Root router and providers
├── supabase/             # Supabase migrations and config
├── public/               # Static assets
├── tailwind.config.ts    # Extended Tailwind theme + custom keyframes
├── vite.config.ts        # Vite config with @ path alias
├── components.json       # shadcn/ui CLI config
└── tsconfig.json         # Strict TypeScript config
```

---

## Architecture Notes

**Routing** is handled by React Router DOM v6 with file-based page components under `src/pages/`. The Vite config maps `@` to `src/` for clean absolute imports.

**Data layer** uses TanStack Query v5 for server state management, with Supabase as the data source. The `@supabase/supabase-js` client is initialized with environment variables and used directly inside React Query hooks — no separate API layer needed.

**Component system** is built on shadcn/ui, which ships unstyled Radix UI primitives styled with Tailwind CSS variables. The `components.json` at the root configures the shadcn CLI to output components into `src/components/ui/` with the slate base color and CSS variable theming.

**Tailwind config** extends the default theme with a set of custom keyframes (`fade-in`, `scale-in`, `float`, `blob`, `shimmer`, `gradient-shift`, `pulse-glow`) and their corresponding animation utilities — used throughout the UI for polished motion.

**Forms** use React Hook Form paired with Zod schemas for declarative, type-safe validation.

---

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- A Supabase project

### Clone and install

```bash
git clone https://github.com/Bhaaanu/scriptflow-ai-writer.git
cd scriptflow-ai-writer
npm install       # or: bun install
```

### Environment variables

Create a `.env` file in the root (or copy the committed `.env` and update the values):

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-ref>
```

All variables are prefixed with `VITE_` so Vite exposes them to the client bundle.

### Run the dev server

```bash
npm run dev
```

The app starts at `http://localhost:8080` (configured in `vite.config.ts`).

### Build for production

```bash
npm run build          # production build
npm run build:dev      # development build (useful for debugging)
npm run preview        # preview the production build locally
```

---

## Database

Supabase migrations live in the `supabase/` directory. The project uses PLpgSQL (1.2% of the codebase) for database functions and policies.

To apply migrations to your own Supabase project:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

Row-level security policies are defined in the migration files — review them before deploying to production.

---

## Adding shadcn/ui Components

The project is configured for the shadcn CLI. To add a new component:

```bash
npx shadcn@latest add <component-name>
```

Components are output to `src/components/ui/` and styled with the existing Tailwind CSS variable theme.

---

## Path Aliases

The `@` alias resolves to `src/`. Both `vite.config.ts` and `tsconfig.json` are kept in sync:

```ts
// vite.config.ts
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") }
}
```

```ts
// tsconfig.app.json
"paths": { "@/*": ["./src/*"] }
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Dev-mode production build |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | Run ESLint across the project |

---

## Key Dependencies at a Glance

```
react@18              — UI framework
react-router-dom@6    — client-side routing
@supabase/supabase-js — Postgres backend client
@tanstack/react-query — server state / caching
react-hook-form       — form state management
zod                   — schema validation
framer-motion@12      — animation library
recharts              — charting (Recharts)
date-fns              — date utilities
sonner                — toast notifications
cmdk                  — command palette
embla-carousel-react  — carousel
vaul                  — drawer component
```

Full list in [`package.json`](./package.json).

---

## Deployment

The app is deployed on Vercel. To deploy your own fork:

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add the three `VITE_SUPABASE_*` environment variables in the Vercel project settings
4. Deploy

Vercel auto-detects Vite and runs `npm run build` with the `dist/` output directory.

---

## Contributing

1. Fork the repo and create a feature branch
2. Run `npm run lint` before opening a pull request
3. Prefer small, focused commits — one concern per PR
4. For any database schema changes, add a new migration file under `supabase/`

---

## License

See [LICENSE](./LICENSE) for details.
