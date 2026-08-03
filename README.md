# IIC Portal — Institution's Innovation Council

Official website for the Institution's Innovation Council (IIC), Amrita Vishwa
Vidyapeetham, Kochi Campus. Built with **React + Vite + Tailwind CSS + Supabase**.

## Setup

> **Important:** This project needs a Supabase project. The credentials live in a
> `.env` file that is **gitignored** (never committed), so each developer must
> create their own copy.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file from the template:
   ```bash
   cp .env.example .env
   ```
   On Windows (PowerShell):
   ```powershell
   Copy-Item .env.example .env
   ```

3. Open `.env` and fill in your Supabase values:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
   ```
   You can find these under **Supabase → Project Settings → API**.

4. Run the dev server:
   ```bash
   npm run dev
   ```

If forms (Ideas, Queries, Contact) fail to submit on another machine, the most
likely cause is a missing/invalid `.env` file — check that `VITE_SUPABASE_URL`
and `VITE_SUPABASE_ANON_KEY` are set correctly.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
