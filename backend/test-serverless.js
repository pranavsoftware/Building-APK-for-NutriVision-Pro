/**
 * Test script to verify serverless handler works locally
 * Run: node test-serverless.js
 */

// Mock environment variables
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';
process.env.NODE_ENV = 'development';

// Import the serverless handler
const handler = require('./api/index.js');

// Create mock request and response objects
const mockReq = {
  method: 'GET',
  url: '/health',
  headers: {
    'content-type': 'application/json',
  },
};

const mockRes = {
  statusCode: 200,
  headers: {},
  body: null,
  
  status(code) {
    this.statusCode = code;
    return this;
  },
  
  setHeader(name, value) {
    this.headers[name] = value;
    return this;
  },
  
  json(data) {
    this.body = data;
    console.log('\n✅ Response Status:', this.statusCode);
    console.log('✅ Response Body:', JSON.stringify(data, null, 2));
    return this;
  },
  
  send(data) {
    this.body = data;
    console.log('\n✅ Response:', data);
    return this;
  },
};

console.log('🧪 Testing Serverless Handler...\n');
console.log('📋 Request:', mockReq.method, mockReq.url);

// Test the handler
handler(mockReq, mockRes)
  .then(() => {
    console.log('\n✅ Serverless handler test passed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Serverless handler test failed!');
    console.error('Error:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  });
