// Transaction model/interface
export interface Transaction {
  id: string;
  loanId: string;
  customerId: string;
  type: 'payment' | 'disbursement' | 'refund' | 'penalty';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionDate: Date;
  createdAt: Date;
}

export interface TransactionFormData {
  loanId: string;
  type: Transaction['type'];
  amount: number;
  transactionDate: string;
}

