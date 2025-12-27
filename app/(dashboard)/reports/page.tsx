'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Activity,
  AlertCircle,
} from 'lucide-react';

interface ReportData {
  totalRevenue: number;
  totalDisbursed: number;
  totalCollected: number;
  activeLoans: number;
  defaultRate: number;
  averageLoanSize: number;
  monthlyData: {
    month: string;
    disbursed: number;
    collected: number;
  }[];
  loanStatusDistribution: {
    status: string;
    count: number;
    percentage: number;
  }[];
  topCustomers: {
    id: string;
    name: string;
    totalLoans: number;
    totalAmount: number;
  }[];
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');

  useEffect(() => {
    // Fetch reports data
    const fetchReports = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: ReportData = {
          totalRevenue: 2500000,
          totalDisbursed: 5000000,
          totalCollected: 3500000,
          activeLoans: 856,
          defaultRate: 3.2,
          averageLoanSize: 75000,
          monthlyData: [
            { month: 'Jan', disbursed: 2500000, collected: 1800000 },
            { month: 'Feb', disbursed: 2800000, collected: 2000000 },
            { month: 'Mar', disbursed: 3200000, collected: 2200000 },
            { month: 'Apr', disbursed: 3000000, collected: 2400000 },
            { month: 'May', disbursed: 3500000, collected: 2600000 },
            { month: 'Jun', disbursed: 4000000, collected: 2800000 },
          ],
          loanStatusDistribution: [
            { status: 'Active', count: 856, percentage: 68.6 },
            { status: 'Completed', count: 345, percentage: 27.7 },
            { status: 'Defaulted', count: 23, percentage: 1.8 },
            { status: 'Pending', count: 23, percentage: 1.9 },
          ],
          topCustomers: [
            { id: '1', name: 'Rajesh Kumar', totalLoans: 5, totalAmount: 500000 },
            { id: '2', name: 'Priya Sharma', totalLoans: 4, totalAmount: 400000 },
            { id: '3', name: 'Amit Patel', totalLoans: 3, totalAmount: 350000 },
            { id: '4', name: 'Meera Singh', totalLoans: 3, totalAmount: 300000 },
            { id: '5', name: 'Rohit Gupta', totalLoans: 2, totalAmount: 250000 },
          ],
        };

        setReportData(mockData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };

  const getMaxValue = (data: number[]) => {
    return Math.max(...data) * 1.1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!reportData) {
    return <div className="text-center py-12 text-gray-500">No report data available</div>;
  }

  const maxDisbursed = getMaxValue(reportData.monthlyData.map((d) => d.disbursed));
  const maxCollected = getMaxValue(reportData.monthlyData.map((d) => d.collected));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Comprehensive insights and analytics for your operations
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(reportData.totalRevenue)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Disbursed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(reportData.totalDisbursed)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600">+8.3%</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collected</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(reportData.totalCollected)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-purple-600">+15.2%</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Default Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{reportData.defaultRate}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">-0.5%</span>
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h2>
          <div className="space-y-4">
            {reportData.monthlyData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <div className="flex gap-4">
                    <span className="text-blue-600">Disbursed: {formatCurrency(data.disbursed)}</span>
                    <span className="text-green-600">Collected: {formatCurrency(data.collected)}</span>
                  </div>
                </div>
                <div className="flex gap-2 h-4">
                  <div
                    className="bg-blue-500 rounded"
                    style={{ width: `${(data.disbursed / maxDisbursed) * 100}%` }}
                  />
                  <div
                    className="bg-green-500 rounded"
                    style={{ width: `${(data.collected / maxCollected) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Loan Status Distribution</h2>
          <div className="space-y-4">
            {reportData.loanStatusDistribution.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.status}</span>
                  <span className="text-gray-600">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Customers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Loans
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.topCustomers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {customer.totalLoans}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(customer.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Loans</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{reportData.activeLoans}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Loan Size</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(reportData.averageLoanSize)}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {((reportData.totalCollected / reportData.totalDisbursed) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
