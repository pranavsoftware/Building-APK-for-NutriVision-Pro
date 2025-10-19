// API Configuration
// For local development: Use your computer's IP address or localhost
// For production: Use your Vercel deployment URL
// 
// IMPORTANT: After deploying to Vercel, update this with your Vercel URL:
// Example: https://your-project.vercel.app/api
//
// Development options:
// - Android Emulator: http://10.0.2.2:5000/api
// - iOS Simulator: http://localhost:5000/api
// - Physical Device: http://YOUR_COMPUTER_IP:5000/api (get IP with ipconfig/ifconfig)
//
// Production:
// - Vercel: https://your-project.vercel.app/api

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// You can also set different URLs for development and production:
// export const API_BASE_URL = __DEV__ 
//   ? 'http://YOUR_COMPUTER_IP:5000/api'  // Development
//   : 'https://your-project.vercel.app/api';  // Production

// AsyncStorage Keys
export const STORAGE_KEYS = {
  TOKEN: '@nutrivision_token',
  USER: '@nutrivision_user',
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  OTP_LENGTH: 6,
};

// Image Picker Options
export const IMAGE_PICKER_OPTIONS = {
  mediaTypes: 'Images',
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
  base64: true,
};

// Pagination
export const PAGINATION = {
  HISTORY_PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
};

// Timeouts
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 seconds
  IMAGE_ANALYSIS: 60000, // 60 seconds
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  WEAK_PASSWORD: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.',
  IMAGE_REQUIRED: 'Please select an image to analyze.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTRATION_SUCCESS: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  ANALYSIS_SAVED: 'Analysis saved to history!',
  ANALYSIS_DELETED: 'Analysis deleted successfully!',
};
