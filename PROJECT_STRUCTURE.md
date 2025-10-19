# 📁 NutriVision Pro - Project Structure

## Complete File Tree

```
nutrivision-mobile/
│
├── backend/                                    # Node.js/Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js                    # MongoDB connection
│   │   │   ├── email.js                       # Nodemailer setup
│   │   │   └── gemini.js                      # Google Gemini AI config
│   │   │
│   │   ├── models/
│   │   │   ├── User.js                        # User schema with bcrypt
│   │   │   ├── FoodAnalysis.js                # Food scan results schema
│   │   │   └── OTP.js                         # OTP verification schema
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js             # Auth logic (register, login, OTP, reset)
│   │   │   ├── user.controller.js             # User profile & stats logic
│   │   │   └── scanner.controller.js          # Food analysis logic
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js                 # Auth endpoints
│   │   │   ├── user.routes.js                 # User endpoints
│   │   │   └── scanner.routes.js              # Scanner endpoints
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js             # JWT verification
│   │   │   ├── upload.middleware.js           # Multer file upload
│   │   │   └── validation.middleware.js       # Express validator
│   │   │
│   │   ├── services/
│   │   │   ├── email.service.js               # Send OTP & welcome emails
│   │   │   ├── otp.service.js                 # Generate & verify OTP
│   │   │   └── gemini.service.js              # AI food analysis
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.js               # JWT token generation
│   │   │   └── helpers.js                     # Helper functions
│   │   │
│   │   └── server.js                          # Express app entry point
│   │
│   ├── uploads/                               # File upload directory
│   │   └── .gitkeep
│   │
│   ├── package.json                           # Backend dependencies
│   ├── .env.example                           # Environment template
│   ├── .gitignore
│   └── README.md                              # Backend documentation
│
├── mobile-app/                                # React Native Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── Button.js                  # Reusable button with variants
│   │   │       ├── Card.js                    # Card container
│   │   │       ├── Input.js                   # Input field with validation
│   │   │       ├── Avatar.js                  # Profile picture component
│   │   │       └── Loading.js                 # Loading spinner
│   │   │
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   │   ├── WelcomeScreen.js          # App intro screen
│   │   │   │   ├── LoginScreen.js            # Login with email/password
│   │   │   │   ├── SignUpScreen.js           # Registration form
│   │   │   │   └── OTPScreen.js              # OTP verification
│   │   │   │
│   │   │   └── main/
│   │   │       ├── DashboardScreen.js        # Home dashboard
│   │   │       ├── ScannerScreen.js          # Camera/gallery food scan
│   │   │       ├── HistoryScreen.js          # Scan history list
│   │   │       ├── ProfileScreen.js          # User profile & settings
│   │   │       └── ResultDetailsScreen.js    # Nutrition analysis results
│   │   │
│   │   ├── navigation/
│   │   │   ├── AuthNavigator.js              # Auth flow navigation
│   │   │   ├── MainNavigator.js              # Main app tabs
│   │   │   └── RootNavigator.js              # Auth check & routing
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                        # Axios instance with interceptors
│   │   │   ├── auth.service.js               # Auth API calls
│   │   │   ├── scanner.service.js            # Scanner API calls
│   │   │   └── storage.service.js            # AsyncStorage helpers
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js                  # App constants
│   │   │   ├── validators.js                 # Form validation
│   │   │   └── imageHelpers.js               # Image picker & permissions
│   │   │
│   │   └── styles/
│   │       ├── colors.js                     # Color palette
│   │       ├── typography.js                 # Font sizes & weights
│   │       └── commonStyles.js               # Shared styles
│   │
│   ├── assets/                               # Images, icons, fonts
│   │   ├── icon.png
│   │   ├── splash.png
│   │   └── adaptive-icon.png
│   │
│   ├── App.js                                # Root component
│   ├── app.json                              # Expo configuration
│   ├── package.json                          # Frontend dependencies
│   ├── babel.config.js                       # Babel setup
│   ├── .env.example                          # Environment template
│   ├── .gitignore
│   └── README.md                             # Frontend documentation
│
├── README.md                                 # Main project documentation
├── SETUP_GUIDE.md                           # Step-by-step setup guide
├── API_DOCUMENTATION.md                     # Complete API reference
└── .gitignore                               # Root gitignore
```

## 🎯 File Purposes

### Backend Core Files

**Configuration**
- `database.js` - MongoDB connection with error handling
- `email.js` - Nodemailer transporter setup
- `gemini.js` - Google Gemini AI initialization

**Models**
- `User.js` - User authentication & profile data
- `FoodAnalysis.js` - Nutrition analysis results
- `OTP.js` - Temporary OTP codes with auto-expiry

**Controllers**
- `auth.controller.js` - Handles all authentication flows
- `user.controller.js` - User profile CRUD operations
- `scanner.controller.js` - Food analysis & history

**Services**
- `email.service.js` - HTML email templates & sending
- `otp.service.js` - OTP generation & verification
- `gemini.service.js` - AI image analysis with Gemini

**Routes**
- Define API endpoints with validation rules
- Apply authentication middleware
- Map to controller functions

**Middleware**
- `auth.middleware.js` - JWT verification & user extraction
- `upload.middleware.js` - File size & type validation
- `validation.middleware.js` - Express-validator error handling

### Frontend Core Files

**Components**
- `Button.js` - 4 variants (primary, secondary, outline, ghost)
- `Card.js` - Elevated container with shadow
- `Input.js` - Controlled input with error states
- `Avatar.js` - Circular profile picture with initials fallback
- `Loading.js` - Full screen or inline spinner

**Screens**

*Authentication Flow:*
1. `WelcomeScreen.js` - First screen with app intro
2. `SignUpScreen.js` - Registration form
3. `OTPScreen.js` - Email verification
4. `LoginScreen.js` - Sign in form

*Main App Flow:*
1. `DashboardScreen.js` - Stats & recent scans
2. `ScannerScreen.js` - Image capture & upload
3. `ResultDetailsScreen.js` - Full nutrition breakdown
4. `HistoryScreen.js` - All previous scans
5. `ProfileScreen.js` - User settings & logout

**Services**
- `api.js` - Centralized HTTP client
- `auth.service.js` - Login, register, OTP calls
- `scanner.service.js` - Analyze, history, delete calls
- `storage.service.js` - Token & user data persistence

**Navigation**
- `RootNavigator.js` - Auth check & route decision
- `AuthNavigator.js` - Stack for login/signup flow
- `MainNavigator.js` - Bottom tabs with nested stacks

**Styles**
- `colors.js` - Brand colors & theme
- `typography.js` - Font configuration
- `commonStyles.js` - Reusable style objects

## 📊 Data Flow

### Registration Flow
```
SignUpScreen.js
  ↓ (calls)
auth.service.js → POST /api/auth/register
  ↓ (triggers)
auth.controller.js → User.create()
  ↓ (generates)
otp.service.js → OTP.create() + email.service.js
  ↓ (user receives)
Email with OTP
  ↓ (user enters)
OTPScreen.js → POST /api/auth/verify-otp
  ↓ (returns)
JWT Token → storage.service.js → AsyncStorage
  ↓ (navigates to)
MainNavigator.js (Dashboard)
```

### Food Scanning Flow
```
ScannerScreen.js
  ↓ (selects image)
imageHelpers.js → Camera/Gallery
  ↓ (converts to base64)
imageToBase64DataURL()
  ↓ (sends to API)
scanner.service.js → POST /api/scanner/analyze
  ↓ (processes)
scanner.controller.js → gemini.service.js
  ↓ (AI analyzes)
Google Gemini API
  ↓ (returns)
Nutrition Data → FoodAnalysis.create()
  ↓ (displays)
ResultDetailsScreen.js
```

## 🔧 Key Dependencies

### Backend
```json
{
  "express": "HTTP server",
  "mongoose": "MongoDB ODM",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT tokens",
  "nodemailer": "Email sending",
  "@google/generative-ai": "Gemini AI",
  "cors": "CORS handling",
  "dotenv": "Environment variables",
  "express-validator": "Input validation",
  "multer": "File uploads"
}
```

### Frontend
```json
{
  "expo": "React Native framework",
  "@react-navigation/native": "Navigation",
  "@react-navigation/stack": "Stack navigation",
  "@react-navigation/bottom-tabs": "Tab navigation",
  "axios": "HTTP client",
  "@react-native-async-storage/async-storage": "Local storage",
  "expo-image-picker": "Camera & gallery",
  "expo-linear-gradient": "Gradient backgrounds",
  "formik": "Form handling",
  "yup": "Validation schemas",
  "@expo/vector-icons": "Icon library"
}
```

## 🎨 Styling Architecture

### Design Tokens
```
colors.js → Central color definitions
typography.js → Font sizes & weights
commonStyles.js → Reusable style objects
```

### Component Styling Pattern
```javascript
// Import design tokens
import colors from '../styles/colors';
import typography from '../styles/typography';

// Define component-specific styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
  }
});
```

## 🔐 Security Layers

1. **Environment Variables** - Secrets not in code
2. **Password Hashing** - bcrypt with 10 salt rounds
3. **JWT Tokens** - 7-day expiry
4. **OTP Verification** - 10-minute expiry
5. **Input Validation** - All endpoints
6. **CORS** - Configured origins
7. **AsyncStorage** - Encrypted on device

## 📱 App Navigation Hierarchy

```
RootNavigator
├── AuthNavigator (if not logged in)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   ├── SignUpScreen
│   └── OTPScreen
│
└── MainNavigator (if logged in)
    ├── Dashboard Tab
    │   ├── DashboardScreen
    │   └── ResultDetailsScreen
    │
    ├── Scanner Tab
    │   ├── ScannerScreen
    │   └── ResultDetailsScreen
    │
    ├── History Tab
    │   ├── HistoryScreen
    │   └── ResultDetailsScreen
    │
    └── Profile Tab
        └── ProfileScreen
```

## 🚀 Build & Deploy Structure

```
Development
├── backend: npm run dev (nodemon)
└── mobile-app: npm start (expo)

Production
├── backend: Deploy to Heroku/Railway/Render
└── mobile-app: expo build (APK/IPA)
```

## 📦 Total Files Created

- **Backend**: 20+ files
- **Frontend**: 30+ files
- **Documentation**: 5 files
- **Configuration**: 8 files

**Total: 60+ production-ready files** 🎉

---

This structure follows industry best practices for:
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Scalable architecture
- ✅ Clean code organization
- ✅ Easy maintenance

**Ready for production deployment! 🚀**
