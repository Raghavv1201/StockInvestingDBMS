import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, ArrowUpDown, PlusCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Badge from '../components/common/Badge';

export default function Stocks({ stocks = [], onTradeStock }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExchange, setSelectedExchange] = useState('ALL');
  const [sortBy, setSortBy] = useState('ID_ASC');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Filter and sort stocks
  const filteredStocks = useMemo(() => {
    return stocks
      .filter((stock) => {
        const name = stock.Stock_Name || '';
        const symbol = stock.Symbol || '';
        const id = (stock.Stock_ID || '').toString();
        const exchange = stock.Exchange || 'NSE';

        const matchesSearch =
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          id.includes(searchTerm);

        const matchesExchange =
          selectedExchange === 'ALL' || exchange.toUpperCase() === selectedExchange.toUpperCase();

        return matchesSearch && matchesExchange;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_DESC') return (b.Stock_Price || 0) - (a.Stock_Price || 0);
        if (sortBy === 'PRICE_ASC') return (a.Stock_Price || 0) - (b.Stock_Price || 0);
        if (sortBy === 'NAME_ASC') return (a.Stock_Name || '').localeCompare(b.Stock_Name || '');
        return (a.Stock_ID || 0) - (b.Stock_ID || 0);
      });
  }, [stocks, searchTerm, selectedExchange, sortBy]);

  const nseCount = stocks.filter((s) => s.Exchange === 'NSE').length;
  const bseCount = stocks.filter((s) => s.Exchange === 'BSE').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stocks Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Stock Table
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Tradable equities listed in MySQL database <code className="text-purple-300">StockInvestingDB</code>.
          </p>
        </div>

        {/* Database notice tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900 border border-white/10 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>DBMS Sample Dataset &bull; Static project prices</span>
        </div>
      </div>

      {/* Control Bar: Search & Exchange Filters */}
      <div className="fintech-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by stock name, symbol, or Stock_ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="ID_ASC">Sort by ID (Default)</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="NAME_ASC">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Exchange Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Exchange:
            </span>
            <button
              onClick={() => setSelectedExchange('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedExchange === 'ALL'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              All ({stocks.length})
            </button>
            <button
              onClick={() => setSelectedExchange('NSE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedExchange === 'NSE'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              NSE ({nseCount})
            </button>
            <button
              onClick={() => setSelectedExchange('BSE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedExchange === 'BSE'
                  ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              BSE ({bseCount})
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-bold">{filteredStocks.length}</span> of {stocks.length} stocks
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="fintech-card overflow-hidden">
        {filteredStocks.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-slate-300 font-semibold text-sm">No matching stocks found</p>
            <p className="text-slate-500 text-xs">Try adjusting your search criteria or clearing filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedExchange('ALL'); }}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-dark-950/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  <th className="py-3.5 px-4 sm:px-6">Stock ID</th>
                  <th className="py-3.5 px-4 sm:px-6">Stock Name</th>
                  <th className="py-3.5 px-4 sm:px-6">Exchange</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Price (₹)</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredStocks.map((stock) => (
                  <tr
                    key={stock.Stock_ID}
                    className="hover:bg-purple-950/20 transition-colors group"
                  >
                    {/* Stock ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-400">
                      <span className="px-2 py-1 rounded-md bg-dark-950 border border-white/10 text-slate-300">
                        #{stock.Stock_ID.toString().padStart(3, '0')}
                      </span>
                    </td>

                    {/* Stock Name & Symbol */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500/20 to-brand-coral/10 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300 group-hover:scale-105 transition-transform">
                          {stock.Symbol ? stock.Symbol.slice(0, 3) : 'STK'}
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {stock.Stock_Name}
                          </div>
                          <div className="text-xs text-slate-500 font-mono">
                            {stock.Symbol || 'EQ'} {stock.Sector ? `• ${stock.Sector}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Exchange Badge */}
                    <td className="py-4 px-4 sm:px-6">
                      <Badge variant={stock.Exchange} size="sm">
                        {stock.Exchange}
                      </Badge>
                    </td>

                    {/* Price in INR */}
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-white text-base">
                      ₹{stock.Stock_Price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Quick Trade / Buy Action */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <button
                        onClick={() => onTradeStock && onTradeStock(stock.Stock_ID)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 transition-all hover:scale-105 shadow-[0_0_10px_rgba(139,92,246,0.15)]"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Trade</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Info Notice */}
      <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-4 flex items-center justify-between text-xs text-slate-400">
        <div>
          <span className="font-semibold text-slate-300">Schema Reference:</span> Table <code className="text-purple-300 font-mono">Stock(Stock_ID, Stock_Name, Stock_Price, Exchange)</code>
        </div>
        <div className="text-[11px] font-mono">
          Total Stocks In DB: <span className="text-white font-bold">{stocks.length}</span>
        </div>
      </div>
    </div>
  );
}
