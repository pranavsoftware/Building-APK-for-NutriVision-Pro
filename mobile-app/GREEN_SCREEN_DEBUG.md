# 🐛 Green Screen Issue - Debugging Guide

## Problem
After scanning the QR code, the app shows only a green screen and doesn't proceed to the Welcome screen.

## Root Causes Identified

### 1. **Splash Screen Not Hiding Properly**
The green screen you're seeing is the Expo splash screen (configured in `app.json` with `backgroundColor: "#10B981"`).

### 2. **Possible Issues:**
- SplashScreen.hideAsync() not being called
- Font loading taking too long or hanging
- Navigation not mounting properly
- AsyncStorage permission issues
- SafeAreaProvider not wrapping correctly

## Fixes Applied

### ✅ Fix #1: Added SafeAreaProvider
```javascript
// App.js now wraps everything in SafeAreaProvider
<SafeAreaProvider>
  <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
    <StatusBar style="auto" />
    <RootNavigator />
  </View>
</SafeAreaProvider>
```

### ✅ Fix #2: Added Console Logging
Added comprehensive logging to track app initialization:
- App.js: Font loading progress
- RootNavigator.js: Authentication check progress
- WelcomeScreen.js: Screen rendering

### ✅ Fix #3: Improved Error Handling
App.js now shows error messages if something fails during initialization.

### ✅ Fix #4: Simplified Font Loading
Removed unnecessary delays and simplified the font loading process.

## How to Debug

### Step 1: Check Terminal Logs
After scanning the QR code, watch your terminal for these logs:

```
Expected log sequence:
1. "App: Starting font loading..."
2. "App: Fonts loaded successfully"
3. "App: App is ready"
4. "App: Hiding splash screen"
5. "App: Rendering main app"
6. "RootNavigator: Checking authentication..."
7. "RootNavigator: Getting token from storage..."
8. "RootNavigator: Token exists: false"
9. "RootNavigator: Auth check complete"
10. "RootNavigator: Rendering navigator. Authenticated: false"
11. "WelcomeScreen: Rendering"
```

### Step 2: Check Expo Go App
In Expo Go, shake your device and open the debug menu. Check for any error messages.

### Step 3: Try Remote Debugging
1. In terminal, press `j` to open the debugger
2. Open Chrome DevTools
3. Check Console for errors
4. Check Network tab for failed requests

## Quick Fixes to Try

### Option 1: Restart Everything
```bash
# Stop the current server (Ctrl+C)
cd mobile-app

# Clear all caches
rm -rf node_modules/.cache
rm -rf .expo

# Restart with clear cache
npm start --clear
```

### Option 2: Reload in Expo Go
1. Shake your device
2. Tap "Reload"
3. Or disconnect and scan QR code again

### Option 3: Simplify Splash Screen
If splash screen is the issue, we can disable it temporarily.

## Expected Behavior

1. **Initial state:** Green splash screen appears
2. **After ~1 second:** App.js loads fonts
3. **SplashScreen.hideAsync() called:** Green screen should fade out
4. **WelcomeScreen appears:** Green gradient background with white content

## If Green Screen Persists

### The green you see could be:
1. **Expo splash screen** (solid green, no content)
2. **WelcomeScreen gradient** (green gradient with content)

### To identify which:
- If you see NOTHING except green → Splash screen stuck
- If you see green gradient → WelcomeScreen rendering but content invisible

## Next Steps

1. **Run the app again** after the fixes
2. **Watch terminal logs** - share the output
3. **Shake device** in Expo Go and check for errors
4. **Try debugger** (press 'j' in terminal)

## Alternative: Temporary Splash Screen Disable

If the issue persists, we can temporarily disable the splash screen:

### Edit app.json:
```json
"splash": {
  "image": "./assets/splash.png",
  "resizeMode": "contain",
  "backgroundColor": "#FFFFFF"  // Changed from #10B981
}
```

This will change splash to white so you can see if content loads behind it.

## Common Issues & Solutions

### Issue: "App stays on green screen forever"
**Solution:** Splash screen isn't hiding. Check if SplashScreen.hideAsync() throws an error.

### Issue: "App flickers then goes back to green"
**Solution:** Navigation crash. Check RootNavigator logs for errors.

### Issue: "Terminal shows no logs after QR scan"
**Solution:** App isn't loading at all. Check Expo Go is up to date.

### Issue: "Shows green then crashes"
**Solution:** Check for JavaScript errors in logs.

## Files Modified

1. ✅ `App.js` - Added SafeAreaProvider, console logs, error handling
2. ✅ `RootNavigator.js` - Added console logs
3. ✅ `WelcomeScreen.js` - Added console log

## Test Commands

```bash
# Restart development server
npm start

# Clear cache and restart
npm start -- --reset-cache

# Run on Android
npm run android

# Run on iOS
npm run ios

# Open debugger
# Press 'j' in terminal when server is running
```

## What to Share for Further Help

If the issue persists, please share:

1. **Terminal output** after scanning QR code
2. **Expo Go version** (check in app)
3. **Phone OS version** (Android/iOS version)
4. **Any error messages** in Expo Go debug menu
5. **Screenshot** of what you see

---

**Current Status:** Fixes applied, ready for testing
**Action Required:** Scan QR code again and observe terminal logs
