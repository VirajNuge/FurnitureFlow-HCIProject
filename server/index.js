require('dotenv').config();
const connectDB = require('./db');
const app = require('./app');

/* ── Start ───────────────────────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET || !process.env.MONGO_URI) {
  console.error('MONGO_URI, JWT_SECRET, and JWT_REFRESH_SECRET are required');
  process.exit(1);
}

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(() => process.exit(1));

module.exports = app;
