const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remove deprecated options - they're no longer needed in MongoDB driver 4.0.0+
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
