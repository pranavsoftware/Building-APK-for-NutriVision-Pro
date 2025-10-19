const express = require('express');
const router = express.Router();

/**
 * @route   GET /privacy-policy
 * @desc    Privacy Policy Page
 * @access  Public
 */
router.get('/privacy-policy', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Privacy Policy - NutriVision Pro</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6; 
          color: #333;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
          color: #10B981; 
          margin-bottom: 10px;
          font-size: 2.5em;
          text-align: center;
        }
        .last-updated {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-style: italic;
        }
        h2 { 
          color: #333; 
          margin-top: 30px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #10B981;
        }
        p { margin: 15px 0; line-height: 1.8; }
        ul { margin: 15px 0; padding-left: 30px; }
        li { margin: 10px 0; line-height: 1.8; }
        strong { color: #10B981; }
        .contact-box {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          margin-top: 30px;
          border-left: 4px solid #10B981;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
        }
        a { color: #10B981; text-decoration: none; }
        a:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .container { padding: 20px; }
          h1 { font-size: 2em; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔒 Privacy Policy</h1>
        <p class="last-updated"><strong>Last updated:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. Introduction</h2>
        <p>Welcome to <strong>NutriVision Pro</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, store, and protect your information when you use our mobile application.</p>
        
        <h2>2. Information We Collect</h2>
        <p>We collect the following types of information when you use NutriVision Pro:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and profile picture provided through Google Sign-In</li>
          <li><strong>Health & Nutrition Data:</strong> Dietary preferences, meal logs, food images, nutritional information, and personal health goals</li>
          <li><strong>Usage Data:</strong> App interactions, feature usage statistics, and analytics data to improve our services</li>
          <li><strong>Device Information:</strong> Device type, operating system version, unique device identifiers, and mobile network information</li>
          <li><strong>Images:</strong> Food photos you upload for nutritional analysis (processed using AI)</li>
        </ul>
        
        <h2>3. How We Use Your Information</h2>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>✅ <strong>Authentication:</strong> To create and manage your account via Google Sign-In</li>
          <li>📊 <strong>Personalization:</strong> To provide customized nutrition recommendations based on your preferences</li>
          <li>🤖 <strong>AI Analysis:</strong> To analyze food images and provide accurate nutritional insights using Google Gemini AI</li>
          <li>📈 <strong>Service Improvement:</strong> To understand how you use the app and enhance user experience</li>
          <li>📧 <strong>Communication:</strong> To send you important updates, notifications, and feature announcements</li>
          <li>🔒 <strong>Security:</strong> To detect and prevent fraud, abuse, and security incidents</li>
        </ul>
        
        <h2>4. Data Storage and Security</h2>
        <p>We take your data security seriously:</p>
        <ul>
          <li>🔐 <strong>Encryption:</strong> All data is encrypted in transit (HTTPS/TLS) and at rest</li>
          <li>☁️ <strong>Secure Storage:</strong> Data is stored on MongoDB Atlas with enterprise-grade security</li>
          <li>🛡️ <strong>Access Control:</strong> Strict access controls and authentication mechanisms are in place</li>
          <li>🔄 <strong>Regular Backups:</strong> Automated backups to prevent data loss</li>
          <li>🔍 <strong>Security Monitoring:</strong> Continuous monitoring for suspicious activities</li>
        </ul>
        
        <h2>5. Third-Party Services</h2>
        <p>We use the following trusted third-party services:</p>
        <ul>
          <li><strong>Google Sign-In:</strong> For secure authentication (governed by Google's Privacy Policy)</li>
          <li><strong>Google Gemini AI:</strong> For food image analysis and nutritional insights</li>
          <li><strong>MongoDB Atlas:</strong> For secure cloud database storage</li>
          <li><strong>Render:</strong> For backend hosting and API services</li>
        </ul>
        <p>These services have their own privacy policies and data protection measures.</p>
        
        <h2>6. Data Retention</h2>
        <p>We retain your personal data only for as long as necessary to:</p>
        <ul>
          <li>Provide you with our services</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes and enforce our agreements</li>
        </ul>
        <p>You can request deletion of your account and data at any time by contacting us.</p>
        
        <h2>7. Your Privacy Rights</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li>📋 <strong>Access:</strong> Request a copy of your personal data</li>
          <li>✏️ <strong>Correction:</strong> Update or correct inaccurate data</li>
          <li>🗑️ <strong>Deletion:</strong> Request deletion of your data (right to be forgotten)</li>
          <li>⛔ <strong>Object:</strong> Object to processing of your data</li>
          <li>📤 <strong>Portability:</strong> Export your data in a machine-readable format</li>
          <li>🔒 <strong>Restriction:</strong> Restrict processing of your data</li>
        </ul>
        
        <h2>8. Children's Privacy</h2>
        <p>NutriVision Pro is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
        
        <h2>9. International Data Transfers</h2>
        <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.</p>
        
        <h2>10. Cookies and Tracking</h2>
        <p>We may use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your device settings.</p>
        
        <h2>11. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by:</p>
        <ul>
          <li>Posting the updated policy on this page</li>
          <li>Sending you an in-app notification</li>
          <li>Updating the "Last Updated" date at the top</li>
        </ul>
        
        <div class="contact-box">
          <h2>12. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this privacy policy or your personal data, please contact us:</p>
          <p><strong>📧 Email:</strong> cabshare2027@gmail.com</p>
          <p><strong>📧 Support Email:</strong> raybanpranav@gmail.com</p>
          <p><strong>🌐 Website:</strong> <a href="https://nutrivision-backend-pj1s.onrender.com">https://nutrivision-backend-pj1s.onrender.com</a></p>
          <p><strong>⏰ Response Time:</strong> We aim to respond within 48 hours</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} NutriVision Pro. All rights reserved.</p>
          <p>Made with 💚 for healthier living</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

/**
 * @route   GET /terms-of-service
 * @desc    Terms of Service Page
 * @access  Public
 */
router.get('/terms-of-service', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Terms of Service - NutriVision Pro</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6; 
          color: #333;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
          color: #10B981; 
          margin-bottom: 10px;
          font-size: 2.5em;
          text-align: center;
        }
        .last-updated {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-style: italic;
        }
        h2 { 
          color: #333; 
          margin-top: 30px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #10B981;
        }
        p { margin: 15px 0; line-height: 1.8; }
        ul { margin: 15px 0; padding-left: 30px; }
        li { margin: 10px 0; line-height: 1.8; }
        strong { color: #10B981; }
        .warning-box {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .contact-box {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          margin-top: 30px;
          border-left: 4px solid #10B981;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
        }
        a { color: #10B981; text-decoration: none; }
        a:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .container { padding: 20px; }
          h1 { font-size: 2em; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📜 Terms of Service</h1>
        <p class="last-updated"><strong>Last updated:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By downloading, installing, or using <strong>NutriVision Pro</strong>, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our application.</p>
        
        <h2>2. Description of Service</h2>
        <p><strong>NutriVision Pro</strong> is a mobile application that provides:</p>
        <ul>
          <li>🍎 Nutritional tracking and meal planning</li>
          <li>📸 AI-powered food image analysis using Google Gemini</li>
          <li>📊 Personalized nutrition recommendations</li>
          <li>💪 Health and fitness goal tracking</li>
          <li>📝 Meal logging and dietary insights</li>
        </ul>
        
        <div class="warning-box">
          <p><strong>⚠️ Important Medical Disclaimer:</strong></p>
          <p>NutriVision Pro is a <strong>nutrition tracking tool</strong> and is NOT a substitute for professional medical or dietary advice. Always consult with qualified healthcare professionals, registered dietitians, or nutritionists before making significant changes to your diet or health routine.</p>
        </div>
        
        <h2>3. User Accounts</h2>
        <p>To use certain features of NutriVision Pro, you must:</p>
        <ul>
          <li>✅ Register for an account using Google Sign-In</li>
          <li>✅ Provide accurate and complete information</li>
          <li>✅ Maintain the security of your account credentials</li>
          <li>✅ Be at least 13 years of age (or the age of majority in your jurisdiction)</li>
          <li>✅ Notify us immediately of any unauthorized access</li>
        </ul>
        <p>You are responsible for all activities that occur under your account.</p>
        
        <h2>4. Acceptable Use</h2>
        <p>You agree <strong>NOT</strong> to:</p>
        <ul>
          <li>❌ Use the service for any illegal purpose or to violate any laws</li>
          <li>❌ Interfere with or disrupt the service or servers</li>
          <li>❌ Attempt to gain unauthorized access to any part of the service</li>
          <li>❌ Upload malicious code, viruses, or harmful content</li>
          <li>❌ Harass, abuse, or harm other users</li>
          <li>❌ Impersonate any person or entity</li>
          <li>❌ Collect or store personal data of other users</li>
          <li>❌ Use automated systems to access the service (bots, scrapers, etc.)</li>
        </ul>
        
        <h2>5. Content and AI Analysis</h2>
        <p><strong>Food Image Analysis:</strong></p>
        <ul>
          <li>📸 You can upload food images for AI-powered nutritional analysis</li>
          <li>🤖 Analysis is performed using Google Gemini AI technology</li>
          <li>⚠️ Results are estimates and may not be 100% accurate</li>
          <li>🔒 Your images are processed securely and not shared publicly</li>
        </ul>
        
        <p><strong>Accuracy Disclaimer:</strong></p>
        <p>While we strive for accuracy, nutritional information provided by our AI may contain errors or approximations. Always verify critical information with official nutritional databases or professionals.</p>
        
        <h2>6. Intellectual Property</h2>
        <p>All content, features, and functionality of NutriVision Pro, including but not limited to:</p>
        <ul>
          <li>Software code and algorithms</li>
          <li>Design, graphics, and user interface</li>
          <li>Logos, trademarks, and branding</li>
          <li>Text, images, and multimedia content</li>
        </ul>
        <p>...are owned by NutriVision Pro and protected by international copyright, trademark, and intellectual property laws.</p>
        
        <h2>7. User-Generated Content</h2>
        <p><strong>Your Rights:</strong> You retain all rights to the content you submit (food images, meal logs, etc.)</p>
        <p><strong>License to Us:</strong> By using the service, you grant us a non-exclusive, worldwide, royalty-free license to use, store, process, and display your content solely for providing and improving our services.</p>
        
        <h2>8. Privacy and Data Protection</h2>
        <p>Your privacy is important to us. Please review our <a href="/privacy-policy">Privacy Policy</a> to understand how we collect, use, and protect your personal information.</p>
        
        <h2>9. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law:</p>
        <ul>
          <li>NutriVision Pro is provided "AS IS" without warranties of any kind</li>
          <li>We do not guarantee uninterrupted, error-free, or secure service</li>
          <li>We are not liable for any indirect, incidental, special, or consequential damages</li>
          <li>We are not responsible for health outcomes based on app usage</li>
          <li>Maximum liability is limited to the amount you paid for the service (if any)</li>
        </ul>
        
        <h2>10. Health and Medical Disclaimer</h2>
        <div class="warning-box">
          <p><strong>🏥 Important:</strong></p>
          <ul>
            <li>NutriVision Pro is for informational purposes only</li>
            <li>It is NOT medical advice, diagnosis, or treatment</li>
            <li>Always consult healthcare professionals for medical decisions</li>
            <li>Do not disregard professional medical advice based on app information</li>
            <li>In case of medical emergency, contact emergency services immediately</li>
          </ul>
        </div>
        
        <h2>11. Service Modifications</h2>
        <p>We reserve the right to:</p>
        <ul>
          <li>Modify, suspend, or discontinue the service at any time</li>
          <li>Update features, functionality, or pricing</li>
          <li>Change these Terms with reasonable notice</li>
        </ul>
        <p>We will not be liable for any such modifications or interruptions.</p>
        
        <h2>12. Termination</h2>
        <p>We may terminate or suspend your account immediately if you:</p>
        <ul>
          <li>Violate these Terms of Service</li>
          <li>Engage in fraudulent or illegal activity</li>
          <li>Abuse or misuse the service</li>
          <li>Fail to comply with applicable laws</li>
        </ul>
        <p>You may terminate your account at any time by contacting us or using the in-app account deletion feature.</p>
        
        <h2>13. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law provisions. Any disputes shall be resolved in the courts of competent jurisdiction.</p>
        
        <h2>14. Changes to These Terms</h2>
        <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by:</p>
        <ul>
          <li>Posting the updated Terms on this page</li>
          <li>Sending an in-app notification</li>
          <li>Updating the "Last Updated" date</li>
        </ul>
        <p>Your continued use after changes constitutes acceptance of the new Terms.</p>
        
        <div class="contact-box">
          <h2>15. Contact Information</h2>
          <p>For questions, concerns, or support regarding these Terms:</p>
          <p><strong>📧 Primary Email:</strong> cabshare2027@gmail.com</p>
          <p><strong>📧 Support Email:</strong> raybanpranav@gmail.com</p>
          <p><strong>🌐 Website:</strong> <a href="https://nutrivision-backend-pj1s.onrender.com">https://nutrivision-backend-pj1s.onrender.com</a></p>
          <p><strong>⏰ Response Time:</strong> We aim to respond within 48 hours</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} NutriVision Pro. All rights reserved.</p>
          <p>Made with 💚 for healthier living</p>
          <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

module.exports = router;
