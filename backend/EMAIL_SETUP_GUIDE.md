# 📧 Email Configuration Guide for Render

## Problem: Email Connection Timeout on Render

Render's free tier may have restrictions on outgoing SMTP connections. This guide helps you fix email issues.

---

## ✅ Solution 1: Use Gmail App Password (Recommended)

### Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **2-Step Verification** → **Get Started**
3. Follow the setup process

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other** → Type: "NutriVision Pro"
4. Click **Generate**
5. Copy the **16-character password** (like: `abcd efgh ijkl mnop`)

### Step 3: Update Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click your service: **nutrivision-backend**
3. Go to **Environment** tab
4. Update these variables:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  (16-char app password, NO SPACES)
EMAIL_FROM=NutriVision Pro <noreply@nutrivision.com>
```

5. Click **Save Changes**
6. Render will auto-redeploy

---

## ✅ Solution 2: Alternative Email Services

If Gmail doesn't work, try these:

### SendGrid (Free Tier: 100 emails/day)

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API Key
3. Update Render env:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=NutriVision Pro <noreply@your-domain.com>
```

### Mailgun (Free Tier: 5,000 emails/month)

1. Sign up at [Mailgun](https://mailgun.com)
2. Get SMTP credentials
3. Update Render env:

```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-smtp-username
EMAIL_PASSWORD=your-mailgun-smtp-password
EMAIL_FROM=NutriVision Pro <noreply@your-domain.com>
```

### Amazon SES (Free Tier: 62,000 emails/month)

1. Sign up for [AWS](https://aws.amazon.com)
2. Enable SES and verify email
3. Get SMTP credentials
4. Update Render env:

```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-aws-smtp-username
EMAIL_PASSWORD=your-aws-smtp-password
EMAIL_FROM=NutriVision Pro <noreply@your-verified-domain.com>
```

---

## 🧪 Testing Email Configuration

### Method 1: Test in Render Logs

1. Go to Render Dashboard → Your Service → Logs
2. Watch for these messages:
   - ✅ `Email server is ready to send messages` - Working!
   - ⚠️ `Email configuration warning` - Needs fixing
   - ❌ `Email configuration error: Connection timeout` - Check credentials

### Method 2: Test by Registering User

1. Use your mobile app or Postman
2. Register a new user:

```bash
curl -X POST https://nutrivision-backend-pj1s.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@gmail.com",
    "password": "Test@123"
  }'
```

3. Check your email inbox for OTP code
4. If you receive the email → ✅ Email is working!

---

## ⚠️ Common Issues & Fixes

### Issue 1: "Connection timeout"

**Cause:** Wrong credentials or Gmail blocking

**Fix:**
1. Double-check EMAIL_USER and EMAIL_PASSWORD
2. Make sure App Password has NO SPACES
3. Try alternative email service (SendGrid, Mailgun)

### Issue 2: "Authentication failed"

**Cause:** Using regular Gmail password instead of App Password

**Fix:**
1. Generate Gmail App Password (see Solution 1 above)
2. Use the 16-character password, not your Gmail password

### Issue 3: "Sender address rejected"

**Cause:** EMAIL_FROM not matching EMAIL_USER

**Fix:**
```env
# Make sure FROM email matches USER email domain
EMAIL_USER=your-email@gmail.com
EMAIL_FROM=NutriVision Pro <your-email@gmail.com>
```

### Issue 4: "No open ports detected"

**Cause:** Server starting before email verification completes

**Fix:**
- This is normal! Server continues without email verification
- Email will work once verification completes
- Check logs for "✅ Email server is ready"

---

## 🔧 Improved Email Configuration

The backend now has:

✅ **Retry Logic** - Automatically retries 3 times with exponential backoff
✅ **Graceful Degradation** - Server starts even if email fails
✅ **Better Error Messages** - Clear logs for debugging
✅ **Timeout Handling** - Won't hang on email verification
✅ **Connection Pooling** - Better performance for multiple emails

---

## 📝 Email Environment Variables Checklist

Make sure ALL these are set in Render:

| Variable | Example | Required |
|----------|---------|----------|
| EMAIL_HOST | smtp.gmail.com | ✅ Yes |
| EMAIL_PORT | 587 | ✅ Yes |
| EMAIL_USER | your-email@gmail.com | ✅ Yes |
| EMAIL_PASSWORD | 16-char-app-password | ✅ Yes |
| EMAIL_FROM | NutriVision Pro <...> | ✅ Yes |
| OTP_EXPIRY | 10 | Optional (default: 10) |
| OTP_LENGTH | 6 | Optional (default: 6) |

---

## 🎯 Quick Fix Checklist

Run through this checklist:

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated (16 characters)
- [ ] EMAIL_HOST = smtp.gmail.com
- [ ] EMAIL_PORT = 587
- [ ] EMAIL_USER = your full Gmail address
- [ ] EMAIL_PASSWORD = App Password (NO SPACES!)
- [ ] EMAIL_FROM contains valid email
- [ ] Saved changes in Render
- [ ] Service redeployed
- [ ] Tested by registering user
- [ ] Checked Render logs for "✅ Email server is ready"

---

## 💡 Pro Tips

1. **Use Gmail for Testing**: Easiest to set up initially
2. **Switch to SendGrid for Production**: More reliable for cloud
3. **Monitor Email Logs**: Watch Render logs for email send confirmations
4. **Test OTP Flow**: Register → Verify → Login to ensure everything works
5. **Set Up Email Alerts**: Get notified if email sending fails

---

## 🆘 Still Having Issues?

1. **Check Render Logs**:
   - Dashboard → Service → Logs
   - Look for email-related errors

2. **Test Locally First**:
   ```bash
   cd backend
   npm run dev
   # Register a test user
   # Check if OTP email arrives
   ```

3. **Try Alternative Email Service**:
   - SendGrid (recommended for production)
   - Mailgun
   - Amazon SES

4. **Verify Email Credentials**:
   - Can you login to Gmail with these credentials?
   - Is 2-Step Verification enabled?
   - Did you copy the App Password correctly?

---

## ✅ Success Indicators

You'll know email is working when you see:

1. **In Render Logs:**
   ```
   ✅ Email server is ready to send messages
   ✅ Email sent successfully to user@example.com: <message-id>
   ```

2. **In User's Inbox:**
   - Beautiful HTML email received
   - OTP code displayed clearly
   - Email not in spam folder

3. **In Mobile App:**
   - User can verify OTP
   - Login works after verification
   - Welcome email received

---

**Need more help?** Check the Render logs and share the error message for specific troubleshooting.
