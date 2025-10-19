const OTP = require('../models/OTP');
const { generateOTP } = require('../utils/helpers');
const { sendOTPEmail } = require('./email.service');

/**
 * Generate and save OTP to database
 */
const createOTP = async (email, purpose) => {
  // Delete any existing OTPs for this email and purpose
  await OTP.deleteMany({ email, purpose });

  // Generate new OTP
  const otpCode = generateOTP(parseInt(process.env.OTP_LENGTH));
  
  // Calculate expiry time
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(process.env.OTP_EXPIRY));

  // Save OTP to database
  const otp = await OTP.create({
    email,
    otp: otpCode,
    purpose,
    expiresAt,
  });

  // Send OTP via email
  await sendOTPEmail(email, otpCode, purpose);

  return otp;
};

/**
 * Verify OTP
 */
const verifyOTP = async (email, otpCode, purpose) => {
  const otp = await OTP.findOne({
    email,
    otp: otpCode,
    purpose,
    expiresAt: { $gt: new Date() }, // Check if not expired
  });

  if (!otp) {
    return false;
  }

  // Delete OTP after successful verification
  await OTP.deleteOne({ _id: otp._id });

  return true;
};

/**
 * Resend OTP
 */
const resendOTP = async (email, purpose) => {
  return await createOTP(email, purpose);
};

module.exports = {
  createOTP,
  verifyOTP,
  resendOTP,
};
