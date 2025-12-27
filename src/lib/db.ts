import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const globalForMongoose = global as unknown as {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

/**
 * Creates a new MongoDB connection or returns the existing cached connection.
 * This prevents multiple connections in Next.js development environment.
 */
async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable. For local development, add it to .env.local. For deployment, set it in your hosting platform\'s environment variables.'
    );
  }

  // If we already have a cached connection, return it
  if (globalForMongoose.mongoose.conn) {
    return globalForMongoose.mongoose.conn;
  }

  // If we don't have a connection promise, create one
  if (!globalForMongoose.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    globalForMongoose.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    // Wait for the connection promise to resolve
    globalForMongoose.mongoose.conn = await globalForMongoose.mongoose.promise;
  } catch (e) {
    // If connection fails, clear the promise so we can retry
    globalForMongoose.mongoose.promise = null;
    throw e;
  }

  return globalForMongoose.mongoose.conn;
}

/**
 * Disconnects from MongoDB (useful for testing or cleanup)
 */
async function disconnectDB(): Promise<void> {
  if (globalForMongoose.mongoose.conn) {
    await mongoose.disconnect();
    globalForMongoose.mongoose.conn = null;
    globalForMongoose.mongoose.promise = null;
    console.log('✅ MongoDB disconnected');
  }
}

// Initialize the global mongoose object if it doesn't exist
if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

export { connectDB, disconnectDB };
export default connectDB;

