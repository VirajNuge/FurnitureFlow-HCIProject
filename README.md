# FurnitureFlow (RoomVista 3D)

A MERN stack web application for 2D and 3D furniture room planning.

## Built With
- React.js (Vite), Zustand, Konva.js, React Three Fiber
- Node.js, Express.js, MongoDB, Mongoose
- JWT Auth, bcryptjs

## Setup
```bash
npm install
cd client && npm install
cd ../server && npm install
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token

### Designs
- `GET /api/designs` — List all designs for authenticated user
- `POST /api/designs` — Save a new design
- `GET /api/designs/:id` — Load a single design
- `PUT /api/designs/:id` — Update an existing design
- `DELETE /api/designs/:id` — Delete a design

### Feedback
- `POST /api/feedback` — Submit user feedback
- `GET /api/feedback` — Get all feedback (admin)

### Rooms
- `POST /api/rooms` — Create a room
- `GET /api/rooms/:id` — Get room details
