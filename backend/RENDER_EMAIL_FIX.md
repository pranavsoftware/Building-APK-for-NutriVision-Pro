# 📧 Fixing Email Issues on Render

## Problem
The error `Connection timeout` when sending emails from Render means SMTP connections are being blocked.

## Root Cause
Render's free tier may block outgoing SMTP connections on port 587/465 for security reasons.

## ✅ Solutions (Try in Order)

### Solution 1: Use Gmail App Password (Recommended)

1. **Generate Gmail App Password:**
   - Go to https://myaccount.google.com/security
   - Enable **2-Step Verification**
   - Go to **App passwords**
   - Select "Mail" and generate password
   - Copy the 16-character password (remove spaces)

2. **Update Render Environment Variables:**
   - Go to Render Dashboard → Your Service → Environment
   - Update these variables:
     ```
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=raybanpranav@gmail.com
     EMAIL_PASSWORD=your-16-char-app-password
     EMAIL_FROM=NutriVision Pro <raybanpranav@gmail.com>
     ```
   - Click **Save Changes**

3. **Redeploy**
   - Render will automatically redeploy
   - Check logs for: `✅ Email server is ready to send messages`

---

### Solution 2: Use SendGrid (Free Tier Alternative)

SendGrid has a free tier (100 emails/day) and works better with Render:

1. **Sign up for SendGrid:**
   - Go to https://sendgrid.com/
   - Sign up for free account
   - Verify your email

2. **Create API Key:**
   - Settings → API Keys → Create API Key
   - Give it a name: "NutriVision"
   - Choose "Full Access"
   - Copy the API key

3. **Update Code:**
   
   In `backend/src/config/email.js`, replace with:
   ```javascript
   const nodemailer = require('nodemailer');
   const sgTransport = require('nodemailer-sendgrid-transport');

   const transporter = nodemailer.createTransport(sgTransport({
     auth: {
       api_key: process.env.SENDGRID_API_KEY
     }
   }));

   module.exports = transporter;
   ```

4. **Update Environment Variables:**
   ```
   SENDGRID_API_KEY=your-sendgrid-api-key
   EMAIL_FROM=raybanpranav@gmail.com
   ```

5. **Install SendGrid Transport:**
   ```bash
   npm install nodemailer-sendgrid-transport
   ```

6. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Switch to SendGrid for email"
   git push
   ```

---

### Solution 3: Use Mailgun (Free Alternative)

Mailgun offers 1000 free emails/month:

1. **Sign up for Mailgun:**
   - Go to https://www.mailgun.com/
   - Sign up for free
   - Verify your account

2. **Get SMTP Credentials:**
   - Dashboard → Sending → Domain settings → SMTP credentials
   - Copy: username, password, SMTP hostname

3. **Update Render Environment Variables:**
   ```
   EMAIL_HOST=smtp.mailgun.org
   EMAIL_PORT=587
   EMAIL_USER=postmaster@your-domain.mailgun.org
   EMAIL_PASSWORD=your-mailgun-password
   EMAIL_FROM=NutriVision Pro <noreply@your-domain.mailgun.org>
   ```

---

### Solution 4: Disable Email Verification (Testing Only)

**⚠️ Only for testing/development - Not recommended for production**

1. **Modify Auth Controller** to skip OTP verification:
   
   In `backend/src/controllers/auth.controller.js`:
   ```javascript
   // Temporarily auto-verify users (TESTING ONLY)
   user.isVerified = true;
   await user.save();
   
   // Skip sending OTP email
   console.log('⚠️ Email disabled - Auto-verified user');
   ```

2. **Or Make OTP Optional:**
   - Any OTP will be accepted
   - Log the OTP to console instead of emailing

---

## 🔍 Debugging Email Issues

### Check Render Logs

Look for these messages:

**Success:**
```
✅ Email server is ready to send messages
✅ Email sent successfully to user@example.com
```

**Warnings:**
```
⚠️  Email credentials not configured
⚠️  Email configuration warning: Connection timeout
```

**Errors:**
```
❌ Email send attempt 1 failed: Connection timeout
❌ Email send attempt 2 failed: ETIMEDOUT
```

### Test Locally First

```bash
cd backend
npm run dev
```

Try registering a user. If it works locally but not on Render:
- ✅ Your code is correct
- ❌ Render is blocking SMTP
- 💡 Use SendGrid/Mailgun instead

---

## 📊 Email Service Comparison

| Service | Free Tier | Setup Difficulty | Render Compatible | Recommended |
|---------|-----------|------------------|-------------------|-------------|
| **Gmail SMTP** | Unlimited (with limits) | Easy | ⚠️ Sometimes blocked | ⭐⭐⭐ |
| **SendGrid** | 100/day | Medium | ✅ Always works | ⭐⭐⭐⭐⭐ |
| **Mailgun** | 1000/month | Medium | ✅ Always works | ⭐⭐⭐⭐ |
| **AWS SES** | 62,000/month | Hard | ✅ Always works | ⭐⭐⭐⭐ |

---

## ✅ Current Implementation Status

Your backend already has:
- ✅ **Retry logic** (3 attempts with exponential backoff)
- ✅ **Graceful degradation** (server starts even if email fails)
- ✅ **Timeout handling** (15-second verification timeout)
- ✅ **Error logging** (detailed error messages)
- ✅ **Connection pooling** (better performance)

---

## 🚀 Recommended Solution

**For Production (Best):**
1. Use **SendGrid** (most reliable with Render)
2. 100 emails/day is enough for most apps
3. Easy to set up and maintain

**For Testing:**
1. Try Gmail App Password first
2. If blocked, switch to SendGrid
3. Monitor logs to confirm emails are sending

---

## 📝 Quick Fix Commands

```bash
# 1. Add SendGrid dependency
cd backend
npm install nodemailer-sendgrid-transport

# 2. Commit changes
git add .
git commit -m "Add SendGrid support for email"
git push

# 3. Update Render env vars
# Go to Render Dashboard → Environment
# Add: SENDGRID_API_KEY=your-key

# 4. Redeploy
# Render auto-deploys on push
```

---

## 🎯 Expected Behavior After Fix

**Success Logs:**
```
✅ Email server is ready to send messages
POST /api/auth/signup - 200
✅ Email sent successfully to user@example.com: <message-id>
```

**User Experience:**
- User registers → receives OTP email within seconds
- User verifies OTP → account activated
- No timeout errors in logs

---

## 📞 Still Having Issues?

1. Check Render logs for specific error messages
2. Verify all environment variables are set correctly
3. Test email sending from Render Shell:
   ```bash
   # In Render Dashboard → Shell
   node -e "console.log(process.env.EMAIL_USER)"
   ```
4. Try SendGrid/Mailgun instead of Gmail

---

**Deployed by:** Pranav Rayban  
**Contact:** raybanpranav@gmail.com  
**Last Updated:** October 19, 2025
