# Finance Dashboard UI (Internship Assignment)

## Project Overview
A clean, modular finance dashboard built with React, CSS, and Recharts; designed for internship evaluation. 

Key capabilities:
- Dashboard summary metrics (balance / income / expenses)
- Trend charts (monthly balance, category spending breakdown)
- Transaction exploration (search, category filter, sorting)
- Role simulation (Viewer vs Admin) with role-based controls
- Insights cards identifying key KPIs
- Mock data + localStorage persistence

## Features Implemented

1. **Dashboard Overview**
   - `SummaryCard` components for totals
   - `BalanceTrendChart` (Recharts LineChart)
   - `SpendingBreakdownChart` (Recharts PieChart)

2. **Transactions**
   - `TransactionTable` with filtering, search, sorting
   - `Add`, `Edit`, and `Delete` operations for Admin role
   - Empty-state handling

3. **Role-Based UI**
   - `RoleSwitcher` dropdown toggles `Viewer` / `Admin`
   - Admin access to transaction management; viewer is read-only

4. **Insights**
   - `InsightsPanel` with derived metrics: highest spending category, average expenditure, monthly comparison

5. **State Management**
   - `FinanceContext` centralizes transaction state, filters, role, and derived calculations
   - Local storage persistence for transactions

## Tech Stack
- React 18
- Vite
- Recharts
- JavaScript (Functional Components)
- CSS (clean responsive styling)

## Project Structure

- `src/components`:
  - `SummaryCard.jsx`
  - `TransactionTable.jsx`
  - `RoleSwitcher.jsx`
  - `InsightsPanel.jsx`
  - `BalanceTrendChart.jsx`
  - `SpendingBreakdownChart.jsx`

- `src/pages`:
  - `Dashboard.jsx`
  - `Transactions.jsx`

- `src/context`:
  - `FinanceContext.jsx`

- `src/data`:
  - `mockTransactions.js`

- `src/App.jsx`, `src/main.jsx`, `src/index.css`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Preview build:

```bash
npm run preview
```

## Design Notes
- Centralized finance logic in `FinanceContext` encourages separation of concerns.
- Use of memoization (`useMemo`) for derived metrics to avoid unnecessary recomputation.
- Role-based rendering in UI (Viewer vs Admin) for clear behavior simulation without backend.
- Responsive layout with CSS grid and mobile breakpoints.
- All components are small single-responsibility units to support scalability.

## Optional Enhancements (not prioritized but feasible)
- Dark mode toggle, animations, CSV export, advanced multi-tag filters.
- Could elevate with TypeScript and test coverage in subsequent iterations.
