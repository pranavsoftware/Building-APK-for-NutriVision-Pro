# 🚀 NutriVision Pro - Complete Setup Guide

This guide will walk you through setting up the complete NutriVision Pro application from scratch.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js v14+ installed ([Download](https://nodejs.org/))
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas))
- [ ] Google Gemini API key ([Get key](https://makersuite.google.com/app/apikey))
- [ ] Gmail account with 2FA enabled
- [ ] Expo CLI: Run `npm install -g expo-cli`
- [ ] Android Studio (for Android) or Xcode (for iOS, Mac only)

## 🔧 Step-by-Step Setup

### Part 1: Backend Setup (15 minutes)

#### 1.1 Navigate to Backend Directory
```bash
cd backend
```

#### 1.2 Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- nodemailer
- @google/generative-ai
- cors
- dotenv
- express-validator
- multer

#### 1.3 Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `nutriVisionDB`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nutriVisionDB?retryWrites=true&w=majority
```

#### 1.4 Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

#### 1.5 Setup Gmail App Password

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account](https://myaccount.google.com/)
3. Security → 2-Step Verification → App Passwords
4. Select "Mail" and "Other (Custom name)"
5. Name it "NutriVision"
6. Copy the 16-character password (remove spaces)

#### 1.6 Create .env File

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nutriVisionDB?retryWrites=true&w=majority

# JWT
JWT_SECRET=nutrivision_super_secret_key_2025_production_change_this
JWT_EXPIRE=7d

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
EMAIL_FROM=NutriVision Pro <noreply@nutrivision.com>

# OTP Configuration
OTP_EXPIRY=10
OTP_LENGTH=6

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/webp
```

#### 1.7 Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
✅ Email server is ready to send messages
🥗 NutriVision Pro API Server running on port: 5000
```

#### 1.8 Test Backend

Open browser and go to:
```
http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "NutriVision API is running",
  "timestamp": "2025-..."
}
```

✅ **Backend is now running!**

---

### Part 2: Mobile App Setup (10 minutes)

#### 2.1 Open New Terminal

Keep the backend terminal running and open a new terminal window.

#### 2.2 Navigate to Mobile App Directory
```bash
cd mobile-app
```

#### 2.3 Install Dependencies
```bash
npm install
```

This will install:
- expo
- react-native
- @react-navigation/native
- @react-navigation/stack
- @react-navigation/bottom-tabs
- axios
- @react-native-async-storage/async-storage
- expo-image-picker
- expo-linear-gradient
- formik
- yup
- @expo/vector-icons

#### 2.4 Create .env File

```bash
cp .env.example .env
```

Edit `.env` based on your platform:

**For Android Emulator:**
```env
API_BASE_URL=http://10.0.2.2:5000/api
```

**For iOS Simulator:**
```env
API_BASE_URL=http://localhost:5000/api
```

**For Physical Device:**
First, find your computer's local IP:

Windows:
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

Mac/Linux:
```bash
ifconfig
```
Look for "inet" (e.g., 192.168.1.100)

Then set:
```env
API_BASE_URL=http://192.168.1.100:5000/api
```

#### 2.5 Start Expo

```bash
npm start
```

or

```bash
expo start
```

#### 2.6 Run on Device/Emulator

**Option 1: Android Emulator**
- Open Android Studio
- Start an AVD (Android Virtual Device)
- Press `a` in the Expo terminal

or

```bash
npm run android
```

**Option 2: iOS Simulator (Mac only)**
- Press `i` in the Expo terminal

or

```bash
npm run ios
```

**Option 3: Physical Device**
- Install "Expo Go" from App Store or Play Store
- Scan the QR code shown in terminal
- Make sure phone and computer are on same WiFi

✅ **Mobile app is now running!**

---

## 🧪 Testing the Complete Flow

### 1. Sign Up Flow

1. Open app → See Welcome screen
2. Tap "Get Started"
3. Fill in:
   - Name: Test User
   - Email: your.email@gmail.com (use real email for OTP)
   - Password: Test1234 (must have uppercase, lowercase, number)
   - Confirm Password: Test1234
4. Tap "Create Account"
5. Check your email for 6-digit OTP
6. Enter OTP in app
7. Should see "Account verified successfully!"
8. Automatically logged in → Dashboard

### 2. Food Scanning Flow

1. Tap "Scanner" tab
2. Tap "Take Photo" or "Choose from Gallery"
3. Grant camera/gallery permissions
4. Take/select a food photo (try: apple, banana, pizza)
5. Tap "Analyze Food"
6. Wait for AI analysis (10-30 seconds)
7. View detailed results:
   - Food name
   - Calories
   - Macronutrients
   - Vitamins & minerals
   - Health benefits
   - Allergens
   - Dietary info

### 3. View History

1. Tap "History" tab
2. See all scanned foods
3. Tap any item to view details
4. Swipe left to delete (optional)

### 4. Profile Management

1. Tap "Profile" tab
2. View user stats
3. Tap profile picture to change
4. View menu options
5. Test logout

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: MongoDB connection failed**
```
Solution:
1. Check MongoDB URI is correct
2. Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
3. Verify database user has read/write permissions
```

**Problem: Email not sending**
```
Solution:
1. Verify Gmail app password is correct (16 chars, no spaces)
2. Check EMAIL_USER is correct
3. Enable "Less secure app access" if needed
4. Check spam folder
```

**Problem: Gemini API error**
```
Solution:
1. Verify API key is valid
2. Check you have Gemini API enabled
3. Ensure you're not exceeding rate limits
```

### Mobile App Issues

**Problem: Cannot connect to API**
```
Solution:
1. Check backend is running (http://localhost:5000/health)
2. Verify API_BASE_URL in mobile .env
3. For Android emulator: Use 10.0.2.2
4. For iOS simulator: Use localhost
5. For physical device: Use local IP and ensure same WiFi
6. Check firewall isn't blocking port 5000
```

**Problem: App won't start**
```
Solution:
1. Clear cache: expo start -c
2. Delete node_modules: rm -rf node_modules && npm install
3. Check for syntax errors in console
```

**Problem: Camera/Gallery not working**
```
Solution:
1. Check permissions in device settings
2. Restart app after granting permissions
3. For iOS simulator: Use simulator menu to select photos
```

---

## 📱 Platform-Specific Notes

### Android Development

**Emulator Setup:**
1. Open Android Studio
2. Tools → AVD Manager
3. Create Virtual Device
4. Choose Pixel 4 or similar
5. Download system image (API 30+)
6. Start emulator

**Physical Device:**
1. Enable Developer Mode on Android
2. Enable USB Debugging
3. Connect via USB
4. Run: `adb devices` to verify
5. Run: `npm run android`

### iOS Development (Mac Only)

**Simulator Setup:**
1. Install Xcode from App Store
2. Open Xcode → Preferences → Components
3. Download desired iOS simulator
4. Run: `npm run ios`

**Physical Device:**
1. Requires Apple Developer account ($99/year)
2. Configure signing in Xcode
3. Trust developer certificate on device

---

## 🎨 Customization

### Change App Colors

Edit `mobile-app/src/styles/colors.js`:
```javascript
export default {
  primary: '#10B981',  // Change to your brand color
  secondary: '#3B82F6',
  accent: '#F59E0B',
  // ...
};
```

### Change App Name

Edit `mobile-app/app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    // ...
  }
}
```

### Add App Icon

1. Create 1024x1024 PNG icon
2. Save as `mobile-app/assets/icon.png`
3. Run: `expo start` (will auto-generate sizes)

---

## 🚀 Next Steps

Now that everything is working:

1. ✅ Customize branding (colors, logo, name)
2. ✅ Add more features as needed
3. ✅ Test thoroughly on multiple devices
4. ✅ Set up production MongoDB cluster
5. ✅ Deploy backend to Heroku/Railway/Render
6. ✅ Build mobile app: `expo build:android` / `expo build:ios`
7. ✅ Submit to App Store and Play Store

---

## 📚 Additional Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js Docs](https://expressjs.com/)
- [Google Gemini AI](https://ai.google.dev/)

---

## 💡 Tips for Success

1. **Always check the console** - Errors are usually clearly explained
2. **Read error messages carefully** - They often contain the solution
3. **Test incrementally** - Don't add too many features at once
4. **Keep dependencies updated** - Run `npm update` regularly
5. **Use version control** - Commit changes frequently
6. **Ask for help** - Developer communities are very helpful

---

## ✅ Setup Complete!

Congratulations! You now have a fully functional AI-powered food nutrition analyzer app! 🎉

**What you've built:**
- ✅ Production-ready backend API
- ✅ Beautiful mobile app for iOS & Android
- ✅ AI-powered food analysis
- ✅ User authentication with OTP
- ✅ Secure data storage
- ✅ Complete CRUD operations
- ✅ Professional UI/UX

**Happy Coding! 🚀**

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide again
2. Review error messages
3. Check the README files
4. Search for similar issues online
5. Ask in developer communities

**Made with ❤️ for developers by developers**
