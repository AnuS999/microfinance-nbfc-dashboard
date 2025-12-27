'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/models/transaction';
import {
  Plus,
  Search,
  Filter,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Download,
} from 'lucide-react';
import Link from 'next/link';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Fetch transactions data
    const fetchTransactions = async () => {
      try {
        // TODO: Replace with actual API call
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            loanId: '1',
            customerId: '1',
            type: 'payment',
            amount: 15000,
            status: 'completed',
            transactionDate: new Date('2024-01-25'),
            createdAt: new Date('2024-01-25'),
          },
          {
            id: '2',
            loanId: '2',
            customerId: '2',
            type: 'disbursement',
            amount: 75000,
            status: 'pending',
            transactionDate: new Date('2024-01-24'),
            createdAt: new Date('2024-01-24'),
          },
          {
            id: '3',
            loanId: '3',
            customerId: '3',
            type: 'payment',
            amount: 25000,
            status: 'completed',
            transactionDate: new Date('2024-01-23'),
            createdAt: new Date('2024-01-23'),
          },
          {
            id: '4',
            loanId: '4',
            customerId: '4',
            type: 'penalty',
            amount: 5000,
            status: 'completed',
            transactionDate: new Date('2024-01-22'),
            createdAt: new Date('2024-01-22'),
          },
          {
            id: '5',
            loanId: '5',
            customerId: '5',
            type: 'payment',
            amount: 12000,
            status: 'failed',
            transactionDate: new Date('2024-01-21'),
            createdAt: new Date('2024-01-21'),
          },
          {
            id: '6',
            loanId: '1',
            customerId: '1',
            type: 'refund',
            amount: 3000,
            status: 'completed',
            transactionDate: new Date('2024-01-20'),
            createdAt: new Date('2024-01-20'),
          },
        ];

        setTransactions(mockTransactions);
        setFilteredTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    // Filter transactions
    let filtered = transactions;

    if (typeFilter !== 'all') {
      filtered = filtered.filter((transaction) => transaction.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((transaction) => transaction.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.loanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.amount.toString().includes(searchQuery)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchQuery, typeFilter, statusFilter]);

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return <ArrowDownCircle className="w-5 h-5 text-green-500" />;
      case 'disbursement':
        return <ArrowUpCircle className="w-5 h-5 text-blue-500" />;
      case 'refund':
        return <RefreshCw className="w-5 h-5 text-purple-500" />;
      case 'penalty':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
    };

    const icons = {
      pending: Clock,
      completed: CheckCircle,
      failed: XCircle,
    };

    const Icon = icons[status];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type: Transaction['type']) => {
    const styles = {
      payment: 'bg-green-50 text-green-700 border-green-200',
      disbursement: 'bg-blue-50 text-blue-700 border-blue-200',
      refund: 'bg-purple-50 text-purple-700 border-purple-200',
      penalty: 'bg-red-50 text-red-700 border-red-200',
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border capitalize ${styles[type]}`}
      >
        {getTypeIcon(type)}
        {type}
      </span>
    );
  };

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = filteredTransactions.filter(
    (t) => t.status === 'completed'
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            <Download className="w-5 h-5" />
            Export
          </button>
          <Link
            href="/transactions/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Transaction
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredTransactions.length}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{completedTransactions}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(totalAmount / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <ArrowDownCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID, loan ID, customer ID, or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="payment">Payment</option>
              <option value="disbursement">Disbursement</option>
              <option value="refund">Refund</option>
              <option value="penalty">Penalty</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(transaction.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.loanId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(transaction.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(transaction.transactionDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No transactions found. {searchQuery && 'Try adjusting your search criteria.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
