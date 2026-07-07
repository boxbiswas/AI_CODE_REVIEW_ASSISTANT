<div align="center">

# ⚛️ LUMUS — Frontend

### *React + Vite + TailwindCSS client application*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)

> Part of the [LUMUS monorepo](../README.md). See the root README for the full project overview.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Components](#-pages--components)
- [State Management](#-state-management)
- [Theming System](#-theming-system)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)

---

## 🔍 Overview

The LUMUS frontend is a single-page application (SPA) built with **React 18** and **Vite**. It delivers a production-quality dashboard experience with a focus on visual richness, smooth interactions, and a responsive glassmorphism design system.

Key architectural decisions:
- **Redux Toolkit** for global auth and dashboard state
- **React Context** for lightweight theme (light/dark) state
- **React Router v6** for client-side navigation with protected routes
- **Axios** with request interceptors for seamless API communication and 401 redirect handling
- **Monaco Editor** for an IDE-quality code paste experience in the browser

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + Vite 5 |
| **Routing** | React Router v6 |
| **State** | Redux Toolkit + React Context |
| **Styling** | TailwindCSS v3 with custom `sakura` design tokens |
| **Code Editor** | `@monaco-editor/react` |
| **Charts** | Recharts (PieChart, LineChart) |
| **Icons** | Lucide React |
| **File Upload** | `react-dropzone` |
| **HTTP** | Axios with interceptors |
| **Linting** | ESLint v10 with React + React Hooks plugins |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= **18.0.0**
- npm >= **9.0.0**

### Installation & Dev Server

```bash
# From the project root
cd frontend
npm install
npm run dev
```

The app will be available at **`http://localhost:5173`**.

> Make sure the backend server is running on `http://localhost:3000` before starting the frontend, or update the API base URL in `src/https/axios.js`.

---

## 📁 Project Structure

```
frontend/
├── 📂 src/
│   ├── 📂 components/              # Reusable UI building blocks
│   │   ├── 📂 Auth/                # Login & Register form components
│   │   │   ├── AuthBrand.jsx       # Logo + brand header (size="small"|"large")
│   │   │   └── AuthInput.jsx       # Styled input with icon & label
│   │   ├── 📂 Dashboard/           # Dashboard-specific widgets
│   │   │   ├── DashboardHero.jsx   # Welcome header + quick action pills
│   │   │   ├── StatCard.jsx        # Stat card with sparkline chart
│   │   │   ├── RecentReviews.jsx   # Scrollable reviews list
│   │   │   └── ScoreGauge.jsx      # Donut chart average score widget
│   │   ├── 📂 History/             # History page components
│   │   │   ├── HistoryFilters.jsx  # Search + dropdown filter bar
│   │   │   ├── ReviewCard.jsx      # Individual review list card
│   │   │   └── Pagination.jsx      # Page navigation controls
│   │   ├── 📂 NewReview/           # Review submission components
│   │   │   ├── AnalysisModal.jsx   # Pipeline progress overlay modal
│   │   │   ├── CodePasteSection.jsx # Monaco editor panel
│   │   │   ├── LanguageSelector.jsx # Language dropdown
│   │   │   └── UploadSection.jsx   # Drag-and-drop file upload panel
│   │   ├── 📂 Report/              # Report detail components
│   │   │   ├── ScoreCard.jsx       # Score donut + grade badge
│   │   │   ├── SummaryPanel.jsx    # AI executive summary card
│   │   │   ├── StrengthsWeaknesses.jsx # Two-column pro/con list
│   │   │   ├── FindingsTable.jsx   # Filterable findings data table
│   │   │   ├── StaticAnalysisPanel.jsx # Static analysis tab
│   │   │   ├── ComplexityPanel.jsx # Complexity chart + dependency graph
│   │   │   └── AISuggestionsPanel.jsx  # AI narrative review tab
│   │   ├── 📂 common/              # Shared utility components
│   │   │   └── DeleteConfirmModal.jsx  # Confirmation dialog with loading state
│   │   └── Layout.jsx              # Sidebar + header shell wrapper
│   │
│   ├── 📂 pages/                   # Top-level route components
│   │   ├── Login.jsx               # Login page
│   │   ├── Register.jsx            # Registration page
│   │   ├── Dashboard.jsx           # Main dashboard overview
│   │   ├── NewReview.jsx           # Code submission page
│   │   ├── Report.jsx              # Review report detail page
│   │   └── History.jsx             # Paginated review history
│   │
│   ├── 📂 redux/                   # Redux Toolkit store
│   │   ├── store.js                # Store configuration
│   │   └── 📂 slices/
│   │       ├── authSlice.js        # User auth state (login/logout/register)
│   │       └── dashboardSlice.js   # Dashboard stats & recent reviews
│   │
│   ├── 📂 context/
│   │   └── ThemeContext.jsx        # Light/Dark mode provider + useTheme hook
│   │
│   ├── 📂 https/
│   │   └── axios.js                # Configured Axios instance (base URL + 401 interceptor)
│   │
│   ├── 📂 hooks/                   # Custom React hooks (reserved for future use)
│   │
│   ├── App.jsx                     # Router setup + protected route logic
│   ├── main.jsx                    # ReactDOM.createRoot entry point
│   └── index.css                   # Global styles + Tailwind directives
│
├── tailwind.config.js              # TailwindCSS config + custom design tokens
├── vite.config.js                  # Vite bundler configuration
├── eslint.config.js                # ESLint flat config
└── package.json
```

---

## 📄 Pages & Components

### Pages

| Route | Component | Description |
|---|---|---|
| `/login` | `Login.jsx` | Authenticated login form |
| `/register` | `Register.jsx` | New user registration |
| `/` | `Dashboard.jsx` | Stats overview, recent reviews, score gauge |
| `/new-review` | `NewReview.jsx` | Code paste + file upload submission |
| `/report/:id` | `Report.jsx` | Full review report with 4-tab navigation |
| `/history` | `History.jsx` | Paginated, searchable review history |

### Key Components

- **`Layout.jsx`** — The persistent app shell. Renders the sidebar navigation (with dark mode toggle), the top header bar, and wraps all authenticated page content.
- **`ScoreCard.jsx`** — Renders the animated donut chart score gauge. Takes a `score` prop (0–100) and calculates the `PieChart` fill percentage.
- **`FindingsTable.jsx`** — Filterable, sortable table of all code findings. Supports filtering by severity (Bug, Security, Performance, Style).
- **`AnalysisModal.jsx`** — Full-screen overlay that shows while the AI pipeline is running. Displays the current pipeline stage and any errors.

---

## 🗃️ State Management

The app uses a **hybrid state** approach:

| State | Manager | Why |
|---|---|---|
| `auth` (user, token, loading) | Redux Toolkit | Needed globally across all pages |
| `dashboard` (stats, recent reviews) | Redux Toolkit | Shared between Dashboard and sidebar |
| `theme` (light/dark) | React Context | Lightweight, no complex selectors needed |
| Local UI state (modals, filters, tabs) | `useState` | Scoped to individual components |

---

## 🎨 Theming System

LUMUS uses Tailwind's `darkMode: 'class'` strategy. The `ThemeProvider` in `src/context/ThemeContext.jsx` toggles the `dark` class on `<html>`.

**On first load**, it reads from:
1. `localStorage` key: `lumus-theme`
2. System `prefers-color-scheme` media query (if no stored preference)

### Custom Design Tokens (`tailwind.config.js`)

```js
colors: {
  'sakura-pink':   '#F472B6', // Primary accent (pink-400)
  'sakura-strong': '#EC4899', // Darker accent (pink-500)
  'sakura-blush':  '#FBCFE8', // Light accent (pink-200)
}
```

These tokens are used throughout the app as `text-sakura-pink`, `bg-sakura-strong`, `border-sakura-blush`, and their `dark:` variants.

---

## 🔐 Environment Variables

The frontend currently has no `.env` variables — all API calls go to the relative backend URL configured in `src/https/axios.js`.

If you're deploying to a separate domain, update `baseURL`:

```js
// src/https/axios.js
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // TODO: replace with production URL
  withCredentials: true,
});
```

---

## 📜 Available Scripts

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build to /dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint on all files
```
