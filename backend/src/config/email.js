const sgMail = require('@sendgrid/mail');

// Check if SendGrid API key is available
const isSendGridConfigured = !!process.env.SENDGRID_API_KEY;

// Initialize SendGrid if API key is provided
if (isSendGridConfigured) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid email service initialized');
} else {
  console.log('⚠️  SENDGRID_API_KEY not configured');
  console.log('📧 Email service will not be available');
  console.log('💡 Add SENDGRID_API_KEY to Render environment variables');
}

/**
 * Send email using SendGrid
 * @param {Object} mailOptions - Email options
 * @returns {Promise}
 */
const sendMail = async (mailOptions) => {
  if (!isSendGridConfigured) {
    console.log('⚠️  Email not configured - skipping email send');
    throw new Error('Email service not configured. Add SENDGRID_API_KEY to environment variables.');
  }

  try {
    // Convert nodemailer format to SendGrid format
    const msg = {
      to: mailOptions.to,
      from: mailOptions.from || process.env.EMAIL_FROM || 'noreply@nutrivision.com',
      subject: mailOptions.subject,
      html: mailOptions.html,
      text: mailOptions.text,
    };

    const result = await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${mailOptions.to}`);
    return result;
  } catch (error) {
    console.error('❌ SendGrid email error:', error.message);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    throw error;
  }
};

// Export a transporter-like object for compatibility
module.exports = {
  sendMail,
  isConfigured: () => isSendGridConfigured,
};
