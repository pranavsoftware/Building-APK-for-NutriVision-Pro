const express = require('express');
const { body } = require('express-validator');
const {
  register,
  verifyOTPCode,
  resendOTPCode,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const otpValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
];

const resetPasswordValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

const googleLoginValidation = [
  body('idToken').notEmpty().withMessage('Google ID token is required'),
];

// Routes

// ====================================================================
// EMAIL/PASSWORD AUTHENTICATION (PRIMARY AUTHENTICATION METHOD)
// ====================================================================
router.post('/register', registerValidation, validate, register);
router.post('/verify-otp', otpValidation, validate, verifyOTPCode);
router.post('/resend-otp', [body('email').isEmail()], validate, resendOTPCode);
router.post('/login', loginValidation, validate, login);
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword);
router.post('/reset-password', resetPasswordValidation, validate, resetPassword);

module.exports = router;
