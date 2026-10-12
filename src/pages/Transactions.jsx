import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowLeftRight,
  TrendingUp,
  PlusCircle,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function Transactions({ transactions = [], onOpenTradeModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL'); // 'ALL', 'BUY', 'SELL'
  const [sortBy, setSortBy] = useState('DATE_DESC');

  // Filter & sort transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const stockName = tx.Stock_Name || '';
        const transId = (tx.Trans_ID || '').toString();
        const portfolioName = tx.Portfolio_Name || '';
        const transType = tx.Trans_Type || 'BUY';

        const matchesSearch =
          stockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transId.includes(searchTerm) ||
          portfolioName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
          selectedType === 'ALL' || transType.toUpperCase() === selectedType.toUpperCase();

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        const amtA = tx => tx.Total_Amt || (tx.Quantity * tx.Price) || 0;
        if (sortBy === 'AMOUNT_DESC') return amtA(b) - amtA(a);
        if (sortBy === 'AMOUNT_ASC') return amtA(a) - amtA(b);

        const timeB = b.Trans_Date && b.Trans_Time ? new Date(`${b.Trans_Date} ${b.Trans_Time}`).getTime() : (b.Trans_ID || 0);
        const timeA = a.Trans_Date && a.Trans_Time ? new Date(`${a.Trans_Date} ${a.Trans_Time}`).getTime() : (a.Trans_ID || 0);

        if (sortBy === 'DATE_ASC') {
          return timeA - timeB;
        }
        // Default: DATE_DESC
        return timeB - timeA;
      });
  }, [transactions, searchTerm, selectedType, sortBy]);

  // Aggregate metrics
  const totalBuyVolume = transactions
    .filter((t) => t.Trans_Type === 'BUY')
    .reduce((sum, t) => sum + (t.Total_Amt || (t.Quantity * t.Price) || 0), 0);

  const totalSellVolume = transactions
    .filter((t) => t.Trans_Type === 'SELL')
    .reduce((sum, t) => sum + (t.Total_Amt || (t.Quantity * t.Price) || 0), 0);

  const buyCount = transactions.filter((t) => t.Trans_Type === 'BUY').length;
  const sellCount = transactions.filter((t) => t.Trans_Type === 'SELL').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Transaction History
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Transactions Table
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Complete audited audit trail with MySQL generated column <code className="text-purple-300">Total_Amt = Quantity &times; Price</code>.
          </p>
        </div>

        <button
          onClick={onOpenTradeModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-coral hover:from-purple-600 hover:to-rose-600 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record Transaction</span>
        </button>
      </div>

      {/* Summary KPI Mini-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Records */}
        <div className="fintech-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
              Total Transactions
            </span>
            <span className="text-xl font-bold text-white font-mono mt-1 block">
              {transactions.length} orders
            </span>
            <span className="text-[11px] text-slate-500">
              {buyCount} Buys &bull; {sellCount} Sells
            </span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
        </div>

        {/* Buy Volume */}
        <div className="fintech-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono block">
              Total BUY Volume
            </span>
            <span className="text-xl font-bold text-emerald-300 font-mono mt-1 block">
              ₹{totalBuyVolume.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-slate-500">
              Capital deployed into equities
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Sell Volume */}
        <div className="fintech-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-rose-400 uppercase tracking-wider font-mono block">
              Total SELL Volume
            </span>
            <span className="text-xl font-bold text-rose-300 font-mono mt-1 block">
              ₹{totalSellVolume.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-slate-500">
              Capital liquidated / realized
            </span>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="fintech-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by stock name, portfolio, or Trans_ID..."
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="DATE_DESC">Date: Newest First</option>
            <option value="DATE_ASC">Date: Oldest First</option>
            <option value="AMOUNT_DESC">Total: Highest First</option>
            <option value="AMOUNT_ASC">Total: Lowest First</option>
          </select>
        </div>

        {/* Transaction Type Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedType === 'ALL'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setSelectedType('BUY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedType === 'BUY'
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              BUY ({buyCount})
            </button>
            <button
              onClick={() => setSelectedType('SELL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedType === 'SELL'
                  ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              SELL ({sellCount})
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-bold">{filteredTransactions.length}</span> records
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="fintech-card overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-slate-300 font-semibold text-sm">No transactions match the criteria</p>
            <p className="text-slate-500 text-xs">Try resetting filters or clear your search query.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedType('ALL'); }}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-dark-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  <th className="py-3.5 px-4 sm:px-6">Trans ID</th>
                  <th className="py-3.5 px-4 sm:px-6">Stock</th>
                  <th className="py-3.5 px-4 sm:px-6">Portfolio</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Type</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Quantity</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Unit Price (₹)</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Total Amount (₹)</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Date &amp; Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.Trans_ID}
                    className="hover:bg-purple-950/20 transition-colors group"
                  >
                    {/* Trans ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-400">
                      <span className="px-2 py-1 rounded-md bg-dark-950 border border-white/10 text-slate-300">
                        #{tx.Trans_ID}
                      </span>
                    </td>

                    {/* Stock Name */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {tx.Stock_Name}
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        Stock ID: #{tx.Stock_ID}
                      </span>
                    </td>

                    {/* Portfolio */}
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-300 font-medium">
                      {tx.Portfolio_Name}
                    </td>

                    {/* Type: BUY or SELL with bright badges */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <Badge variant={tx.Trans_Type} size="sm">
                        {tx.Trans_Type}
                      </Badge>
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-slate-200">
                      {tx.Quantity}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-slate-300">
                      ₹{tx.Price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Total Amount (Quantity * Price) */}
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-white text-base">
                      <span className={tx.Trans_Type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>
                        ₹{tx.Total_Amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-4 sm:px-6 text-right text-xs text-slate-400 font-mono">
                      <div className="text-slate-200">{tx.Trans_Date}</div>
                      <div className="text-[11px] text-slate-500">{tx.Trans_Time}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Schema Calculation Info Box */}
      <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Database Formula: <code className="text-purple-300 font-mono">Total_Amt = Quantity &times; Price</code> generated on MySQL side.
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          Table: <span className="text-white">Transactions</span>
        </div>
      </div>
    </div>
  );
}
