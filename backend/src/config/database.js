const mongoose = require('mongoose');

// Cache the database connection for serverless
let cachedConnection = null;

const connectDB = async () => {
  // Check if we have a cached connection
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached database connection');
    return cachedConnection;
  }

  try {
    // Configure mongoose for serverless
    mongoose.set('strictQuery', false);
    
    // Connection options optimized for serverless
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 1, // Minimum number of connections in the pool
      maxIdleTimeMS: 10000, // Close idle connections after 10 seconds
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Cache the connection
    cachedConnection = conn;
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error; // Don't exit process in serverless environment
  }
};

module.exports = connectDB;
