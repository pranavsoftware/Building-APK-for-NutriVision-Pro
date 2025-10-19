# Assets Directory

## Required Assets

To properly build this app, you need the following image assets:

### 1. icon.png
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Purpose**: App icon for stores and home screen
- **Design**: Should feature the NutriVision Pro logo with green theme

### 2. splash.png
- **Size**: 1284x2778 pixels (iPhone 14 Pro Max resolution)
- **Format**: PNG
- **Purpose**: Loading screen shown when app launches
- **Design**: NutriVision Pro branding on #10B981 (green) background

### 3. adaptive-icon.png
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Purpose**: Android adaptive icon foreground
- **Design**: Logo should fit within safe zone (middle 66%)

### 4. favicon.png
- **Size**: 48x48 pixels
- **Format**: PNG
- **Purpose**: Web favicon (if deploying to web)

## Quick Solution: Generate Placeholder Icons

You can quickly generate placeholder icons using one of these methods:

### Option 1: Using Online Icon Generator
1. Visit https://www.appicon.co/ or https://makeappicon.com/
2. Upload a simple logo (can be created with Canva/Figma)
3. Download the generated icons
4. Place them in this `assets` folder

### Option 2: Using Expo's Icon Generator
1. Create a simple 1024x1024 PNG with your logo
2. Name it `icon.png` and place in this folder
3. Run: `npx expo prebuild --clean`
4. Expo will auto-generate all required variants

### Option 3: Use Figma/Canva Template
1. Use NutriVision green color: #10B981
2. Add a food/nutrition icon (e.g., apple, fork+knife)
3. Add "NutriVision Pro" text
4. Export at required sizes

## Temporary Solution (Development Only)

For now, to run the app in development, you can:

1. Use the provided placeholder script (see below)
2. Or temporarily remove icon references from app.json
3. This allows testing without real icons

## Current Status

✅ Assets folder created
⚠️ Placeholder icons needed for builds
🎨 Design icons with green theme (#10B981)
