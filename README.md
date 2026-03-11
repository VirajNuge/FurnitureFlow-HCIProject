# FurnitureFlow – 3D Room Designer

A full-stack MERN web application that lets users design room layouts in 2D and preview them in 3D. Built for PUSL 3122 Human-Computer Interaction.

---

## Features

- **2D Canvas Editor** – Drag-and-drop furniture placement with snap-to-grid, rubber-band selection, and dimension labels
- **3D Preview** – Real-time Three.js scene with environment lighting, contact shadows, and texture mapping
- **Furniture Catalog** – Searchable, categorised catalog loaded from MongoDB
- **Design Management** – Save, load, update and delete room designs per user
- **Authentication** – JWT-based login/register with refresh token support
- **Admin Dashboard** – View and filter user feedback by date range
- **Accessibility** – WCAG AA focus rings, ARIA roles, high-contrast mode support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Zustand |
| 3D Engine | Three.js, @react-three/fiber, @react-three/drei |
| 2D Canvas | Konva.js, react-konva |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB Atlas URI (or local MongoDB)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/VirajNuge/FurnitureFlow-HCIProject.git
cd FurnitureFlow-HCIProject

# 2. Install server dependencies
cd server && npm install

# 3. Create server/.env
cp server/.env.example server/.env
# Fill in MONGO_URI, JWT_SECRET, JWT_REFRESH_SECRET, PORT

# 4. Seed furniture catalog
node server/scripts/seedFurniture.js

# 5. Install client dependencies
cd ../client && npm install
```

### Running Locally

```bash
# Terminal 1 – API server (port 5000)
cd server && npm run dev

# Terminal 2 – Vite dev server (port 5173)
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
├── client/            # React + Vite frontend
│   └── src/
│       ├── api/       # Axios API helpers
│       ├── components/# Canvas2D, Canvas3D, UI components
│       ├── hooks/     # useDrag, useSnapGrid, useKeyboardShortcuts
│       ├── pages/     # Auth, Dashboard, Designer, Admin
│       ├── store/     # Zustand stores
│       └── utils/     # autoArrange, textures
└── server/            # Express + Mongoose API
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── scripts/
```

---

## Team

| Member | Role |
|---|---|
| Viraj Nugekotuwa | Project Lead, 3D Engine, Architecture |
| Rewon Weerasinghe | Backend API, Auth, Server Infrastructure |
| Semal Hewage | 2D Canvas, Drag & Snap, Canvas Hooks |
| Sanithu | UI/UX, Styling, Accessibility |
| Nipun Fernando | Frontend Features, Keyboard Shortcuts, API Integration |
| Dumindu Peiris | Feedback System, Validation, Testing |

---

## License

MIT
