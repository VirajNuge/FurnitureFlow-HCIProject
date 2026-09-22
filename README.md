# FurnitureFlow – 3D Room Designer

> A full-stack MERN web application for interactive room layout design. Place furniture on a 2D canvas and instantly preview the result in a photorealistic 3D scene — all in the browser.
>
> Built for **PUSL 3122 Human-Computer Interaction** — Group Project, March 2026.

---

## Overview

FurnitureFlow lets users design room interiors without specialist software. The workflow is split into two complementary views:

1. **2D Designer** — A top-down canvas (Konva.js) where you place, resize, rotate, and arrange furniture items with pixel-perfect control.
2. **3D Preview** — A live Three.js scene that renders the same layout in three dimensions with textured walls, floors, and furniture geometry.

Designs are persisted to MongoDB per user account. A searchable furniture catalog provides the source items, and a feedback system lets users report issues to an admin dashboard.

---

## Features

### Designer Workspace
- **Drag-and-drop placement** — pick furniture from the catalog sidebar and drop it anywhere on the canvas
- **Snap-to-grid** — configurable grid snapping keeps items aligned
- **Rubber-band selection** — click-drag to select multiple items at once
- **Rotate & resize** — handles on each selected item; precise values in the Properties sidebar
- **Dimension labels** — real-world measurements (cm) rendered on every placed item
- **Auto-arrange** — one-click layout algorithm distributes items evenly in the room
- **Keyboard shortcuts** — Delete, Escape, Ctrl+Z undo, Ctrl+A select-all, and more
- **Room configuration** — set custom room width, depth, height, wall colour, and floor texture via a setup modal

### 3D Preview
- Real-time scene sync with the 2D canvas state (Zustand store)
- Environment lighting + contact shadows for depth
- Texture mapping on floors (wood, tile, carpet) and coloured walls
- Per-furniture 3D mesh with correct dimensions and rotation
- Orbit controls — rotate, pan, and zoom with mouse or touch

### Furniture Catalog
- Searchable by name or tag
- Filtered by type: chair, table, sofa, bed, shelf, lamp
- Items loaded from MongoDB with real-world dimensions (width × height × depth in cm)

### Design Management
- Save current layout as a named design
- Load any previously saved design from the dashboard
- Update (overwrite) or delete existing designs
- Thumbnail generated on save (canvas snapshot)
- Designs can be marked public or kept private

### Authentication
- Register / login with email and password
- Passwords hashed with bcryptjs
- JWT access tokens + refresh token rotation
- Protected routes on both client (React Router) and server (Express middleware)
- Rate-limited auth endpoints (express-rate-limit)

### Feedback & Admin
- In-app feedback modal (FeedbackModal) for user bug reports and suggestions
- Admin dashboard filters submissions by date range
- Admin-only route protection via role check in auth middleware

### Accessibility
- WCAG AA focus rings on all interactive elements
- ARIA roles and labels throughout
- High-contrast mode support via Tailwind CSS utilities
- Keyboard-navigable catalog and toolbar

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | React | 18.2 |
| Build tool | Vite | 5.0 |
| Styling | Tailwind CSS | 3.4 |
| State management | Zustand | 4.4 |
| 2D canvas | Konva.js + react-konva | 9.3 / 18.2 |
| 3D engine | Three.js | 0.160 |
| 3D React bindings | @react-three/fiber + @react-three/drei | 8.15 / 9.92 |
| HTTP client | Axios | 1.6 |
| Routing | React Router DOM | 6.21 |
| Backend | Node.js + Express | 4.18 |
| Database | MongoDB + Mongoose | 8.0 |
| Auth | jsonwebtoken + bcryptjs | 9.0 / 2.4 |
| Validation | express-validator | 7.0 |
| Rate limiting | express-rate-limit | 7.1 |
| Dev tooling | nodemon, concurrently, vitest | — |

---

## Architecture

```
Browser
  │
  ├── React SPA (Vite, port 5173)
  │     ├── Pages: Home, Auth (Login/Register), Dashboard, Designer, Admin
  │     ├── Designer page
  │     │     ├── Canvas2D  (Konva — top-down layout editor)
  │     │     ├── Canvas3D  (Three.js — 3D preview)
  │     │     ├── Toolbar + ToolPalette
  │     │     ├── PropertiesSidebar  (selected item inspector)
  │     │     ├── RoomSetupModal
  │     │     └── FeedbackModal
  │     ├── Zustand stores: authStore, designStore, toastStore
  │     └── Custom hooks: useDrag, useSnapGrid, useKeyboardShortcuts
  │
  └── Express REST API (port 5000)
        ├── /api/auth       → register, login, refresh, logout
        ├── /api/designs    → CRUD for saved room designs
        ├── /api/rooms      → room configuration helpers
        ├── /api/furniture  → catalog read endpoints
        └── /api/feedback   → submit & list feedback
              │
              └── MongoDB (Atlas or local)
                    ├── User       (id, email, passwordHash, role)
                    ├── Design     (userId, name, room config, furniture[])
                    ├── Furniture  (name, type, dimensions, tags)
                    ├── Room       (standalone room configs)
                    └── Feedback   (userId, message, createdAt)
```

---

## Data Models

### Design
Each saved design stores the full room configuration and a snapshot of all placed furniture items:

```json
{
  "name": "Living Room v2",
  "room": { "width": 500, "depth": 400, "height": 280, "wallColor": "#f5f0e8", "floorTexture": "wood" },
  "furniture": [
    { "type": "sofa", "label": "3-Seat Sofa", "x": 120, "y": 80, "width": 220, "height": 90, "rotation": 0, "color": "#94a3b8", "textureId": "fabric" }
  ],
  "isPublic": false,
  "thumbnail": "<base64 png>"
}
```

### Furniture Catalog Item
```json
{ "name": "Accent Chair", "type": "chair", "width": 75, "height": 80, "depth": 75, "defaultColor": "#93c5fd", "tags": ["living room", "seating"] }
```

---

## Project Structure

```
furnitureflow/
├── package.json               # Root — concurrently scripts
│
├── client/                    # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx           # App entry
│       ├── App.jsx            # Router + layout shell
│       ├── index.css          # Tailwind directives
│       │
│       ├── api/               # Axios wrappers per resource
│       │
│       ├── components/
│       │   ├── canvas2D/      # Canvas2D.jsx, FurnitureNode.jsx, RoomBoundary.jsx
│       │   ├── canvas3D/      # Canvas3D.jsx, Furniture3D.jsx, Room3D.jsx, TexturedMaterial.jsx
│       │   ├── furniture/     # Catalog browser components
│       │   ├── layout/        # Navbar, sidebar shell
│       │   └── ui/            # Toolbar, ToolPalette, PropertiesSidebar,
│       │                      #   ViewToggle, RoomSetupModal, FeedbackModal, Toast
│       │
│       ├── hooks/
│       │   ├── useDrag.js             # Pointer-event drag logic
│       │   ├── useSnapGrid.js         # Grid-snapping math
│       │   └── useKeyboardShortcuts.js
│       │
│       ├── pages/
│       │   ├── Home/          # Landing page
│       │   ├── Auth/          # Login + Register
│       │   ├── Dashboard/     # Saved designs grid
│       │   ├── Designer/      # Main designer workspace
│       │   └── Admin/         # Feedback viewer (admin only)
│       │
│       ├── store/
│       │   ├── authStore.js   # JWT tokens, user info
│       │   ├── designStore.js # Canvas state, furniture list, room config
│       │   └── toastStore.js  # Global notification queue
│       │
│       ├── utils/
│       │   ├── autoArrange.js # Layout algorithm
│       │   └── textures.js    # Texture URL map
│       │
│       └── tests/             # Vitest unit tests
│
└── server/                    # Express + Mongoose API
    ├── index.js               # App bootstrap, route wiring, error handler
    ├── db.js                  # Mongoose connection
    │
    ├── models/
    │   ├── User.js
    │   ├── Design.js
    │   ├── Furniture.js
    │   ├── Room.js
    │   └── Feedback.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── designController.js
    │   ├── furnitureController.js
    │   ├── roomController.js
    │   └── feedbackController.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   ├── designRoutes.js
    │   ├── furnitureRoutes.js
    │   ├── roomRoutes.js
    │   └── feedbackRoutes.js
    │
    ├── middleware/
    │   ├── authMiddleware.js  # JWT verification, role guard
    │   ├── rateLimiter.js     # Per-IP rate limits
    │   └── validateAuth.js    # express-validator rules
    │
    └── scripts/
        └── seedFurniture.js   # Populate furniture catalog
```

---

## Getting Started

### Prerequisites

- **Node.js ≥ 18**
- **MongoDB** — Atlas cluster URI or a local instance

### 1 — Clone & install

```bash
git clone https://github.com/VirajNuge/FurnitureFlow-HCIProject.git
cd FurnitureFlow-HCIProject

# Install everything (root + client + server) in one go
npm install
npm install --prefix client
npm install --prefix server
```

### 2 — Configure environment

Create `server/.env` by copying `server/.env.example`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/furnitureflow
JWT_SECRET=replace-with-a-long-access-token-secret
JWT_REFRESH_SECRET=replace-with-a-different-long-refresh-token-secret
NODE_ENV=development
```

### 3 — Seed the furniture catalog

```bash
node server/scripts/seedFurniture.js

# If an older database uses Room.length, normalize it once
node server/scripts/migrateRooms.js
```

### 4 — Run in development

```bash
# Starts both servers concurrently (root package.json)
npm run dev
```

| Service | URL |
|---|---|
| React (Vite) | http://localhost:5173 |
| Express API | http://localhost:5000 |

Or start them independently:

```bash
# API server
npm run dev --prefix server

# React dev server
npm run dev --prefix client
```

### 5 — Production build

```bash
npm run build          # Builds client/dist via Vite
npm start              # Serves the Express API (serve client/dist statically if needed)
```

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login, returns tokens |
| POST | `/api/auth/refresh` | — | Rotate refresh token |
| POST | `/api/auth/logout` | ✓ | Invalidate refresh token |
| GET | `/api/furniture` | ✓ | List catalog items (filterable) |
| GET | `/api/designs` | ✓ | List user's saved designs |
| POST | `/api/designs` | ✓ | Save new design |
| GET | `/api/designs/:id` | ✓ | Load single design |
| PUT | `/api/designs/:id` | ✓ | Update design |
| DELETE | `/api/designs/:id` | ✓ | Delete design |
| GET | `/api/rooms` | ✓ | List room configs |
| POST | `/api/rooms` | ✓ | Create room config |
| GET | `/api/rooms/:id` | ✓ | Load an owned room config |
| PUT | `/api/rooms/:id` | ✓ | Update an owned room config |
| POST | `/api/feedback` | ✓ | Submit feedback |
| GET | `/api/feedback` | ✓ Admin | List all feedback (date range filter) |
| GET | `/health` | — | API health check |

## Quality checks

```bash
npm test
npm run build
```

The server requires `MONGO_URI`, `JWT_SECRET`, and `JWT_REFRESH_SECRET` at startup. Refresh tokens are rotated and revoked when a newer token is issued.

---

## Team

| Member | Role |
|---|---|
| Viraj Nugekotuwa | Project Lead, 3D Engine (Three.js / R3F), overall architecture |
| Rewon Weerasinghe | Backend API, authentication, server infrastructure |
| Semal Hewage | 2D canvas (Konva), drag & snap, canvas-layer hooks |
| Sanithu | UI/UX design, Tailwind styling, accessibility |
| Nipun Fernando | Frontend features, keyboard shortcuts, Axios API integration |
| Dumindu Peiris | Feedback system, input validation, testing (Vitest) |

---

## License

[MIT](LICENSE)

---

*PUSL 3122 Human-Computer Interaction — Group Project submission, March 2026.*
