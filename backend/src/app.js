import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.js';

const app = express();


// Middleware
app.use(express.json()); // Middleware to parse JSON request 
app.use(cors());

// Routes
app.use('/', indexRoutes);
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Export the app
export default app;

