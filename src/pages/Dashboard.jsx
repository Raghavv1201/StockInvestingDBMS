import React from 'react';
import {
  TrendingUp,
  Wallet,
  Briefcase,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Info,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import { demoPortfolioTrend } from '../data/mockData';

export default function Dashboard({
  stocks = [],
  portfolios = [],
  transactions = [],
  user = {},
  onOpenTradeModal
}) {
  // Aggregate portfolio metrics
  const totalPortfolioValue = portfolios.reduce((sum, p) => sum + (p.Total_Value || 0), 0);
  
  // Calculate total invested from transactions (BUY total minus SELL total, or sum of buys)
  const totalBuyAmt = transactions
    .filter(t => t.Trans_Type === 'BUY')
    .reduce((sum, t) => sum + (t.Total_Amt || (t.Quantity * t.Price) || 0), 0);
  const totalSellAmt = transactions
    .filter(t => t.Trans_Type === 'SELL')
    .reduce((sum, t) => sum + (t.Total_Amt || (t.Quantity * t.Price) || 0), 0);
  const netInvestedCapital = Math.max(0, totalBuyAmt - totalSellAmt);

  const totalUnrealizedGain = totalPortfolioValue - netInvestedCapital;
  const gainPercentage = netInvestedCapital > 0 ? ((totalUnrealizedGain / netInvestedCapital) * 100).toFixed(2) : '0.00';

  // Count unique stocks held across portfolios
  const allHoldings = portfolios.flatMap(p => p.holdings || []);
  const uniqueStockIds = new Set(allHoldings.map(h => h.Stock_ID));
  const totalStocksHeld = uniqueStockIds.size;

  // Prepare allocation chart data by stock
  const allocationMap = {};
  allHoldings.forEach(h => {
    if (!allocationMap[h.Stock_Name]) {
      allocationMap[h.Stock_Name] = 0;
    }
    allocationMap[h.Stock_Name] += (h.Investment_Value || 0);
  });

  const allocationData = Object.keys(allocationMap).map((name) => ({
    name,
    value: Number((allocationMap[name] || 0).toFixed(2))
  })).sort((a, b) => b.value - a.value);

  const ALLOCATION_COLORS = ['#8B5CF6', '#F43F5E', '#FBBF24', '#06B6D4', '#10B981', '#EC4899', '#6366F1'];

  // Top holdings (sorted by investment value)
  const topHoldings = [...allHoldings]
    .sort((a, b) => (b.Investment_Value || 0) - (a.Investment_Value || 0))
    .slice(0, 5);

  // Recent 4 transactions (safe date/ID comparison)
  const recentTransactions = [...transactions]
    .sort((a, b) => {
      const timeB = b.Trans_Date && b.Trans_Time ? new Date(`${b.Trans_Date} ${b.Trans_Time}`).getTime() : 0;
      const timeA = a.Trans_Date && a.Trans_Time ? new Date(`${a.Trans_Date} ${a.Trans_Time}`).getTime() : 0;
      return (timeB || b.Trans_ID || 0) - (timeA || a.Trans_ID || 0);
    })
    .slice(0, 4);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-900 border border-purple-500/30 p-3 rounded-xl shadow-xl shadow-black/80 text-xs backdrop-blur-md">
          <p className="font-semibold text-slate-300 mb-1.5">{label} (Demo Data)</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
              <span className="text-slate-400">Valuation:</span>
              <span className="font-mono text-purple-300 font-bold">
                ₹{payload[0]?.value?.toLocaleString('en-IN')}
              </span>
            </div>
            {payload[1] && (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
                <span className="text-slate-400">Net Invested:</span>
                <span className="font-mono text-amber-300 font-bold">
                  ₹{payload[1]?.value?.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner with Gradient & Glowing Accents */}
      <div className="relative rounded-3xl gradient-panel p-6 sm:p-8 overflow-hidden shadow-glow-card">
        {/* Glow ambient background circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
              <span>Demo Mode &bull; Predefined StockInvestingDB Dataset</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-300 to-amber-300">{user?.Name || 'Raghav'}</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Real-time portfolio management, stock analysis, and transactional ledger powered by relational database architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenTradeModal}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-brand-purple to-brand-coral hover:from-purple-600 hover:to-rose-600 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02]"
            >
              + Record Trade
            </button>
            <Link
              to="/portfolios"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 bg-dark-900/80 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Manage Portfolios
            </Link>
          </div>
        </div>
      </div>

      {/* Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Portfolio Value"
          value={`₹${totalPortfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
          subtext="Current Net Worth"
          change={`+${gainPercentage}%`}
          isPositive={totalUnrealizedGain >= 0}
          icon={Wallet}
          accentColor="purple"
        />
        <StatCard
          title="Total Amount Invested"
          value={`₹${netInvestedCapital.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
          subtext={`Unrealized P&L: ₹${totalUnrealizedGain.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
          change="Net Capital"
          isPositive={true}
          icon={TrendingUp}
          accentColor="coral"
        />
        <StatCard
          title="Portfolios Managed"
          value={portfolios.length}
          subtext="Active Investment Baskets"
          change="User Baskets"
          isPositive={true}
          icon={Briefcase}
          accentColor="yellow"
        />
        <StatCard
          title="Unique Stocks Held"
          value={totalStocksHeld}
          subtext={`Across ${portfolios.length} Portfolios`}
          change="Diversified"
          isPositive={true}
          icon={Layers}
          accentColor="cyan"
        />
      </div>

      {/* Main Charts Row: Valuation Trend (Purple & Yellow) + Allocation Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Line Chart (Purple & Yellow Lines) */}
        <div className="lg:col-span-2 fintech-card p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Portfolio Valuation Trend
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Demo Illustrative Data
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dual comparison of total valuation vs net invested capital over time
              </p>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-brand-purple shadow-[0_0_8px_#8B5CF6]" />
                <span className="text-slate-300 font-medium">Valuation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-brand-yellow shadow-[0_0_8px_#FBBF24]" />
                <span className="text-slate-300 font-medium">Invested</span>
              </div>
            </div>
          </div>

          {/* Recharts Area/Line Chart */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoPortfolioTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {/* Purple Gradient Fill */}
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Yellow Gradient Fill */}
                  <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FBBF24" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2A44" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#1F2A44' }}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#1F2A44' }}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Purple Line for Portfolio Valuation */}
                <Area
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#purpleGradient)"
                  name="Valuation"
                />
                {/* Yellow Line for Invested Amount */}
                <Area
                  type="monotone"
                  dataKey="investedAmount"
                  stroke="#FBBF24"
                  strokeWidth={2.2}
                  fillOpacity={1}
                  fill="url(#yellowGradient)"
                  name="Invested Amount"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-400 text-center pt-2 italic">
            *Historical line data is illustrative demo simulation. Current table values below are grounded in project DBMS data.
          </div>
        </div>

        {/* Portfolio Allocation Donut Chart */}
        <div className="fintech-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="text-base font-bold text-white tracking-wide">
                Asset Allocation
              </h3>
              <Badge variant="purple">Holding Share</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Distribution of capital by individual stock holdings
            </p>
          </div>

          <div className="h-56 relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ALLOCATION_COLORS[index % ALLOCATION_COLORS.length]}
                      stroke="#0D111D"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Value']}
                  contentStyle={{
                    backgroundColor: '#0B0F19',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Assets</span>
              <span className="text-lg font-bold text-white font-mono">{allocationData.length}</span>
            </div>
          </div>

          {/* Allocation Breakdown Chips */}
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {allocationData.slice(0, 4).map((item, idx) => {
              const percent = totalPortfolioValue > 0 ? ((item.value / totalPortfolioValue) * 100).toFixed(1) : 0;
              return (
                <div key={item.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length] }}
                    />
                    <span className="text-slate-300 font-medium truncate max-w-[110px]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">{percent}%</span>
                    <span className="text-white font-medium">₹{item.value.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Holdings + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Holdings Table */}
        <div className="fintech-card p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Top Stock Holdings</h3>
              <p className="text-xs text-slate-400">Largest asset positions across portfolios</p>
            </div>
            <Link
              to="/portfolios"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
            >
              View Portfolios <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {topHoldings.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No holdings found</div>
            ) : (
              topHoldings.map((holding) => (
                <div
                  key={`${holding.Stock_ID}-${holding.Stock_Name}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-900/60 border border-white/5 hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      {holding.Symbol ? holding.Symbol.slice(0, 3) : 'STK'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {holding.Stock_Name}
                        </span>
                        <Badge variant={holding.Exchange} size="xs">
                          {holding.Exchange}
                        </Badge>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {holding.Quantity_Held} shares @ ₹{holding.Stock_Price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-white font-mono">
                      ₹{holding.Investment_Value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Qty &times; Price
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent BUY/SELL Activity */}
        <div className="fintech-card p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-400">Latest activity logged in Transactions table</p>
            </div>
            <Link
              to="/transactions"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
            >
              All Records <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No transactions recorded yet</div>
            ) : (
              recentTransactions.map((tx) => (
                <div
                  key={tx.Trans_ID}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-900/60 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={tx.Trans_Type} size="sm">
                      {tx.Trans_Type}
                    </Badge>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {tx.Stock_Name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                        <span>{tx.Quantity} shares</span>
                        <span>&bull;</span>
                        <span>₹{tx.Price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-white font-mono">
                      ₹{tx.Total_Amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{tx.Trans_Date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
