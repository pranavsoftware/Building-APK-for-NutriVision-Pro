require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const scannerRoutes = require('./routes/scanner.routes');
const legalRoutes = require('./routes/legal.routes');

// Initialize express app
const app = express();

// Trust proxy - important for production behind reverse proxies (Render, Railway, etc.)
app.set('trust proxy', 1);

// Connect to database
connectDB();

// Validate required environment variables
const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease check your .env file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
};

// Validate environment variables
validateEnv();

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // In production, you can restrict to specific domains
    // For now, allow all origins (you can restrict this later)
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

// Request logging middleware (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    });
    next();
  });
}

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🥗 Welcome to NutriVision Pro API',
    version: '1.0.0',
    status: 'running',
    authentication: {
      method: 'Google OAuth 2.0',
      configured: !!process.env.GOOGLE_CLIENT_ID,
    },
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth',
      googleSignIn: '/api/auth/google',
      user: '/api/user',
      scanner: '/api/scanner',
    },
  });
});

// Health check route (root level)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NutriVision API is running',
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Health check route (under /api for consistency)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NutriVision API is running',
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API info route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NutriVision Pro API v1.0.0',
    documentation: 'Available endpoints: /api/auth, /api/user, /api/scanner',
  });
});

// Mount legal routes (for Google OAuth compliance)
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

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║         🥗 NutriVision Pro API Server 🥗             ║
║                                                       ║
║  Status: ✅ RUNNING                                   ║
║  Port: ${PORT}                                           ║
║  Host: ${HOST}                                        ║
║  Environment: ${process.env.NODE_ENV || 'development'}                      ║
║  Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}              ║
║                                                       ║
║  🔐 Authentication:                                   ║
║  - Google OAuth: ✅ CONFIGURED                        ║
║                                                       ║
║  📡 Endpoints:                                        ║
║  - GET  /                      (API Info)             ║
║  - GET  /health                (Health Check)         ║
║  - GET  /privacy-policy        (Privacy Policy) 🆕    ║
║  - GET  /terms-of-service      (Terms of Service) 🆕  ║
║  - POST /api/auth/google       (Google Sign-In)       ║
║  - POST /api/scanner/analyze   (Food Analysis)        ║
║  - GET  /api/user/profile      (User Profile)         ║
║                                                       ║
║  🔗 Google Client ID:                                 ║
║  - ${process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...' : 'Not Set'}       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('❌ Unhandled Promise Rejection:');
  console.error('Error:', err.message);
  console.error('Promise:', promise);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});
