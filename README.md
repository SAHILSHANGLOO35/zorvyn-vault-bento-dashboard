# Zorvyn Vault - Financial Dashboard

A modern, full-featured financial management dashboard built with **Next.js 16**, **React 19**, and **TypeScript**. Features dual-role authentication (Admin & User), comprehensive transaction tracking, analytics, and data export capabilities.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running Locally](#running-locally)
- [Mock Data](#mock-data)
- [User Roles & Access](#user-roles--access)
- [Application Flow](#application-flow)
- [Key Components](#key-components)

---

## 🎯 Overview

**Zorvyn Vault** is a financial dashboard platform that allows users to track their income and expenses, view detailed analytics, and export transaction data. Admins can monitor multiple user accounts and view their individual dashboards.

### Key Capabilities

- 📊 **Personal Dashboard**: Financial overview with charts and metrics
- 👥 **Multi-User Support**: Seamless switching between user accounts
- 🔐 **Role-Based Access**: Admin and User roles with protected routes
- 📈 **Analytics**: Income vs. expense visualizations and category breakdowns
- 💾 **Data Export**: Download transaction history as CSV or PDF
- 🌙 **Dark Mode**: Full dark/light theme support with persistent preferences
- 📱 **Responsive Design**: Mobile-first design with smooth animations

---

## ✨ Features

### User Dashboard

- **Total Balance Display** - Current balance with glowing animations
- **Income/Expense Metrics** - Real-time income, expense, and savings calculations
- **Transaction Table** - Filterable and sortable transaction history with monthly selection
- **Category Breakdown** - Pie chart visualization of spending by category
- **Balance Trend Chart** - Historical balance tracking over time
- **Data Export** - Export transactions as CSV or PDF by month or all at once

### Admin Dashboard

- **User Management** - View all registered users in a grid layout
- **User Analytics Access** - Click any user to view their complete financial dashboard
- **Multi-User Monitoring** - Monitor multiple accounts from one interface

### Global Features

- **Authentication & Authorization** - Role-based access control
- **Dark Mode Toggle** - Theme persistence across sessions
- **Responsive Navigation** - Desktop and mobile-optimized navbar
- **Smooth Animations** - Framer Motion-powered interactions

---

## 🏗️ Tech Stack

### Frontend Framework

- **Next.js 16.1.7** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5.9.3** - Type safety

### State Management & Storage

- **Zustand 5.0.12** - Lightweight state management
- **Mock Data** - In-memory transaction storage

### UI & Styling

- **Tailwind CSS 4.2.1** - Utility-first styling
- **Motion 12.38.0** - Advanced animations
- **Evil Charta v1.0** - Data visualization
- **Lucide React 1.7.0** - Icon library
- **Phosphor Icons 2.1.10** - Additional icons

### Theme & Utilities

- **next-themes 0.4.6** - Theme provider
- **class-variance-authority 0.7.1** - Component styling
- **shadcn 4.1.2** - UI component library
- **tailwind-merge 3.5.0** - Tailwind class merging

### Development Tools

- **ESLint 9.39.4** - Code linting
- **Prettier 3.8.1** - Code formatting
- **Turbopack** - Next.js bundler (development)

---

## 📁 Project Structure

```
zorvyn-fe/
├── app/
│   ├── layout.tsx                 # Root layout with theme provider
│   ├── page.tsx                   # Entry point (redirects based on role)
│   ├── globals.css                # Global styles
│   ├── dashboard/
│   │   ├── layout.tsx             # Dashboard layout wrapper
│   │   └── page.tsx               # User dashboard page
│   └── admin/
│       ├── layout.tsx             # Admin layout wrapper
│       ├── page.tsx               # Admin home page
│       └── users/
│           ├── page.tsx           # Users list page
│           └── [userId]/
│               └── page.tsx       # View user dashboard (admin view)
│
├── components/
│   ├── navbar.tsx                 # Navigation bar (desktop & mobile)
│   ├── container.tsx              # Layout container wrapper
│   ├── theme-provider.tsx         # Dark mode provider
│   ├── dashboard/
│   │   ├── total-balance.tsx      # Balance display card
│   │   ├── total-income.tsx       # Income metrics
│   │   ├── total-expenses.tsx     # Expense metrics
│   │   ├── total-savings.tsx      # Savings calculation
│   │   ├── insight-panel.tsx      # Spending insights
│   │   ├── role-switcher.tsx      # User role toggle UI
│   │   └── export-data.tsx        # CSV/PDF export component
│   ├── transactions/
│   │   ├── transaction-table.tsx  # Filterable transaction list
│   │   └── add-transaction-modal.tsx # Transaction creation modal
│   ├── charts/
│   │   ├── balance-chart.tsx      # Historical balance line chart
│   │   └── category-pie-chart.tsx # Spending breakdown chart
│   └── ui/
│       ├── badge.tsx              # Badge component
│       ├── button.tsx             # Button component
│       ├── card.tsx               # Shadcn card
│       ├── chart.tsx              # Chart wrapper
│       ├── label.tsx              # Label component
│       ├── table.tsx              # Table component
│       ├── glowing-radial-chart.tsx    # Animated radial chart
│       └── value-line-bar-chart.tsx    # Value and bar chart hybrid
│
├── data/
│   └── mockData.ts                # Mock users, transactions, categories
│
├── hooks/
│   ├── use-current-user.ts        # Get current user from store
│   └── use-transactions.ts        # Get transactions for current user
│
├── lib/
│   ├── format.ts                  # Currency and date formatting utilities
│   ├── calculations.ts            # Financial calculations (totals, etc.)
│   └── utils.ts                   # General utilities (classname merging)
│
├── store/
│   └── user-finance-store.ts      # Zustand store (users, transactions, state)
│
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS configuration
├── next.config.ts                 # Next.js configuration
└── eslintrc.config.mjs            # ESLint rules

```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** 18.17+ or **Bun** runtime
- **npm**, **yarn**, **pnpm**, or **bun**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/zorvyn-fe.git
cd zorvyn-fe
```

### Step 2: Install Dependencies

Using **Bun** (recommended):

```bash
bun install
```

Or using **npm**:

```bash
npm install
```

Or using **yarn**:

```bash
yarn install
```

### Step 3: Environment Setup

No `.env` file needed - the app uses mock data by default. For future backend integration, create a `.env.local` file:

```bash
# .env.local (optional)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🏃 Running Locally

### Development Mode (with Turbopack)

```bash
bun run dev
# or
npm run dev
```

The application will start at **http://localhost:3000**

### Production Build

```bash
bun run build
bun run start
```

### Linting & Formatting

```bash
# Check code with ESLint
bun run lint

# Format code with Prettier
bun run format

# Type checking
bun run typecheck
```

---

## 📊 Mock Data

### Users

The app includes 3 pre-configured user accounts in `data/mockData.ts`:

| ID  | Name         | Email           | Role  | Monthly Salary |
| --- | ------------ | --------------- | ----- | -------------- |
| u1  | Sahil Dev    | sahil@gmail.com | Admin | N/A            |
| u2  | Rahul Sharma | rahul@gmail.com | User  | ₹50,000        |
| u3  | Amit Rao     | amit@gmail.com  | User  | ₹60,000        |

### Transactions

- **Time Range**: January 2026 - June 2026 (6 months of data)
- **Per User**: ~30 transactions per user
- **Categories**: Salary, Food, Shopping, Bills, Entertainment, Travel, Health
- **Types**: Income and Expense

Default current user is **u1 (Sahil Dev - Admin)**

### How to Modify

Edit `data/mockData.ts` to:

- Add/remove users
- Add transaction history
- Change default user ID
- Modify transaction categories

```typescript
// Change default user (currently Sahil Dev/Admin)
export const DEFAULT_USER_ID = "u1"
```

---

## 🔐 User Roles & Access

### Admin Role (u1 - Sahil Dev)

**Access:**

- ✅ Admin Dashboard (`/admin`)
- ✅ Users List (`/admin/users`)
- ✅ View Any User's Dashboard (`/admin/users/[userId]`)
- ❌ Cannot access `/dashboard`

**Capabilities:**

- Monitor all user accounts
- View transaction history for any user
- Export user data
- Cannot modify user data (read-only)

### User Role (u2, u3)

**Access:**

- ✅ Personal Dashboard (`/dashboard`)
- ❌ Admin Dashboard (redirects to `/dashboard`)
- ❌ Users List

**Capabilities:**

- View personal financial metrics
- Track transactions
- Filter and export personal data
- View spending analytics

### Authentication Flow

1. App checks `DEFAULT_USER_ID` to determine current user
2. User's role determines available routes
3. Un-authorized access redirects to role-appropriate page
4. All state is client-side (no backend auth required)

---

## 🔄 Application Flow

### Entry Point

```
app/page.tsx
    ↓
    useCurrentUser() hook
    ↓
    if (role === "admin") → redirect("/admin")
    if (role === "user") → redirect("/dashboard")
```

### Admin Flow

```
/admin (home)
    ↓
    /admin/users (lists all users)
    ↓
    /admin/users/[userId] (view user's dashboard with their data)
```

### User Flow

```
/dashboard (personal dashboard)
    ↓
    View transactions, charts, metrics
    ↓
    Export data or filter transactions
```

### Role-Based Protection

All routes check user role on mount:

```typescript
const user = useCurrentUser()

useEffect(() => {
  if (user.role !== "admin") {
    router.push("/dashboard")
  }
}, [user.role, router])
```

---

## 🧩 Key Components

### Dashboard Components

- **TotalBalance** - Displays current balance with animated radial chart
- **TotalIncome** - Shows total income for selected period
- **TotalExpenses** - Shows total expenses for selected period
- **TotalSavings** - Calculates and displays savings (income - expenses)
- **InsightPanel** - Provides spending insights and patterns
- **ExportData** - Allows CSV/PDF export of transactions

### Transaction Components

- **TransactionTable** - Searchable, filterable transaction list with monthly selection
- **AddTransactionModal** - Form to add new transactions (UI only, no backend)

### Chart Components

- **BalanceChart** - Line chart showing balance trends over time
- **CategoryPieChart** - Pie chart breakdown of expenses by category

### Layout Components

- **Navbar** - Responsive header with user profile and role indicator
- **Container** - Centered layout wrapper with max-width constraint
- **ThemeProvider** - Dark/light mode manager with persistence

---

## 🎨 Customization

### Change Default User

Edit `data/mockData.ts`:

```typescript
export const DEFAULT_USER_ID = "u2" // Switch to Rahul
```

### Add New Users

```typescript
export const users: User[] = [
  // ... existing users
  {
    id: "u4",
    name: "New User",
    email: "new@gmail.com",
    role: "user",
  },
]
```

### Add Transactions

```typescript
export const transactions: Transaction[] = [
  // ... existing transactions
  {
    id: "new1",
    userId: "u4",
    date: "2026-06-25",
    amount: 5000,
    category: "Salary",
    type: "income",
  },
]
```

### Styling

- **Theme Colors**: Modify `tailwind.config.ts`
- **Font**: Change in `app/layout.tsx` (currently Geist, Manrope, DM Mono)
- **Components**: Edit files in `components/` folder

---

## 🐛 Troubleshooting

### Issue: Different user data shows up after refresh

**Solution**: The app now uses memory state (no localStorage persistence). Default user is always `u1` on startup.

### Issue: Admin can't access user dashboards

**Solution**: Ensure `DEFAULT_USER_ID` is set to an admin user (u1). Non-admin users will redirect to `/dashboard`.

### Issue: Blank transaction table

**Solution**: Ensure mock data includes transactions for the current user. Check `data/mockData.ts` and verify `userId` matches.

### Issue: Styling looks broken

**Solution**: Run Tailwind CSS build:

```bash
bun run build
```

---

## 👨‍💻 Development Notes

### Performance

- Uses **Turbopack** for faster development builds
- Zustand for lightweight state management (no Redux overhead)
- Memoized calculations prevent unnecessary re-renders
- Lazy-loaded charts with Recharts

### Type Safety

- Full TypeScript support with strict mode
- Type-safe Zustand store
- Fully typed components and hooks

### Code Quality

- ESLint for code standards
- Prettier for consistent formatting
- TypeScript for type checking

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production Ready
