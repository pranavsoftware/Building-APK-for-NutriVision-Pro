// Light Theme Colors
export const lightColors = {
  // Primary Colors
  primary: '#10B981',
  primaryDark: '#059669',
  primaryLight: '#34D399',
  
  // Secondary Colors
  secondary: '#3B82F6',
  secondaryDark: '#2563EB',
  secondaryLight: '#60A5FA',
  
  // Accent Colors
  accent: '#F59E0B',
  accentDark: '#D97706',
  accentLight: '#FBBF24',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Status Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Background
  background: '#F9FAFB',
  backgroundCard: '#FFFFFF',
  backgroundSecondary: '#F3F4F6',
  
  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Border
  border: '#E5E7EB',
  borderDark: '#D1D5DB',
  
  // Shadow
  shadow: '#000000',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// Dark Theme Colors
export const darkColors = {
  // Primary Colors (keep vibrant in dark mode)
  primary: '#10B981',
  primaryDark: '#059669',
  primaryLight: '#34D399',
  
  // Secondary Colors
  secondary: '#60A5FA',
  secondaryDark: '#3B82F6',
  secondaryLight: '#93C5FD',
  
  // Accent Colors
  accent: '#FBBF24',
  accentDark: '#F59E0B',
  accentLight: '#FCD34D',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#1F2937',
  gray100: '#111827',
  gray200: '#374151',
  gray300: '#4B5563',
  gray400: '#6B7280',
  gray500: '#9CA3AF',
  gray600: '#D1D5DB',
  gray700: '#E5E7EB',
  gray800: '#F3F4F6',
  gray900: '#F9FAFB',
  
  // Status Colors
  success: '#10B981',
  error: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',
  
  // Background
  background: '#111827',
  backgroundCard: '#1F2937',
  backgroundSecondary: '#374151',
  
  // Text Colors
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textLight: '#9CA3AF',
  textInverse: '#111827',
  
  // Border
  border: '#374151',
  borderDark: '#4B5563',
  
  // Shadow
  shadow: '#000000',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
};

// Function to get colors based on theme
export const getColors = (isDarkMode) => {
  return isDarkMode ? darkColors : lightColors;
};

// Default export for backward compatibility
export default lightColors;
