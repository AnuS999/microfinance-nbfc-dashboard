import { NextResponse } from 'next/server';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Dynamic import to prevent build-time evaluation
async function getDBConnection() {
  try {
    const { connectDB } = await import('@/src/lib/db');
    return await connectDB();
  } catch (error) {
    // During build, if MONGODB_URI is not set, return null
    if (process.env.NEXT_PHASE === 'phase-production-build' || 
        process.env.NEXT_PHASE === 'phase-production-compile') {
      return null;
    }
    throw error;
  }
}

export async function GET() {
  try {
    // Connect to MongoDB (connection is cached, so this is fast on subsequent calls)
    await getDBConnection();
    
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
    await getDBConnection();
    
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

