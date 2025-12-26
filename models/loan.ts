// Loan model/interface
export interface Loan {
  id: string;
  customerId: string;
  amount: number;
  interestRate: number;
  term: number; // in months
  status: 'pending' | 'approved' | 'active' | 'completed' | 'defaulted';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanApplication {
  customerId: string;
  amount: number;
  purpose: string;
  term: number;
}

