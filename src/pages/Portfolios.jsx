import React, { useState } from 'react';
import {
  Briefcase,
  PlusCircle,
  Calendar,
  Layers,
  TrendingUp,
  Wallet,
  ArrowRight,
  PieChart,
  Inbox
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function Portfolios({
  portfolios = [],
  stocks = [],
  onOpenNewPortfolioModal,
  onTradeStock
}) {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(
    portfolios[0]?.Portfolio_ID || null
  );

  // Active portfolio
  const activePortfolio =
    portfolios.find((p) => p.Portfolio_ID === selectedPortfolioId) || portfolios[0];

  const holdings = activePortfolio?.holdings || [];
  const portfolioTotalValue = activePortfolio?.Total_Value || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Investment Portfolios
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Portfolio &amp; Portfolio_Stock
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Segregated asset baskets with automated valuation via <code className="text-purple-300">Quantity_Held &times; Stock_Price</code>.
          </p>
        </div>

        <button
          onClick={onOpenNewPortfolioModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-coral hover:from-purple-600 hover:to-rose-600 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Portfolio</span>
        </button>
      </div>

      {/* Portfolio Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolios.map((portfolio) => {
          const isSelected = activePortfolio?.Portfolio_ID === portfolio.Portfolio_ID;
          return (
            <div
              key={portfolio.Portfolio_ID}
              onClick={() => setSelectedPortfolioId(portfolio.Portfolio_ID)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-950/40 via-dark-900 to-dark-850 border-purple-500/50 shadow-glow-purple'
                  : 'bg-dark-900/80 border-white/10 hover:border-white/20 hover:bg-dark-850'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-coral to-brand-yellow" />
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {portfolio.Portfolio_Name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>Created {portfolio.Created_At}</span>
                    </div>
                  </div>
                </div>

                <span className="font-mono text-xs px-2 py-0.5 rounded bg-dark-950 border border-white/10 text-slate-400">
                  #{portfolio.Portfolio_ID}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
                    Total Value
                  </span>
                  <span className="text-base font-bold text-white font-mono">
                    ₹{(portfolio.Total_Value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
                    Assets Held
                  </span>
                  <span className="text-xs font-semibold text-purple-300 font-mono">
                    {portfolio.Total_Stocks_Count || portfolio.holdings?.length || 0} equities
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Portfolio Details Card */}
      {activePortfolio ? (
        <div className="fintech-card p-6 space-y-6">
          {/* Active Portfolio Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {activePortfolio.Portfolio_Name}
                </h2>
                <Badge variant="purple">Active Basket</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Portfolio ID: <span className="font-mono text-white">#{activePortfolio.Portfolio_ID}</span> &bull; User ID: <span className="font-mono text-white">#{activePortfolio.User_ID}</span> &bull; Created on <span className="font-mono text-white">{activePortfolio.Created_At}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-dark-950/80 border border-white/10 rounded-2xl px-5 py-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
                  Current Basket Valuation
                </span>
                <span className="text-xl font-extrabold text-white font-mono">
                  ₹{portfolioTotalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Holdings Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase font-mono">
                Holdings Breakdown (Portfolio_Stock Table)
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {holdings.length} stocks allocated
              </span>
            </div>

            {holdings.length === 0 ? (
              /* Clear Empty State */
              <div className="py-16 text-center space-y-3 bg-dark-950/40 rounded-2xl border border-white/5">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                  <Inbox className="w-7 h-7" />
                </div>
                <h4 className="text-base font-semibold text-slate-300">No stocks in this portfolio yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  This portfolio doesn't hold any equities. Record a BUY transaction or add stocks to start building this basket.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onTradeStock && onTradeStock(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
                  >
                    + Add Stocks via Trade
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-dark-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                      <th className="py-3 px-4 sm:px-6">Stock Name</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Exchange</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Quantity Held</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Stock Price (₹)</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Investment Value (₹)</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Allocation</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {holdings.map((holding) => {
                      const allocationPercent =
                        portfolioTotalValue > 0
                          ? ((holding.Investment_Value / portfolioTotalValue) * 100).toFixed(1)
                          : 0;

                      return (
                        <tr
                          key={holding.Stock_ID}
                          className="hover:bg-purple-950/20 transition-colors"
                        >
                          {/* Stock Name */}
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-400 font-mono">
                                {holding.Symbol ? holding.Symbol.slice(0, 3) : 'STK'}
                              </div>
                              <div>
                                <span className="font-semibold text-white block">
                                  {holding.Stock_Name}
                                </span>
                                <span className="text-xs text-slate-500 font-mono">
                                  ID: #{holding.Stock_ID}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Exchange */}
                          <td className="py-4 px-4 sm:px-6 text-center">
                            <Badge variant={holding.Exchange} size="xs">
                              {holding.Exchange}
                            </Badge>
                          </td>

                          {/* Quantity Held */}
                          <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-slate-200">
                            {holding.Quantity_Held}
                          </td>

                          {/* Stock Price */}
                          <td className="py-4 px-4 sm:px-6 text-right font-mono text-slate-300">
                            ₹{holding.Stock_Price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>

                          {/* Calculated Investment Value: Quantity Held * Stock Price */}
                          <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-white text-base">
                            ₹{holding.Investment_Value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>

                          {/* Allocation % Bar */}
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="inline-flex items-center gap-2">
                              <span className="text-xs font-mono text-purple-300 font-medium">
                                {allocationPercent}%
                              </span>
                              <div className="w-16 h-1.5 bg-dark-950 rounded-full overflow-hidden hidden sm:block">
                                <div
                                  className="h-full bg-gradient-to-r from-brand-purple to-brand-coral rounded-full"
                                  style={{ width: `${Math.min(100, allocationPercent)}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Quick Trade Action */}
                          <td className="py-4 px-4 sm:px-6 text-center">
                            <button
                              onClick={() => onTradeStock && onTradeStock(holding.Stock_ID)}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                            >
                              Trade
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fintech-card p-12 text-center text-slate-400">
          No portfolios available. Click "+ New Portfolio" above to create one.
        </div>
      )}
    </div>
  );
}
