'use client';

import { useState, useEffect } from 'react';
import { Customer } from '@/models/customer';
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  User,
} from 'lucide-react';
import Link from 'next/link';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch customers data
    const fetchCustomers = async () => {
      try {
        // TODO: Replace with actual API call
        const mockCustomers: Customer[] = [
          {
            id: '1',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            email: 'rajesh.kumar@example.com',
            phone: '+91 98765 43210',
            address: '123 Main Street, Mumbai, Maharashtra 400001',
            dateOfBirth: new Date('1985-05-15'),
            createdAt: new Date('2023-01-15'),
            updatedAt: new Date('2024-01-15'),
          },
          {
            id: '2',
            firstName: 'Priya',
            lastName: 'Sharma',
            email: 'priya.sharma@example.com',
            phone: '+91 98765 43211',
            address: '456 Park Avenue, Delhi, Delhi 110001',
            dateOfBirth: new Date('1990-08-20'),
            createdAt: new Date('2023-02-10'),
            updatedAt: new Date('2024-01-10'),
          },
          {
            id: '3',
            firstName: 'Amit',
            lastName: 'Patel',
            email: 'amit.patel@example.com',
            phone: '+91 98765 43212',
            address: '789 Market Road, Ahmedabad, Gujarat 380001',
            dateOfBirth: new Date('1988-12-05'),
            createdAt: new Date('2023-03-05'),
            updatedAt: new Date('2024-01-05'),
          },
          {
            id: '4',
            firstName: 'Meera',
            lastName: 'Singh',
            email: 'meera.singh@example.com',
            phone: '+91 98765 43213',
            address: '321 Garden Street, Bangalore, Karnataka 560001',
            dateOfBirth: new Date('1992-03-18'),
            createdAt: new Date('2023-04-20'),
            updatedAt: new Date('2024-01-20'),
          },
          {
            id: '5',
            firstName: 'Rohit',
            lastName: 'Gupta',
            email: 'rohit.gupta@example.com',
            phone: '+91 98765 43214',
            address: '654 Business Park, Pune, Maharashtra 411001',
            dateOfBirth: new Date('1987-07-25'),
            createdAt: new Date('2023-05-12'),
            updatedAt: new Date('2024-01-12'),
          },
        ];

        setCustomers(mockCustomers);
        setFilteredCustomers(mockCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search
    if (!searchQuery) {
      setFilteredCustomers(customers);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = customers.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.id.toLowerCase().includes(query)
    );

    setFilteredCustomers(filtered);
  }, [customers, searchQuery]);

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your customer database and information
          </p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.filter(
                  (c) => new Date(c.createdAt).getMonth() === new Date().getMonth()
                ).length}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or customer ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Customers Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                    {customer.firstName.charAt(0)}
                    {customer.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {customer.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="line-clamp-2">{customer.address}</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Age: {calculateAge(customer.dateOfBirth)} years | Joined:{' '}
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No customers found. {searchQuery && 'Try adjusting your search criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}
