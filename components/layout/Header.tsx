'use client';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Microfinance Dashboard
        </h1>
        <div className="flex items-center gap-4">
          {/* User menu will be implemented here */}
          <span>User Menu</span>
        </div>
      </div>
    </header>
  );
}

