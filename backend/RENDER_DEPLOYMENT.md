# 🚀 Deploy NutriVision Pro Backend to Render.com

Complete step-by-step guide to deploy your backend to Render.com

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub repository pushed with all code
- ✅ MongoDB Atlas database set up
- ✅ Google Gemini API key
- ✅ Gmail app password generated

---

## 🌟 Step 1: Prepare Your Credentials

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster (if not already created)
3. Go to **Database Access** → Create a user with password
4. Go to **Network Access** → Add IP: `0.0.0.0/0` (Allow from anywhere)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Get API Key**
3. Create or select a project
4. Copy your API key

### Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Generate password for "Mail"
5. Copy the 16-character password

### JWT Secret
Generate a strong random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Step 2: Deploy on Render.com

### Create Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub (recommended)

### Create Web Service

1. **Click "New +" → "Web Service"**

2. **Connect GitHub Repository**
   - Authorize Render to access your GitHub
   - Select repository: `Building-APK-for-NutriVision-Pro`

3. **Configure Service Settings:**
   ```
   Name: nutrivision-backend
   Region: Singapore (or closest to your users)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Select Plan:**
   - Choose **Free** plan
   - Note: Free tier sleeps after 15 minutes of inactivity

5. **Advanced Settings** → Add Environment Variables:

   Click "Add Environment Variable" and add these one by one:

   ```env
   # Server
   NODE_ENV=production
   PORT=5000

   # Database - IMPORTANT: Replace with your actual MongoDB URI
   MONGODB_URI=mongodb+srv://raybanpranavmahesh2023:UixrwbHoHNs5EOjF@lostperson.zgd2p.mongodb.net/nutriVisionDB?retryWrites=true&w=majority

   # JWT - Generate your own secure secret
   JWT_SECRET=your-super-secure-jwt-secret-key-change-this
   JWT_EXPIRE=7d

   # Google Gemini AI - Add your actual API key
   GEMINI_API_KEY=your-gemini-api-key-here

   # Email Configuration - Add your Gmail credentials
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=raybanpranav@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=NutriVision Pro <noreply@nutrivision.com>

   # OTP Settings
   OTP_EXPIRY=10
   OTP_LENGTH=6
   ```

6. **Click "Create Web Service"**

---

## ⏱️ Step 3: Wait for Deployment

- First deployment takes 5-10 minutes
- Watch the build logs in real-time
- Look for success messages:
  - ✅ Build completed
  - ✅ MongoDB Connected
  - ✅ Server running on port

---

## 🧪 Step 4: Test Your Deployment

### Get Your Backend URL
After deployment, your URL will be:
```
https://nutrivision-backend.onrender.com
```

### Test Health Endpoint

**In Browser:**
```
https://nutrivision-backend.onrender.com/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "NutriVision API is running",
  "status": "healthy",
  "environment": "production",
  "timestamp": "2025-10-19T14:30:00.000Z",
  "uptime": 123.456
}
```

### Test Root Endpoint
```
https://nutrivision-backend.onrender.com/
```

### Test with cURL
```bash
# Health check
curl https://nutrivision-backend.onrender.com/health

# API info
curl https://nutrivision-backend.onrender.com/api
```

---

## 📱 Step 5: Update Mobile App

Update your mobile app's `.env` file:

```env
API_BASE_URL=https://nutrivision-backend.onrender.com/api
```

Or update `app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://nutrivision-backend.onrender.com/api"
    }
  }
}
```

---

## 🔄 Step 6: Auto-Deploy (Optional but Recommended)

Render automatically redeploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update backend feature"
git push

# Render will automatically:
# 1. Detect the push
# 2. Pull latest code
# 3. Run build command
# 4. Restart service
```

---

## 🛠️ Troubleshooting

### Build Fails

**Check logs:**
- Go to Render Dashboard → Your Service → Logs
- Look for error messages

**Common issues:**
- Missing dependencies → Run `npm install` locally first
- Node version mismatch → Set in `package.json` engines

### Service Starts But Crashes

**Check logs for:**
- MongoDB connection errors → Verify MONGODB_URI
- Missing environment variables → Double-check all vars
- Port binding issues → Let Render assign PORT automatically

### Database Connection Issues

1. **Whitelist Render IPs:**
   - MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (Allow from anywhere)

2. **Check Connection String:**
   - Ensure username/password are correct
   - No special characters in password (or URL encode them)

### Email Not Working

1. **Gmail App Password:**
   - Must use App Password, not regular password
   - Requires 2-Step Verification enabled

2. **Check Email Limits:**
   - Gmail limits: 500 emails/day for free accounts

---

## 📊 Monitoring

### View Logs
```
Render Dashboard → Your Service → Logs
```

### Check Metrics
```
Render Dashboard → Your Service → Metrics
```

### Set Up Alerts
```
Render Dashboard → Your Service → Settings → Notifications
```

---

## 💰 Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month
- ✅ Automatic SSL
- ✅ Custom domains
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ Cold starts (takes 30-60s to wake)
- ⚠️ Shared CPU/RAM

**To keep alive (optional):**
- Use a cron job to ping your API every 10 minutes
- Upgrade to paid plan ($7/month)

---

## 🔒 Security Best Practices

### For Production:

1. **Restrict CORS:**
   ```javascript
   const corsOptions = {
     origin: 'https://your-app-domain.com',
     credentials: true,
   };
   ```

2. **Use Strong Secrets:**
   - Generate JWT_SECRET with crypto
   - Never commit `.env` to git

3. **Enable Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```

4. **Add Helmet.js:**
   ```bash
   npm install helmet
   ```

5. **Monitor Logs:**
   - Set up error alerting
   - Review logs regularly

---

## 🎯 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Health endpoint returns 200
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login
- [ ] OTP emails working
- [ ] Food scan analysis working
- [ ] Updated mobile app with new API URL
- [ ] Tested mobile app end-to-end
- [ ] Set up monitoring/alerts

---

## 📞 Support

**Issues with Render:**
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)

**Issues with Your App:**
- Check logs first
- Review this deployment guide
- Verify all environment variables

---

## 🎉 Success!

Your backend is now live at:
```
https://nutrivision-backend.onrender.com
```

You can now build your mobile app and share it with users! 🚀

---

**Deployed by:** Pranav Rayban  
**Contact:** raybanpranav@gmail.com  
**Repository:** https://github.com/pranavsoftware/Building-APK-for-NutriVision-Pro
