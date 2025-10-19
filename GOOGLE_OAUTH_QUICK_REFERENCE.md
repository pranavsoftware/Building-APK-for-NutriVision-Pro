# 🔐 Google OAuth Configuration - Quick Reference

## URLs for Legal Pages (Copy-Paste Ready)

### Privacy Policy
```
https://nutrivision-backend-pj1s.onrender.com/privacy-policy
```

### Terms of Service
```
https://nutrivision-backend-pj1s.onrender.com/terms-of-service
```

---

## OAuth Consent Screen Fields

### App Information Section

| Field | Value |
|-------|-------|
| **App name** | NutriVision Pro |
| **User support email** | cabshare2027@gmail.com |
| **App logo** | (Optional - upload your icon) |

### App Domain Section

| Field | Value |
|-------|-------|
| **Application home page** | https://nutrivision-backend-pj1s.onrender.com |
| **Application privacy policy link** | https://nutrivision-backend-pj1s.onrender.com/privacy-policy |
| **Application terms of service link** | https://nutrivision-backend-pj1s.onrender.com/terms-of-service |

### Developer Contact Information

| Field | Value |
|-------|-------|
| **Email addresses** | cabshare2027@gmail.com<br>raybanpranav@gmail.com |

---

## Scopes to Add

Add these three scopes exactly as shown:

1. **openid**
2. **https://www.googleapis.com/auth/userinfo.email**
3. **https://www.googleapis.com/auth/userinfo.profile**

---

## OAuth Client ID Configuration

### Authorized JavaScript Origins
```
https://nutrivision-backend-pj1s.onrender.com
https://auth.expo.io
```

### Authorized Redirect URIs

**Format**: `https://auth.expo.io/@YOUR_EXPO_USERNAME/nutrivision-mobile`

**To find your Expo username**:
```bash
cd mobile-app
npx expo whoami
```

**Example**: If your username is `johndoe`, use:
```
https://auth.expo.io/@johndoe/nutrivision-mobile
```

---

## Test Users (Add During Testing Phase)

1. **cabshare2027@gmail.com**
2. **raybanpranav@gmail.com**

**Important**: While in "Testing" mode, ONLY these users can sign in!

---

## Configuration Steps Summary

1. ✅ Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials/consent)
2. ✅ Select your project (or create one)
3. ✅ Configure OAuth consent screen
   - Fill in app information
   - Add app domain URLs (copy from above)
   - Add developer contact emails
4. ✅ Add scopes (3 scopes listed above)
5. ✅ Add test users (2 emails listed above)
6. ✅ Save and continue
7. ✅ Go to Credentials > Create Credentials > OAuth Client ID
   - Application type: Web application
   - Add authorized JavaScript origins (2 URLs)
   - Add authorized redirect URIs (Expo URL)
8. ✅ Copy the Client ID (already in your config: 675034554733-m4c35fu6grnccc8rsefhd1vj3gb1v734.apps.googleusercontent.com)
9. ✅ Save

---

## Verification Checklist

After configuration, verify:

- [ ] Privacy policy page loads: https://nutrivision-backend-pj1s.onrender.com/privacy-policy
- [ ] Terms of service page loads: https://nutrivision-backend-pj1s.onrender.com/terms-of-service
- [ ] Test users added: cabshare2027@gmail.com, raybanpranav@gmail.com
- [ ] Scopes added: openid, userinfo.email, userinfo.profile
- [ ] Authorized origins include: https://auth.expo.io
- [ ] Redirect URI matches your Expo username

---

## Common Errors and Fixes

### Error: "redirect_uri_mismatch"
❌ **Cause**: Redirect URI doesn't match what's configured in Google Cloud Console  
✅ **Fix**: 
1. Check your Expo username: `npx expo whoami`
2. Update redirect URI to: `https://auth.expo.io/@your-username/nutrivision-mobile`
3. Wait 5 minutes for changes to propagate

### Error: "Access blocked: This app's request is invalid"
❌ **Cause**: OAuth consent screen not properly configured  
✅ **Fix**: 
1. Verify privacy policy and terms links are accessible
2. Make sure all required fields are filled
3. Check scopes are added correctly

### Error: "Access blocked: Authorization Error"
❌ **Cause**: User email not added as test user  
✅ **Fix**: 
1. Go to OAuth consent screen > Test users
2. Add user's email address
3. Save changes

### Error: "invalid_client"
❌ **Cause**: Incorrect or mismatched Client ID  
✅ **Fix**: 
1. Verify Client ID in mobile-app/src/config/google.config.js
2. Should match: 675034554733-m4c35fu6grnccc8rsefhd1vj3gb1v734.apps.googleusercontent.com
3. Restart Expo development server

---

## Publishing to Production

When ready to move from "Testing" to "Production":

1. Go to OAuth consent screen
2. Click **"Publish App"** button
3. Review submission requirements
4. Submit for verification (if required for your scopes)
5. Once approved, any Google user can sign in

**Timeline**: 
- Internal (Testing): Immediate
- External (Production): 1-2 weeks for verification (if required)

---

## Contact Support

If you encounter issues:
- **Primary**: cabshare2027@gmail.com
- **Secondary**: raybanpranav@gmail.com

---

**Last Updated**: January 2025  
**Version**: 1.0.0
