'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Search,
  Building2,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Loans', href: '/loans', icon: FileText },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${sidebarCollapsed && !isMobile ? 'w-20' : 'w-64'}
          ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section - Header Image */}
          <div className="px-2 sm:px-4 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex items-end justify-end mb-2">
              {!isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" />
                  )}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-center w-full">
              <img
                src="/samarpan-logo-full.svg"
                alt="Samarpan Logo"
                className="w-full h-auto"
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '80px',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const formats = ['/samarpan-logo.png', '/samarpan-logo.jpg', '/samarpan-logo.jpeg', '/samarpan-logo.webp', '/samarpan-logo.svg'];
                  for (const format of formats) {
                    if (!target.src.includes(format)) {
                      target.src = format;
                      break;
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${
                      active
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}
                  `}
                  title={sidebarCollapsed && !isMobile ? item.name : ''}
                >
                  <Icon
                    className={`
                      w-5 h-5 flex-shrink-0
                      ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                    `}
                  />
                  {(!sidebarCollapsed || isMobile) && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          {session?.user && (!sidebarCollapsed || isMobile) && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize truncate">
                    {session.user.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed && !isMobile ? 'lg:ml-20' : 'lg:ml-64'}
          ml-0
        `}
      >
        {/* Header - Image Only */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-2 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center justify-between gap-2">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors flex-shrink-0"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Header Image */}
              <div className="flex-1 flex justify-center min-w-0">
                <img
                  src="/samarpan-logo-full.svg"
                  alt="Samarpan Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-full"
                  style={{ 
                    height: '32px',
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const formats = ['/samarpan-logo.png', '/samarpan-logo.jpg', '/samarpan-logo.jpeg', '/samarpan-logo.webp', '/samarpan-logo.svg'];
                    for (const format of formats) {
                      if (!target.src.includes(format)) {
                        target.src = format;
                        break;
                      }
                    }
                  }}
                />
              </div>
              
              {/* Right Side Actions */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
                {/* Notifications */}
                <button
                  className="relative p-1.5 sm:p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                {session?.user && (
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {session.user.role}
                      </span>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

