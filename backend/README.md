# NutriVision Pro - Backend API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Google Gemini API Key
- Gmail account for email service

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your credentials:
   - MongoDB connection string
   - JWT secret key
   - Gemini API key
   - Gmail credentials

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}

Response:
{
  "success": true,
  "message": "Registration successful. Please check your email for OTP.",
  "data": {
    "email": "john@example.com"
  }
}
```

#### 2. Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "Account verified successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": null,
      "totalScans": 0
    }
  }
}
```

#### 3. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
}
```

#### 4. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### 5. Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewPassword123"
}
```

#### 6. Resend OTP
```http
POST /api/auth/resend-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "purpose": "signup"
}
```

### User Endpoints (Protected)

All user endpoints require authentication header:
```
Authorization: Bearer <token>
```

#### 1. Get Profile
```http
GET /api/user/profile
```

#### 2. Update Profile
```http
PUT /api/user/profile
Content-Type: application/json

{
  "name": "John Updated",
  "profilePicture": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

#### 3. Get User Statistics
```http
GET /api/user/stats

Response:
{
  "success": true,
  "data": {
    "stats": {
      "totalScans": 15,
      "scansThisWeek": 3,
      "favoriteCategory": "Fruit",
      "memberSince": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

### Scanner Endpoints (Protected)

#### 1. Analyze Food Image
```http
POST /api/scanner/analyze
Content-Type: application/json

{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

Response:
{
  "success": true,
  "message": "Food analyzed successfully",
  "data": {
    "analysis": {
      "id": "60d5ec49f1b2c72b8c8e4a1a",
      "foodName": "Apple",
      "category": "Fruit",
      "caloriesPer100g": 52,
      "nutritionalInfo": {
        "protein": "0.3g",
        "carbohydrates": "14g",
        "fat": "0.2g",
        "fiber": "2.4g",
        "vitamins": ["Vitamin C", "Vitamin A"],
        "minerals": ["Potassium", "Calcium"]
      },
      "healthBenefits": [...],
      "allergens": [],
      "dietaryInfo": {
        "isVegan": true,
        "isVegetarian": true,
        "isGlutenFree": true,
        "isDairyFree": true
      },
      "glycemicIndex": "Low",
      "storageTips": "...",
      "scannedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

#### 2. Get History
```http
GET /api/scanner/history?page=1&limit=20
```

#### 3. Get Analysis by ID
```http
GET /api/scanner/analysis/:id
```

#### 4. Delete Analysis
```http
DELETE /api/scanner/analysis/:id
```

#### 5. Search History
```http
GET /api/scanner/search?query=apple
```

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 📝 Notes

- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- OTP codes expire after 10 minutes
- Maximum image size: 10MB
- Supported image formats: JPEG, PNG, JPG, WEBP

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Email**: Nodemailer
- **AI**: Google Gemini API
- **Security**: bcryptjs, express-validator, cors

## 📧 Email Configuration

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use that password in EMAIL_PASSWORD

## 🚨 Important Security Notes

1. Never commit the `.env` file
2. Use strong JWT_SECRET in production
3. Enable CORS only for your frontend domain in production
4. Use HTTPS in production
5. Rate limit authentication endpoints in production

## 📄 License

MIT
