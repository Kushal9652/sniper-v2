# Authentication Integration

This document describes the authentication integration between the frontend and backend.

## Overview

The authentication system uses JWT tokens and consists of:

- **Backend**: Express.js API with JWT authentication
- **Frontend**: React with Context API for state management
- **Database**: MongoDB for user storage

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp env.example .env
   ```

4. Update `.env` with your configuration:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a secure random string
   - Set `CORS_ORIGIN` to your frontend URL (default: http://localhost:8080)

5. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd sniper-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   - Set `VITE_API_URL` to your backend API URL (default: http://localhost:5000/api)

5. Start the frontend:
   ```bash
   npm run dev
   ```

## Features

### Authentication Flow

1. **Registration**: Users can create accounts with username, email, and password
2. **Login**: Users authenticate with email and password
3. **Protected Routes**: Certain pages require authentication
4. **Token Management**: JWT tokens are stored in localStorage
5. **Auto-logout**: Invalid tokens automatically log users out

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Frontend Components

- **AuthContext**: Manages authentication state globally
- **ApiService**: Handles API communication
- **ProtectedRoute**: Wrapper for protected pages
- **Login/Signup**: Authentication forms

### Security Features

- JWT token expiration
- Password requirements validation
- CORS protection
- Rate limiting (configured in backend)
- Secure headers with Helmet

## Usage

### Protecting Routes

Wrap components with `ProtectedRoute`:

```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Using Authentication Context

```tsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Component logic
};
```

### Making Authenticated API Calls

```tsx
import ApiService from '../services/api';

// The service automatically includes auth headers
const data = await ApiService.getScans();
```

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sniper
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:8080
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS_ORIGIN matches frontend URL
2. **Connection Refused**: Check if backend is running on correct port
3. **Token Issues**: Clear localStorage and re-login
4. **MongoDB Connection**: Verify MongoDB is running and URI is correct

### Development Tips

- Use browser dev tools to inspect network requests
- Check browser console for authentication errors
- Monitor backend logs for API errors
- Verify environment variables are loaded correctly
