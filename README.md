# Institution's Innovation Council (IIC) Portal

**Official Documentation**

Official website and admin content-management system for the Institution's Innovation Council (IIC), Amrita Vishwa Vidyapeetham — Kochi Campus.

Built with **React + Vite + Tailwind CSS + Supabase**.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Project Structure](#4-project-structure)
5. [User Roles & Permissions](#5-user-roles--permissions)
6. [Public Website — Pages & Routes](#6-public-website--pages--routes)
7. [Admin Dashboard — Pages & Routes](#7-admin-dashboard--pages--routes)
8. [Authentication & Security](#8-authentication--security)
9. [Data Model (Supabase)](#9-data-model-supabase)
10. [File Storage](#10-file-storage)
11. [Environment Setup](#11-environment-setup)
12. [Build & Deployment](#12-build--deployment)
13. [UI Design Direction](#13-ui-design-direction)
14. [Appendix](#14-appendix)

---

## 1. Introduction

### 1.1 Purpose

This document is the official technical and functional reference for the IIC Portal — the public website and administrative content-management system for the IIC chapter at Amrita Vishwa Vidyapeetham, Kochi Campus. It covers the system's purpose, architecture, page inventory, data model, security model, and setup/deployment procedure.

### 1.2 Overview

The IIC Portal is a modern, responsive web application that serves as the official digital platform of the Institution's Innovation Council. It showcases the council's innovation activities, leadership, events, notices, research, active projects, and certifications, and gives students an interactive way to submit innovative ideas and queries. A protected Admin Dashboard lets authorized administrators manage all website content without touching source code.

The application is entirely frontend-driven, using **Supabase** as a backend-as-a-service for the database, authentication, and file storage. There is no separate Node.js/Express server.

### 1.3 Objectives

- Provide a modern official website for the IIC that showcases its activities and achievements
- Display leadership, team members, and Innovation Ambassadors
- Publish upcoming and past events with live countdowns
- Publish official notices and announcements with filtering and pinning
- Showcase research & development activity and active student/institutional projects
- Host establishment documents and certifications
- Let visitors submit innovative ideas and general queries
- Provide a secure, authenticated Admin Dashboard for full content management

---

## 2. Technology Stack

### 2.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.7 | Core UI library |
| Vite | ^8.1.1 | Build tool & dev server |
| React Router DOM | ^7.18.1 | Client-side routing |
| Tailwind CSS | ^4.3.2 | Utility-first styling |
| Framer Motion | ^12.42.2 | Page & component animation |
| GSAP | ^3.15.0 | Advanced scroll/timeline animation |
| Lenis | ^1.3.25 | Smooth-scrolling |
| Three.js / @react-three/fiber | ^0.185.1 / ^9.6.1 | 3D hero scene & ambient visuals |
| @react-three/drei | ^10.7.7 | Three.js helper components |
| Lucide React | ^1.25.0 | Icon set |
| React Hook Form | ^7.81.0 | Form state & validation |
| React Toastify | ^11.1.0 | Toast notifications |
| Swiper | ^14.0.5 | Carousels / sliders |

### 2.2 Backend Services

The project uses **Supabase** exclusively as its backend, providing:

- PostgreSQL database
- Admin authentication (Supabase Auth)
- File storage (Supabase Storage)
- Row Level Security (RLS) policies for access control

### 2.3 Tooling

| Tool | Purpose |
|---|---|
| `oxlint` | Fast linting (`npm run lint`) |
| `@vitejs/plugin-react` | React support in Vite (Oxc-based) |
| `@tailwindcss/vite` | Tailwind v4 Vite integration |

### 2.4 Deployment Targets

- **Frontend:** Vercel or Netlify (static build output from Vite)
- **Database, Auth & Storage:** Supabase (managed PostgreSQL + services)

---

## 3. System Architecture

The IIC Portal follows a fully client-driven architecture. The React application communicates directly with Supabase through its JavaScript SDK — there is no intermediary application server.

### 3.1 High-Level Flow

```
Users
  |
  v
React Web Application (Vite build, deployed to Vercel/Netlify)
  |
  v
Supabase JavaScript SDK (@supabase/supabase-js)
  |
  +----------------+----------------+
  |                |                |
  v                v                v
PostgreSQL      Supabase Auth    Supabase Storage
(content data)  (admin login)    (images / PDFs)
```

### 3.2 Application Composition

At runtime the app is split into two independently-routed halves rendered from a single entry point:

- **Public site** — marketing/informational pages, wrapped in the shared Navbar, Footer, Preloader, custom cursor, and route-transition chrome
- **Admin panel** (`/admin/*`) — a protected dashboard with its own layout, sidebar, and topbar, rendered without the public chrome

Both halves share the same Supabase client instance and the same React Router tree, but the public routes are eagerly wrapped with global UI (cursor, preloader, page-transition) while `/admin/*` is excluded from that chrome, as implemented in `src/App.jsx`.

### 3.3 Key Cross-Cutting Modules

| Module | Path | Responsibility |
|---|---|---|
| Supabase client | `src/services/supabase.js` | Initializes the SDK client, defines `TABLES` and `BUCKETS` constants |
| Auth context | `src/context/AuthContext.jsx` | Provides user/session state, `signIn`, `signOut` across the admin app |
| Protected route | `src/routes/ProtectedRoute.jsx` | Gate that redirects unauthenticated users away from admin pages |
| Smooth scroll hook | `src/hooks/useLenis.js` | Initializes Lenis smooth-scrolling for the public site |
| Countdown hook | `src/hooks/useCountdown.js` | Drives live event countdowns |
| Supabase data hook | `src/hooks/useSupabase.js` | Shared data-fetching helper(s) around the Supabase client |

---

## 4. Project Structure

```
IIC-official-website/
├── public/                     Static assets (favicon, icon sprite)
├── src/
│   ├── assets/                 Images, logos, per-section README placeholders
│   ├── components/
│   │   ├── common/             Button, Loader, Logo, Modal, Preloader, CustomCursor,
│   │   │                       MaskReveal, Reveal, RouteTransition, ScrambleText, TextReveal
│   │   ├── layout/             Navbar, Footer, AdminSidebar, AdminTopbar
│   │   ├── cards/               EventCard, EventPreviewCard, MemberCard, NoticeCard, ProjectCard
│   │   ├── forms/               ContactForm, IdeaForm, QueryForm
│   │   ├── three/               AmbientCanvas, HeroScene, Lattice, OrbitNodes, StarField
│   │   └── Countdown/           Countdown.jsx
│   ├── pages/                   Home, About, Leadership, Events, InnovationAmbassadors,
│   │                             Research, Projects, Establishment, Ideas, Contact
│   ├── admin/
│   │   ├── Login/               Login.jsx
│   │   ├── layouts/             AdminLayout.jsx
│   │   ├── routes/              AdminRoutes.jsx
│   │   ├── components/          cards/, forms/, ui/ (Badge, Card, PageHeader)
│   │   ├── hooks/               useAdminTheme.js
│   │   └── pages/               Dashboard, Leadership, Members, Events, Notices,
│   │                             Ambassadors, Research, Projects, Certificates,
│   │                             Ideas, Queries, Contacts, Settings
│   ├── context/                 AuthContext.jsx
│   ├── hooks/                   useCountdown.js, useLenis.js, useSupabase.js
│   ├── routes/                  ProtectedRoute.jsx
│   ├── services/                supabase.js
│   ├── utils/                   helpers.js, storageErrors.js, supabaseStorage.js
│   ├── App.jsx                  Root router & global chrome
│   ├── main.jsx                 React entry point
│   └── index.css                Tailwind entry / design tokens
├── .env                         Local Supabase credentials (gitignored)
├── vite.config.js               Vite + Tailwind plugin, manual vendor chunking
├── package.json
└── README.md
```

> **Note:** Several asset folders (`ambassadors`, `certificates`, `events`, `gallery`, `leadership`, `logos`, `team/*`) ship with a `README.md` placeholder describing the expected image naming convention until real media is uploaded via the Admin Dashboard or Supabase Storage.

---

## 5. User Roles & Permissions

### 5.1 Public User (unauthenticated)

**Can:**
- View all public pages: Home, About, Team (Leadership & Members), Events, Ambassadors, Research, Projects, Establishment, Ideas & Queries, Contact
- Submit an idea
- Submit a query
- Submit a contact message

**Cannot:**
- Access any route under `/admin` (redirected to `/admin/login`)
- Create, edit, or delete published content

### 5.2 Administrator (authenticated via Supabase Auth)

**Can**, after signing in at `/admin/login`:
- Access the full Admin Dashboard
- Perform create/read/update/delete (CRUD) operations on Leadership, Members, Events, Notices, Ambassadors, Research, Projects, and Certificates
- Review submitted Ideas and update their status
- View Queries and add replies
- View Contact messages
- Manage site-wide Settings

---

## 6. Public Website — Pages & Routes

Routing is defined in `src/App.jsx` using React Router v7, with every page lazy-loaded via `React.lazy` for code-splitting.

| Route | Page Component | Description |
|---|---|---|
| `/` | `pages/Home/Home.jsx` | Landing page: hero, about preview, statistics, next event countdown, latest notices, featured projects, gallery preview, contact CTA |
| `/about` | `pages/About/About.jsx` | About IIC, history, vision, mission, objectives, functions, institution details |
| `/team` | `pages/Leadership/Leadership.jsx` | Leadership profiles and team members grouped by team |
| `/events` | `pages/Events/Events.jsx` | Upcoming events (with live countdown) and past events with galleries/reports |
| `/ambassadors` | `pages/InnovationAmbassadors/InnovationAmbassadors.jsx` | Innovation Ambassador profiles |
| `/research` | `pages/Research/Research.jsx` | Ongoing/completed research, publications, patents, collaborations |
| `/projects` | `pages/Projects/Projects.jsx` | Active student and institutional projects by category |
| `/establishment` | `pages/Establishment/Establishment.jsx` | Establishment certificate, IIC/Star Rating certificates, awards, annual reports |
| `/ideas-queries` | `pages/Ideas/Ideas.jsx` | Submit-an-Idea and Ask-a-Query forms |
| `/contact` | `pages/Contact/Contact.jsx` | Contact details, map, social links, contact form |
| `/admin/*` | `admin/routes/AdminRoutes.jsx` | Entry point into the Admin panel (see [Section 7](#7-admin-dashboard--pages--routes)) |

> The public-facing team page is served at `/team`; internal documentation elsewhere may refer to it as "Leadership & Members."

---

## 7. Admin Dashboard — Pages & Routes

All admin routes are nested under `/admin` and defined in `src/admin/routes/AdminRoutes.jsx`. Every route except `/admin/login` is wrapped in `ProtectedRoute`, which checks the Supabase session via `AuthContext` and redirects unauthenticated visitors to `/admin/login`.

| Route | Page Component | Description |
|---|---|---|
| `/admin/login` | `admin/Login/Login.jsx` | Administrator sign-in (Supabase Auth email/password) |
| `/admin/dashboard` | `admin/pages/Dashboard/Dashboard.jsx` | Overview statistics: members, events, notices, projects, ideas, queries |
| `/admin/leadership` | `admin/pages/Leadership/AdminLeadership.jsx` | Manage leadership profiles |
| `/admin/members` | `admin/pages/Members/AdminMembers.jsx` | Manage team members |
| `/admin/events` | `admin/pages/Events/AdminEvents.jsx` | Manage upcoming/past events |
| `/admin/notices` | `admin/pages/Notices/AdminNotices.jsx` | Manage notices (category, pin, attachment) |
| `/admin/ambassadors` | `admin/pages/Ambassadors/AdminAmbassadors.jsx` | Manage Innovation Ambassador profiles |
| `/admin/research` | `admin/pages/Research/AdminResearch.jsx` | Manage research & development entries |
| `/admin/projects` | `admin/pages/Projects/AdminProjects.jsx` | Manage active projects |
| `/admin/certificates` | `admin/pages/Certificates/AdminCertificates.jsx` | Manage establishment documents & certificates |
| `/admin/ideas` | `admin/pages/Ideas/AdminIdeas.jsx` | Review submitted ideas and update status |
| `/admin/queries` | `admin/pages/Queries/AdminQueries.jsx` | View queries and post replies |
| `/admin/contacts` | `admin/pages/Contacts/AdminContacts.jsx` | View contact-form submissions |
| `/admin/settings` | `admin/pages/Settings/Settings.jsx` | Site-wide settings |

Any unmatched path under `/admin` falls back to a redirect to `/admin/login` (catch-all route in `AdminRoutes.jsx`).

---

## 8. Authentication & Security

### 8.1 Admin Authentication Flow

```
Admin enters email + password at /admin/login
        |
        v
supabase.auth.signInWithPassword({ email, password })
        |
        v
Session stored by Supabase Auth; AuthContext exposes { user, loading }
        |
        v
ProtectedRoute checks session on every /admin/* route
        |
        v
Authorized   -> AdminLayout renders the requested page
Unauthorized -> redirect to /admin/login
```

`AuthContext` (`src/context/AuthContext.jsx`) also subscribes to `supabase.auth.onAuthStateChange` so the UI reacts immediately to sign-in/sign-out events, and exposes `signIn(email, password)` and `signOut()` helpers to the rest of the admin app.

### 8.2 Security Controls

- Supabase Authentication for all admin access — no custom password storage
- Row Level Security (RLS) policies on every table to enforce read/write rules at the database layer
- Protected client-side routes via `ProtectedRoute`, in addition to RLS on the server
- Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and bucket-name overrides) kept out of version control via `.gitignore`; `supabase.js` throws immediately if they are missing
- Input validation on public forms via React Hook Form
- File type and size restrictions intended for all upload flows (idea/query attachments, admin media uploads)

### 8.3 Access Model Summary

| Capability | Public User | Administrator |
|---|---|---|
| Read published content | Yes | Yes |
| Submit idea / query / contact message | Yes | Yes |
| Create / edit / delete content | No | Yes |
| Review ideas & update status | No | Yes |
| Reply to queries | No | Yes |
| View contact messages | No | Yes |
| Access `/admin` routes | No (redirected) | Yes (after login) |

---

## 9. Data Model (Supabase)

Content is stored in PostgreSQL tables accessed through the Supabase JS SDK. Table name constants are centralized in `src/services/supabase.js` (`TABLES`) to avoid hard-coded strings across the codebase.

### 9.1 Tables

| Table | Purpose | Representative Fields |
|---|---|---|
| `leadership` | Leadership profiles | `name, position, department, image_url, email, linkedin, display_order, is_active` |
| `members` | Team members by team | `name, position, team, department, image_url, display_order, is_active` |
| `events` | Upcoming & past events | `title, description, poster_url, event_date, event_time, venue, registration_url, status` |
| `notices` | Announcements | `title, description, category, published_date, deadline, attachment_url, external_link, is_pinned, is_active` |
| `ambassadors` | Innovation Ambassador profiles | `name, department, position, image_url, responsibilities, achievements, year, is_active` |
| `research` | R&D entries | `title, description, researcher, mentor, category, status, image_url, document_url` |
| `projects` | Active projects | `title, description, team_lead, team_members, mentor, technologies, category, status, progress, image_url, project_url` |
| `certificates` | Establishment docs & certs | `title, category, year, description, thumbnail_url, document_url` |
| `ideas` | Submitted ideas | `name, register_number, department, year, email, phone, title, category, problem_statement, proposed_solution, expected_impact, attachment_url, status, admin_remarks` |
| `queries` | Submitted queries | `name, email, department, subject, category, message, attachment_url, reply, status` |
| `contacts` | Contact form messages | `name, email, phone, subject, message` |
| `settings` | Site-wide configuration | (key/value site settings) |

### 9.2 Status Enumerations

| Entity | Status Values |
|---|---|
| Idea | `Pending` (default) → `Under Review` → `Approved` / `Rejected` |
| Query | `Open` (default) → `In Progress` → `Resolved` / `Closed` |

---

## 10. File Storage

Supabase Storage buckets hold all binary assets; the corresponding database row stores only the resulting public/URL reference. Bucket names are centralized (with environment-variable overrides) in `src/services/supabase.js` (`BUCKETS`).

| Bucket (default name) | Env override | Used for |
|---|---|---|
| `leadership-images` | `VITE_LEADERSHIP_IMAGES_BUCKET` | Leadership profile photos |
| `member-images` | `VITE_MEMBER_IMAGES_BUCKET` | Team member photos |
| `event-posters` | `VITE_EVENT_POSTERS_BUCKET` | Event poster images |
| `event-gallery` | `VITE_EVENT_GALLERY_BUCKET` | Past-event gallery photos |
| `ambassador-images` | `VITE_AMBASSADOR_IMAGES_BUCKET` | Innovation Ambassador photos |
| `project-images` | `VITE_PROJECT_IMAGES_BUCKET` | Project cover images |
| `research-files` | `VITE_RESEARCH_FILES_BUCKET` | Research documents / images |
| `certificates` | `VITE_CERTIFICATES_BUCKET` | Certificates & establishment documents |
| `idea-attachments` | `VITE_IDEA_ATTACHMENTS_BUCKET` | Optional attachments on idea submissions |
| `query-attachments` | `VITE_QUERY_ATTACHMENTS_BUCKET` | Optional attachments on query submissions |
| `website-assets` | `VITE_WEBSITE_ASSETS_BUCKET` | General site assets managed by admins |

Upload/validation helpers live in `src/utils/supabaseStorage.js` and `src/utils/storageErrors.js`, which centralize error handling for storage operations (covered by `src/utils/supabaseStorage.test.js`).

---

## 11. Environment Setup

### 11.1 Prerequisites

- Node.js and npm
- A Supabase project (URL + anon public key)

### 11.2 Installation

```bash
npm install
```

### 11.3 Environment Variables

Create a `.env` file in the project root (never committed — it is listed in `.gitignore`) with at least:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

These values are found under **Supabase → Project Settings → API**. Optional `VITE_*_BUCKET` variables (see [Section 10](#10-file-storage)) may be set to override default storage bucket names.

### 11.4 Running the Project

| Command | Effect |
|---|---|
| `npm run dev` | Starts the Vite development server with hot module reload |
| `npm run build` | Produces an optimized production build (Vite build) |
| `npm run preview` | Serves the production build locally for verification |
| `npm run lint` | Runs oxlint against the codebase |

> **Note:** If forms (Ideas, Queries, Contact) fail to submit on a given machine, the most common cause is a missing or invalid `.env` — confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly.

---

## 12. Build & Deployment

### 12.1 Production Build

`npm run build` produces a static, deployable bundle. `vite.config.js` configures manual vendor chunking so large dependency groups (three.js/@react-three, gsap/framer-motion/lenis, swiper, react-toastify, lucide-react, the core react stack, and supabase) are split into separate cacheable chunks for faster repeat loads.

### 12.2 Deployment Targets

- **Frontend:** deploy the Vite build output to Vercel or Netlify
- **Database / Auth / Storage:** hosted entirely on Supabase; no separate backend server to deploy

### 12.3 Deployment Checklist

- [ ] Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables on the hosting platform
- [ ] Point the production build at the intended (production) Supabase project
- [ ] Verify RLS policies are enabled and correctly scoped before going live
- [ ] Smoke-test the production build: public pages, all three public forms, and admin login

---

## 13. UI Design Direction

The site targets a modern innovation/startup-ecosystem look rather than a traditional college website: clean backgrounds, blue/purple/cyan accents, large typography, soft shadows, rounded cards, subtle glassmorphism, and smooth motion (Framer Motion, GSAP, Lenis) throughout, with full responsiveness across desktop, laptop, tablet, and mobile.

| Role | Color |
|---|---|
| Primary | `#2563EB` |
| Secondary | `#7C3AED` |
| Accent | `#06B6D4` |
| Success | `#10B981` |
| Background | `#F8FAFC` |
| Dark | `#0F172A` |

---

## 14. Appendix

### 14.1 Reference Files

- `read me.md` — original project brief this documentation formalizes
- `README.md` — developer quick-start instructions
- `Security & Testing/Web Application Security Testing Documentation.docx` — accompanying security test report

### 14.2 Glossary

| Term | Meaning |
|---|---|
| IIC | Institution's Innovation Council |
| RLS | Row Level Security — Postgres/Supabase access-control feature |
| SPA | Single-Page Application |
| CRUD | Create, Read, Update, Delete |

---

*Document Version: 1.0 — Prepared August 2026 — Classification: Internal / Development Reference*