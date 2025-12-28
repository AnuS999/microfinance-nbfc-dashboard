# MongoDB Setup Guide

This guide will help you set up MongoDB for the Microfinance Dashboard application.

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (for cloud) OR MongoDB installed locally

## Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create a Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your specific IP)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database-name>` with `microfinance-dashboard` (or your preferred name)

### Option 2: Local MongoDB

1. **Install MongoDB**
   - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Install following the instructions for your OS
   - MongoDB will run on `mongodb://localhost:27017`

2. **Connection String**
   - Use: `mongodb://localhost:27017/microfinance-dashboard`

## Environment Variables

Create a `.env.local` file in the root of your project:

```env
# MongoDB Connection String
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/microfinance-dashboard

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/microfinance-dashboard

# NextAuth Configuration (optional if not using auth)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Database Models

The application uses the following MongoDB collections:

1. **customers** - Customer information
   - Fields: firstName, lastName, email, phone, address, dateOfBirth

2. **loans** - Loan records
   - Fields: customerId, amount, interestRate, term, status, purpose, disbursementDate, maturityDate

3. **transactions** - Financial transactions
   - Fields: loanId, customerId, type, amount, status, transactionDate, description

4. **users** - User accounts (if using authentication)
   - Fields: email, name, password, role, isActive

## Testing the Connection

After setting up your `.env.local` file:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check the console for connection messages:
   - ✅ MongoDB connected successfully (if successful)
   - ❌ MongoDB connection error (if there's an issue)

## API Endpoints

Once MongoDB is set up, the following endpoints will work:

- `GET /api/customers` - Fetch all customers
- `POST /api/customers` - Create a new customer
- `GET /api/loans` - Fetch all loans
- `POST /api/loans` - Create a new loan
- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions` - Create a new transaction

## Troubleshooting

### Connection Errors

- **"MONGODB_URI not set"**: Make sure `.env.local` exists and has `MONGODB_URI` defined
- **Authentication failed**: Check your MongoDB username and password
- **Connection timeout**: Verify your IP is whitelisted in MongoDB Atlas
- **Network error**: Check your internet connection and MongoDB Atlas cluster status

### Common Issues

1. **Port already in use**: Make sure MongoDB is running (for local) or your Atlas cluster is active
2. **Invalid connection string**: Double-check the format and ensure password is URL-encoded if it contains special characters
3. **Database not found**: MongoDB will create the database automatically on first connection

## Production Deployment

For production (Vercel, etc.):

1. Add `MONGODB_URI` to your hosting platform's environment variables
2. Make sure to use a strong password for your database user
3. Consider using a dedicated database cluster (not free tier) for production
4. Set up proper IP whitelisting for production servers

