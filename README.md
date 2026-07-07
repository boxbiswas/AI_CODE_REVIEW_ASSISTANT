<div align="center">

<!-- TODO: Replace with your actual logo asset -->
<img src="./assets/logo.png" alt="LUMUS Logo" width="120" height="120" />

# ✦ LUMUS

### *Elevate your code quality with AI-powered reviews*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lumus--demo.vercel.app-ec4899?style=for-the-badge&logo=vercel&logoColor=white)](https://lumus-demo.vercel.app)
[![Build Status](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-f9a8d4?style=for-the-badge)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f472b6?style=for-the-badge)](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/pulls)

<br/>

[🚀 **Live Demo**](https://lumus-demo.vercel.app) <!-- TODO: replace with actual deployment URL -->
&nbsp;&nbsp;·&nbsp;&nbsp;
[🎬 **Watch Demo Video**](#) <!-- TODO: add YouTube/Loom link -->
&nbsp;&nbsp;·&nbsp;&nbsp;
[🐛 **Report a Bug**](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/issues)
&nbsp;&nbsp;·&nbsp;&nbsp;
[✨ **Request a Feature**](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Live Demo & Screenshots](#-live-demo--screenshots)
- [UI Highlights & Interactions](#-ui-highlights--interactions)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🔍 Overview

**LUMUS** is a full-stack, AI-powered code review dashboard designed to give developers instant, deep-dive analysis of their code quality. Submit any snippet or file and receive a comprehensive review powered by Google Gemini AI — including an overall quality score, static analysis findings, complexity metrics, bug detection, and actionable improvement suggestions.

More than just a linter, LUMUS understands the **intent** behind your code. It identifies architectural anti-patterns, security vulnerabilities, performance bottlenecks, and style inconsistencies across multiple languages including TypeScript, JavaScript, Python, Java, Go, Rust, and more — all within seconds.

LUMUS features a production-grade, responsive dashboard with a polished glassmorphism UI, a real-time score gauge, full review history, filtering, and a beautifully implemented light/dark mode system. Whether you're a solo developer wanting a second opinion or a team lead reviewing contributions, LUMUS makes code quality visible, measurable, and actionable.

<!-- TODO: Replace with your actual dashboard screenshot/GIF -->
<div align="center">
  <img src="./assets/dashboard-preview.png" alt="LUMUS Dashboard Preview" width="90%" style="border-radius: 16px;" />
</div>

---

## ✨ Key Features

- 🤖 **AI-Powered Review Engine** — Gemini AI analyses your code in-depth, providing human-quality review insights
- 📊 **Real-Time Quality Score Gauge** — Animated SVG ring gauge shows a 0–100 code quality score at a glance
- ✅ **Pass / Fail Scoring System** — Clear threshold-based scoring so you always know if your code is production-ready
- 🐛 **Findings & Bug Tracking** — Categorized findings (Bug, Security, Performance, Style) with file and line references
- 📜 **Full Review History** — Paginated, searchable, and filterable history of all your past reviews
- 📋 **Paste Code & File Upload** — Two flexible submission workflows with a Monaco editor for an IDE-like experience
- 🌓 **Light / Dark Mode** — Polished theme system with `localStorage` persistence and `prefers-color-scheme` detection
- 🎨 **Glassmorphism UI** — Frosted glass cards, gradient accents, and sakura-pink brand palette
- 🌐 **Multi-Language Support** — JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP and more
- 🔒 **Secure Auth** — JWT-based authentication with httpOnly cookies and route protection
- 📈 **Complexity Analysis** — Per-file cyclomatic complexity and dependency graph visualisation

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev) + Vite |
| **Styling** | [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) with custom design tokens |
| **State Management** | [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org) |
| **Code Editor** | [![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-007ACC?logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/) |
| **Charts** | [![Recharts](https://img.shields.io/badge/Recharts-22b5bf)](https://recharts.org) |
| **HTTP Client** | [![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com) |
| **Backend Runtime** | [![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org) + Express 5 |
| **AI Engine** | [![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev) |
| **Database ORM** | [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://prisma.io) + PostgreSQL |
| **Auth** | JWT (httpOnly cookies) + bcrypt |
| **Deployment** | [![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com) / [![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=black)](https://render.com) |

---

## 🖥️ Live Demo & Screenshots

> **Live App:** [https://lumus-demo.vercel.app](https://lumus-demo.vercel.app)
> <!-- TODO: replace with actual deployment URL -->

<!-- TODO: Use demo credentials below if you set up a guest account -->
> **Demo Login:**
> - Email: `demo@lumus.app`
> - Password: `demo1234`

### Screenshots

<div align="center">

| Dashboard | Review Report |
|---|---|
| <!-- TODO: --> <img src="./assets/screenshots/dashboard.png" alt="Dashboard" width="420" /> | <!-- TODO: --> <img src="./assets/screenshots/report.png" alt="Report" width="420" /> |

| Review History | Theme Toggle |
|---|---|
| <!-- TODO: --> <img src="./assets/screenshots/history.png" alt="History" width="420" /> | <!-- TODO: --> <img src="./assets/screenshots/theme-toggle.png" alt="Theme" width="420" /> |

</div>

---

## 🎨 UI Highlights & Interactions

LUMUS isn't just functional — it's designed to *feel* alive. Every interaction has been carefully crafted to give the UI a premium, responsive quality:

- **🔴 Animated Score Gauge** — The donut chart on the dashboard and report pages uses Recharts with a live inner-text score that updates as your review data loads, giving instant visual feedback.
- **🪟 Glassmorphism Cards** — Every stat card, review tile, and panel uses `backdrop-blur`, translucent backgrounds, and a soft drop shadow that shifts on hover — creating a sense of layered depth.
- **✨ Hover Micro-animations** — Buttons scale with `hover:scale-[1.02]`, cards lift with `hover:shadow-lg`, and icon containers pulse with an `animate-float` keyframe — driven by Tailwind with zero JS overhead.
- **🌓 Theme Crossfade Toggle** — The light/dark mode switch crossfades a sun/moon icon pair in 300ms. The full theme switch is instantaneous, toggling a `dark` class on `<html>` via React context.
- **📝 Monaco Editor Integration** — The code paste panel embeds VS Code's own Monaco editor, giving you syntax highlighting, line numbers, and language-aware rendering in the browser.
- **🎞️ Page Entrance Animations** — Each section uses staggered `animate-fadeInUp` with `animationDelay` offsets, so the dashboard builds itself visually as it loads.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= **18.0.0**
- [npm](https://npmjs.com) >= **9.0.0** or [Yarn](https://yarnpkg.com)
- A running [PostgreSQL](https://www.postgresql.org) database instance
- A [Google AI Studio](https://aistudio.google.com) API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT.git
cd AI_CODE_REVIEW_ASSISTANT

# 2. Install Backend dependencies
cd backend
npm install

# 3. Install Frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

Create a `.env` file in the **`/backend`** directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME"

# JWT Auth
JWT_SECRET=your_super_secret_jwt_key_here

# Google Gemini AI
GEMINI_API_KEY=your_google_ai_studio_api_key_here
```

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Long random string for signing JWTs | ✅ |
| `GEMINI_API_KEY` | Google AI Studio API key | ✅ |
| `PORT` | Backend server port (default: 3000) | ⬜ |

### Running the App

```bash
# Run database migrations
cd backend
npx prisma migrate dev

# Start the backend (terminal 1)
npm run dev

# Start the frontend (terminal 2)
cd ../frontend
npm run dev
```

The frontend will be available at **`http://localhost:5173`** and the backend API at **`http://localhost:3000`**.

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand the full folder tree</strong></summary>

```
AI_CODE_REVIEW_ASSISTANT/
│
├── 📂 backend/                     # Node.js + Express API server
│   ├── 📂 controllers/             # Route handler logic
│   │   ├── authController.js
│   │   ├── submissionController.js
│   │   ├── reviewController.js
│   │   ├── historyController.js
│   │   └── complexityController.js
│   ├── 📂 middlewares/             # Auth & error middleware
│   │   └── verifyToken.js
│   ├── 📂 routes/                  # Express route definitions
│   │   ├── auth.js
│   │   ├── submissions.js
│   │   ├── reviews.js
│   │   └── history.js
│   ├── 📂 services/                # Business logic & AI integration
│   │   ├── aiService.js            # Gemini AI prompt & parsing
│   │   └── pipelineService.js      # Full analysis pipeline orchestrator
│   ├── 📂 lib/                     # Shared utilities
│   │   └── prisma.js               # Prisma client singleton
│   ├── 📂 prisma/                  # Database schema & migrations
│   │   └── schema.prisma
│   └── app.js                      # Express app entry point
│
└── 📂 frontend/                    # React + Vite client app
    └── 📂 src/
        ├── 📂 components/          # Reusable UI components
        │   ├── 📂 Auth/
        │   ├── 📂 Dashboard/
        │   ├── 📂 History/
        │   ├── 📂 NewReview/
        │   ├── 📂 Report/
        │   └── 📂 common/
        ├── 📂 pages/               # Top-level page components
        ├── 📂 redux/               # Redux Toolkit store & slices
        ├── 📂 context/             # React Context (ThemeContext)
        ├── 📂 https/               # Axios instance & interceptors
        └── 📂 hooks/               # Custom React hooks
```

</details>

---

## 📖 Usage

### 1. Register & Login
Create an account or log in. Your session is persisted securely via an httpOnly JWT cookie.

### 2. Start a New Review
Navigate to **New Review** from the sidebar. Choose between:
- **📋 Paste Code** — Use the built-in Monaco editor, select a language, and paste your snippet
- **📁 Upload Files** — Drag-and-drop or click to upload one or more source files

### 3. Analyze
Click **Analyze Code**. A modal tracks the pipeline progress in real time:
`Uploading → Pending → Analyzing → AI Review → Completed`

### 4. Read Your Report
The Report page is divided into tabs:
- **Overview** — Score gauge, executive summary, strengths & weaknesses
- **Static Analysis** — Findings table with severity badges
- **Complexity** — Per-file complexity scores and dependency graph
- **AI Review** — Full AI-generated narrative with improvement suggestions

### 5. Browse History
The **History** page shows all past reviews with live search, status/language/type filters, and pagination. Delete any review with one click.

---

## 🗺️ Roadmap

<details>
<summary><strong>View full roadmap</strong></summary>

### ✅ Completed

- [x] User authentication (Register / Login / Logout)
- [x] Code paste workflow with Monaco editor
- [x] File upload workflow with drag-and-drop
- [x] Full AI review pipeline (static + complexity + AI narrative)
- [x] Review report page with tabbed navigation
- [x] Overall quality score gauge (0–100)
- [x] Findings/bug tracking with severity categorization
- [x] Dashboard with stats, score chart, and recent reviews
- [x] Review history with pagination, search, and filters
- [x] Delete reviews with cascade cleanup
- [x] Light / Dark mode with localStorage persistence
- [x] Glassmorphism UI with sakura-pink design system
- [x] Responsive layout (mobile → desktop)

### 🔜 Planned

- [ ] GitHub OAuth integration (login with GitHub)
- [ ] GitHub PR integration — review PRs directly from a URL
- [ ] Team / organization accounts with shared review history
- [ ] Webhook support for CI/CD pipeline integration
- [ ] Inline code annotations in the report view
- [ ] Export report as PDF or Markdown
- [ ] Custom review rulesets (configure severity thresholds)
- [ ] VS Code extension for in-editor LUMUS reviews
- [ ] Email digest of weekly review summaries
- [ ] Public API with API key management

</details>

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and build. Any contributions you make are **greatly appreciated**!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'feat: add AmazingFeature'`
4. **Push** to your branch: `git push origin feature/AmazingFeature`
5. **Open a Pull Request** — describe what you changed and why

Please read our [Contributing Guide](./CONTRIBUTING.md) for detailed code style guidelines.

> **Good first issues** are tagged with the `good-first-issue` label in the [Issues](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/issues) tab.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

## 📬 Contact

**Indranil Biswas**

[![GitHub](https://img.shields.io/badge/GitHub-boxbiswas-181717?style=for-the-badge&logo=github)](https://github.com/boxbiswas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/your-linkedin-username) <!-- TODO: replace -->
[![Twitter](https://img.shields.io/badge/Twitter-@yourhandle-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourhandle) <!-- TODO: replace -->
[![Email](https://img.shields.io/badge/Email-yourmail@example.com-ec4899?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yourmail@example.com) <!-- TODO: replace -->

---

<div align="center">

Made with 💖 and a lot of ☕ by [Indranil Biswas](https://github.com/boxbiswas)

⭐ **If you found LUMUS useful, please give it a star!** ⭐

</div>
