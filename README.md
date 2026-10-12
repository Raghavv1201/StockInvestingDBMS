# Stock Investing Management System (Frontend)

A modern, responsive fintech web dashboard built for the college DBMS mini-project **Stock Investing Management System**.

![DBMS Project Badge](https://img.shields.io/badge/Database-MySQL%20(StockInvestingDB)-8B5CF6?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind%20%7C%20Recharts-F43F5E?style=for-the-badge)
![Mode](https://img.shields.io/badge/Mode-Local%20Demo%20Data-10B981?style=for-the-badge)

---

## 1. Project Overview & Architecture

This project is a **frontend-only, beginner-friendly college DBMS mini-project dashboard**. It uses predefined local JavaScript arrays and objects to model and present data structured according to the MySQL database **`StockInvestingDB`**.

- **Zero Backend Dependencies**: Operates 100% locally with React state and `src/data/mockData.js`. No Node.js Express server or MySQL runtime is required to run the dashboard.
- **Visual Direction**: Sophisticated fintech aesthetic featuring deep black (`#07090E`) and dark navy backgrounds, purple (`#8B5CF6`) and coral (`#F43F5E`) gradient panels, thin translucent borders, glowing accents, and elegant typography.
- **Financial Charting**: Recharts line & area charts with **purple (`#8B5CF6`) and yellow (`#FBBF24`) lines**, comparing portfolio valuation against invested capital (clearly marked as demo data).
- **Relational Schema Integration**: Dedicated DBMS Inspector visualizes the 6 MySQL tables, primary keys, foreign keys, and column types.

---

## 2. Technology Stack

- **React 18** with **Vite 5** (Fast development and instant hot module replacement)
- **JavaScript & JSX** (Beginner-friendly, no TypeScript complexity)
- **Tailwind CSS 3** (Custom dark theme, fintech gradient panels, and glassmorphic card utilities)
- **Recharts** (Interactive Area, Line, and Donut charts)
- **Lucide React** (Minimalist modern icons)
- **React Router 6** (Multi-page client-side navigation)

---

## 3. Project Structure & File Guide

```
StockInvestingDBMS/
├── index.html                   # HTML entry point with Inter font & dark theme meta
├── package.json                 # Dependencies and npm run scripts
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Theme colors, glow effects & fintech gradients
├── postcss.config.js            # PostCSS configuration for Tailwind
├── README.md                    # Project documentation & run guide
└── src/
    ├── main.jsx                 # React root DOM rendering
    ├── App.jsx                  # Main application container, router, and centralized state
    ├── index.css                # Custom fintech styling, glassmorphism, and scrollbars
    │
    ├── data/
    │   └── mockData.js          # Predefined local arrays and objects for all 6 tables
    │
    ├── components/
    │   ├── common/
    │   │   ├── Badge.jsx        # BUY, SELL, NSE, BSE, and status badges
    │   │   ├── StatCard.jsx     # Financial summary metric card with glowing hover
    │   │   ├── Modal.jsx        # Accessible dialog backdrop & card
    │   │   ├── TradeModal.jsx   # Interactive BUY/SELL trade recorder modal
    │   │   └── NewPortfolioModal.jsx # New portfolio creation modal
    │   └── layout/
    │       ├── Sidebar.jsx      # Desktop left sidebar with navigation & Demo Mode indicator
    │       └── Navbar.jsx       # Top bar with Demo Mode badge, quick trade CTA & user avatar
    │
    └── pages/
        ├── Dashboard.jsx        # KPI cards, purple & yellow valuation chart, allocation donut, top holdings
        ├── Stocks.jsx           # Searchable & filterable equities directory (NSE/BSE)
        ├── Portfolios.jsx       # Multiple portfolio viewer & holdings breakdown
        ├── Transactions.jsx     # Audited ledger with BUY/SELL badges & filters
        └── Profile.jsx          # Investor details & MySQL Schema Inspector
```

---

## 4. Alignment with MySQL Schema (`StockInvestingDB`)

The predefined datasets in `src/data/mockData.js` directly model the 6 MySQL tables:

| Table Name | Primary Key | Foreign Keys | Key Columns |
| :--- | :--- | :--- | :--- |
| **`Users`** | `User_ID` | — | `Name`, `Email` *(Password is omitted in frontend UI)* |
| **`Profile`** | `Profile_ID` | `User_ID -> Users` | `DOB`, `Phone`, `Address` |
| **`Stock`** | `Stock_ID` | — | `Stock_Name`, `Stock_Price`, `Exchange` (NSE/BSE) |
| **`Portfolio`** | `Portfolio_ID` | `User_ID -> Users` | `Portfolio_Name`, `Created_At` |
| **`Portfolio_Stock`** | Composite (`Portfolio_ID`, `Stock_ID`) | Both | `Quantity_Held` *(Holding Value = Quantity × Stock_Price)* |
| **`Transactions`** | `Trans_ID` | `User_ID`, `Portfolio_ID`, `Stock_ID` | `Trans_Type`, `Quantity`, `Price`, `Trans_Date`, `Trans_Time`, `Total_Amt` *(Quantity × Price)* |

### Sample Stocks Included:
- **Reliance Industries** — ₹1,450.50 (NSE)
- **Infosys** — ₹1,725.25 (NSE)
- **TCS** — ₹3,200.00 (BSE)
- **HDFC Bank** — ₹1,800.75 (NSE)
- **ITC** — ₹450.00 (NSE)
- *Additional realistic stocks*: Tata Motors (₹945.00), Larsen & Toubro (₹3,520.00), Bharti Airtel (₹1,610.00).

---

## 5. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Step 1: Open Terminal in Project Directory
```powershell
cd "c:\Users\User\Desktop\Projects\StockInvestingDBMS"
```

### Step 2: Install Dependencies (if not already installed)
```powershell
npm install
```

### Step 3: Start the Development Server
```powershell
npm run dev
```

Open **`http://localhost:5173`** in your browser. All pages load instantly in Demo Mode without requiring any external server.
