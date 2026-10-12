/**
 * Predefined Mock Data for Stock Investing Management System
 * College DBMS Mini-Project (StockInvestingDB)
 * 
 * Replaces all backend and MySQL connections with clean, local JavaScript data.
 * Corresponds to the 6 MySQL relational tables:
 * 1. Users (User_ID, Name, Email)
 * 2. Profile (Profile_ID, User_ID, DOB, Phone, Address)
 * 3. Stock (Stock_ID, Stock_Name, Stock_Price, Exchange)
 * 4. Portfolio (Portfolio_ID, User_ID, Portfolio_Name, Created_At)
 * 5. Portfolio_Stock (Portfolio_ID, Stock_ID, Quantity_Held)
 * 6. Transactions (Trans_ID, User_ID, Portfolio_ID, Stock_ID, Trans_Type, Quantity, Price, Trans_Date, Trans_Time, Total_Amt)
 */

export const mockUsers = [
  {
    User_ID: 101,
    Name: "Raghav",
    Email: "raghav@example.com"
    // Passwords are never stored or exposed in the frontend
  }
];

export const mockProfile = {
  Profile_ID: 1,
  User_ID: 101,
  DOB: "2003-08-15",
  Phone: "+91 98765 43210",
  Address: "42 Silicon Enclave, Tech Zone, Bangalore 560001, Karnataka, India"
};

export const mockStocks = [
  {
    Stock_ID: 1,
    Stock_Name: "Reliance Industries",
    Stock_Price: 1450.50,
    Exchange: "NSE",
    Sector: "Energy & Conglomerate",
    Symbol: "RELIANCE"
  },
  {
    Stock_ID: 2,
    Stock_Name: "Infosys",
    Stock_Price: 1725.25,
    Exchange: "NSE",
    Sector: "Information Technology",
    Symbol: "INFY"
  },
  {
    Stock_ID: 3,
    Stock_Name: "TCS",
    Stock_Price: 3200.00,
    Exchange: "BSE",
    Sector: "Information Technology",
    Symbol: "TCS"
  },
  {
    Stock_ID: 4,
    Stock_Name: "HDFC Bank",
    Stock_Price: 1800.75,
    Exchange: "NSE",
    Sector: "Banking & Finance",
    Symbol: "HDFCBANK"
  },
  {
    Stock_ID: 5,
    Stock_Name: "ITC",
    Stock_Price: 450.00,
    Exchange: "NSE",
    Sector: "Consumer Goods",
    Symbol: "ITC"
  },
  {
    Stock_ID: 6,
    Stock_Name: "Tata Motors",
    Stock_Price: 945.00,
    Exchange: "NSE",
    Sector: "Automotive",
    Symbol: "TATAMOTORS"
  },
  {
    Stock_ID: 7,
    Stock_Name: "Larsen & Toubro",
    Stock_Price: 3520.00,
    Exchange: "BSE",
    Sector: "Infrastructure",
    Symbol: "LT"
  },
  {
    Stock_ID: 8,
    Stock_Name: "Bharti Airtel",
    Stock_Price: 1610.00,
    Exchange: "NSE",
    Sector: "Telecommunications",
    Symbol: "BHARTIARTL"
  }
];

export const mockPortfoliosRaw = [
  {
    Portfolio_ID: 1,
    User_ID: 101,
    Portfolio_Name: "Long-Term Growth",
    Created_At: "2024-01-15"
  },
  {
    Portfolio_ID: 2,
    User_ID: 101,
    Portfolio_Name: "Tech & Innovation",
    Created_At: "2024-03-22"
  },
  {
    Portfolio_ID: 3,
    User_ID: 101,
    Portfolio_Name: "Dividend & Defensive",
    Created_At: "2024-05-10"
  }
];

export const mockPortfolioStocks = [
  // Portfolio 1: Long-Term Growth
  { Portfolio_ID: 1, Stock_ID: 1, Quantity_Held: 40 }, // Reliance: 40 * 1450.50 = 58,020.00
  { Portfolio_ID: 1, Stock_ID: 4, Quantity_Held: 35 }, // HDFC Bank: 35 * 1800.75 = 63,026.25
  { Portfolio_ID: 1, Stock_ID: 7, Quantity_Held: 15 }, // L&T: 15 * 3520.00 = 52,800.00

  // Portfolio 2: Tech & Innovation
  { Portfolio_ID: 2, Stock_ID: 2, Quantity_Held: 50 }, // Infosys: 50 * 1725.25 = 86,262.50
  { Portfolio_ID: 2, Stock_ID: 3, Quantity_Held: 20 }, // TCS: 20 * 3200.00 = 64,000.00
  { Portfolio_ID: 2, Stock_ID: 8, Quantity_Held: 25 }, // Bharti Airtel: 25 * 1610.00 = 40,250.00

  // Portfolio 3: Dividend & Defensive
  { Portfolio_ID: 3, Stock_ID: 5, Quantity_Held: 120 }, // ITC: 120 * 450.00 = 54,000.00
  { Portfolio_ID: 3, Stock_ID: 6, Quantity_Held: 30 }   // Tata Motors: 30 * 945.00 = 28,350.00
];

/**
 * Pre-computes initial portfolios with joined holdings
 * Investment_Value is computed as Quantity_Held * Stock_Price
 */
export function getInitialPortfolios() {
  return mockPortfoliosRaw.map(portfolio => {
    const holdings = mockPortfolioStocks
      .filter(ps => ps.Portfolio_ID === portfolio.Portfolio_ID)
      .map(ps => {
        const stock = mockStocks.find(s => s.Stock_ID === ps.Stock_ID) || {
          Stock_Name: 'Unknown',
          Stock_Price: 0,
          Exchange: 'NSE',
          Symbol: 'STK'
        };
        const investmentValue = Number((ps.Quantity_Held * stock.Stock_Price).toFixed(2));
        return {
          Stock_ID: ps.Stock_ID,
          Stock_Name: stock.Stock_Name,
          Symbol: stock.Symbol || 'STK',
          Exchange: stock.Exchange,
          Quantity_Held: ps.Quantity_Held,
          Stock_Price: stock.Stock_Price,
          Investment_Value: investmentValue
        };
      });

    const totalValue = holdings.reduce((sum, h) => sum + h.Investment_Value, 0);

    return {
      ...portfolio,
      holdings,
      Total_Value: Number(totalValue.toFixed(2)),
      Total_Stocks_Count: holdings.length
    };
  });
}

export const mockTransactions = [
  {
    Trans_ID: 1001,
    User_ID: 101,
    Portfolio_ID: 1,
    Stock_ID: 1,
    Stock_Name: "Reliance Industries",
    Stock_Symbol: "RELIANCE",
    Portfolio_Name: "Long-Term Growth",
    Trans_Type: "BUY",
    Quantity: 40,
    Price: 1450.50,
    Trans_Date: "2024-01-16",
    Trans_Time: "10:15:32",
    Total_Amt: 58020.00 // 40 * 1450.50
  },
  {
    Trans_ID: 1002,
    User_ID: 101,
    Portfolio_ID: 1,
    Stock_ID: 4,
    Stock_Name: "HDFC Bank",
    Stock_Symbol: "HDFCBANK",
    Portfolio_Name: "Long-Term Growth",
    Trans_Type: "BUY",
    Quantity: 35,
    Price: 1800.75,
    Trans_Date: "2024-02-11",
    Trans_Time: "11:42:10",
    Total_Amt: 63026.25 // 35 * 1800.75
  },
  {
    Trans_ID: 1003,
    User_ID: 101,
    Portfolio_ID: 2,
    Stock_ID: 2,
    Stock_Name: "Infosys",
    Stock_Symbol: "INFY",
    Portfolio_Name: "Tech & Innovation",
    Trans_Type: "BUY",
    Quantity: 50,
    Price: 1725.25,
    Trans_Date: "2024-03-24",
    Trans_Time: "14:20:05",
    Total_Amt: 86262.50 // 50 * 1725.25
  },
  {
    Trans_ID: 1004,
    User_ID: 101,
    Portfolio_ID: 2,
    Stock_ID: 3,
    Stock_Name: "TCS",
    Stock_Symbol: "TCS",
    Portfolio_Name: "Tech & Innovation",
    Trans_Type: "BUY",
    Quantity: 25,
    Price: 3200.00,
    Trans_Date: "2024-04-05",
    Trans_Time: "09:30:18",
    Total_Amt: 80000.00 // 25 * 3200.00
  },
  {
    Trans_ID: 1005,
    User_ID: 101,
    Portfolio_ID: 2,
    Stock_ID: 3,
    Stock_Name: "TCS",
    Stock_Symbol: "TCS",
    Portfolio_Name: "Tech & Innovation",
    Trans_Type: "SELL",
    Quantity: 5,
    Price: 3200.00,
    Trans_Date: "2024-05-02",
    Trans_Time: "15:10:44",
    Total_Amt: 16000.00 // 5 * 3200.00
  },
  {
    Trans_ID: 1006,
    User_ID: 101,
    Portfolio_ID: 3,
    Stock_ID: 5,
    Stock_Name: "ITC",
    Stock_Symbol: "ITC",
    Portfolio_Name: "Dividend & Defensive",
    Trans_Type: "BUY",
    Quantity: 120,
    Price: 450.00,
    Trans_Date: "2024-05-15",
    Trans_Time: "13:05:12",
    Total_Amt: 54000.00 // 120 * 450.00
  },
  {
    Trans_ID: 1007,
    User_ID: 101,
    Portfolio_ID: 1,
    Stock_ID: 7,
    Stock_Name: "Larsen & Toubro",
    Stock_Symbol: "LT",
    Portfolio_Name: "Long-Term Growth",
    Trans_Type: "BUY",
    Quantity: 15,
    Price: 3520.00,
    Trans_Date: "2024-06-18",
    Trans_Time: "10:55:00",
    Total_Amt: 52800.00 // 15 * 3520.00
  },
  {
    Trans_ID: 1008,
    User_ID: 101,
    Portfolio_ID: 3,
    Stock_ID: 6,
    Stock_Name: "Tata Motors",
    Stock_Symbol: "TATAMOTORS",
    Portfolio_Name: "Dividend & Defensive",
    Trans_Type: "BUY",
    Quantity: 30,
    Price: 945.00,
    Trans_Date: "2024-07-22",
    Trans_Time: "12:14:30",
    Total_Amt: 28350.00 // 30 * 945.00
  },
  {
    Trans_ID: 1009,
    User_ID: 101,
    Portfolio_ID: 2,
    Stock_ID: 8,
    Stock_Name: "Bharti Airtel",
    Stock_Symbol: "BHARTIARTL",
    Portfolio_Name: "Tech & Innovation",
    Trans_Type: "BUY",
    Quantity: 25,
    Price: 1610.00,
    Trans_Date: "2024-08-30",
    Trans_Time: "11:02:19",
    Total_Amt: 40250.00 // 25 * 1610.00
  }
];

/**
 * Illustrative Demo Historical Trend Data (Purple & Yellow Lines)
 */
export const demoPortfolioTrend = [
  { month: "Jan", portfolioValue: 121046, investedAmount: 121046 },
  { month: "Feb", portfolioValue: 135800, investedAmount: 121046 },
  { month: "Mar", portfolioValue: 228500, investedAmount: 207308 },
  { month: "Apr", portfolioValue: 315400, investedAmount: 287308 },
  { month: "May", portfolioValue: 342200, investedAmount: 325308 },
  { month: "Jun", portfolioValue: 398600, investedAmount: 378108 },
  { month: "Jul", portfolioValue: 412000, investedAmount: 406458 },
  { month: "Aug", portfolioValue: 435800, investedAmount: 446708 },
  { month: "Sep", portfolioValue: 462500, investedAmount: 446708 },
  { month: "Oct", portfolioValue: 486708, investedAmount: 446708 },
];

/**
 * DBMS Relational Schema Documentation for Profile Inspector
 */
export const dbmsSchemaDocs = [
  {
    table: "Users",
    description: "Core investor credentials & system identity",
    columns: [
      { name: "User_ID", type: "INT", key: "PK", extra: "AUTO_INCREMENT" },
      { name: "Name", type: "VARCHAR(100)", key: "", extra: "NOT NULL" },
      { name: "Email", type: "VARCHAR(100)", key: "UNIQUE", extra: "NOT NULL" },
      { name: "Password", type: "VARCHAR(255)", key: "", extra: "NOT NULL (Hashed)" }
    ]
  },
  {
    table: "Profile",
    description: "Personal and contact details mapped 1:1 to Users",
    columns: [
      { name: "Profile_ID", type: "INT", key: "PK", extra: "AUTO_INCREMENT" },
      { name: "User_ID", type: "INT", key: "FK -> Users(User_ID)", extra: "UNIQUE" },
      { name: "DOB", type: "DATE", key: "", extra: "" },
      { name: "Phone", type: "VARCHAR(20)", key: "", extra: "" },
      { name: "Address", type: "TEXT", key: "", extra: "" }
    ]
  },
  {
    table: "Stock",
    description: "Tradable equity instruments and exchange listings",
    columns: [
      { name: "Stock_ID", type: "INT", key: "PK", extra: "AUTO_INCREMENT" },
      { name: "Stock_Name", type: "VARCHAR(100)", key: "", extra: "NOT NULL" },
      { name: "Stock_Price", type: "DECIMAL(10,2)", key: "", extra: "NOT NULL" },
      { name: "Exchange", type: "VARCHAR(10)", key: "", extra: "NSE / BSE" }
    ]
  },
  {
    table: "Portfolio",
    description: "User-defined investment baskets for asset segregation",
    columns: [
      { name: "Portfolio_ID", type: "INT", key: "PK", extra: "AUTO_INCREMENT" },
      { name: "User_ID", type: "INT", key: "FK -> Users(User_ID)", extra: "NOT NULL" },
      { name: "Portfolio_Name", type: "VARCHAR(100)", key: "", extra: "NOT NULL" },
      { name: "Created_At", type: "DATE", key: "", extra: "DEFAULT CURRENT_DATE" }
    ]
  },
  {
    table: "Portfolio_Stock",
    description: "Junction table storing holding quantities per portfolio",
    columns: [
      { name: "Portfolio_ID", type: "INT", key: "PK, FK -> Portfolio", extra: "Composite PK" },
      { name: "Stock_ID", type: "INT", key: "PK, FK -> Stock", extra: "Composite PK" },
      { name: "Quantity_Held", type: "INT", key: "", extra: "CHECK (Quantity_Held >= 0)" }
    ]
  },
  {
    table: "Transactions",
    description: "Audited ledger recording all BUY and SELL trades",
    columns: [
      { name: "Trans_ID", type: "INT", key: "PK", extra: "AUTO_INCREMENT" },
      { name: "User_ID", type: "INT", key: "FK -> Users", extra: "NOT NULL" },
      { name: "Portfolio_ID", type: "INT", key: "FK -> Portfolio", extra: "NOT NULL" },
      { name: "Stock_ID", type: "INT", key: "FK -> Stock", extra: "NOT NULL" },
      { name: "Trans_Type", type: "VARCHAR(4)", key: "", extra: "ENUM('BUY', 'SELL')" },
      { name: "Quantity", type: "INT", key: "", extra: "NOT NULL" },
      { name: "Price", type: "DECIMAL(10,2)", key: "", extra: "NOT NULL" },
      { name: "Trans_Date", type: "DATE", key: "", extra: "NOT NULL" },
      { name: "Trans_Time", type: "TIME", key: "", extra: "NOT NULL" },
      { name: "Total_Amt", type: "DECIMAL(12,2)", key: "", extra: "GENERATED AS (Quantity * Price)" }
    ]
  }
];
