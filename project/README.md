# Zaymazone E-commerce Platform

An artisan marketplace platform built with React, Vite, and MongoDB. The application has been fully integrated with MongoDB, replacing all mock data with real database interactions.

## Features

- User authentication (buyers and sellers)
- Product browsing and searching
- Shopping cart functionality
- Order management
- Seller dashboard
- Buyer dashboard
- Full MongoDB integration for persistent data storage

## Project Structure

The project has been reorganized to separate client-side and server-side code:

```
project/
├── src/                  # Client-side code
│   ├── components/       # React components
│   ├── pages/            # React pages
│   ├── services/         # API service calls
│   ├── store/            # State management
│   └── utils/            # Utility functions
├── server/               # Server-side code
│   ├── models/           # Mongoose models
│   ├── routes/           # Express API routes
│   ├── utils/            # Server utilities
│   ├── index.js          # Server entry point
│   └── package.json      # Server dependencies
├── package.json          # Client dependencies
└── server.js            # Script to start both client and server
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas) - The application is configured to use a local MongoDB instance by default

### Installation

1. Install client dependencies:
   ```
   npm install
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/zaymazone
     ```

4. Database Setup:
   - MongoDB will automatically create the `zaymazone` database when the server first connects
   - The application uses the following collections:
     - `users` - Stores user information for both buyers and artisans
     - `products` - Stores product information
     - `orders` - Stores order information

### Running the Application

1. Start both client and server with a single command:
   ```
   npm run start-all
   ```

   This will start:
   - The React client on http://localhost:5173
   - The Express API server on http://localhost:5000

2. Alternatively, you can start them separately:
   - Client: `npm run dev`
   - Server: `cd server && npm start`

### Troubleshooting

#### Authentication Issues

If you encounter a `CastError` related to `ObjectId` in the authentication middleware, this is likely because:

- The token format is incorrect - tokens should follow the format `simulated-jwt-token-{validUserId}-{timestamp}` where `{validUserId}` must be a valid MongoDB ObjectId (24-character hex string)
- The user ID doesn't exist in the database
- The Authorization header format is incorrect

Ensure that:
1. Users are properly created in the database before authentication
2. The token generation logic uses valid MongoDB ObjectIds
3. The client correctly sends the Authorization header

## API Endpoints

### Products
- `GET /api/products` - Get all products with optional filtering
- `GET /api/products/:id` - Get a product by ID
- `GET /api/products/artisan/:artisanId` - Get products by artisan
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users/login` - Login user
- `POST /api/users` - Register a new user
- `PUT /api/users/:id` - Update a user

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get an order by ID
- `GET /api/orders/user/:userId` - Get orders by user
- `GET /api/orders/seller/:sellerId` - Get orders by seller
- `GET /api/orders/seller/:sellerId/recent` - Get recent orders by seller
- `PUT /api/orders/:id/status` - Update order status
```
The application will be available at http://localhost:5173

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `NODE_ENV`: Environment (development, production)
- `PORT`: Server port (for backend)

## Project Structure

The project has been reorganized to separate client-side and server-side code as described above. The old structure with MongoDB models in the src directory has been removed.