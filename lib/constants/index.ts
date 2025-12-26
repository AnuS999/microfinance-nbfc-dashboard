// Application constants

export const LOAN_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DEFAULTED: 'defaulted',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OFFICER: 'officer',
  VIEWER: 'viewer',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  LOANS: '/api/loans',
  CUSTOMERS: '/api/customers',
  TRANSACTIONS: '/api/transactions',
  REPORTS: '/api/reports',
} as const;

