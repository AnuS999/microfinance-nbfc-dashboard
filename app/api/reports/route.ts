import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch reports logic will be implemented here
  return NextResponse.json({ message: 'Get reports endpoint' });
}

