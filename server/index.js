require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const designRoutes = require('./routes/designRoutes');
const furnitureRoutes = require('./routes/furnitureRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(cors());
app.use(express.json());

/* ── Routes ─────────────────────────────────────────────────────────── */
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/feedback', feedbackRoutes);

/* ── Error logging middleware ────────────────────────────────────────── */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[ERROR] ${req.method} ${req.url} → ${status}: ${message}`);
  if (process.env.NODE_ENV === 'development') console.error(err.stack);
  res.status(status).json({ message });
});

/* ── Start ───────────────────────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
