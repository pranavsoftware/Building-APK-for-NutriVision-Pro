# 🚀 Production Deployment Guide - NutriVision Pro

## ✅ Completed Setup

### Backend Configuration (Render)
- **URL**: https://nutrivision-backend-pj1s.onrender.com
- **Status**: ✅ Deployed and running
- **Legal Routes**: ✅ Added for Google OAuth compliance
  - Privacy Policy: `/privacy-policy`
  - Terms of Service: `/terms-of-service`

### Mobile App
- **Platform**: React Native with Expo 51.0.39
- **Package**: com.nutrivision.mobile
- **Authentication**: Google OAuth 2.0 only

---

## 🔐 Google Cloud Console Setup

### Step 1: OAuth Consent Screen Configuration

Navigate to: https://console.cloud.google.com/apis/credentials/consent

#### **App Information**
- **App name**: NutriVision Pro
- **User support email**: cabshare2027@gmail.com
- **App logo**: (Optional - upload your app icon)

#### **App domain**
- **Application home page**: https://nutrivision-backend-pj1s.onrender.com
- **Application privacy policy link**: https://nutrivision-backend-pj1s.onrender.com/privacy-policy ✅
- **Application terms of service link**: https://nutrivision-backend-pj1s.onrender.com/terms-of-service ✅

#### **Developer contact information**
- **Email addresses**: 
  - cabshare2027@gmail.com
  - raybanpranav@gmail.com

#### **Scopes**
Add the following scopes:
1. `openid`
2. `https://www.googleapis.com/auth/userinfo.email`
3. `https://www.googleapis.com/auth/userinfo.profile`

---

### Step 2: OAuth Client ID Configuration

#### **Authorized JavaScript origins**
Add these URLs:
```
https://nutrivision-backend-pj1s.onrender.com
https://auth.expo.io
```

#### **Authorized redirect URIs**
Add these redirect URIs:
```
https://auth.expo.io/@your-expo-username/nutrivision-mobile
```

**Note**: Replace `your-expo-username` with your actual Expo username. To find it:
```bash
cd mobile-app
npx expo whoami
```

---

### Step 3: Add Test Users (During Development)

While in "Testing" mode, add these test users:
1. cabshare2027@gmail.com
2. raybanpranav@gmail.com

**Important**: Only these users can sign in while the app is in testing mode!

---

### Step 4: Publishing to Production

Once testing is complete, go to OAuth consent screen and click:
- **"Publish App"** button
- Review and confirm the publishing process

**After Publishing**:
- Any Google user can sign in
- App will require verification if requesting sensitive scopes
- Privacy policy and terms of service links must remain accessible

---

## 🔧 Environment Variables Checklist

### Backend (.env on Render)
Verify these environment variables are set:
```bash
✅ MONGODB_URI=mongodb+srv://...
✅ JWT_SECRET=your-jwt-secret
✅ GOOGLE_CLIENT_ID=675034554733-m4c35fu6grnccc8rsefhd1vj3gb1v734.apps.googleusercontent.com
✅ GEMINI_API_KEY=your-gemini-key
✅ NODE_ENV=production
✅ PORT=5000
```

### Mobile App (.env)
```bash
✅ EXPO_PUBLIC_API_URL=https://nutrivision-backend-pj1s.onrender.com/api
```

---

## 🧪 Testing Checklist

### 1. Test Legal Routes
Visit these URLs and verify they return proper HTML pages:
- ✅ https://nutrivision-backend-pj1s.onrender.com/privacy-policy
- ✅ https://nutrivision-backend-pj1s.onrender.com/terms-of-service

### 2. Test Health Check
```bash
curl https://nutrivision-backend-pj1s.onrender.com/health
```
Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "environment": "production"
}
```

### 3. Test Google OAuth Endpoint
```bash
curl -X POST https://nutrivision-backend-pj1s.onrender.com/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken":"test-token"}'
```
Expected: 400 error with "Invalid Google token" (this is correct - means endpoint is working)

### 4. Test Mobile App Sign-In
1. Open mobile app: `npx expo start`
2. Click "Sign in with Google"
3. Complete Google authentication flow
4. Verify user is logged in and redirected to Dashboard

---

## 📱 Mobile App Deployment

### Expo EAS Build (Recommended)

#### Install EAS CLI
```bash
npm install -g eas-cli
```

#### Login to Expo
```bash
eas login
```

#### Configure EAS Build
```bash
cd mobile-app
eas build:configure
```

#### Create Production Build

**For Android APK**:
```bash
eas build -p android --profile production
```

**For iOS**:
```bash
eas build -p ios --profile production
```

#### Submit to App Stores

**Google Play Store**:
```bash
eas submit -p android
```

**Apple App Store**:
```bash
eas submit -p ios
```

---

## 🔍 Troubleshooting

### Issue: "Access blocked: Authorization Error"
**Solution**: Make sure you've added your email as a test user in Google Cloud Console

### Issue: "redirect_uri_mismatch"
**Solution**: 
1. Check your Expo username: `npx expo whoami`
2. Add the correct redirect URI: `https://auth.expo.io/@your-username/nutrivision-mobile`
3. Wait 5 minutes for Google changes to propagate

### Issue: Legal routes return 404
**Solution**: 
1. Verify legal.routes.js exists in backend/src/routes/
2. Check server.js mounts legal routes: `app.use('/', legalRoutes);`
3. Restart Render deployment

### Issue: Backend .env not loaded
**Solution**: 
1. Go to Render Dashboard > Your Service > Environment
2. Verify all environment variables are set
3. Trigger manual deploy if needed

---

## 📋 Pre-Launch Checklist

- [ ] Google OAuth consent screen configured with legal links
- [ ] Test users added (cabshare2027@gmail.com, raybanpranav@gmail.com)
- [ ] Privacy policy accessible at `/privacy-policy`
- [ ] Terms of service accessible at `/terms-of-service`
- [ ] Backend environment variables verified on Render
- [ ] Mobile app .env has correct API URL
- [ ] Test Google Sign-In with both test user accounts
- [ ] Verify user data saves to MongoDB Atlas
- [ ] Test food scanning functionality
- [ ] Test user profile and history screens
- [ ] App tested on both iOS and Android (Expo Go)
- [ ] Backend logs show no errors
- [ ] CORS configured to accept requests from mobile app
- [ ] Database connection stable and secured
- [ ] JWT token generation and validation working

---

## 🎯 Production Publishing Steps

### 1. Verify Backend is Stable
```bash
# Monitor Render logs for any errors
# Check uptime and response times
```

### 2. Publish OAuth Consent Screen
- Go to Google Cloud Console > OAuth consent screen
- Click "Publish App"
- Wait for verification (if required)

### 3. Build Mobile App for Production
```bash
cd mobile-app
eas build -p android --profile production
eas build -p ios --profile production
```

### 4. Test Production Build
- Download and install production APK/IPA
- Test all features thoroughly
- Verify Google Sign-In works in standalone app

### 5. Submit to App Stores
- Prepare store listings (screenshots, descriptions)
- Submit to Google Play Store
- Submit to Apple App Store
- Wait for review and approval

---

## 🔒 Security Best Practices

### Backend
- ✅ JWT tokens for authentication
- ✅ Password hashing with bcryptjs
- ✅ Environment variables for secrets
- ✅ CORS configured properly
- ✅ Security headers set (X-Frame-Options, etc.)
- ✅ Request validation middleware
- ✅ Rate limiting (consider adding express-rate-limit)

### Mobile App
- ✅ Secure storage for auth tokens
- ✅ HTTPS only for API calls
- ✅ Google Client ID in gitignored config
- ✅ No hardcoded secrets in code

---

## 📞 Support Contacts

- **Primary**: cabshare2027@gmail.com
- **Secondary**: raybanpranav@gmail.com

---

## 🎉 Deployment Status

**Backend**: ✅ Ready for production  
**Mobile App**: ✅ Ready for testing  
**Google OAuth**: ⏳ Awaiting consent screen configuration  
**Legal Pages**: ✅ Deployed and accessible  

---

**Last Updated**: January 2025  
**Version**: 1.0.0
