# NutriVision Pro - Mobile App

## 📱 Overview

NutriVision Pro is a production-ready React Native mobile application that allows users to scan food images and receive detailed nutritional analysis using Google Gemini AI.

## ✨ Features

- **Authentication System**
  - Email/Password login and registration
  - OTP verification via email
  - Password reset functionality
  - Secure token-based authentication

- **AI Food Scanner**
  - Take photos or upload from gallery
  - Real-time AI analysis with Gemini
  - Detailed nutritional information
  - Health benefits and allergen warnings

- **Dashboard**
  - User statistics
  - Recent scans overview
  - Quick access to scanner

- **Scan History**
  - View all previous scans
  - Search and filter
  - Pull to refresh
  - Delete functionality

- **User Profile**
  - Profile picture upload
  - User statistics
  - Account management
  - Logout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac only) or Android Emulator
- Backend API running (see backend README)

### Installation

1. Navigate to mobile-app directory:
```bash
cd mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```env
# For Android Emulator
API_BASE_URL=http://10.0.2.2:5000/api

# For iOS Simulator
API_BASE_URL=http://localhost:5000/api

# For Physical Device (replace with your computer's IP)
API_BASE_URL=http://192.168.1.XXX:5000/api
```

### Running the App

#### Start Expo:
```bash
npm start
```

#### Run on iOS Simulator (Mac only):
```bash
npm run ios
```

#### Run on Android Emulator:
```bash
npm run android
```

#### Scan QR Code:
- Install Expo Go app on your physical device
- Scan the QR code displayed in terminal
- Make sure your phone and computer are on the same network

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── components/
│   │   └── common/          # Reusable components
│   │       ├── Button.js
│   │       ├── Card.js
│   │       ├── Input.js
│   │       ├── Avatar.js
│   │       └── Loading.js
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   │   ├── WelcomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   ├── SignUpScreen.js
│   │   │   └── OTPScreen.js
│   │   └── main/            # Main app screens
│   │       ├── DashboardScreen.js
│   │       ├── ScannerScreen.js
│   │       ├── HistoryScreen.js
│   │       ├── ProfileScreen.js
│   │       └── ResultDetailsScreen.js
│   ├── navigation/
│   │   ├── AuthNavigator.js
│   │   ├── MainNavigator.js
│   │   └── RootNavigator.js
│   ├── services/
│   │   ├── api.js           # Axios configuration
│   │   ├── auth.service.js
│   │   ├── scanner.service.js
│   │   └── storage.service.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── imageHelpers.js
│   └── styles/
│       ├── colors.js
│       ├── typography.js
│       └── commonStyles.js
├── App.js
├── app.json
├── package.json
└── .env
```

## 🎨 Design System

### Colors
- **Primary**: #10B981 (Green)
- **Secondary**: #3B82F6 (Blue)
- **Accent**: #F59E0B (Orange)
- **Success**: #10B981
- **Error**: #EF4444

### Typography
- System fonts (iOS) / Roboto (Android)
- Font sizes: 10-32px
- Font weights: 400-700

## 🔐 Authentication Flow

1. User registers with name, email, password
2. OTP sent to email
3. User verifies OTP
4. JWT token stored in AsyncStorage
5. Auto-login on app restart

## 📸 Image Scanning Flow

1. User opens Scanner tab
2. Takes photo or selects from gallery
3. Image uploaded as base64 to API
4. Gemini AI analyzes the food
5. Results displayed with full nutrition info
6. Analysis saved to user's history

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation 6
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Image Picker**: expo-image-picker
- **UI Components**: Custom components
- **Styling**: StyleSheet
- **Gradients**: expo-linear-gradient
- **Icons**: @expo/vector-icons

## 📱 Screens

### Authentication
- **Welcome Screen**: App introduction
- **Login Screen**: Email/password login
- **Sign Up Screen**: Registration form
- **OTP Screen**: Email verification

### Main App
- **Dashboard**: Overview and quick actions
- **Scanner**: Capture/upload food images
- **History**: View all scans
- **Profile**: User account management
- **Result Details**: Full nutrition analysis

## 🔌 API Integration

All API calls go through the centralized `api.js` service with:
- Automatic JWT token injection
- Request/response interceptors
- Error handling
- Base URL configuration

## 🧪 Testing

### Test on Different Devices

**Android Emulator:**
```bash
npm run android
```

**iOS Simulator (Mac only):**
```bash
npm run ios
```

**Physical Device:**
1. Install Expo Go from App Store/Play Store
2. Run `npm start`
3. Scan QR code with Expo Go

## 🐛 Troubleshooting

### Cannot connect to API
- Check API_BASE_URL in `.env`
- For Android Emulator: use `10.0.2.2`
- For iOS Simulator: use `localhost`
- For physical device: use your computer's local IP

### Images not uploading
- Check camera/gallery permissions
- Verify API max file size settings
- Check network connection

### App crashes on startup
- Clear metro bundler cache: `expo start -c`
- Delete node_modules and reinstall
- Check console for error messages

## 📦 Building for Production

### Android APK:
```bash
expo build:android
```

### iOS IPA (requires Apple Developer account):
```bash
expo build:ios
```

## 🔒 Security Notes

- Never commit `.env` file
- Store sensitive data in AsyncStorage
- Use HTTPS in production
- Implement certificate pinning for production
- Add biometric authentication (optional)

## 🎯 Future Enhancements

- [ ] Barcode scanning
- [ ] Meal planning
- [ ] Calorie tracking
- [ ] Social sharing
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Push notifications

## 📄 License

MIT

## 👥 Contributors

NutriVision Team

## 📧 Support

For support, email support@nutrivision.com
