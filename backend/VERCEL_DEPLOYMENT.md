# 🚀 Vercel Serverless Deployment Guide

## Overview
This guide will help you deploy the NutriVision Pro backend as a serverless API on Vercel.

## Prerequisites
- Vercel account (free tier works fine)
- MongoDB Atlas account
- Environment variables ready (API keys, secrets, etc.)

## Architecture
The backend has been converted to a serverless architecture compatible with Vercel:
- **Serverless Functions**: All API routes are handled by serverless functions
- **Database**: MongoDB with connection pooling for serverless efficiency
- **File Structure**:
  - `api/index.js` - Main serverless handler
  - `vercel.json` - Vercel configuration
  - `src/` - Application code (routes, controllers, models, etc.)

## Step-by-Step Deployment

### 1. Prepare Your Repository
Ensure all changes are committed:
```bash
cd backend
git add .
git commit -m "Convert to Vercel serverless architecture"
git push origin main
```

### 2. Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended for First Time)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Configure your project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (or use `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables** (Click "Environment Variables"):

   **Required Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nutrivision?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this
   NODE_ENV=production
   ```

   **Email Configuration (Choose one):**
   
   **Option 1 - SendGrid:**
   ```
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=your-sendgrid-api-key
   EMAIL_FROM=noreply@yourdomain.com
   ```

   **Option 2 - Gmail:**
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

   **AI Service:**
   ```
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

   **Optional - Google OAuth (if using):**
   ```
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

6. Click **"Deploy"**
7. Wait for deployment to complete (usually 1-2 minutes)
8. Copy your deployment URL (e.g., `https://your-project.vercel.app`)

#### Option B: Using Vercel CLI

```bash
cd backend
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

### 4. Verify Deployment

Test your API endpoints:

```bash
# Health check
curl https://your-project.vercel.app/health

# API info
curl https://your-project.vercel.app/api

# Test registration (should return success or validation error)
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@123"}'
```

## Environment Variables Explained

### Essential Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `my-super-secret-key-12345` |
| `NODE_ENV` | Environment mode | `production` |

### Email Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_SERVICE` | Email service provider | `sendgrid` or `gmail` |
| `SENDGRID_API_KEY` | SendGrid API key | `SG.xxxxx` |
| `EMAIL_FROM` | Sender email address | `noreply@yourdomain.com` |
| `EMAIL_USER` | Gmail username (if using Gmail) | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `xxxx xxxx xxxx xxxx` |

### Optional Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | For food analysis |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | For Google Sign-In |

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### package.json (relevant parts)
```json
{
  "main": "api/index.js",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## API Endpoints

After deployment, your API will be available at:

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `POST /api/auth/google` - Google Sign-In (optional)

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get user statistics

### Scanner Endpoints
- `POST /api/scanner/analyze` - Analyze food image
- `GET /api/scanner/history` - Get analysis history
- `DELETE /api/scanner/history/:id` - Delete analysis

### Health & Info
- `GET /` - API welcome message
- `GET /health` - Health check
- `GET /api` - API documentation

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user:
   - Go to **Database Access**
   - Add new user with password
   - Grant **Read and Write** permissions
4. Whitelist Vercel IPs:
   - Go to **Network Access**
   - Click **Add IP Address**
   - Choose **Allow Access from Anywhere** (`0.0.0.0/0`)
   - This is necessary for Vercel serverless functions
5. Get connection string:
   - Go to **Database**
   - Click **Connect**
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `nutrivision` or your preferred name

## Email Setup

### SendGrid (Recommended)
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Verify a sender email address
3. Create API key with **Mail Send** permissions
4. Add to Vercel environment variables

### Gmail (Alternative)
1. Enable 2-Factor Authentication on your Google account
2. Generate App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASSWORD` variable

## Gemini AI Setup (For Food Analysis)
1. Go to [ai.google.dev](https://ai.google.dev)
2. Get API key for Gemini
3. Add to `GEMINI_API_KEY` environment variable

## Updating Your Mobile App

After deployment, update your mobile app's API URL:

Edit `mobile-app/src/utils/constants.js`:

```javascript
// Replace with your Vercel deployment URL
export const API_BASE_URL = 'https://your-project.vercel.app/api';
```

## Testing the Deployed API

### 1. Test Health Endpoint
```bash
curl https://your-project.vercel.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "NutriVision API is running",
  "status": "healthy",
  "serverless": true,
  "platform": "Vercel"
}
```

### 2. Test Registration
```bash
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

### 3. Test Login (after verifying OTP)
```bash
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

## Troubleshooting

### Issue: 500 Internal Server Error
**Solution**: Check Vercel logs:
1. Go to your project in Vercel Dashboard
2. Click on **Functions** tab
3. Look for error messages
4. Common causes:
   - Missing environment variables
   - MongoDB connection issues
   - Invalid credentials

### Issue: MongoDB Connection Timeout
**Solution**: 
- Verify MongoDB URI is correct
- Ensure IP whitelist includes `0.0.0.0/0`
- Check database user credentials

### Issue: Email Not Sending
**Solution**:
- Verify email service credentials
- Check SendGrid API key permissions
- For Gmail, ensure App Password is used (not regular password)
- Check Vercel function logs for email errors

### Issue: CORS Errors in Mobile App
**Solution**: 
- The serverless function includes CORS middleware
- If issues persist, check that requests include proper headers
- Verify API_BASE_URL in mobile app constants

## Performance Optimization

### Cold Starts
- Vercel serverless functions may have cold starts (1-2 seconds on first request)
- Subsequent requests are fast (<100ms)
- Database connection pooling minimizes this

### Rate Limits
- Vercel Free tier: 100GB bandwidth, 100 hours of function execution/month
- MongoDB Atlas Free tier: 512MB storage, shared cluster
- Consider upgrading if you exceed these limits

## Monitoring

### Vercel Dashboard
- View real-time logs
- Monitor function invocations
- Check bandwidth usage
- View deployment history

### MongoDB Atlas
- Monitor database connections
- Check query performance
- View storage usage

## Cost Estimation

### Free Tier Includes:
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **MongoDB Atlas**: 512MB storage, shared cluster
- **SendGrid**: 100 emails/day free

### Typical Usage (Hobby Project):
- Expected cost: **$0/month** on free tiers
- Sufficient for: ~1000 monthly active users

## Continuous Deployment

Once set up, Vercel automatically deploys when you push to your repository:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Vercel will automatically:
1. Detect changes
2. Build and deploy
3. Run health checks
4. Switch to new deployment if successful

## Security Best Practices

1. ✅ Never commit `.env` file
2. ✅ Use strong JWT secrets (32+ characters)
3. ✅ Rotate API keys regularly
4. ✅ Enable MongoDB IP whitelist (even if `0.0.0.0/0`)
5. ✅ Use HTTPS only (Vercel provides this automatically)
6. ✅ Monitor logs for suspicious activity
7. ✅ Implement rate limiting for production (consider adding middleware)

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **SendGrid Docs**: https://docs.sendgrid.com
- **Gemini AI Docs**: https://ai.google.dev/docs

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test all endpoints
3. ✅ Update mobile app with new API URL
4. ✅ Test mobile app end-to-end
5. ✅ Monitor logs for issues
6. ✅ Set up custom domain (optional)
7. ✅ Implement analytics (optional)

---

**Congratulations!** 🎉 Your NutriVision Pro backend is now running on Vercel as a serverless API!
