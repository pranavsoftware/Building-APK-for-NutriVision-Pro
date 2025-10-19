const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// Determine which email service to use
const emailService = process.env.EMAIL_SERVICE || 'gmail'; // Default to gmail
const isSendGridConfigured = emailService === 'sendgrid' && !!process.env.SENDGRID_API_KEY;
const isGmailConfigured = emailService === 'gmail' && !!process.env.EMAIL_USER && !!process.env.EMAIL_PASSWORD;

let transporter = null;

// Initialize email service based on configuration
if (isSendGridConfigured) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid email service initialized');
} else if (isGmailConfigured) {
  // Gmail SMTP configuration
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log('✅ Gmail email service initialized');
  console.log(`   Using: ${process.env.EMAIL_USER}`);
} else {
  console.log('⚠️  Email service not configured');
  console.log('💡 Set EMAIL_SERVICE=sendgrid or EMAIL_SERVICE=gmail in .env');
  if (emailService === 'sendgrid') {
    console.log('   Missing: SENDGRID_API_KEY');
  } else {
    console.log('   Missing: EMAIL_USER and EMAIL_PASSWORD');
  }
}

/**
 * Send email using configured service
 * @param {Object} mailOptions - Email options
 * @returns {Promise}
 */
const sendMail = async (mailOptions) => {
  if (!isSendGridConfigured && !isGmailConfigured) {
    console.log('⚠️  Email not configured - skipping email send');
    throw new Error('Email service not configured. Configure SendGrid or Gmail in environment variables.');
  }

  try {
    if (isSendGridConfigured) {
      // SendGrid
      const msg = {
        to: mailOptions.to,
        from: mailOptions.from || process.env.EMAIL_FROM || 'noreply@nutrivision.com',
        subject: mailOptions.subject,
        html: mailOptions.html,
        text: mailOptions.text,
      };

      const result = await sgMail.send(msg);
      console.log(`✅ Email sent successfully to ${mailOptions.to} via SendGrid`);
      return result;
    } else if (isGmailConfigured) {
      // Gmail SMTP
      const result = await transporter.sendMail({
        from: mailOptions.from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: mailOptions.html,
        text: mailOptions.text,
      });
      console.log(`✅ Email sent successfully to ${mailOptions.to} via Gmail`);
      return result;
    }
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.body || error.response);
    }
    throw error;
  }
};

// Export a transporter-like object for compatibility
module.exports = {
  sendMail,
  isConfigured: () => isSendGridConfigured || isGmailConfigured,
};
