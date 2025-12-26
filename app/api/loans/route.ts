import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';

export async function GET() {
  try {
    // Connect to MongoDB (connection is cached, so this is fast on subsequent calls)
    await connectDB();
    
    // Fetch loans logic will be implemented here
    // Example: const loans = await Loan.find();
    
    return NextResponse.json({ message: 'Get loans endpoint' });
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    const body = await request.json();
    // Create loan logic will be implemented here
    // Example: const loan = await Loan.create(body);
    
    return NextResponse.json({ message: 'Create loan endpoint' });
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

