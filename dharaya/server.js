const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dharaya';

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✓ MongoDB connected successfully');
})
.catch((err) => {
  console.error('✗ MongoDB connection error:', err.message);
  console.log('Note: Make sure MongoDB is running locally or check MONGODB_URI');
});

// Import routes
const reportsRouter = require('./routes/reports');

// Routes
app.use('/api', reportsRouter);

// Legacy routes (kept for backward compatibility)
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╗
║   DHARAYA BACKEND RUNNING 🌍       ║
║   Server: http://localhost:${PORT}      ║
║   Database: MongoDB (${MONGODB_URI})  ║
║                                    ║
║   API Endpoints:                   ║
║   - POST   /api/report             ║
║   - GET    /api/reports            ║
║   - GET    /api/reports/:id        ║
║   - PUT    /api/reports/:id        ║
║   - GET    /api/eco-routes         ║
║   - GET    /api/stats              ║
║   - GET    /api/health             ║
╚━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╝
  `);
});


