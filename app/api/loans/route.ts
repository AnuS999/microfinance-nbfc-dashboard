import { NextResponse } from 'next/server';
import connectDB from '@/src/lib/db';
import { Loan, Customer } from '@/src/models';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    
    const loans = await Loan.find({})
      .populate('customerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ 
      data: loans,
      message: 'Loans fetched successfully' 
    });
  } catch (error: any) {
    console.error('Error fetching loans:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch loans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { customerId, amount, interestRate, term, purpose, status } = body;

    // Validate required fields
    if (!customerId || !amount || !interestRate || !term) {
      return NextResponse.json(
        { error: 'Customer ID, amount, interest rate, and term are required' },
        { status: 400 }
      );
    }

    // Verify customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Calculate maturity date if disbursement date is provided or status is active
    let maturityDate;
    if (status === 'active' || status === 'approved') {
      const disbursementDate = new Date();
      maturityDate = new Date(disbursementDate);
      maturityDate.setMonth(maturityDate.getMonth() + term);
    }

    // Create new loan
    const loan = new Loan({
      customerId,
      amount,
      interestRate,
      term,
      purpose,
      status: status || 'pending',
      disbursementDate: (status === 'active' || status === 'approved') ? new Date() : undefined,
      maturityDate,
    });

    const savedLoan = await loan.save();

    // Populate customer data in response
    const populatedLoan = await Loan.findById(savedLoan._id)
      .populate('customerId', 'firstName lastName email phone')
      .lean();

    return NextResponse.json(
      { 
        data: populatedLoan,
        message: 'Loan created successfully' 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating loan:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create loan' },
      { status: 500 }
    );
  }
}
