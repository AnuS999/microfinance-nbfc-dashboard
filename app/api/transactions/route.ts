import { NextResponse } from 'next/server';
import connectDB from '@/src/lib/db';
import { Transaction, Loan, Customer } from '@/src/models';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    
    const transactions = await Transaction.find({})
      .populate('loanId', 'amount interestRate term')
      .populate('customerId', 'firstName lastName email')
      .sort({ transactionDate: -1 })
      .lean();
    
    return NextResponse.json({ 
      data: transactions,
      message: 'Transactions fetched successfully' 
    });
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { loanId, customerId, type, amount, transactionDate, description, status } = body;

    // Validate required fields
    if (!loanId || !customerId || !type || !amount) {
      return NextResponse.json(
        { error: 'Loan ID, Customer ID, type, and amount are required' },
        { status: 400 }
      );
    }

    // Verify loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
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

    // Create new transaction
    const transaction = new Transaction({
      loanId,
      customerId,
      type,
      amount,
      transactionDate: transactionDate ? new Date(transactionDate) : new Date(),
      description,
      status: status || 'pending',
    });

    const savedTransaction = await transaction.save();

    // Populate related data in response
    const populatedTransaction = await Transaction.findById(savedTransaction._id)
      .populate('loanId', 'amount interestRate term')
      .populate('customerId', 'firstName lastName email')
      .lean();

    return NextResponse.json(
      { 
        data: populatedTransaction,
        message: 'Transaction created successfully' 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
