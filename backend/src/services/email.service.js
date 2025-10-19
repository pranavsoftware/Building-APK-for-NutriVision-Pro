const transporter = require('../config/email');

/**
 * Send email with retry logic
 * @param {Object} mailOptions - Nodemailer mail options
 * @param {Number} retries - Number of retries
 * @returns {Promise}
 */
const sendEmailWithRetry = async (mailOptions, retries = 3) => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('⚠️  Email not configured - skipping email send');
    throw new Error('Email service not configured');
  }

  for (let i = 0; i < retries; i++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${mailOptions.to}: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error(`❌ Email send attempt ${i + 1} failed:`, error.message);
      
      // If it's the last retry, throw the error
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = Math.pow(2, i) * 1000; // 1s, 2s, 4s
      console.log(`⏳ Retrying in ${waitTime / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

/**
 * Send OTP email
 */
const sendOTPEmail = async (email, otp, purpose) => {
  const subject = purpose === 'signup' 
    ? 'Verify Your NutriVision Account' 
    : 'Reset Your Password';
  
  const message = purpose === 'signup'
    ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🥗 NutriVision Pro</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Welcome to NutriVision!</h2>
          <p style="color: #4b5563; font-size: 16px;">Thank you for signing up. Please verify your email address to activate your account.</p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #6b7280; margin: 0 0 10px 0;">Your verification code is:</p>
            <h1 style="color: #10B981; font-size: 36px; letter-spacing: 8px; margin: 10px 0;">${otp}</h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in ${process.env.OTP_EXPIRY || 10} minutes.</p>
          <p style="color: #6b7280; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
        </div>
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 NutriVision Pro. All rights reserved.</p>
        </div>
      </div>
    `
    : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🥗 NutriVision Pro</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Password Reset Request</h2>
          <p style="color: #4b5563; font-size: 16px;">We received a request to reset your password. Use the code below to proceed:</p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #6b7280; margin: 0 0 10px 0;">Your reset code is:</p>
            <h1 style="color: #10B981; font-size: 36px; letter-spacing: 8px; margin: 10px 0;">${otp}</h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in ${process.env.OTP_EXPIRY || 10} minutes.</p>
          <p style="color: #6b7280; font-size: 14px;">If you didn't request a password reset, please ignore this email.</p>
        </div>
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 NutriVision Pro. All rights reserved.</p>
        </div>
      </div>
    `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'NutriVision Pro <noreply@nutrivision.com>',
    to: email,
    subject: subject,
    html: message,
  };

  return await sendEmailWithRetry(mailOptions, 3);
};

/**
 * Send welcome email
 */
const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'NutriVision Pro <noreply@nutrivision.com>',
    to: email,
    subject: 'Welcome to NutriVision Pro! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🥗 NutriVision Pro</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Welcome, ${name}! 🎉</h2>
          <p style="color: #4b5563; font-size: 16px;">Your account has been successfully verified!</p>
          <p style="color: #4b5563; font-size: 16px;">You can now:</p>
          <ul style="color: #4b5563; font-size: 16px;">
            <li>📸 Scan food items to get instant nutritional information</li>
            <li>📊 Track your nutrition history</li>
            <li>💪 Make healthier food choices with AI-powered insights</li>
          </ul>
          <p style="color: #4b5563; font-size: 16px;">Start your healthy journey today!</p>
        </div>
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 NutriVision Pro. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  return await sendEmailWithRetry(mailOptions, 2);
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
};
