# College FM 90.0 - Campus Radio Web Application

A modern, responsive web application for College FM 90.0, an independent student-run campus radio station. The platform provides continuous live audio broadcasting, on-demand podcast archives, weekly programming guides, and listener engagement tools.

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Project Directory Structure](#project-directory-structure)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Install Dependencies](#step-2-install-dependencies)
  - [Step 3: Verify Configuration Files](#step-3-verify-configuration-files)
  - [Step 4: Start the Development Server](#step-4-start-the-development-server)
  - [Step 5: Run Static Type Checking](#step-5-run-static-type-checking)
  - [Step 6: Build for Production](#step-6-build-for-production)
- [Configuration Details](#configuration-details)
  - [Vite and Tailwind CSS v4](#vite-and-tailwind-css-v4)
  - [TypeScript Configuration](#typescript-configuration)
  - [Component Architecture](#component-architecture)
- [Available Scripts](#available-scripts)
- [Audio Stream Configuration](#audio-stream-configuration)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

---

## Overview

College FM (90.0 MHz Stereo) serves the university community with student-produced news, talk shows, academic panels, and original music. This web application offers full web streaming capabilities, allowing students, faculty, and alumni to access live broadcasts and historical podcast episodes from any device.

---

## Technology Stack

- **Core Framework**: React 19, TypeScript
- **Bundler and Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4, CSS Variables, Geist Variable Font
- **Component Primitives**: shadcn UI, Radix UI (Nova preset)
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Audio Engine**: HTML5 Media API with custom state synchronization

---

## Key Features

1. **Live Broadcast Streaming**:
   - Persistent web audio stream connected to the studio feed.
   - Custom audio controls including volume adjustment, mute toggles, and responsive audio equalizers.
   - Real-time broadcast indicators displaying on-air status and current show hosts.
   - Interactive listener dedication module allowing song and message submissions directly to the studio booth.

2. **On-Demand Podcast Archive**:
   - Full catalog of past campus episodes with playable audio files.
   - Real-time search by title, description, host, and topic tags.
   - Dynamic category filtering and sorting options (Latest Drops, Duration).
   - Episode details with playback duration, listener counts, and show notes.

3. **Weekly Broadcast Schedule**:
   - Structured timeline organized across daily time slots.
   - Day-based filtering (All Slots, Weekdays, Weekends, Currently On Air).
   - Detailed host roles, show descriptions, and genre classifications.
   - Direct links for guest appearance bookings and club event promotions.

4. **Team and Community Showcase**:
   - Profiles of student radio jockeys (RJs) detailing their academic year, majors, shows, and biographies.
   - Live campus shoutout feed displaying messages sent across campus hostels.
   - Student onboarding banner outlining the pilot episode pitching workflow.

5. **Responsive and Mobile-Optimized**:
   - Fluid typography that scales proportionally across mobile devices, tablets, and desktops.
   - Mobile-first navigation with touch-friendly tap targets and collapsible menus.
   - Horizontal scrollable filter bars with hidden scrollbars for clean mobile UX.
   - Persistent sticky mini-player for uninterrupted listening during page transitions.

---

## Project Directory Structure

```text
90.0-fm/
|-- public/
|   `-- audio/
|       |-- campus-intro.mp3
|       `-- sample.mp3
|-- src/
|   |-- components/
|   |   |-- ui/
|   |   |   |-- badge.jsx
|   |   |   |-- button.jsx
|   |   |   |-- card.jsx
|   |   |   |-- separator.jsx
|   |   |   `-- slider.jsx
|   |   |-- LivePlayer.tsx
|   |   |-- Navbar.tsx
|   |   `-- PodcastCard.tsx
|   |-- data/
|   |   `-- podcasts.ts
|   |-- lib/
|   |   `-- utils.js
|   |-- pages/
|   |   |-- Home.tsx
|   |   |-- Podcasts.tsx
|   |   `-- Schedule.tsx
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- .vscode/
|   `-- settings.json
|-- components.json
|-- eslint.config.js
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.js
`-- README.md
```

---

## Prerequisites

Before starting the setup, ensure that the following tools are installed on your workstation:

- **Node.js**: Version 20.11.0 or higher (Node 22 LTS recommended)
- **Package Manager**: npm (version 10 or higher) or compatible alternatives (pnpm, yarn)
- **Git**: Installed and configured for version control

Verify installed versions by executing:

```bash
node -v
npm -v
git --version
```

---

## Step-by-Step Setup Guide

Follow these steps sequentially to set up and run the application locally.

### Step 1: Clone the Repository

Open your terminal, navigate to your target workspace directory, and clone the repository:

```bash
git clone https://github.com/your-username/90.0-fm.git
cd 90.0-fm
```

### Step 2: Install Dependencies

Install all required packages declared in `package.json`:

```bash
npm install
```

This installs core application dependencies including React 19, Vite, Tailwind CSS v4, shadcn UI components, React Router DOM, and TypeScript support libraries.

### Step 3: Verify Configuration Files

Ensure the following configuration files are in place:

1. **`tsconfig.json`**: Configured with `"jsx": "react-jsx"`, `"allowJs": true`, and `"paths": { "@/*": ["./src/*"] }`.
2. **`vite.config.js`**: Includes `@tailwindcss/vite` and alias resolution for `@` mapped to `./src`.
3. **`components.json`**: Configured for shadcn UI component registry.

### Step 4: Start the Development Server

Start the local Vite development server:

```bash
npm run dev
```

Once started, the terminal will display the local network URL:

```text
  VITE v8.3.5  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open `http://localhost:5173/` in your web browser to view the application.

### Step 5: Run Static Type Checking

Validate all TypeScript definitions and component interfaces across the project without emitting files:

```bash
npx tsc --noEmit
```

The command should exit with code 0, indicating zero type errors.

### Step 6: Build for Production

Compile and bundle the application into static production assets:

```bash
npm run build
```

Production output will be generated inside the `dist/` directory.

To test the generated production bundle locally, run:

```bash
npm run preview
```

The preview server will launch the optimized build at `http://localhost:4173/`.

---

## Configuration Details

### Vite and Tailwind CSS v4

Tailwind CSS v4 is integrated directly via the official `@tailwindcss/vite` plugin inside `vite.config.js`:

```javascript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
```

All design system tokens and theme definitions are loaded inside `src/index.css` using:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";
```

### TypeScript Configuration

The project operates under modern TypeScript guidelines (`tsconfig.json`):

- **Target**: `ES2022`
- **Module Resolution**: `bundler`
- **JSX**: `react-jsx`
- **Path Mapping**: `@/*` mapped to `./src/*`
- **Client Types**: `"types": ["vite/client"]` for static asset imports (`.css`, `.png`, `.mp3`)

---

## Available Scripts

The following scripts are defined in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds the production bundle into `dist/`. |
| `npm run preview` | Locally serves the production build generated in `dist/`. |
| `npm run lint` | Executes ESLint across the codebase to check for syntax and style issues. |
| `npx tsc --noEmit` | Validates TypeScript types across all source files without writing files. |

---

## Audio Stream Configuration

Station stream endpoints and audio tracks are managed in `src/data/podcasts.ts`:

- **Live Stream URL**: Defined in `stationInfo.streamUrl`. Can point to a live Icecast / Shoutcast HTTP stream or fallback campus audio.
- **Podcast Files**: Point to static files in `public/audio/` (such as `campus-intro.mp3`) or remote CDN audio URLs.
- **Audio Fallback**: If an online stream is unreachable, the player automatically falls back to local campus assets to maintain uninterrupted playback.

---

## Contribution Guidelines

1. **Branching Model**: Create feature branches from `main` using standard naming conventions (such as `feature/schedule-sync` or `fix/player-buffering`).
2. **Code Standards**:
   - Write clear, accessible, and semantic JSX/HTML.
   - Ensure all components adapt fluidly across mobile, tablet, and desktop viewports.
   - Avoid hardcoding arbitrary styles; utilize Tailwind CSS design tokens.
3. **Validation**: Always verify that `npx tsc --noEmit` and `npm run build` pass before submitting pull requests.

---

## License

This project is maintained by the Student Radio Guild. Distributed under the MIT License. See `LICENSE` for details.
