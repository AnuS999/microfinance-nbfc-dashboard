import mongoose, { Schema, Document, Model } from 'mongoose';

export type TransactionType = 'payment' | 'disbursement' | 'refund' | 'penalty';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface ITransaction extends Document {
  loanId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  transactionDate: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    loanId: {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
      required: [true, 'Loan ID is required'],
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['payment', 'disbursement', 'refund', 'penalty'],
      required: [true, 'Transaction type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Transaction amount is required'],
      min: [0, 'Transaction amount must be positive'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      required: true,
    },
    transactionDate: {
      type: Date,
      required: [true, 'Transaction date is required'],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
TransactionSchema.index({ loanId: 1 });
TransactionSchema.index({ customerId: 1 });
TransactionSchema.index({ transactionDate: -1 });
TransactionSchema.index({ status: 1 });

// Export the model
const Transaction: Model<ITransaction> =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;

