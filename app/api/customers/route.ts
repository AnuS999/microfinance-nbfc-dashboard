import { NextResponse } from 'next/server';
import connectDB from '@/src/lib/db';
import { Customer } from '@/src/models';

export async function GET() {
  try {
    await connectDB();
    
    const customers = await Customer.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ 
      data: customers,
      message: 'Customers fetched successfully' 
    });
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { firstName, lastName, email, phone, address, dateOfBirth } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !dateOfBirth) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if customer with email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    // Create new customer
    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      address,
      dateOfBirth: new Date(dateOfBirth),
    });

    const savedCustomer = await customer.save();

    return NextResponse.json(
      { 
        data: savedCustomer,
        message: 'Customer created successfully' 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating customer:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create customer' },
      { status: 500 }
    );
  }
}
