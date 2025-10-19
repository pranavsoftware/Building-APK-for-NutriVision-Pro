#!/usr/bin/env node

/**
 * Pre-deployment verification script
 * Run this before deploying to ensure all requirements are met
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 NutriVision Backend - Pre-Deployment Verification\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

// Helper functions
const checkPass = (message) => {
  console.log(`✅ ${message}`);
  checks.passed++;
};

const checkFail = (message) => {
  console.log(`❌ ${message}`);
  checks.failed++;
};

const checkWarn = (message) => {
  console.log(`⚠️  ${message}`);
  checks.warnings++;
};

// 1. Check package.json exists and has required fields
console.log('📦 Checking package.json...');
try {
  const pkg = require('../package.json');
  
  if (pkg.name && pkg.version && pkg.main) {
    checkPass('package.json is valid');
  } else {
    checkFail('package.json missing required fields');
  }
  
  if (pkg.engines && pkg.engines.node) {
    checkPass(`Node.js version specified: ${pkg.engines.node}`);
  } else {
    checkWarn('Node.js version not specified in engines');
  }
  
  if (pkg.scripts && pkg.scripts.start) {
    checkPass(`Start script defined: ${pkg.scripts.start}`);
  } else {
    checkFail('Start script not defined');
  }
  
  // Check dependencies
  const requiredDeps = [
    'express',
    'mongoose',
    'dotenv',
    'cors',
    'jsonwebtoken',
    'bcryptjs',
    'nodemailer',
    '@google/generative-ai',
  ];
  
  const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    checkPass('All required dependencies installed');
  } else {
    checkFail(`Missing dependencies: ${missingDeps.join(', ')}`);
  }
} catch (error) {
  checkFail('package.json not found or invalid');
}

// 2. Check server.js exists
console.log('\n🖥️  Checking server files...');
const serverPath = path.join(__dirname, '..', 'src', 'server.js');
if (fs.existsSync(serverPath)) {
  checkPass('server.js found');
  
  // Check if server listens on process.env.PORT
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  if (serverContent.includes('process.env.PORT')) {
    checkPass('Server uses dynamic PORT from environment');
  } else {
    checkWarn('Server may not use environment PORT variable');
  }
  
  if (serverContent.includes('0.0.0.0')) {
    checkPass('Server binds to 0.0.0.0 for production');
  } else {
    checkWarn('Server may not bind to 0.0.0.0');
  }
} else {
  checkFail('server.js not found');
}

// 3. Check config files
console.log('\n⚙️  Checking configuration files...');
const configPath = path.join(__dirname, '..', 'src', 'config', 'database.js');
if (fs.existsSync(configPath)) {
  checkPass('Database config found');
} else {
  checkFail('Database config not found');
}

// 4. Check .env.example exists
console.log('\n🔐 Checking environment templates...');
const envExamplePath = path.join(__dirname, '..', '.env.example');
if (fs.existsSync(envExamplePath)) {
  checkPass('.env.example found');
  
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  const requiredEnvVars = [
    'PORT',
    'NODE_ENV',
    'MONGODB_URI',
    'JWT_SECRET',
    'GEMINI_API_KEY',
    'EMAIL_USER',
    'EMAIL_PASSWORD',
  ];
  
  const missingEnvVars = requiredEnvVars.filter(
    envVar => !envExample.includes(envVar)
  );
  
  if (missingEnvVars.length === 0) {
    checkPass('All required environment variables documented');
  } else {
    checkWarn(`Missing env vars in example: ${missingEnvVars.join(', ')}`);
  }
} else {
  checkWarn('.env.example not found (recommended for deployment)');
}

// 5. Check .gitignore
console.log('\n🚫 Checking .gitignore...');
const gitignorePath = path.join(__dirname, '..', '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  
  if (gitignore.includes('.env') && gitignore.includes('node_modules')) {
    checkPass('.gitignore properly configured');
  } else {
    checkFail('.gitignore missing critical entries');
  }
} else {
  checkFail('.gitignore not found');
}

// 6. Check for Render config
console.log('\n🎯 Checking deployment configs...');
const renderYamlPath = path.join(__dirname, '..', 'render.yaml');
if (fs.existsSync(renderYamlPath)) {
  checkPass('render.yaml found');
} else {
  checkWarn('render.yaml not found (optional but recommended)');
}

const procfilePath = path.join(__dirname, '..', 'Procfile');
if (fs.existsSync(procfilePath)) {
  checkPass('Procfile found');
} else {
  checkWarn('Procfile not found (optional)');
}

// 7. Check routes
console.log('\n🛣️  Checking API routes...');
const routesDir = path.join(__dirname, '..', 'src', 'routes');
if (fs.existsSync(routesDir)) {
  const routes = fs.readdirSync(routesDir);
  const requiredRoutes = ['auth.routes.js', 'user.routes.js', 'scanner.routes.js'];
  
  const missingRoutes = requiredRoutes.filter(
    route => !routes.includes(route)
  );
  
  if (missingRoutes.length === 0) {
    checkPass('All required routes found');
  } else {
    checkFail(`Missing routes: ${missingRoutes.join(', ')}`);
  }
} else {
  checkFail('Routes directory not found');
}

// 8. Check models
console.log('\n📊 Checking database models...');
const modelsDir = path.join(__dirname, '..', 'src', 'models');
if (fs.existsSync(modelsDir)) {
  const models = fs.readdirSync(modelsDir);
  const requiredModels = ['User.js', 'FoodAnalysis.js', 'OTP.js'];
  
  const missingModels = requiredModels.filter(
    model => !models.includes(model)
  );
  
  if (missingModels.length === 0) {
    checkPass('All required models found');
  } else {
    checkFail(`Missing models: ${missingModels.join(', ')}`);
  }
} else {
  checkFail('Models directory not found');
}

// Final summary
console.log('\n' + '='.repeat(60));
console.log('📋 Verification Summary:');
console.log('='.repeat(60));
console.log(`✅ Passed: ${checks.passed}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);
console.log('='.repeat(60) + '\n');

if (checks.failed === 0) {
  console.log('🎉 All critical checks passed!');
  console.log('✨ Your backend is ready for deployment to Render.com\n');
  
  if (checks.warnings > 0) {
    console.log('ℹ️  Note: You have some warnings. Review them before deploying.\n');
  }
  
  console.log('📚 Next steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Go to render.com and create a new Web Service');
  console.log('3. Connect your GitHub repository');
  console.log('4. Set root directory to "backend"');
  console.log('5. Add all environment variables');
  console.log('6. Deploy!\n');
  
  console.log('📖 For detailed deployment instructions, see:');
  console.log('   backend/RENDER_DEPLOYMENT.md\n');
  
  process.exit(0);
} else {
  console.log('❌ Deployment verification failed!');
  console.log('🔧 Please fix the failed checks before deploying.\n');
  process.exit(1);
}
