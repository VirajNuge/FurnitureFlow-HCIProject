const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const designRoutes = require('./routes/designRoutes');
const furnitureRoutes = require('./routes/furnitureRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'furnitureflow-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  console.error(`[ERROR] ${req.method} ${req.url} → ${status}: ${err.message}`);
  if (res.headersSent) return next(err);
  res.status(status).json({
    message: status >= 500 ? 'Internal server error' : err.message,
  });
});

module.exports = app;
