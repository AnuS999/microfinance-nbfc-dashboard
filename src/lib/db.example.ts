/**
 * Example usage of the MongoDB connection utility in API routes
 * 
 * This file demonstrates how to use the connectDB function in your API routes.
 * It's not meant to be imported - just a reference guide.
 */

// Example 1: Using in an API route handler
/*
import { connectDB } from '@/src/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    // Your database operations here
    // const data = await YourModel.find();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}
*/

// Example 2: Using in a server component or server action
/*
import { connectDB } from '@/src/lib/db';
import YourModel from '@/models/your-model';

export async function getData() {
  await connectDB();
  return await YourModel.find();
}
*/

// Example 3: Using with error handling
/*
import { connectDB } from '@/src/lib/db';

export async function handler() {
  try {
    const db = await connectDB();
    // Connection is cached, so subsequent calls are fast
    // Your operations here
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
*/

