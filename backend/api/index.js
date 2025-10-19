require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../src/config/database');

// Import routes
const authRoutes = require('../src/routes/auth.routes');
const userRoutes = require('../src/routes/user.routes');
const scannerRoutes = require('../src/routes/scanner.routes');
const legalRoutes = require('../src/routes/legal.routes');

// Initialize express app
const app = express();

// Trust proxy - important for serverless environments
app.set('trust proxy', 1);

// Database connection (with connection pooling for serverless)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await connectDB();
    isConnected = true;
    console.log('New database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Validate required environment variables
const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    throw new Error('Missing required environment variables');
  }
  
  console.log('✅ Environment variables validated');
};

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all origins for now (you can restrict this later)
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // For base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🥗 Welcome to NutriVision Pro API',
    version: '1.0.0',
    status: 'running',
    serverless: true,
    platform: 'Vercel',
    authentication: {
      methods: ['Email/Password', 'Google OAuth 2.0'],
      configured: true,
    },
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth',
      register: '/api/auth/register',
      login: '/api/auth/login',
      verifyOTP: '/api/auth/verify-otp',
      googleSignIn: '/api/auth/google',
      user: '/api/user',
      scanner: '/api/scanner',
    },
  });
});

// Health check routes
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NutriVision API is running',
    status: 'healthy',
    serverless: true,
    platform: 'Vercel',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NutriVision API is running',
    status: 'healthy',
    serverless: true,
    platform: 'Vercel',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// API info route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NutriVision Pro API v1.0.0',
    serverless: true,
    platform: 'Vercel',
    documentation: 'Available endpoints: /api/auth, /api/user, /api/scanner',
    authentication: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      verifyOTP: 'POST /api/auth/verify-otp',
      resendOTP: 'POST /api/auth/resend-otp',
      forgotPassword: 'POST /api/auth/forgot-password',
      resetPassword: 'POST /api/auth/reset-password',
      googleLogin: 'POST /api/auth/google',
    },
  });
});

// Mount legal routes
app.use('/', legalRoutes);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/scanner', scannerRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  // Log error details
  console.error('❌ Error occurred:');
  console.error('Path:', req.path);
  console.error('Method:', req.method);
  console.error('Error:', err.message);
  
  // Don't leak error details in production
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'An error occurred processing your request'
    : err.message;
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: errorMessage,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// Main handler function for Vercel
const handler = async (req, res) => {
  try {
    // Validate environment variables
    validateEnv();
    
    // Connect to database
    await connectToDatabase();
    
    // Handle the request with Express
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
};

// Export for Vercel serverless
module.exports = handler;

// Export app for local development
module.exports.app = app;
