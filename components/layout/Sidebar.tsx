'use client';

import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/loans" className="block px-4 py-2 rounded hover:bg-gray-700">
              Loans
            </Link>
          </li>
          <li>
            <Link href="/customers" className="block px-4 py-2 rounded hover:bg-gray-700">
              Customers
            </Link>
          </li>
          <li>
            <Link href="/transactions" className="block px-4 py-2 rounded hover:bg-gray-700">
              Transactions
            </Link>
          </li>
          <li>
            <Link href="/reports" className="block px-4 py-2 rounded hover:bg-gray-700">
              Reports
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

