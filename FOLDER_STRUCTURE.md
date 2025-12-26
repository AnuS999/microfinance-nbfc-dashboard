# Microfinance/NBFC Admin Dashboard - Folder Structure

This document outlines the professional folder structure for the full-stack Microfinance/NBFC Admin Dashboard built with Next.js App Router.

## 📁 Project Structure

```
microfinance-dashboard/
├── app/                          # Next.js App Router directory
│   ├── (auth)/                   # Authentication route group
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page
│   │   ├── forgot-password/
│   │   │   └── page.tsx          # Forgot password page
│   │   ├── reset-password/
│   │   │   └── page.tsx          # Reset password page
│   │   └── layout.tsx            # Auth layout (shared layout for auth pages)
│   │
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard page
│   │   ├── loans/
│   │   │   └── page.tsx          # Loans management page
│   │   ├── customers/
│   │   │   └── page.tsx          # Customers management page
│   │   ├── transactions/
│   │   │   └── page.tsx          # Transactions page
│   │   ├── reports/
│   │   │   └── page.tsx          # Reports & analytics page
│   │   ├── settings/
│   │   │   └── page.tsx          # Settings page
│   │   └── layout.tsx             # Dashboard layout (sidebar, header)
│   │
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts      # Login API endpoint
│   │   ├── loans/
│   │   │   └── route.ts          # Loans API endpoints
│   │   ├── customers/
│   │   │   └── route.ts          # Customers API endpoints
│   │   ├── transactions/
│   │   │   └── route.ts          # Transactions API endpoints
│   │   └── reports/
│   │       └── route.ts          # Reports API endpoints
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   └── Button.tsx            # Button component
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── LoanCard.tsx          # Loan card component
│   │   ├── CustomerCard.tsx      # Customer card component
│   │   ├── StatsCard.tsx         # Statistics card component
│   │   └── Chart.tsx             # Chart component
│   ├── auth/                     # Authentication components
│   │   ├── LoginForm.tsx         # Login form component
│   │   ├── RegisterForm.tsx      # Registration form component
│   │   └── PasswordResetForm.tsx # Password reset form
│   └── layout/                   # Layout components
│       ├── Sidebar.tsx           # Dashboard sidebar
│       ├── Header.tsx            # Dashboard header
│       └── Footer.tsx            # Footer component
│
├── lib/                          # Library and utilities
│   ├── auth/                     # Authentication utilities
│   │   └── index.ts              # Auth helpers (token verification, password hashing)
│   ├── api/                      # API utilities
│   │   └── client.ts             # API client configuration
│   ├── validations/              # Validation schemas
│   │   └── auth.ts               # Authentication validations
│   └── constants/                # Application constants
│       └── index.ts              # Constants (statuses, roles, endpoints)
│
├── models/                       # Data models/interfaces
│   ├── loan.ts                   # Loan model/interface
│   ├── customer.ts               # Customer model/interface
│   ├── transaction.ts            # Transaction model/interface
│   └── user.ts                   # User model/interface
│
├── utils/                        # Utility functions
│   ├── format.ts                 # Formatting utilities (currency, dates)
│   ├── calculate.ts              # Calculation utilities (interest, EMI)
│   └── validation.ts             # General validation utilities
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useLoans.ts               # Loans data hook
│   ├── useCustomers.ts           # Customers data hook
│   └── useDebounce.ts            # Debounce hook
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Global types and interfaces
│
├── store/                        # State management (if using Redux/Zustand)
│   ├── slices/                   # Redux slices or Zustand stores
│   └── index.ts                  # Store configuration
│
├── public/                       # Static assets
│   └── ...                       # Images, icons, etc.
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 📝 Key Features

### Route Groups
- `(auth)` - Authentication pages grouped together with shared layout
- `(dashboard)` - Dashboard pages with sidebar and header layout

### API Routes
- All API endpoints are organized by feature (auth, loans, customers, etc.)
- Each route follows Next.js 13+ App Router conventions

### Component Organization
- **UI Components**: Reusable, generic components (Button, Input, Modal, etc.)
- **Dashboard Components**: Feature-specific components for dashboard pages
- **Auth Components**: Authentication-related forms and components
- **Layout Components**: Shared layout elements (Sidebar, Header, Footer)

### Library Structure
- **auth/**: Authentication utilities and helpers
- **api/**: API client configuration and request helpers
- **validations/**: Form and data validation schemas
- **constants/**: Application-wide constants

### Models
- TypeScript interfaces and types for data models
- Ensures type safety across the application

### Utilities
- Formatting functions (currency, dates, phone numbers)
- Calculation utilities (interest rates, EMI calculations)
- General helper functions

### Hooks
- Custom React hooks for reusable logic
- Data fetching hooks
- UI interaction hooks

## 🚀 Next Steps

1. **Install Dependencies**: Add required packages (e.g., form libraries, chart libraries, authentication libraries)
2. **Database Setup**: Configure database connection and models
3. **Authentication**: Implement authentication logic (JWT, sessions, etc.)
4. **API Implementation**: Build out API endpoints with proper error handling
5. **Component Development**: Create UI components and dashboard features
6. **State Management**: Set up state management if needed
7. **Testing**: Add unit tests and integration tests
8. **Documentation**: Document API endpoints and component usage

## 📚 Best Practices

- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Keep components small and focused
- Use route groups for shared layouts
- Organize code by feature when possible
- Implement proper error handling
- Add loading states and error boundaries
- Use environment variables for configuration
- Follow accessibility best practices

