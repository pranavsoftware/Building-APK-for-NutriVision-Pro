# NutriVision Pro

## 🥗 AI-Powered Food Nutrition Analyzer

A production-ready cross-platform mobile application that uses Google Gemini AI to analyze food images and provide detailed nutritional information.

## 📱 Project Overview

NutriVision Pro consists of two main components:
1. **Backend API** (Node.js + Express + MongoDB)
2. **Mobile App** (React Native + Expo)

## ✨ Key Features

### Authentication & Security
- ✅ Email/Password authentication
- ✅ OTP verification via email
- ✅ Password reset functionality
- ✅ JWT token-based security
- ✅ Bcrypt password hashing

### AI Food Analysis
- ✅ Camera & gallery image upload
- ✅ Google Gemini AI integration
- ✅ Comprehensive nutritional data
- ✅ Health benefits analysis
- ✅ Allergen detection
- ✅ Dietary classifications

### User Experience
- ✅ Modern, intuitive UI/UX
- ✅ Smooth animations
- ✅ Real-time feedback
- ✅ Pull-to-refresh
- ✅ Image preview
- ✅ Scan history management

### Profile & Stats
- ✅ Profile picture upload
- ✅ User statistics
- ✅ Total scans tracking
- ✅ Favorite categories

## 🚀 Quick Start

### Prerequisites

- Node.js v14+
- MongoDB Atlas account or local MongoDB
- Google Gemini API key
- Gmail account (for email OTP)
- Expo CLI

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Mobile App Setup

```bash
cd mobile-app
npm install
cp .env.example .env
# Edit .env with API URL
npm start
```

## 📋 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

### Mobile App (.env)
```env
# Android Emulator
API_BASE_URL=http://10.0.2.2:5000/api

# iOS Simulator
API_BASE_URL=http://localhost:5000/api

# Physical Device
API_BASE_URL=http://YOUR_LOCAL_IP:5000/api
```

## 🔑 Getting API Keys

### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into `.env`

### Gmail App Password
1. Enable 2-factor authentication on Gmail
2. Go to Google Account > Security > App Passwords
3. Generate new app password
4. Copy and paste into `.env`

### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Replace credentials in connection string

## 📱 Running the App

### Android Emulator
```bash
cd mobile-app
npm run android
```

### iOS Simulator (Mac only)
```bash
cd mobile-app
npm run ios
```

### Physical Device
```bash
cd mobile-app
npm start
# Scan QR code with Expo Go app
```

## 🏗️ Architecture

### Backend Structure
```
backend/
├── src/
│   ├── config/          # Database, email, AI config
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, upload
│   ├── services/        # Email, OTP, Gemini
│   └── utils/           # Helper functions
```

### Mobile App Structure
```
mobile-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens
│   ├── navigation/      # Navigation setup
│   ├── services/        # API calls
│   ├── utils/           # Helpers, validators
│   └── styles/          # Theme, colors, typography
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/resend-otp` - Resend OTP

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get user statistics

### Scanner
- `POST /api/scanner/analyze` - Analyze food image
- `GET /api/scanner/history` - Get scan history
- `GET /api/scanner/analysis/:id` - Get analysis by ID
- `DELETE /api/scanner/analysis/:id` - Delete analysis
- `GET /api/scanner/search` - Search history

## 🎨 Design System

### Color Palette
- **Primary Green**: #10B981 - Health & nutrition theme
- **Secondary Blue**: #3B82F6 - Trust & reliability
- **Accent Orange**: #F59E0B - Energy & action
- **Error Red**: #EF4444 - Warnings & errors
- **Success Green**: #10B981 - Positive feedback

### Typography
- **Headings**: System/Roboto Bold (32-16px)
- **Body**: System/Roboto Regular (16-14px)
- **Captions**: System/Roboto Regular (12-10px)

## 🧪 Testing

### Test User Flow
1. Open app → See Welcome screen
2. Sign up with email
3. Verify OTP from email
4. Navigate to Scanner
5. Take/upload food photo
6. View AI analysis results
7. Check History tab
8. Update profile picture

## 🐛 Common Issues & Solutions

### Issue: Cannot connect to backend
**Solution**: 
- Check API_BASE_URL in mobile app `.env`
- Use correct IP for Android emulator: `10.0.2.2`
- Ensure backend is running

### Issue: OTP not received
**Solution**:
- Check Gmail app password is correct
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASSWORD in backend `.env`

### Issue: AI analysis fails
**Solution**:
- Verify Gemini API key is valid
- Check image file size (max 10MB)
- Ensure proper image format (JPEG, PNG)

### Issue: App crashes
**Solution**:
- Clear Expo cache: `expo start -c`
- Delete node_modules and reinstall
- Check console for errors

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String (base64),
  isVerified: Boolean,
  totalScans: Number,
  createdAt: Date
}
```

### FoodAnalysis
```javascript
{
  userId: ObjectId,
  foodName: String,
  category: String,
  imageBase64: String,
  caloriesPer100g: Number,
  nutritionalInfo: Object,
  healthBenefits: Array,
  allergens: Array,
  dietaryInfo: Object,
  scannedAt: Date
}
```

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Create new app
2. Set environment variables
3. Connect GitHub repo
4. Deploy

### Mobile App (Expo)
```bash
expo build:android  # For Android
expo build:ios      # For iOS
```

## 🔒 Security Best Practices

- ✅ Environment variables for secrets
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Input validation
- ✅ CORS configuration
- ✅ Rate limiting (recommended for production)
- ✅ HTTPS (required for production)

## 📈 Performance Optimization

- ✅ Image compression
- ✅ Lazy loading
- ✅ Pagination for history
- ✅ AsyncStorage caching
- ✅ Optimized re-renders

## 🎯 Production Checklist

- [ ] Update API URLs to production
- [ ] Enable HTTPS
- [ ] Set up MongoDB backups
- [ ] Configure rate limiting
- [ ] Set up error logging (Sentry)
- [ ] Add analytics (Firebase)
- [ ] Test on multiple devices
- [ ] Submit to App Store/Play Store

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact: support@nutrivision.com

## 🙏 Acknowledgments

- Google Gemini AI for food analysis
- MongoDB for database
- Expo for React Native development
- Nodemailer for email service

---

**Made with ❤️ by NutriVision Team**

## 🎉 You're All Set!

Your NutriVision Pro app is ready to use. Start scanning food and discovering nutrition information!

### Next Steps:
1. ✅ Backend running on port 5000
2. ✅ Mobile app running on Expo
3. ✅ Test the complete user flow
4. ✅ Customize as needed
5. ✅ Deploy to production

**Happy Coding! 🚀**
