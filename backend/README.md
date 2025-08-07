# Sniper Backend API

A Node.js/Express backend for the Sniper security tool with MongoDB integration.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 🔑 **API Key Management** - Secure storage and encryption of API keys
- 📊 **Scan Management** - Track and manage security scans
- 🛠️ **Tools Integration** - Support for various security tools
- 🛡️ **Security** - Helmet, CORS, rate limiting, input validation

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, helmet, CORS
- **Development**: nodemon, ts-node

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if using local instance)
   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `DELETE /api/users/profile` - Delete account

### API Keys
- `GET /api/api-keys` - Get user's API keys
- `POST /api/api-keys` - Create/update API key
- `PUT /api/api-keys/:id` - Update API key
- `DELETE /api/api-keys/:id` - Delete API key
- `GET /api/api-keys/:id/decrypt` - Get decrypted key

### Scans
- `GET /api/scans` - Get user's scans
- `POST /api/scans` - Create new scan
- `GET /api/scans/:id` - Get specific scan
- `PUT /api/scans/:id` - Update scan
- `DELETE /api/scans/:id` - Delete scan

### Tools
- `GET /api/tools` - Get available tools
- `GET /api/tools/categories` - Get tool categories
- `GET /api/tools/category/:category` - Get tools by category
- `GET /api/tools/:id` - Get specific tool

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sniper

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:8080

# Encryption Key for API Keys
ENCRYPTION_KEY=your-encryption-key-32-chars-long
```

## Database Models

### User
- username, email, password
- role (user/admin)
- lastLogin, isActive

### ApiKey
- userId, service, keyName
- encryptedKey (AES-256 encrypted)
- isActive, lastUsed

### Scan
- userId, name, description, target
- scanType, status
- configuration, results
- startedAt, completedAt

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **API Key Encryption**: AES-256-CBC encryption
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Mongoose schema validation
- **CORS Protection**: Configurable CORS settings
- **Helmet**: Security headers
- **Rate Limiting**: Configurable rate limits

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Health Check

Visit `http://localhost:5000/health` to check if the API is running.

## License

ISC
