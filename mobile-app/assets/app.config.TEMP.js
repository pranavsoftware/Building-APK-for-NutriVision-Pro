/**
 * QUICK FIX: Temporary App Config Without Icons
 * 
 * This is a temporary app.config.js that removes icon dependencies
 * so you can run the app immediately while you generate proper icons.
 * 
 * TO USE THIS:
 * 1. Rename app.json to app.json.backup
 * 2. Rename this file to app.config.js
 * 3. Run: expo start --clear
 * 
 * This allows development without icons, but you'll need real icons for builds.
 */

export default {
  expo: {
    name: 'NutriVision Pro',
    slug: 'nutrivision-pro',
    version: '1.0.0',
    orientation: 'portrait',
    // icon: './assets/icon.png', // Commented out temporarily
    userInterfaceStyle: 'light',
    splash: {
      // image: './assets/splash.png', // Commented out temporarily
      resizeMode: 'contain',
      backgroundColor: '#10B981',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.nutrivision.pro',
    },
    android: {
      // Removed adaptive icon temporarily
      package: 'com.nutrivision.pro',
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
      ],
    },
    web: {
      // favicon: './assets/favicon.png', // Commented out temporarily
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you analyze food nutrition.',
          cameraPermission:
            'The app accesses your camera to let you take pictures of food.',
        },
      ],
    ],
  },
};
