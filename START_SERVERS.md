# How to Start NutriVision Pro

## Prerequisites
1. Backend server must be running first
2. Mobile app and computer must be on same WiFi network
3. Current network IP: **10.71.45.1**

## Step 1: Start Backend Server

Open a PowerShell terminal and run:

```powershell
cd "f:\app 1\nutrivision-mobile\backend"
npm run dev
```

Wait for this message:
```
✅ MongoDB Connected
✅ Gmail email service initialized
Network: http://10.71.45.1:5000
```

## Step 2: Start Mobile App

Open a **NEW** PowerShell terminal (keep backend running in the first one):

```powershell
cd "f:\app 1\nutrivision-mobile\mobile-app"
npx expo start
```

## Step 3: Connect Your Phone

1. Open Expo Go app on your phone
2. Scan the QR code shown in terminal
3. Wait for app to load

## Step 4: Test Login

Use these credentials to test:
- **Email**: raybanpranav27@gmail.com
- **Password**: Pranav@27

## Troubleshooting

### Error: "Cannot connect to server"

**Solution 1: Verify Backend is Running**
```powershell
Invoke-RestMethod -Uri "http://10.71.45.1:5000/health"
```
Should return: `{"success":true,"message":"NutriVision API is running"}`

**Solution 2: Verify .env File**
Check `mobile-app/.env` has:
```
EXPO_PUBLIC_API_BASE_URL=http://10.71.45.1:5000/api
```

**Solution 3: Restart Everything**
1. Press `Ctrl+C` in both terminals to stop servers
2. Kill all node processes:
   ```powershell
   Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
   ```
3. Start backend again (Step 1)
4. Start mobile app again (Step 2)
5. In Expo terminal, press `r` to reload app

**Solution 4: Clear Expo Cache**
```powershell
cd "f:\app 1\nutrivision-mobile\mobile-app"
Remove-Item -Path ".expo" -Recurse -Force
npx expo start --clear
```

**Solution 5: Check Windows Firewall**
Make sure Node.js is allowed through Windows Firewall for private networks.

### Different Network IP?

If your computer's IP changed:
1. Check your IP:
   ```powershell
   ipconfig | Select-String -Pattern "IPv4"
   ```
2. Update `mobile-app/.env` with new IP
3. Restart Expo with `--clear` flag

## Quick Test Commands

Test backend from PowerShell:
```powershell
# Health check
Invoke-RestMethod -Uri "http://10.71.45.1:5000/health"

# Test login
$body = '{"email":"raybanpranav27@gmail.com","password":"Pranav@27"}'
Invoke-RestMethod -Uri "http://10.71.45.1:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

## Current Configuration

✅ Backend: Running on http://10.71.45.1:5000
✅ API Endpoints: http://10.71.45.1:5000/api
✅ Database: MongoDB Atlas (connected)
✅ Email Service: Gmail (configured)
✅ Mobile .env: Configured correctly

## Notes

- Keep both terminal windows open while testing
- If you close backend terminal, mobile app will show "Cannot connect" error
- Google OAuth has been removed - only email/password authentication available
- Make sure phone and computer are on same WiFi network
