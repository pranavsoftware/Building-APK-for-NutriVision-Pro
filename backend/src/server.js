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

// Trust proxy - important for production behind reverse proxies
app.set('trust proxy', 1);

// Connect to database
connectDB();

// Validate required environment variables
const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const optional = ['GOOGLE_CLIENT_ID', 'GEMINI_API_KEY', 'SENDGRID_API_KEY', 'EMAIL_USER'];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease check your .env file');
    process.exit(1);
  }
  
  console.log('✅ Required environment variables validated');
  
  // Check optional variables
  const missingOptional = optional.filter(key => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn('⚠️  Optional environment variables not set:');
    missingOptional.forEach(key => console.warn(`   - ${key}`));
  }
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
  next();
});

// Request logging middleware (development mode)
if (process.env.NODE_ENV !== 'production') {
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
    environment: process.env.NODE_ENV || 'development',
    authentication: {
      methods: ['Email/Password', 'Google OAuth'],
      emailAuth: true,
      googleAuth: !!process.env.GOOGLE_CLIENT_ID,
    },
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth',
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
    authentication: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      verifyOTP: 'POST /api/auth/verify-otp',
      resendOTP: 'POST /api/auth/resend-otp',
      forgotPassword: 'POST /api/auth/forgot-password',
      resetPassword: 'POST /api/auth/reset-password',
      googleLogin: 'POST /api/auth/google (optional)',
    },
    user: {
      profile: 'GET /api/user/profile',
      updateProfile: 'PUT /api/user/profile',
      stats: 'GET /api/user/stats',
    },
    scanner: {
      analyze: 'POST /api/scanner/analyze',
      history: 'GET /api/scanner/history',
      delete: 'DELETE /api/scanner/history/:id',
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
    path: req.originalUrl,
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
const HOST = '0.0.0.0'; // Allow connections from network

// Get network IP address
const getNetworkIP = () => {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'YOUR_IP';
};

const networkIP = getNetworkIP();

const server = app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║         🥗 NutriVision Pro API Server 🥗             ║
║                                                       ║
║  Status: ✅ RUNNING                                   ║
║  Port: ${PORT}                                        ║
║  Environment: ${process.env.NODE_ENV || 'development'}                      ║
║  Time: ${new Date().toLocaleString()}                ║
║                                                       ║
║  🔐 Authentication Methods:                           ║
║  - Email/Password: ✅ ENABLED                         ║
║  - Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? '✅ ENABLED' : '❌ DISABLED'}                        ║
║                                                       ║
║  📡 API Endpoints:                                    ║
║  - GET  /                      (API Info)             ║
║  - GET  /health                (Health Check)         ║
║  - POST /api/auth/register     (Sign Up)              ║
║  - POST /api/auth/login        (Sign In)              ║
║  - POST /api/auth/verify-otp   (Verify OTP)           ║
║  - POST /api/scanner/analyze   (Food Analysis)        ║
║  - GET  /api/user/profile      (User Profile)         ║
║                                                       ║
║  🌐 Access URLs:                                      ║
║  - Local: http://localhost:${PORT}                    ║
║  - Network: http://${networkIP}:${PORT}                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
  
  console.log(`\n💡 Tip: Mobile app should use this URL in .env file:`);
  console.log(`   EXPO_PUBLIC_API_BASE_URL=http://${networkIP}:${PORT}/api\n`);
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
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:');
  console.error('Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error('Stack:', err.stack);
  }
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:');
  console.error('Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error('Stack:', err.stack);
  }
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});
