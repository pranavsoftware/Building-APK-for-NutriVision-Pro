#!/usr/bin/env node

/**
 * Mobile App API Connection Test
 * Tests if the mobile app can connect to the backend API
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║    📱 Mobile App API Connection Test 📱              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);

// Read .env file
const envPath = path.join(__dirname, '.env');
let apiUrl = 'http://localhost:5000/api';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/EXPO_PUBLIC_API_BASE_URL=(.+)/);
  
  if (match && match[1] && !match[1].startsWith('#')) {
    apiUrl = match[1].trim();
  }
}

console.log(`\n🔗 Testing API URL: ${apiUrl}\n`);

// Test health endpoint
async function testHealth() {
  try {
    console.log('📡 Testing health endpoint...');
    const response = await axios.get(apiUrl.replace('/api', '') + '/health', {
      timeout: 5000,
    });
    
    if (response.data.success) {
      console.log('✅ Health check passed');
      console.log(`   Status: ${response.data.status}`);
      console.log(`   Message: ${response.data.message}`);
      if (response.data.serverless) {
        console.log('   Mode: Serverless ✨');
      }
      return true;
    } else {
      console.log('❌ Health check failed - Unexpected response');
      return false;
    }
  } catch (error) {
    console.log('❌ Health check failed');
    if (error.code === 'ECONNREFUSED') {
      console.log('   Error: Cannot connect to server');
      console.log('   Solution: Make sure backend is running (npm run dev)');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('   Error: Connection timeout');
      console.log('   Solution: Check if server is accessible from your device');
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return false;
  }
}

// Test API info endpoint
async function testApiInfo() {
  try {
    console.log('\n📡 Testing API info endpoint...');
    const response = await axios.get(apiUrl, {
      timeout: 5000,
    });
    
    if (response.data.success) {
      console.log('✅ API info retrieved');
      if (response.data.authentication) {
        console.log('   Authentication methods available:');
        Object.keys(response.data.authentication).forEach(key => {
          console.log(`   - ${key}: ${response.data.authentication[key]}`);
        });
      }
      return true;
    } else {
      console.log('❌ API info failed - Unexpected response');
      return false;
    }
  } catch (error) {
    console.log('❌ API info failed');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

// Test auth endpoints availability
async function testAuthEndpoints() {
  try {
    console.log('\n📡 Testing authentication endpoints...');
    
    // Test with invalid data to see if endpoint exists
    const response = await axios.post(`${apiUrl}/auth/register`, {
      name: '',
      email: 'test',
      password: '',
    }, {
      timeout: 5000,
      validateStatus: () => true, // Accept any status
    });
    
    if (response.status === 400 || response.status === 422) {
      console.log('✅ Registration endpoint is accessible');
      console.log('   (Validation errors are expected for empty data)');
      return true;
    } else if (response.status === 404) {
      console.log('❌ Registration endpoint not found');
      return false;
    } else {
      console.log('⚠️  Registration endpoint responded with status:', response.status);
      return true;
    }
  } catch (error) {
    if (error.response) {
      console.log('✅ Registration endpoint is accessible');
      console.log('   (Validation errors are expected)');
      return true;
    } else {
      console.log('❌ Cannot reach authentication endpoints');
      console.log(`   Error: ${error.message}`);
      return false;
    }
  }
}

// Run all tests
async function runTests() {
  const results = {
    health: false,
    apiInfo: false,
    auth: false,
  };
  
  results.health = await testHealth();
  results.apiInfo = await testApiInfo();
  results.auth = await testAuthEndpoints();
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Results:\n');
  console.log(`   Health Endpoint:         ${results.health ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   API Info Endpoint:       ${results.apiInfo ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Auth Endpoints:          ${results.auth ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = results.health && results.apiInfo && results.auth;
  
  if (allPassed) {
    console.log('\n✅ All tests passed! Mobile app is ready to connect.\n');
    console.log('Next steps:');
    console.log('1. Start Expo: npx expo start');
    console.log('2. Open app on device/emulator');
    console.log('3. Test registration and login\n');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Please fix the issues above.\n');
    console.log('Common solutions:');
    console.log('1. Make sure backend is running: cd backend && npm run dev');
    console.log('2. Check .env file has correct API_BASE_URL');
    console.log('3. If using physical device, use computer\'s IP address');
    console.log('4. Ensure device and computer are on same WiFi network\n');
    process.exit(1);
  }
}

// Check if axios is installed
try {
  runTests();
} catch (error) {
  console.log('❌ Error: axios not found');
  console.log('   Run: npm install axios (or the tests can\'t run)');
  process.exit(1);
}
