const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { createOTP, verifyOTP, resendOTP } = require('../services/otp.service');
const { sendWelcomeEmail } = require('../services/email.service');
const generateToken = require('../utils/generateToken');
const { errorResponse, successResponse, isStrongPassword } = require('../utils/helpers');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, 'User already exists with this email');
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return errorResponse(
        res,
        400,
        'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number'
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
    });

    // Generate and send OTP
    await createOTP(email, 'signup');

    successResponse(res, 201, { email: user.email }, 'Registration successful. Please check your email for OTP.');
  } catch (error) {
    console.error('Registration error:', error);
    errorResponse(res, 500, 'Error in registration. Please try again.');
  }
};

/**
 * @desc    Verify OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOTPCode = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Verify OTP
    const isValid = await verifyOTP(email, otp, 'signup');

    if (!isValid) {
      return errorResponse(res, 400, 'Invalid or expired OTP');
    }

    // Update user verification status
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true, lastLogin: new Date() },
      { new: true }
    );

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Generate token
    const token = generateToken(user._id);

    successResponse(res, 200, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        totalScans: user.totalScans,
      },
    }, 'Account verified successfully');
  } catch (error) {
    console.error('OTP verification error:', error);
    errorResponse(res, 500, 'Error in OTP verification. Please try again.');
  }
};

/**
 * @desc    Resend OTP
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
const resendOTPCode = async (req, res) => {
  try {
    const { email, purpose } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Resend OTP
    await resendOTP(email, purpose || 'signup');

    successResponse(res, 200, null, 'OTP sent successfully');
  } catch (error) {
    console.error('Resend OTP error:', error);
    errorResponse(res, 500, 'Error sending OTP. Please try again.');
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // Check if user is verified
    if (!user.isVerified) {
      return errorResponse(res, 401, 'Please verify your account first');
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    successResponse(res, 200, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        totalScans: user.totalScans,
      },
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 500, 'Error in login. Please try again.');
  }
};

/**
 * @desc    Forgot password - send OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, 'No account found with this email');
    }

    // Generate and send OTP
    await createOTP(email, 'reset');

    successResponse(res, 200, null, 'OTP sent to your email');
  } catch (error) {
    console.error('Forgot password error:', error);
    errorResponse(res, 500, 'Error sending reset code. Please try again.');
  }
};

/**
 * @desc    Reset password with OTP
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP
    const isValid = await verifyOTP(email, otp, 'reset');

    if (!isValid) {
      return errorResponse(res, 400, 'Invalid or expired OTP');
    }

    // Validate new password strength
    if (!isStrongPassword(newPassword)) {
      return errorResponse(
        res,
        400,
        'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number'
      );
    }

    // Update password
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    user.password = newPassword;
    await user.save();

    successResponse(res, 200, null, 'Password reset successful');
  } catch (error) {
    console.error('Reset password error:', error);
    errorResponse(res, 500, 'Error resetting password. Please try again.');
  }
};

/**
 * @desc    Login with Google
 * @route   POST /api/auth/google
 * @access  Public
 */
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return errorResponse(res, 400, 'Google ID token is required');
    }

    // Verify the Google ID token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      console.error('Google token verification error:', error);
      return errorResponse(res, 401, 'Invalid Google token');
    }

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return errorResponse(res, 400, 'Email not found in Google account');
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user with Google info if not already set
      if (!user.googleId) {
        user.googleId = googleId;
        user.profilePicture = picture || user.profilePicture;
        user.isVerified = true; // Google accounts are pre-verified
      }
      user.lastLogin = new Date();
      await user.save();
    } else {
      // Create new user with Google info
      user = await User.create({
        name,
        email,
        googleId,
        profilePicture: picture,
        isVerified: true, // Google accounts are pre-verified
        lastLogin: new Date(),
        // No password needed for Google sign-in
      });

      // Send welcome email
      await sendWelcomeEmail(user.email, user.name);
    }

    // Generate JWT token
    const token = generateToken(user._id);

    successResponse(res, 200, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        totalScans: user.totalScans,
      },
    }, 'Login successful');
  } catch (error) {
    console.error('Google login error:', error);
    errorResponse(res, 500, 'Error in Google login. Please try again.');
  }
};

module.exports = {
  register,
  verifyOTPCode,
  resendOTPCode,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
};
