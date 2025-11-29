import mongoose from 'mongoose';
import { env } from '../config/env';

let isConnected = false;

/**
 * Connect to MongoDB
 * Used for logging, AI chat, and security events
 */
export async function connectMongo(): Promise<void> {
<<<<<<< Updated upstream
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  if (!env.mongoUrl) {
    console.warn('MONGO_URL not configured, MongoDB features will be disabled');
    return;
  }

  try {
    await mongoose.connect(env.mongoUrl, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    // Don't throw - allow app to run without MongoDB
  }
=======
    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    if (!env.mongoUrl) {
        console.warn('MONGO_URL not configured, MongoDB features will be disabled');
        return;
    }

    try {
        await mongoose.connect(env.mongoUrl, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        // Don't throw - allow app to run without MongoDB
    }
>>>>>>> Stashed changes
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectMongo(): Promise<void> {
<<<<<<< Updated upstream
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnect error:', error);
  }
=======
    if (!isConnected) return;

    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('MongoDB disconnect error:', error);
    }
>>>>>>> Stashed changes
}

/**
 * Check if MongoDB is connected
 */
export function isMongoConnected(): boolean {
<<<<<<< Updated upstream
  return isConnected && mongoose.connection.readyState === 1;
=======
    return isConnected && mongoose.connection.readyState === 1;
>>>>>>> Stashed changes
}

export default { connectMongo, disconnectMongo, isMongoConnected };
