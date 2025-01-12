# Service Booking Platform

A modern web application for booking various services, built with React, Node.js, and MongoDB.

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Click "Build a Database"
4. Choose "FREE" tier
5. Select your preferred provider & region
6. Click "Create Cluster"
7. Set up database access:
   - Go to Security > Database Access
   - Add new database user
   - Choose password authentication
   - Set username and password
   - Set privileges to "Read and write to any database"
8. Set up network access:
   - Go to Security > Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
9. Get your connection string:
   - Go to Deployment > Database
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### 2. Environment Setup

1. Backend Setup:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Update `.env` file with your credentials:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key
   ```

3. Install dependencies:
   ```bash
   cd backend
   npm install
   
   cd ../frontend
   npm install
   ```

### 3. Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

### 4. Testing the API

#### Option 1: Using Postman
1. Import `Service_Booking_API.postman_collection.json` into Postman
2. Set the environment variable `baseUrl` to `http://localhost:3000`
3. Follow the testing sequence:
   - Register a client/provider
   - Login to get the auth token
   - The token will be automatically set for subsequent requests

#### Option 2: Using VS Code REST Client
1. Install "REST Client" extension in VS Code
2. Open `test.http` file
3. Click "Send Request" above each request

## Testing Sequence

1. Register a new client:
   - POST /api/auth/register
   - Save the returned token

2. Register a service provider:
   - POST /api/auth/register-provider
   - Save the returned token

3. Create a service (as provider):
   - Use provider's token
   - POST /api/services

4. View all services:
   - GET /api/services
   - No authentication required

5. Add a promotion to a service:
   - Use provider's token
   - POST /api/services/{serviceId}/promotions

## Features

- User Authentication (JWT)
- Service Management
- Real-time Location Tracking
- Booking System
- Promotion Management
- Chat System
- Payment Integration (coming soon)

## API Documentation

### Authentication Endpoints

- POST /api/auth/register - Register a new client
- POST /api/auth/register-provider - Register a new service provider
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user profile

### Service Endpoints

- GET /api/services - Get all services
- POST /api/services - Create a new service
- GET /api/services/:id - Get service by ID
- POST /api/services/:id/promotions - Add promotion to service
