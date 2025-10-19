/**
 * Generate Placeholder Icons Script
 * 
 * This script generates basic placeholder PNG icons for development.
 * For production, replace these with professionally designed icons.
 * 
 * Usage:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node generate-icons.js
 * 3. Icons will be created in the assets folder
 */

const fs = require('fs');
const path = require('path');

// Function to create a simple SVG icon
function generateSVG(size, type) {
  const colors = {
    primary: '#10B981',
    white: '#FFFFFF',
  };

  let svg = '';

  if (type === 'icon' || type === 'adaptive') {
    // App icon with food/nutrition theme
    svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${colors.primary}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.35}" fill="${colors.white}" opacity="0.2"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.25}" fill="${colors.white}"/>
        <path d="M ${size * 0.5} ${size * 0.3} L ${size * 0.5} ${size * 0.45}" stroke="${colors.primary}" stroke-width="${size * 0.03}" stroke-linecap="round"/>
        <ellipse cx="${size / 2}" cy="${size * 0.55}" rx="${size * 0.15}" ry="${size * 0.12}" fill="${colors.primary}"/>
        <text x="50%" y="${size * 0.85}" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold" fill="${colors.primary}" text-anchor="middle">NV</text>
      </svg>
    `;
  } else if (type === 'splash') {
    // Splash screen
    svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${colors.primary}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.15}" fill="${colors.white}" opacity="0.2"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.1}" fill="${colors.white}"/>
        <path d="M ${size * 0.5} ${size * 0.42} L ${size * 0.5} ${size * 0.48}" stroke="${colors.primary}" stroke-width="${size * 0.015}" stroke-linecap="round"/>
        <ellipse cx="${size / 2}" cy="${size * 0.52}" rx="${size * 0.06}" ry="${size * 0.04}" fill="${colors.primary}"/>
        <text x="50%" y="${size * 0.65}" font-family="Arial, sans-serif" font-size="${size * 0.04}" font-weight="bold" fill="${colors.white}" text-anchor="middle">NutriVision Pro</text>
        <text x="50%" y="${size * 0.70}" font-family="Arial, sans-serif" font-size="${size * 0.025}" fill="${colors.white}" text-anchor="middle" opacity="0.8">AI Food Nutrition Analyzer</text>
      </svg>
    `;
  } else if (type === 'favicon') {
    // Simple favicon
    svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${colors.primary}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.3}" fill="${colors.white}"/>
        <text x="50%" y="${size * 0.7}" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold" fill="${colors.primary}" text-anchor="middle">N</text>
      </svg>
    `;
  }

  return svg;
}

// Function to convert SVG to PNG using sharp (if available)
async function convertSVGtoPNG() {
  try {
    const sharp = require('sharp');
    
    const icons = [
      { name: 'icon.png', size: 1024, type: 'icon' },
      { name: 'adaptive-icon.png', size: 1024, type: 'adaptive' },
      { name: 'splash.png', size: 2048, type: 'splash' },
      { name: 'favicon.png', size: 48, type: 'favicon' },
    ];

    for (const icon of icons) {
      const svg = generateSVG(icon.size, icon.type);
      const svgBuffer = Buffer.from(svg);
      
      await sharp(svgBuffer)
        .resize(icon.size, icon.size)
        .png()
        .toFile(path.join(__dirname, icon.name));
      
      console.log(`✅ Created ${icon.name}`);
    }

    console.log('\n🎉 All placeholder icons generated successfully!');
    console.log('⚠️  These are basic placeholders. Replace with professionally designed icons for production.\n');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n❌ Error: sharp module not found');
      console.log('\n📦 Please install sharp first:');
      console.log('   npm install --save-dev sharp\n');
      console.log('💡 Alternative: Use the manual SVG method below\n');
      
      // Provide manual SVG files
      generateManualSVGs();
    } else {
      console.error('Error generating icons:', error.message);
    }
  }
}

// Generate SVG files that can be manually converted
function generateManualSVGs() {
  console.log('📝 Generating SVG files for manual conversion...\n');
  
  const svgIcons = [
    { name: 'icon.svg', size: 1024, type: 'icon' },
    { name: 'adaptive-icon.svg', size: 1024, type: 'adaptive' },
    { name: 'splash.svg', size: 2048, type: 'splash' },
    { name: 'favicon.svg', size: 48, type: 'favicon' },
  ];

  svgIcons.forEach(icon => {
    const svg = generateSVG(icon.size, icon.type);
    fs.writeFileSync(path.join(__dirname, icon.name), svg);
    console.log(`✅ Created ${icon.name}`);
  });

  console.log('\n📋 Next steps:');
  console.log('1. Open each SVG file in a browser or design tool');
  console.log('2. Export/save as PNG at the required size');
  console.log('3. Or use an online converter: https://svgtopng.com/\n');
}

// Run the script
convertSVGtoPNG();
