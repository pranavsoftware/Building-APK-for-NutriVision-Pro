# Google Authentication Setup Guide

This guide will help you set up Google Sign-In for the NutriVision Pro app.

## Overview

The app now uses **Google Sign-In** with **Expo Authentication** as the primary authentication method. Traditional email/password login and signup have been removed.

**Note:** This implementation uses `expo-auth-session` which is compatible with Expo Go and doesn't require native module linking.

## Prerequisites

- A Google Cloud Console account
- Access to the NutriVision Pro project

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter project name: `NutriVision Pro`
5. Click **"Create"**

## Step 2: Enable Google+ API

1. In your project, go to **APIs & Services > Library**
2. Search for **"Google+ API"**
3. Click on it and click **"Enable"**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services > OAuth consent screen**
2. Select **"External"** user type (unless you have a Google Workspace)
3. Click **"Create"**
4. Fill in the required information:
   - **App name**: NutriVision Pro
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **"Save and Continue"**
6. On the Scopes page, click **"Save and Continue"**
7. On Test users page, add your test email addresses
8. Click **"Save and Continue"**

## Step 4: Create OAuth 2.0 Credentials

### 4.1 Web Client ID (Required for Backend)

1. Go to **APIs & Services > Credentials**
2. Click **"Create Credentials"** > **"OAuth 2.0 Client ID"**
3. Select **"Web application"**
4. Name: `NutriVision Pro Web Client`
5. Add Authorized JavaScript origins:
   - `http://localhost:5000`
   - `https://your-backend-domain.com` (your production backend URL)
6. Add Authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
   - `https://your-backend-domain.com/auth/google/callback`
7. Click **"Create"**
8. **Copy the Client ID** - this is your `GOOGLE_CLIENT_ID` for the backend

### 4.2 Android Client ID

1. Click **"Create Credentials"** > **"OAuth 2.0 Client ID"**
2. Select **"Android"**
3. Name: `NutriVision Pro Android`
4. Package name: `com.nutrivision.pro` (from your app.json)
5. Get SHA-1 certificate fingerprint:
   ```bash
   # For debug build
   cd android
   ./gradlew signingReport
   
   # Or use keytool
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
6. Enter the SHA-1 fingerprint
7. Click **"Create"**
8. **Copy the Client ID** - this is your `ANDROID_CLIENT_ID`

### 4.3 iOS Client ID

1. Click **"Create Credentials"** > **"OAuth 2.0 Client ID"**
2. Select **"iOS"**
3. Name: `NutriVision Pro iOS`
4. Bundle ID: `com.nutrivision.pro` (from your app.json)
5. Click **"Create"**
6. **Copy the Client ID** - this is your `IOS_CLIENT_ID`

### 4.4 Expo Client ID (For Development with Expo Go)

1. Click **"Create Credentials"** > **"OAuth 2.0 Client ID"**
2. Select **"iOS"**
3. Name: `NutriVision Pro Expo`
4. Bundle ID: `host.exp.Exponent`
5. Click **"Create"**
6. **Copy the Client ID** - this is your `EXPO_CLIENT_ID`

**Important:** This is only needed for testing with Expo Go app. For standalone builds, use the regular iOS and Android Client IDs.

## Step 5: Configure Mobile App

### 5.1 Update Google Config File

**IMPORTANT**: This file contains sensitive credentials. Keep it private!

1. Open `mobile-app/src/config/google.config.js`
2. Replace the placeholder values:

```javascript
const GOOGLE_CONFIG = {
  WEB_CLIENT_ID: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  IOS_CLIENT_ID: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  ANDROID_CLIENT_ID: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  EXPO_CLIENT_ID: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com', // Optional
};
```

### 5.2 Security Best Practices

The `google.config.js` file is already added to `.gitignore` to prevent committing credentials.

**For production**, consider using environment variables:
- Use `react-native-config` for bare React Native
- Use `expo-constants` with `app.config.js` for Expo

Example with Expo:
```javascript
// app.config.js
export default {
  extra: {
    googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
  }
}
```

## Step 6: Configure Backend

1. Open `backend/.env` (create from `.env.example` if needed)
2. Add your Web Client ID:

```bash
# Google OAuth (for Google Sign-In)
GOOGLE_CLIENT_ID=YOUR_WEB_CLIENT_ID.apps.googleusercontent.com
```

**IMPORTANT**: Never commit `.env` file to version control!

## Step 7: Testing

### Test on Expo Go (Development)

1. Make sure you have the Expo Go app installed on your device
2. Configure the EXPO_CLIENT_ID in your config
3. Run the app:
   ```bash
   cd mobile-app
   npx expo start
   ```
4. Scan the QR code with Expo Go
5. Test Google Sign-In

### Test on Android

1. Make sure you've added the correct SHA-1 certificate
2. Build and run:
   ```bash
   cd mobile-app
   eas build --platform android --profile preview
   # or
   npx expo run:android
   ```

### Test on iOS

1. Make sure you've added the correct Bundle ID
2. Build and run:
   ```bash
   cd mobile-app
   eas build --platform ios --profile preview
   # or
   npx expo run:ios
   ```

### Common Issues During Testing

**Expo Go:**
- Make sure to use `EXPO_CLIENT_ID` (Bundle ID: `host.exp.Exponent`)
- This is different from your production iOS Client ID

**Standalone Builds:**
- Use `IOS_CLIENT_ID` and `ANDROID_CLIENT_ID`
- Make sure Bundle IDs match your app.json configuration

## Step 8: Production Deployment

### Mobile App

1. Generate release keystore for Android
2. Get SHA-1 from release keystore
3. Create new Android OAuth Client ID with release SHA-1
4. Update `google.config.js` or use environment variables

### Backend

1. Update `.env` on your production server with:
   - Production `GOOGLE_CLIENT_ID`
2. Make sure HTTPS is enabled on your backend
3. Add production domain to Authorized JavaScript origins in Google Console

## Troubleshooting

### "Sign in cancelled" error
- User cancelled the sign-in flow
- This is expected behavior

### "Play Services not available" error
- Device doesn't have Google Play Services (common on emulators)
- Solution: Use a real device or emulator with Google Play Services

### "Invalid token" error on backend
- `GOOGLE_CLIENT_ID` in backend doesn't match the Web Client ID
- Token has expired
- Wrong Client ID configuration

### "Developer Error" in Google Sign-In
- Wrong SHA-1 certificate fingerprint
- Wrong package name in OAuth configuration
- OAuth Client ID not enabled

## Security Notes

### Keep Private

Never commit these files/values to version control:
- `mobile-app/src/config/google.config.js` (already in .gitignore)
- `backend/.env`
- Any file containing actual Client IDs

### Client ID Types

- **Web Client ID**: Used by backend to verify tokens (MUST be kept secret on server)
- **Android/iOS Client IDs**: Used by mobile app to authenticate with Google (public)

### Token Flow

1. User signs in with Google on mobile app
2. Mobile app receives ID token from Google
3. Mobile app sends ID token to your backend
4. Backend verifies token with Google using Web Client ID
5. Backend creates/updates user and returns JWT

## What Changed

### Removed Features
- Traditional login with email/password
- Sign up form with email/password
- OTP verification for new users (Google accounts are pre-verified)
- Password reset flow

### Kept Features
- OTP verification system (can be used for other purposes if needed)
- Email service (welcome emails still sent)
- JWT authentication (still used for API calls)

### New Features
- Google Sign-In button on Welcome screen
- Automatic user creation/login with Google account
- Profile picture from Google account

## Support

For issues:
1. Check Google Cloud Console for API quota limits
2. Verify all Client IDs are correctly configured
3. Check backend logs for token verification errors
4. Ensure all required APIs are enabled in Google Cloud Console

## Additional Resources

- [Google Sign-In for React Native](https://github.com/react-native-google-signin/google-signin)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
