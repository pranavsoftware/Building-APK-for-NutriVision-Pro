# NutriVision Pro API Documentation

## Base URL
```
http://localhost:5000/api
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🔐 Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Validation Rules:**
- Name: 2-50 characters
- Email: Valid email format
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for OTP.",
  "data": {
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- 400: User already exists
- 400: Weak password
- 500: Registration error

---

### 2. Verify OTP

**Endpoint:** `POST /api/auth/verify-otp`

**Description:** Verify email with OTP code

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
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

**Error Responses:**
- 400: Invalid or expired OTP
- 404: User not found

---

### 3. Login

**Endpoint:** `POST /api/auth/login`

**Description:** Login with email and password

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": null,
      "totalScans": 15
    }
  }
}
```

**Error Responses:**
- 401: Invalid credentials
- 401: Account not verified

---

### 4. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Request password reset OTP

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "data": null
}
```

**Error Responses:**
- 404: No account found with this email

---

### 5. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Description:** Reset password with OTP

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewPassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful",
  "data": null
}
```

**Error Responses:**
- 400: Invalid or expired OTP
- 400: Weak password
- 404: User not found

---

### 6. Resend OTP

**Endpoint:** `POST /api/auth/resend-otp`

**Description:** Resend OTP to email

**Request Body:**
```json
{
  "email": "john@example.com",
  "purpose": "signup"
}
```

**Purpose values:** `signup` or `reset`

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": null
}
```

---

## 👤 User Endpoints (Protected)

**Authentication Required:** All user endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

### 1. Get Profile

**Endpoint:** `GET /api/user/profile`

**Description:** Get current user profile

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "data:image/jpeg;base64,...",
      "totalScans": 15,
      "isVerified": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "lastLogin": "2025-01-20T08:15:00.000Z"
    }
  }
}
```

---

### 2. Update Profile

**Endpoint:** `PUT /api/user/profile`

**Description:** Update user profile

**Request Body:**
```json
{
  "name": "John Updated",
  "profilePicture": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "John Updated",
      "email": "john@example.com",
      "profilePicture": "data:image/jpeg;base64,...",
      "totalScans": 15
    }
  }
}
```

---

### 3. Get User Statistics

**Endpoint:** `GET /api/user/stats`

**Description:** Get user statistics

**Success Response (200):**
```json
{
  "success": true,
  "message": "Statistics fetched successfully",
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

---

## 🍎 Scanner Endpoints (Protected)

### 1. Analyze Food Image

**Endpoint:** `POST /api/scanner/analyze`

**Description:** Analyze food image with AI

**Request Body:**
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Food analyzed successfully",
  "data": {
    "analysis": {
      "id": "60d5ec49f1b2c72b8c8e4a1b",
      "foodName": "Apple",
      "category": "Fruit",
      "caloriesPer100g": 52,
      "nutritionalInfo": {
        "protein": "0.3g",
        "carbohydrates": "14g",
        "fat": "0.2g",
        "fiber": "2.4g",
        "vitamins": ["Vitamin C", "Vitamin A", "Vitamin K"],
        "minerals": ["Potassium", "Calcium", "Iron"]
      },
      "healthBenefits": [
        "Rich in antioxidants",
        "Supports heart health",
        "Aids digestion"
      ],
      "allergens": [],
      "dietaryInfo": {
        "isVegan": true,
        "isVegetarian": true,
        "isGlutenFree": true,
        "isDairyFree": true
      },
      "glycemicIndex": "Low",
      "storageTips": "Store in a cool, dry place or refrigerate for longer shelf life.",
      "scannedAt": "2025-01-20T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- 400: Image required
- 500: Analysis failed

---

### 2. Get Scan History

**Endpoint:** `GET /api/scanner/history?page=1&limit=20`

**Description:** Get user's scan history with pagination

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Success Response (200):**
```json
{
  "success": true,
  "message": "History fetched successfully",
  "data": {
    "history": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4a1b",
        "foodName": "Apple",
        "category": "Fruit",
        "caloriesPer100g": 52,
        "scannedAt": "2025-01-20T10:30:00.000Z"
      },
      // More items...
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 45,
      "itemsPerPage": 20
    }
  }
}
```

---

### 3. Get Analysis by ID

**Endpoint:** `GET /api/scanner/analysis/:id`

**Description:** Get detailed analysis by ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Analysis fetched successfully",
  "data": {
    "analysis": {
      "_id": "60d5ec49f1b2c72b8c8e4a1b",
      "foodName": "Apple",
      "category": "Fruit",
      "imageBase64": "data:image/jpeg;base64,...",
      "caloriesPer100g": 52,
      "nutritionalInfo": { ... },
      "healthBenefits": [ ... ],
      "allergens": [],
      "dietaryInfo": { ... },
      "glycemicIndex": "Low",
      "storageTips": "...",
      "scannedAt": "2025-01-20T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- 404: Analysis not found

---

### 4. Delete Analysis

**Endpoint:** `DELETE /api/scanner/analysis/:id`

**Description:** Delete a scan from history

**Success Response (200):**
```json
{
  "success": true,
  "message": "Analysis deleted successfully",
  "data": null
}
```

**Error Responses:**
- 404: Analysis not found

---

### 5. Search History

**Endpoint:** `GET /api/scanner/search?query=apple`

**Description:** Search scan history

**Query Parameters:**
- `query` (required): Search term

**Success Response (200):**
```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": {
    "results": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4a1b",
        "foodName": "Apple",
        "category": "Fruit",
        "caloriesPer100g": 52,
        "scannedAt": "2025-01-20T10:30:00.000Z"
      }
    ]
  }
}
```

---

## 🔒 Error Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Internal Server Error |

---

## 📝 Common Error Messages

### Authentication Errors
- `"User already exists with this email"`
- `"Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"`
- `"Invalid or expired OTP"`
- `"Invalid credentials"`
- `"Please verify your account first"`
- `"Not authorized to access this route"`
- `"Token is invalid or expired"`

### Validation Errors
- `"Name is required"`
- `"Please provide a valid email"`
- `"Password is required"`
- `"OTP must be 6 digits"`

### Data Errors
- `"User not found"`
- `"Analysis not found"`
- `"Please provide a food image"`

---

## 🧪 Testing with Postman/Thunder Client

### 1. Register & Login Flow

```
1. POST /api/auth/register
   Body: { name, email, password }

2. Check email for OTP

3. POST /api/auth/verify-otp
   Body: { email, otp }
   Save token from response

4. Use token in subsequent requests
   Header: Authorization: Bearer <token>
```

### 2. Analyze Food

```
1. Convert image to base64
   
2. POST /api/scanner/analyze
   Header: Authorization: Bearer <token>
   Body: {
     "imageBase64": "data:image/jpeg;base64,..."
   }
```

### 3. Get History

```
GET /api/scanner/history?page=1&limit=20
Header: Authorization: Bearer <token>
```

---

## 🔧 Rate Limiting (Recommended for Production)

Implement rate limiting for:
- Registration: 5 requests per hour per IP
- Login: 10 requests per hour per IP
- OTP: 3 requests per 10 minutes per email
- Scanner: 20 requests per hour per user

---

## 📊 Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String (base64),
  isVerified: Boolean,
  totalScans: Number,
  lastLogin: Date,
  createdAt: Date
}
```

### FoodAnalysis
```javascript
{
  userId: ObjectId,
  foodName: String,
  category: String,
  imageBase64: String,
  caloriesPer100g: Number,
  nutritionalInfo: {
    protein: String,
    carbohydrates: String,
    fat: String,
    fiber: String,
    vitamins: [String],
    minerals: [String]
  },
  healthBenefits: [String],
  allergens: [String],
  dietaryInfo: {
    isVegan: Boolean,
    isVegetarian: Boolean,
    isGlutenFree: Boolean,
    isDairyFree: Boolean
  },
  glycemicIndex: String,
  storageTips: String,
  scannedAt: Date
}
```

### OTP
```javascript
{
  email: String,
  otp: String,
  purpose: String (enum: 'signup', 'reset'),
  expiresAt: Date,
  createdAt: Date
}
```

---

## 🚀 Best Practices

1. **Always use HTTPS in production**
2. **Implement rate limiting**
3. **Validate all inputs**
4. **Handle errors gracefully**
5. **Log all important events**
6. **Keep JWT secret secure**
7. **Use environment variables**
8. **Implement request timeouts**
9. **Monitor API performance**
10. **Keep API documentation updated**

---

**API Version:** 1.0.0  
**Last Updated:** January 2025  
**Contact:** support@nutrivision.com
