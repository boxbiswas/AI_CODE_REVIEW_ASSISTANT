<div align="center">

# ✦ LUMUS

### *Elevate your code quality with AI-powered reviews*

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-f9a8d4?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/boxbiswas/AI_CODE_REVIEW_ASSISTANT?style=for-the-badge)

<br/>

[🚀 **Live App**](https://ai-review-frontend-lovat.vercel.app) &nbsp;·&nbsp; [🐛 **Report a Bug**](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/issues) &nbsp;·&nbsp; [✨ **Request a Feature**](https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Database Schema](#️-database-schema)
- [Tech Stack](#️-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🔍 Overview

**LUMUS** is a full-stack, AI-powered code review platform. Submit any code snippet or upload source files and receive a comprehensive, multi-stage analysis in seconds — powered by **Google Gemini AI**. LUMUS returns an overall quality score (0–100), static analysis findings categorized by severity, cyclomatic complexity metrics, and a full AI-generated narrative review with actionable improvement suggestions.

The backend is a **Node.js + Express 5** REST API with a 4-stage asynchronous analysis pipeline. The frontend is a **React 19 + Vite** SPA with a glassmorphism design system, Monaco code editor, and full light/dark mode. The database is hosted on **Neon (serverless PostgreSQL)**, managed via **Prisma ORM**, requiring zero local Postgres setup.

---

## ✨ Features

- 🤖 **AI-Powered Review Engine** — Gemini AI performs deep code analysis and returns structured JSON: score, summary, strengths, weaknesses, and categorized findings
- 📊 **Real-Time Quality Score** — Animated 0–100 gauge with pass/fail threshold scoring
- 🐛 **Findings & Bug Tracking** — Findings categorized by source (`STATIC_ANALYSIS` / `AI_MODEL`) and severity (`LOW` / `MEDIUM` / `HIGH` / `CRITICAL`)
- 📈 **Complexity Reports** — Per-review cyclomatic complexity, lines of code, function count, class count, and maintainability index
- 📜 **Review History** — Paginated, searchable, multi-filter history (status, language, submission type)
- 📋 **Dual Submission Workflow** — Paste code in a Monaco editor or drag-and-drop file uploads (up to 10 files × 5MB each)
- 🔒 **JWT Auth** — Secure httpOnly cookie-based authentication with bcrypt password hashing
- 🌓 **Light / Dark Mode** — Theme persisted in `localStorage` with `prefers-color-scheme` detection on first load
- 🌐 **Multi-Language Support** — JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP
- 🗄️ **Serverless Database** — Neon PostgreSQL with full cascade deletes — removing a review cleans all files, findings, and analysis records automatically

---

## 🏗️ Architecture

### System Architecture

```mermaid
graph TD
  Client["⚛️ React 19 Frontend (Vercel)"] -->|REST API / httpOnly Cookies| API["🚀 Express 5 API (Railway)"]
  API -->|isLoggedIn Middleware| MW["🔐 JWT Auth Middleware"]
  MW --> Controllers["📂 Controllers"]
  Controllers -->|Prisma ORM| DB[("🐘 Neon PostgreSQL (Serverless)")]
  Controllers -->|fire-and-forget| Pipeline["⚙️ pipelineService.js"]
  Pipeline -->|Prisma reads/writes| DB
  Pipeline -->|genai SDK| Gemini["🤖 Google Gemini AI (gemini-2.0-flash-lite)"]
```

### AI Pipeline Sequence

```mermaid
sequenceDiagram
  participant C as React Client
  participant API as Express API
  participant DB as Neon PostgreSQL
  participant AI as Google Gemini

  C->>API: POST /submissions (code/files)
  API->>DB: INSERT Review (status=PENDING)
  API->>DB: INSERT CodeFile(s)
  API-->>C: 201 { review: { id, status: "PENDING" } }

  Note over API: runFullPipeline() fires async (non-blocking)

  API->>DB: UPDATE Review status=ANALYZING
  API->>DB: INSERT StaticAnalysis
  API->>DB: INSERT ComplexityReport
  API->>DB: UPDATE Review status=AI_REVIEW
  API->>AI: generateContent(structured prompt + full code)
  AI-->>API: JSON { score, summary, findings[], suggestions[] }
  API->>DB: INSERT AIReview + Finding[]
  API->>DB: UPDATE Review status=COMPLETED, overallScore=N

  loop Every 2 seconds
    C->>API: GET /reviews/:id
    API-->>C: { status, overallScore, findings, ... }
  end
  C->>C: Navigate to /report/:id when COMPLETED
```

### Auth Flow

```mermaid
flowchart TD
  A[POST /auth/register or /auth/login] --> B{Credentials valid?}
  B -->|No| C[401 / 400 Error Response]
  B -->|Yes| D[Sign JWT with JWT_SECRET]
  D --> E[Set httpOnly cookie 'token']
  E --> F[Return user object]

  G[Protected Request] --> H[isLoggedIn Middleware]
  H --> I{Cookie 'token' present?}
  I -->|No| J[401 Unauthorized]
  I -->|Yes| K[jwt.verify with JWT_SECRET]
  K -->|Invalid/Expired| L[401 Unauthorized]
  K -->|Valid| M["Attach req.user = decoded payload"]
  M --> N["Call next() -- routed to Controller"]
```

---

## 🗄️ Database Schema

> 💡 **This ER diagram renders interactively on GitHub** — you can click and drag to pan, and scroll to zoom within GitHub's native Mermaid viewer.

```mermaid
erDiagram
  User {
    String id PK
    String name
    String email UK
    String password
    DateTime createdAt
    DateTime updatedAt
  }

  Review {
    String id PK
    String userId FK
    String title
    String description
    String submissionType
    String language
    String status
    Int overallScore
    String summary
    DateTime createdAt
    DateTime updatedAt
  }

  CodeFile {
    String id PK
    String reviewId FK
    String fileName
    String extension
    String language
    String content
    Int size
    DateTime createdAt
  }

  StaticAnalysis {
    String id PK
    String reviewId FK
    String summary
    String rawOutput
  }

  ComplexityReport {
    String id PK
    String reviewId FK
    Int cyclomaticComplexity
    Int linesOfCode
    Int functionCount
    Int classCount
    Float maintainability
    String breakdown
  }

  AIReview {
    String id PK
    String reviewId FK
    String reviewJson
    DateTime createdAt
  }

  Finding {
    String id PK
    String reviewId FK
    String source
    String severity
    String type
    String title
    String description
    String suggestion
    String fileName
    Int lineNumber
  }

  User ||--o{ Review : "owns"
  Review ||--o{ CodeFile : "contains"
  Review ||--o| StaticAnalysis : "has"
  Review ||--o| ComplexityReport : "has"
  Review ||--o| AIReview : "has"
  Review ||--o{ Finding : "produces"
```

### Interactive Schema Explorer

For a fully pannable, zoomable visual ER diagram, paste the contents of [`docs/schema.dbml`](./docs/schema.dbml) into **[dbdiagram.io](https://dbdiagram.io)**.

---

## 📊 Project Stats

### Dependency Breakdown

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'xyChart': {'backgroundColor': '#0d1117', 'plotColorPalette': '#f9a8d4,#f472b6,#e879f9,#a855f7,#6366f1'}}}}%%
xychart-beta
    title "Backend Dependencies (by category)"
    x-axis ["AI & ML", "Database", "Auth", "HTTP & Server", "Config"]
    y-axis "Package count" 0 --> 6
    bar [1, 3, 2, 5, 1]
```

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'xyChart': {'backgroundColor': '#0d1117', 'plotColorPalette': '#61DAFB,#38bdf8,#34d399,#a3e635,#fb923c,#c084fc'}}}}%%
xychart-beta
    title "Frontend Dependencies (by category)"
    x-axis ["UI & Styling", "State & Data", "React Core", "Editor & Charts", "Routing & Forms", "Fonts & Notif"]
    y-axis "Package count" 0 --> 4
    bar [3, 3, 3, 2, 2, 2]
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Vite 8 |
| **Styling** | TailwindCSS v4 + custom sakura design tokens |
| **State** | Redux Toolkit + React Context |
| **Code Editor** | `@monaco-editor/react` |
| **Charts** | Recharts 3 |
| **Backend** | Node.js 22 + Express 5 (ESM) |
| **AI Engine** | Google Gemini (`@google/genai`) |
| **ORM** | Prisma 7 + `@prisma/adapter-pg` |
| **Database** | Neon PostgreSQL (serverless) |
| **Auth** | JWT + bcrypt + httpOnly cookies |
| **File Uploads** | Multer (memory storage) |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Railway |

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- A **[Neon](https://neon.tech)** account (free tier works) — no local PostgreSQL required
- A **[Google AI Studio](https://aistudio.google.com)** API key (free)

### Installation

```bash
# Clone the repository
git clone https://github.com/boxbiswas/AI_CODE_REVIEW_ASSISTANT.git
cd AI_CODE_REVIEW_ASSISTANT

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=3000
NODE_ENV=development

# Neon PostgreSQL — copy from your Neon project dashboard > Connection String
DATABASE_URL="postgresql://user:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_minimum_32_character_random_secret_here

# Google AI Studio API key
GEMINI_API_KEY=AIzaSy_your_key_here
```

**Frontend** — create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

| Variable | Where | Description |
|---|---|---|
| `DATABASE_URL` | backend | Neon PostgreSQL connection string (includes `?sslmode=require`) |
| `JWT_SECRET` | backend | Minimum 32-char random string for signing JWTs |
| `GEMINI_API_KEY` | backend | Google AI Studio API key |
| `PORT` | backend | Server port (default: `3000`) |
| `VITE_API_URL` | frontend | Backend base URL used by Axios |

### Database Setup

```bash
cd backend

# Apply the Prisma schema to your Neon database
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to browse your data
npx prisma studio
```

### Run the App

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: **http://localhost:5173**
- Backend API: **http://localhost:3000**

---

## 📁 Project Structure

<details>
<summary><strong>Expand full folder tree</strong></summary>

```
AI_CODE_REVIEW_ASSISTANT/
│
├── 📂 backend/
│   ├── 📂 controllers/
│   │   ├── authController.js         # register, login, logout
│   │   ├── submissionController.js   # submitCode → triggers pipeline
│   │   ├── reviewController.js       # CRUD for reviews
│   │   ├── historyController.js      # paginated history + delete
│   │   ├── dashboardController.js    # aggregate stats
│   │   ├── staticController.js       # static analysis trigger
│   │   ├── complexityController.js   # complexity report trigger
│   │   └── aiController.js           # AI review trigger
│   ├── 📂 middlewares/
│   │   └── authMiddleware.js         # isLoggedIn (JWT verify + req.user)
│   ├── 📂 routes/
│   │   ├── authRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── submissionRoutes.js       # multer file upload handling
│   │   ├── historyRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── staticRoutes.js
│   │   ├── complexityRoutes.js
│   │   └── aiRoutes.js
│   ├── 📂 services/
│   │   ├── aiService.js              # Gemini prompt builder + response parser
│   │   └── pipelineService.js        # 4-stage async orchestrator
│   ├── 📂 lib/
│   │   └── prisma.js                 # Prisma Client singleton
│   ├── 📂 prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── 📂 migrations/
│   ├── app.js                        # Express app + CORS + route mounting
│   └── package.json
│
├── 📂 frontend/
│   └── 📂 src/
│       ├── 📂 components/
│       │   ├── 📂 Auth/              # AuthBrand, AuthInput
│       │   ├── 📂 Dashboard/         # DashboardHero, StatCard, RecentReviews, ScoreGauge
│       │   ├── 📂 History/           # HistoryFilters, ReviewCard, Pagination
│       │   ├── 📂 NewReview/         # AnalysisModal, CodePasteSection, LanguageSelector, UploadSection
│       │   ├── 📂 Report/            # ScoreCard, SummaryPanel, FindingsTable, ComplexityPanel, AISuggestionsPanel
│       │   ├── 📂 common/            # DeleteConfirmModal
│       │   └── Layout.jsx            # App shell (sidebar + header)
│       ├── 📂 pages/                 # Dashboard, Login, Register, NewReview, Report, History
│       ├── 📂 redux/                 # store.js + slices (authSlice, dashboardSlice)
│       ├── 📂 context/               # ThemeContext.jsx
│       ├── 📂 https/                 # axios.js (base URL + 401 interceptor)
│       ├── App.jsx                   # Router + protected routes
│       └── main.jsx
│
└── 📂 docs/
    └── schema.dbml                   # DBML schema for dbdiagram.io
```

</details>

---

## 🔌 API Reference

All endpoints are prefixed at the root (no `/api` prefix). Protected routes require the `token` httpOnly cookie set at login.

### 🔐 Auth — `/auth`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Create a new user account | ❌ |
| `POST` | `/auth/login` | Log in; sets `token` httpOnly cookie | ❌ |
| `POST` | `/auth/logout` | Clears the `token` cookie | ✅ |

### 📤 Submissions — `/submissions`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/submissions` | Submit code/files; triggers async AI pipeline | ✅ |

**Body** (multipart/form-data): `title`, `submissionType` (`PASTED_CODE`\|`FILE_UPLOAD`), `language`, `pastedCode` or `files[]` (max 10 × 5MB)

### 📋 Reviews — `/reviews`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/reviews` | Create a review record manually | ✅ |
| `GET` | `/reviews` | List all reviews for the current user | ✅ |
| `GET` | `/reviews/:id` | Get full review details + all analysis data | ✅ |
| `DELETE` | `/reviews/:id` | Delete review + cascade all child records | ✅ |

### 📜 History — `/history`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/history` | Paginated, filterable review history | ✅ |
| `DELETE` | `/history/:reviewId` | Delete a review from history | ✅ |

**Query params**: `page`, `limit`, `search`, `status`, `language`, `submissionType`

### 📊 Dashboard — `/dashboard`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/dashboard` | Aggregate stats + recent reviews | ✅ |

### ⚙️ Analysis Pipeline (internal triggers)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/static/:reviewId/analyze-static` | Run static analysis on a review | ✅ |
| `POST` | `/complexity/:reviewId/analyze-complexity` | Run complexity analysis | ✅ |
| `POST` | `/ai/:reviewId/analyze-ai` | Run Gemini AI review | ✅ |

> **Note:** The three pipeline endpoints above are called internally by `pipelineService.js`. You do not need to call them directly — submitting via `POST /submissions` triggers the full pipeline automatically.

---

## 🗄️ Database

The database is hosted on **[Neon](https://neon.tech)** — a serverless PostgreSQL provider. Key advantages for this project:
- **Scale to zero** — Neon pauses compute when idle, so there are no idle costs
- **Branching** — Neon supports database branches (useful for staging environments)
- **No local Postgres needed** — just paste the `DATABASE_URL` connection string into `.env`

All tables use cascade deletes. Deleting a `Review` automatically removes its `CodeFile`s, `StaticAnalysis`, `ComplexityReport`, `AIReview`, and all `Finding`s in a single Prisma `.delete()` call.

See the [ER diagram](#️-database-schema) above, or explore interactively via [docs/schema.dbml](./docs/schema.dbml) on [dbdiagram.io](https://dbdiagram.io).

---

## 🚀 Deployment

### Frontend (Vercel)

The frontend is deployed on **Vercel** at [`ai-review-frontend-lovat.vercel.app`](https://ai-review-frontend-lovat.vercel.app).

1. Push to `main` — Vercel auto-deploys
2. Set environment variable in Vercel dashboard:
   - `VITE_API_URL` = your Railway backend URL (e.g. `https://your-app.railway.app`)

### Backend (Railway)

The backend is deployed on **Railway**. It binds to `0.0.0.0` for Railway's proxy routing.

1. Connect the GitHub repo in Railway
2. Set these environment variables in the Railway dashboard:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string (with `?sslmode=require`) |
| `JWT_SECRET` | Your secret key |
| `GEMINI_API_KEY` | Your Google AI Studio key |
| `PORT` | `3000` (or Railway auto-assigns) |
| `NODE_ENV` | `production` |

3. Railway runs `npm start` → `node app.js` (from `package.json` scripts)
4. The `postinstall` script (`prisma generate`) runs automatically after `npm install` on each deploy

### CORS

The backend CORS allowlist in `app.js` includes:
- `http://localhost:5173` (local dev)
- `https://ai-review-frontend-lovat.vercel.app` (production)

Add your custom domain to this array if you deploy under a different URL.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See [`package.json`](./backend/package.json) for details.

---

## 📬 Contact

**Indranil Biswas**

[![GitHub](https://img.shields.io/badge/GitHub-boxbiswas-181717?style=for-the-badge&logo=github)](https://github.com/boxbiswas)

---

<div align="center">

Made with 💖 and a lot of ☕ by [Indrasish Biswas](https://github.com/boxbiswas)

⭐ **If you found LUMUS useful, please give it a star!** ⭐

</div>
