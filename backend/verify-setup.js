#!/usr/bin/env node

/**
 * NutriVision Pro - Setup Verification Script
 * Verifies both backend and mobile app are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     🥗 NutriVision Pro - Setup Verification 🥗       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);

let hasErrors = false;

// Check backend files
console.log('\n📦 Checking Backend Files...\n');

const backendFiles = [
  'package.json',
  'vercel.json',
  '.env.example',
  'api/index.js',
  'src/server.js',
  'src/config/database.js',
  'src/routes/auth.routes.js',
  'src/controllers/auth.controller.js',
  'src/models/User.js',
];

backendFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    hasErrors = true;
  }
});

// Check backend environment variables
console.log('\n🔐 Checking Backend Environment Variables...\n');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
  const optionalVars = ['SENDGRID_API_KEY', 'EMAIL_USER', 'GEMINI_API_KEY', 'GOOGLE_CLIENT_ID'];
  
  requiredVars.forEach(varName => {
    if (envContent.includes(`${varName}=`)) {
      console.log(`✅ ${varName}`);
    } else {
      console.log(`❌ ${varName} - MISSING`);
      hasErrors = true;
    }
  });
  
  console.log('\n   Optional variables:');
  optionalVars.forEach(varName => {
    if (envContent.includes(`${varName}=`)) {
      console.log(`   ✅ ${varName}`);
    } else {
      console.log(`   ⚠️  ${varName} - Not set`);
    }
  });
} else {
  console.log('❌ .env file not found - copy from .env.example');
  hasErrors = true;
}

// Check vercel.json configuration
console.log('\n🔧 Checking Vercel Configuration...\n');

const vercelConfigPath = path.join(__dirname, 'vercel.json');
if (fs.existsSync(vercelConfigPath)) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));
    
    if (vercelConfig.version === 2) {
      console.log('✅ Vercel version 2');
    } else {
      console.log('⚠️  Vercel version is not 2');
    }
    
    if (vercelConfig.builds && vercelConfig.builds[0].src === 'api/index.js') {
      console.log('✅ Serverless handler configured');
    } else {
      console.log('❌ Serverless handler not properly configured');
      hasErrors = true;
    }
    
    if (vercelConfig.routes && vercelConfig.routes[0].dest === '/api/index.js') {
      console.log('✅ Routes configured');
    } else {
      console.log('❌ Routes not properly configured');
      hasErrors = true;
    }
  } catch (error) {
    console.log('❌ Invalid vercel.json format');
    hasErrors = true;
  }
}

// Check package.json
console.log('\n📋 Checking Package.json...\n');

const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    if (packageJson.main === 'api/index.js') {
      console.log('✅ Main entry point: api/index.js');
    } else {
      console.log('⚠️  Main entry point is not api/index.js');
    }
    
    if (packageJson.engines && packageJson.engines.node) {
      console.log(`✅ Node version: ${packageJson.engines.node}`);
    } else {
      console.log('⚠️  Node version not specified');
    }
    
    const requiredDeps = ['express', 'mongoose', 'cors', 'dotenv', 'jsonwebtoken', 'bcryptjs'];
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
    
    if (missingDeps.length === 0) {
      console.log('✅ All required dependencies installed');
    } else {
      console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
      hasErrors = true;
    }
  } catch (error) {
    console.log('❌ Invalid package.json format');
    hasErrors = true;
  }
}

// Check mobile app
console.log('\n📱 Checking Mobile App...\n');

const mobileAppPath = path.join(__dirname, '../mobile-app');
if (fs.existsSync(mobileAppPath)) {
  console.log('✅ Mobile app directory exists');
  
  const mobileEnvPath = path.join(mobileAppPath, '.env');
  if (fs.existsSync(mobileEnvPath)) {
    console.log('✅ Mobile app .env exists');
    
    const mobileEnvContent = fs.readFileSync(mobileEnvPath, 'utf-8');
    if (mobileEnvContent.includes('EXPO_PUBLIC_API_BASE_URL=')) {
      console.log('✅ API_BASE_URL configured');
    } else {
      console.log('❌ API_BASE_URL not configured');
      hasErrors = true;
    }
  } else {
    console.log('⚠️  Mobile app .env not found');
  }
  
  const requiredScreens = [
    'src/screens/auth/WelcomeScreen.js',
    'src/screens/auth/LoginScreen.js',
    'src/screens/auth/SignUpScreen.js',
    'src/screens/auth/OTPScreen.js',
  ];
  
  let allScreensExist = true;
  requiredScreens.forEach(screen => {
    if (!fs.existsSync(path.join(mobileAppPath, screen))) {
      allScreensExist = false;
    }
  });
  
  if (allScreensExist) {
    console.log('✅ All authentication screens exist');
  } else {
    console.log('❌ Some authentication screens are missing');
    hasErrors = true;
  }
} else {
  console.log('❌ Mobile app directory not found');
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log('\n❌ Setup verification FAILED - Please fix the errors above\n');
  process.exit(1);
} else {
  console.log('\n✅ Setup verification PASSED - Ready to deploy!\n');
  console.log('Next steps:');
  console.log('1. Local testing: npm run dev (backend)');
  console.log('2. Deploy to Vercel: vercel --prod');
  console.log('3. Update mobile app .env with Vercel URL');
  console.log('4. Test mobile app: npx expo start\n');
  process.exit(0);
}
