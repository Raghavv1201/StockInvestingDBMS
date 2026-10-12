import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import Portfolios from './pages/Portfolios';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import TradeModal from './components/common/TradeModal';
import NewPortfolioModal from './components/common/NewPortfolioModal';

import {
  mockStocks,
  getInitialPortfolios,
  mockTransactions,
  mockUsers,
  mockProfile
} from './data/mockData';

export default function App() {
  // Predefined local state for all entities (No backend/MySQL connection needed)
  const [stocks, setStocks] = useState(mockStocks);
  const [portfolios, setPortfolios] = useState(getInitialPortfolios);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [currentUser] = useState(mockUsers[0]);
  const [userProfile] = useState(mockProfile);

  // UI modal states
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeDefaultStockId, setTradeDefaultStockId] = useState(null);
  const [isNewPortfolioModalOpen, setIsNewPortfolioModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Handler: Open Trade Modal preselected for a stock
  const handleOpenTradeForStock = (stockId) => {
    setTradeDefaultStockId(stockId);
    setIsTradeModalOpen(true);
  };

  // Handler: Record a new transaction (BUY / SELL) in local state
  const handleRecordTransaction = (newTx) => {
    const stockObj = stocks.find((s) => s.Stock_ID === newTx.Stock_ID);
    const portfolioObj = portfolios.find((p) => p.Portfolio_ID === newTx.Portfolio_ID);

    // 1. Calculate transaction total amount (Quantity * Price)
    const calculatedTotalAmt = Number((newTx.Quantity * newTx.Price).toFixed(2));

    const enrichedTx = {
      ...newTx,
      Stock_Name: stockObj ? stockObj.Stock_Name : `Stock #${newTx.Stock_ID}`,
      Stock_Symbol: stockObj ? stockObj.Symbol : 'STK',
      Portfolio_Name: portfolioObj ? portfolioObj.Portfolio_Name : `Portfolio #${newTx.Portfolio_ID}`,
      Total_Amt: calculatedTotalAmt
    };

    // Prepend to transaction list
    setTransactions((prev) => [enrichedTx, ...prev]);

    // 2. Dynamically update portfolio holdings and investment values (Quantity * Stock_Price)
    setPortfolios((prev) =>
      prev.map((port) => {
        if (port.Portfolio_ID !== newTx.Portfolio_ID) return port;

        const existingHoldings = [...(port.holdings || [])];
        const holdingIndex = existingHoldings.findIndex((h) => h.Stock_ID === newTx.Stock_ID);
        const currentStockPrice = stockObj?.Stock_Price || newTx.Price;

        if (newTx.Trans_Type === 'BUY') {
          if (holdingIndex >= 0) {
            const updatedQty = existingHoldings[holdingIndex].Quantity_Held + newTx.Quantity;
            const updatedVal = Number((updatedQty * currentStockPrice).toFixed(2));
            existingHoldings[holdingIndex] = {
              ...existingHoldings[holdingIndex],
              Quantity_Held: updatedQty,
              Stock_Price: currentStockPrice,
              Investment_Value: updatedVal
            };
          } else {
            existingHoldings.push({
              Stock_ID: newTx.Stock_ID,
              Stock_Name: stockObj?.Stock_Name || 'Unknown Stock',
              Symbol: stockObj?.Symbol || 'STK',
              Exchange: stockObj?.Exchange || 'NSE',
              Quantity_Held: newTx.Quantity,
              Stock_Price: currentStockPrice,
              Investment_Value: Number((newTx.Quantity * currentStockPrice).toFixed(2))
            });
          }
        } else if (newTx.Trans_Type === 'SELL') {
          if (holdingIndex >= 0) {
            const updatedQty = Math.max(0, existingHoldings[holdingIndex].Quantity_Held - newTx.Quantity);
            if (updatedQty === 0) {
              existingHoldings.splice(holdingIndex, 1);
            } else {
              const updatedVal = Number((updatedQty * currentStockPrice).toFixed(2));
              existingHoldings[holdingIndex] = {
                ...existingHoldings[holdingIndex],
                Quantity_Held: updatedQty,
                Stock_Price: currentStockPrice,
                Investment_Value: updatedVal
              };
            }
          }
        }

        // Recalculate portfolio total value
        const newTotalVal = existingHoldings.reduce((sum, h) => sum + h.Investment_Value, 0);

        return {
          ...port,
          holdings: existingHoldings,
          Total_Value: Number(newTotalVal.toFixed(2)),
          Total_Stocks_Count: existingHoldings.length
        };
      })
    );
  };

  // Handler: Create new portfolio in local state
  const handleCreatePortfolio = (newPortfolio) => {
    setPortfolios((prev) => [...prev, newPortfolio]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-950 bg-fintech-mesh text-slate-100 flex flex-col antialiased">
        {/* Left Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Main Content Area */}
        <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
          {/* Top Navbar */}
          <Navbar
            user={currentUser}
            setIsMobileOpen={setIsMobileSidebarOpen}
            onOpenTradeModal={() => {
              setTradeDefaultStockId(null);
              setIsTradeModalOpen(true);
            }}
          />

          {/* Page View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    stocks={stocks}
                    portfolios={portfolios}
                    transactions={transactions}
                    user={currentUser}
                    onOpenTradeModal={() => {
                      setTradeDefaultStockId(null);
                      setIsTradeModalOpen(true);
                    }}
                  />
                }
              />
              <Route
                path="/stocks"
                element={
                  <Stocks
                    stocks={stocks}
                    onTradeStock={handleOpenTradeForStock}
                  />
                }
              />
              <Route
                path="/portfolios"
                element={
                  <Portfolios
                    portfolios={portfolios}
                    stocks={stocks}
                    onOpenNewPortfolioModal={() => setIsNewPortfolioModalOpen(true)}
                    onTradeStock={handleOpenTradeForStock}
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={transactions}
                    onOpenTradeModal={() => {
                      setTradeDefaultStockId(null);
                      setIsTradeModalOpen(true);
                    }}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    user={currentUser}
                    profile={userProfile}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Trade / Transaction Modal */}
        <TradeModal
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          stocks={stocks}
          portfolios={portfolios}
          onRecordTransaction={handleRecordTransaction}
          defaultStockId={tradeDefaultStockId}
        />

        {/* Create Portfolio Modal */}
        <NewPortfolioModal
          isOpen={isNewPortfolioModalOpen}
          onClose={() => setIsNewPortfolioModalOpen(false)}
          onCreatePortfolio={handleCreatePortfolio}
        />
      </div>
    </BrowserRouter>
  );
}
