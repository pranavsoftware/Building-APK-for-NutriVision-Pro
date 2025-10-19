# Google Authentication - Quick Reference

## Configuration Files

### Mobile App
```
mobile-app/src/config/google.config.js  # Google OAuth credentials (PRIVATE)
mobile-app/src/context/AuthContext.js   # Google Sign-In logic
mobile-app/src/screens/auth/WelcomeScreen.js  # Sign-in UI
mobile-app/src/services/auth.service.js  # API calls
```

### Backend
```
backend/.env  # GOOGLE_CLIENT_ID (PRIVATE)
backend/src/controllers/auth.controller.js  # Google auth logic
backend/src/routes/auth.routes.js  # POST /api/auth/google
backend/src/models/User.js  # googleId field
```

## Environment Variables

### Mobile App (`mobile-app/src/config/google.config.js`)
```javascript
WEB_CLIENT_ID: 'xxxxx.apps.googleusercontent.com'
IOS_CLIENT_ID: 'xxxxx.apps.googleusercontent.com'
ANDROID_CLIENT_ID: 'xxxxx.apps.googleusercontent.com'
```

### Backend (`backend/.env`)
```bash
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com  # Web Client ID
```

## API Endpoint

### POST /api/auth/google
**Request:**
```json
{
  "idToken": "google-id-token-from-mobile-app"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "User Name",
      "email": "user@example.com",
      "profilePicture": "https://...",
      "totalScans": 0
    }
  },
  "message": "Login successful"
}
```

## Getting Started (First Time Setup)

1. **Get Google OAuth Credentials:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 Client IDs (Web, Android, iOS)
   - See `GOOGLE_AUTH_SETUP.md` for detailed steps

2. **Configure Mobile App:**
   ```bash
   cd mobile-app
   # Edit src/config/google.config.js with your credentials
   npm install  # Dependencies already installed
   ```

3. **Configure Backend:**
   ```bash
   cd backend
   # Edit .env file, add GOOGLE_CLIENT_ID
   npm install  # google-auth-library already installed
   npm start
   ```

4. **Test:**
   ```bash
   cd mobile-app
   npm start
   # Tap "Sign in with Google" button
   ```

## User Model Changes

### New Field
- `googleId`: Unique Google user ID (optional, for Google sign-in users)

### Modified Field
- `password`: Now optional (not required for Google sign-in users)

## Removed Files/Features

- ❌ `LoginScreen.js` - Removed
- ❌ `SignUpScreen.js` - Removed  
- ❌ Traditional email/password authentication flow
- ✅ OTP system still exists (for future use if needed)

## Common Commands

```bash
# Mobile App
cd mobile-app
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS

# Backend
cd backend
npm start          # Start production server
npm run dev        # Start with nodemon (development)
```

## Security Checklist

- [ ] `google.config.js` is in `.gitignore`
- [ ] Backend `.env` is in `.gitignore`
- [ ] All 3 Client IDs configured in mobile app
- [ ] `GOOGLE_CLIENT_ID` set in backend `.env`
- [ ] OAuth consent screen configured in Google Cloud
- [ ] Correct SHA-1 fingerprint for Android
- [ ] Correct Bundle ID for iOS
- [ ] HTTPS enabled on production backend

## Testing Checklist

- [ ] Can open Welcome screen
- [ ] Google Sign-In button appears
- [ ] Tapping button opens Google sign-in
- [ ] Can select Google account
- [ ] User is created/logged in on backend
- [ ] Redirected to Dashboard after sign-in
- [ ] Profile picture loaded from Google account
- [ ] Sign out works correctly

## Need Help?

See detailed setup instructions in `GOOGLE_AUTH_SETUP.md`
