## Authentication Service - Data Flow & Testing Guide

### Expected Request Format

**POST** `/api/auth/register`

```json
{
  "googleId": "user-google-id-123",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://example.com/avatar.jpg"
}
```

### OR with credential wrapper:
```json
{
  "credential": {
    "googleId": "user-google-id-123",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://example.com/avatar.jpg"
  }
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Validation Error Response (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"googleId\" is required",
    "\"email\" is required"
  ]
}
```

### Issues Fixed:
✅ Fixed validate.mid.js - changed `err` to `error`
✅ Created auth.validator.js with proper Joi schema
✅ Added debugging logs to track data flow
✅ Added required field validation in controller
✅ Fixed app.js - moved error middleware to the end
✅ Fixed auth.route.js - added validation middleware
✅ Added proper route prefix `/api/auth`

### Debugging Tips:
The controller now logs:
- 📨 Incoming request body
- 📦 Extracted data
- ❌ Missing required fields (if any)

Watch the console output when making requests to see the data flow.
