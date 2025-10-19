import { VALIDATION } from './constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  
  // Check for at least 1 uppercase, 1 lowercase, and 1 number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    return 'Password must contain at least 1 uppercase, 1 lowercase, and 1 number';
  }
  
  return null;
};

/**
 * Validate name
 */
export const validateName = (name) => {
  if (!name) {
    return 'Name is required';
  }
  if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  if (name.trim().length > VALIDATION.NAME_MAX_LENGTH) {
    return `Name cannot exceed ${VALIDATION.NAME_MAX_LENGTH} characters`;
  }
  return null;
};

/**
 * Validate OTP
 */
export const validateOTP = (otp) => {
  if (!otp) {
    return 'OTP is required';
  }
  if (otp.length !== VALIDATION.OTP_LENGTH) {
    return `OTP must be ${VALIDATION.OTP_LENGTH} digits`;
  }
  if (!/^\d+$/.test(otp)) {
    return 'OTP must contain only numbers';
  }
  return null;
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};
