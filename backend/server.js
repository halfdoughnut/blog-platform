const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Supabase
require('./config/supabase');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware with Chrome-compatible CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel domains and localhost for Chrome compatibility
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000', 
      /\.vercel\.app$/,
      /\.vercel-app\.com$/
    ];
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      return allowed.test(origin);
    });
    
    callback(null, isAllowed);
  },
  credentials: false, // Chrome security fix
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json({ limit: '10mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Blog Platform API',
    status: 'Active',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        profile: 'GET /auth/me'
      },
      posts: {
        getAll: 'GET /posts',
        create: 'POST /posts',
        getById: 'GET /posts/:id',
        update: 'PUT /posts/:id',
        delete: 'DELETE /posts/:id'
      }
    },
    documentation: 'This is a RESTful API for the Blog Platform'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blog Platform API is running!' });
});

// Routes (without /api prefix since proxy handles it)
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Supabase connection is handled via the config file
console.log('Supabase client initialized successfully');

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
