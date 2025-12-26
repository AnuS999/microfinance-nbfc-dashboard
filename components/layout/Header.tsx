'use client';

import { signOut, useSession } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Microfinance Dashboard
        </h1>
        <div className="flex items-center gap-4">
          {session?.user && (
            <>
              <span className="text-sm text-gray-600">
                {session.user.name} ({session.user.role})
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

