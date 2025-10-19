const nodemailer = require('nodemailer');

// Create transporter with better configuration for cloud deployment
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Add these for better cloud compatibility
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
    minVersion: 'TLSv1.2',
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
  // Retry configuration
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

// Verify transporter configuration with timeout and graceful handling
const verifyEmailConfig = async () => {
  try {
    // Only verify if email credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('⚠️  Email credentials not configured - OTP emails will not be sent');
      return;
    }

    // Set a timeout for verification
    const verifyPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Email verification timeout'));
      }, 15000); // 15 seconds timeout

      transporter.verify((error, success) => {
        clearTimeout(timeout);
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });

    await verifyPromise;
    console.log('✅ Email server is ready to send messages');
  } catch (error) {
    console.error('⚠️  Email configuration warning:', error.message);
    console.log('📧 Server will continue without email verification');
    console.log('💡 OTP emails may fail - check EMAIL_USER and EMAIL_PASSWORD in Render');
  }
};

// Verify in background without blocking server startup
verifyEmailConfig();

module.exports = transporter;
