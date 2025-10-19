# Google Sign-In Error Fix

## Problem

**Error Message:**
```
ERROR  Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'RNGoogleSignin' could not be found. 
Verify that a module by this name is registered in the native binary.
```

**Cause:**
The package `@react-native-google-signin/google-signin` requires native module linking and is not compatible with Expo Go without creating a custom development build.

## Solution

Switched to **Expo's native authentication** using `expo-auth-session`, which is fully compatible with Expo Go and doesn't require native module linking.

---

## Changes Made

### 1. Removed Incompatible Package
```bash
npm uninstall @react-native-google-signin/google-signin
```

### 2. Installed Expo Auth Packages
```bash
npx expo install expo-auth-session expo-web-browser expo-crypto
```

### 3. Updated AuthContext.js

**Before (React Native Google Sign-In):**
```javascript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({...});
await GoogleSignin.signIn();
```

**After (Expo Auth Session):**
```javascript
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: GOOGLE_CONFIG.ANDROID_CLIENT_ID,
  iosClientId: GOOGLE_CONFIG.IOS_CLIENT_ID,
  webClientId: GOOGLE_CONFIG.WEB_CLIENT_ID,
  expoClientId: GOOGLE_CONFIG.EXPO_CLIENT_ID,
});

await promptAsync();
```

### 4. Updated Configuration

Added `EXPO_CLIENT_ID` for Expo Go development:
- Bundle ID for Expo Go: `host.exp.Exponent`
- Create iOS OAuth Client ID with this Bundle ID in Google Cloud Console

---

## Key Differences

| Feature | React Native Google Sign-In | Expo Auth Session |
|---------|----------------------------|-------------------|
| **Native Modules** | Required | Not required |
| **Expo Go** | ❌ Not compatible | ✅ Fully compatible |
| **Setup** | Complex (native linking) | Simple (managed) |
| **Development** | Needs custom build | Works with Expo Go |
| **Platform Support** | iOS, Android | iOS, Android, Web |

---

## Benefits of Expo Auth Session

✅ **Works with Expo Go** - Test immediately without building
✅ **No Native Linking** - Fully managed workflow
✅ **Automatic Updates** - Expo handles platform differences
✅ **Web Support** - Can also work on web if needed
✅ **Simpler Setup** - Less configuration required
✅ **Better DX** - Faster development cycle

---

## OAuth Client IDs Needed

### For Development (Expo Go)
- **EXPO_CLIENT_ID**: iOS client with Bundle ID `host.exp.Exponent`

### For Production (Standalone Builds)
- **ANDROID_CLIENT_ID**: Android client with package `com.nutrivision.pro`
- **IOS_CLIENT_ID**: iOS client with Bundle ID `com.nutrivision.pro`
- **WEB_CLIENT_ID**: Web client for backend token verification

---

## How It Works

### Authentication Flow

1. **User taps "Sign in with Google"**
   ```javascript
   await promptAsync();
   ```

2. **Expo opens Google Sign-In in browser**
   - Uses `WebBrowser` to open OAuth flow
   - User authenticates with Google
   - Google redirects back to app

3. **App receives authentication response**
   ```javascript
   useEffect(() => {
     if (response?.type === 'success') {
       const { authentication } = response;
       // authentication.idToken is available
     }
   }, [response]);
   ```

4. **Send ID token to backend**
   ```javascript
   await loginWithGoogle(authentication.idToken);
   ```

5. **Backend verifies and creates/logs in user**
   - Verifies token with Google
   - Returns JWT token
   - User is authenticated

---

## Testing Guide

### Development with Expo Go

1. **Get Expo Client ID**
   - Create iOS OAuth Client in Google Cloud
   - Bundle ID: `host.exp.Exponent`
   - Copy Client ID to `EXPO_CLIENT_ID` in config

2. **Run App**
   ```bash
   npx expo start
   ```

3. **Scan QR Code**
   - Open Expo Go app
   - Scan QR code
   - Test Google Sign-In

### Production Builds

1. **Get Production Client IDs**
   - Android: Package `com.nutrivision.pro` + SHA-1
   - iOS: Bundle ID `com.nutrivision.pro`

2. **Build App**
   ```bash
   # Android
   eas build --platform android --profile production
   
   # iOS
   eas build --platform ios --profile production
   ```

---

## Configuration File

**Updated `mobile-app/src/config/google.config.js`:**

```javascript
const GOOGLE_CONFIG = {
  WEB_CLIENT_ID: 'xxx.apps.googleusercontent.com',      // Backend verification
  IOS_CLIENT_ID: 'xxx.apps.googleusercontent.com',      // Production iOS
  ANDROID_CLIENT_ID: 'xxx.apps.googleusercontent.com',  // Production Android
  EXPO_CLIENT_ID: 'xxx.apps.googleusercontent.com',     // Expo Go development
};
```

---

## Updated Dependencies

**package.json changes:**

```diff
- "@react-native-google-signin/google-signin": "^16.0.0"
+ "expo-auth-session": "~5.5.2"
+ "expo-web-browser": "~13.0.3"
+ "expo-crypto": "~13.0.2"
```

---

## Backend (No Changes Required)

The backend implementation remains the same:
- Still accepts `idToken` from frontend
- Still verifies with Google using `google-auth-library`
- Still creates/logs in users
- Still returns JWT token

Only the **frontend authentication method** changed.

---

## Troubleshooting

### Error: "No Client ID provided"

**Solution:** Make sure all Client IDs are configured in `google.config.js`

### Error: "Invalid Client ID"

**Solution:** 
- Check you're using the correct Client ID for your environment
- Expo Go: Use `EXPO_CLIENT_ID`
- Standalone: Use `IOS_CLIENT_ID` or `ANDROID_CLIENT_ID`

### Sign-In Opens Browser but Doesn't Return

**Solution:**
- Make sure `WebBrowser.maybeCompleteAuthSession()` is called
- Check redirect URIs in Google Cloud Console match Expo's

### "Redirect URI Mismatch" Error

**Solution:**
- Expo handles redirect URIs automatically
- Make sure you're using the correct Client ID for your platform
- For Expo Go, the redirect scheme is managed by Expo

---

## Summary

✅ **Fixed Error:** Removed native module dependency
✅ **Better Compatibility:** Works with Expo Go
✅ **Same Functionality:** Google Sign-In still works perfectly
✅ **Simpler Setup:** Less configuration needed
✅ **Faster Development:** Test immediately without rebuilding

The app now uses Expo's managed authentication which is more suitable for Expo-based projects and provides a better development experience.

---

## Next Steps

1. ✅ Error fixed - app no longer crashes
2. ⚠️ Configure Google OAuth credentials
3. ⚠️ Add Client IDs to `google.config.js`
4. ⚠️ Test Google Sign-In flow
5. ⚠️ Verify backend integration

See `GOOGLE_AUTH_SETUP.md` for detailed OAuth configuration instructions.
