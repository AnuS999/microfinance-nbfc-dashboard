import mongoose, { Schema, Document, Model } from 'mongoose';

export type LoanStatus = 'pending' | 'approved' | 'active' | 'completed' | 'defaulted';

export interface ILoan extends Document {
  customerId: mongoose.Types.ObjectId;
  amount: number;
  interestRate: number;
  term: number; // in months
  status: LoanStatus;
  purpose?: string;
  disbursementDate?: Date;
  maturityDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LoanSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Loan amount is required'],
      min: [0, 'Loan amount must be positive'],
    },
    interestRate: {
      type: Number,
      required: [true, 'Interest rate is required'],
      min: [0, 'Interest rate must be positive'],
      max: [100, 'Interest rate cannot exceed 100%'],
    },
    term: {
      type: Number,
      required: [true, 'Loan term is required'],
      min: [1, 'Loan term must be at least 1 month'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'active', 'completed', 'defaulted'],
      default: 'pending',
      required: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    disbursementDate: {
      type: Date,
    },
    maturityDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
LoanSchema.index({ customerId: 1 });
LoanSchema.index({ status: 1 });
LoanSchema.index({ createdAt: -1 });

// Export the model
const Loan: Model<ILoan> =
  mongoose.models.Loan || mongoose.model<ILoan>('Loan', LoanSchema);

export default Loan;

