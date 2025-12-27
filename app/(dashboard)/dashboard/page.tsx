'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  DollarSign,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalLoans: number;
  totalCustomers: number;
  totalLoanAmount: number;
  pendingLoans: number;
  activeLoans: number;
  completedLoans: number;
  defaultedLoans: number;
  monthlyDisbursement: number;
  monthlyCollection: number;
}

interface RecentActivity {
  id: string;
  type: 'loan' | 'payment' | 'customer';
  title: string;
  description: string;
  amount?: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLoans: 0,
    totalCustomers: 0,
    totalLoanAmount: 0,
    pendingLoans: 0,
    activeLoans: 0,
    completedLoans: 0,
    defaultedLoans: 0,
    monthlyDisbursement: 0,
    monthlyCollection: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API calls
        // For now, using mock data
        const mockStats: DashboardStats = {
          totalLoans: 1247,
          totalCustomers: 892,
          totalLoanAmount: 12500000,
          pendingLoans: 23,
          activeLoans: 856,
          completedLoans: 345,
          defaultedLoans: 23,
          monthlyDisbursement: 2500000,
          monthlyCollection: 1800000,
        };

        const mockActivities: RecentActivity[] = [
          {
            id: '1',
            type: 'loan',
            title: 'New Loan Application',
            description: 'Loan of ₹50,000 approved for Rajesh Kumar',
            amount: 50000,
            status: 'success',
            date: '2 hours ago',
          },
          {
            id: '2',
            type: 'payment',
            title: 'Loan Payment Received',
            description: 'Payment of ₹15,000 from Priya Sharma',
            amount: 15000,
            status: 'success',
            date: '4 hours ago',
          },
          {
            id: '3',
            type: 'customer',
            title: 'New Customer Registered',
            description: 'Amit Patel registered in the system',
            status: 'success',
            date: '6 hours ago',
          },
          {
            id: '4',
            type: 'loan',
            title: 'Loan Disbursement',
            description: 'Loan of ₹75,000 disbursed to Meera Singh',
            amount: 75000,
            status: 'pending',
            date: '8 hours ago',
          },
          {
            id: '5',
            type: 'payment',
            title: 'Payment Pending',
            description: 'Payment of ₹12,000 from Rohit Gupta is pending',
            amount: 12000,
            status: 'pending',
            date: '1 day ago',
          },
        ];

        setStats(mockStats);
        setRecentActivities(mockActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to your Microfinance Dashboard - Overview of your operations
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Loans"
          value={stats.totalLoans}
          icon={FileText}
          trend={{ value: 12.5, isPositive: true }}
          subtitle={`${stats.activeLoans} active`}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
          subtitle="Active customers"
          iconColor="text-green-600"
          bgColor="bg-green-50"
        />
        <StatsCard
          title="Total Loan Amount"
          value={`₹${(stats.totalLoanAmount / 1000000).toFixed(2)}M`}
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
          subtitle="Outstanding loans"
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatsCard
          title="Pending Loans"
          value={stats.pendingLoans}
          icon={Clock}
          subtitle="Awaiting approval"
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Loans"
          value={stats.activeLoans}
          icon={TrendingUp}
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50"
        />
        <StatsCard
          title="Completed Loans"
          value={stats.completedLoans}
          icon={CheckCircle}
          iconColor="text-green-600"
          bgColor="bg-green-50"
        />
        <StatsCard
          title="Monthly Disbursement"
          value={`₹${(stats.monthlyDisbursement / 100000).toFixed(1)}L`}
          icon={ArrowUpRight}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="Monthly Collection"
          value={`₹${(stats.monthlyCollection / 100000).toFixed(1)}L`}
          icon={ArrowDownRight}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
        />
      </div>

      {/* Loan Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <Link
              href="/transactions"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="mt-0.5">{getStatusIcon(activity.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{activity.title}</h3>
                      {activity.amount && (
                        <span className="text-sm font-medium text-gray-900">
                          ₹{activity.amount.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{activity.date}</span>
                      <span className={getStatusBadge(activity.status)}>{activity.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No recent activities</div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Loan Status Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700">Active</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{stats.activeLoans}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-700">Pending</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{stats.pendingLoans}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">Completed</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{stats.completedLoans}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-700">Defaulted</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{stats.defaultedLoans}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/loans/new"
                className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Loan
              </Link>
              <Link
                href="/customers/new"
                className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add Customer
              </Link>
              <Link
                href="/transactions/new"
                className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Record Transaction
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
