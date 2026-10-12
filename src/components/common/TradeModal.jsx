import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export default function TradeModal({ isOpen, onClose, stocks, portfolios, onRecordTransaction, defaultStockId = null }) {
  const [selectedStockId, setSelectedStockId] = useState(defaultStockId || (stocks[0]?.Stock_ID || ''));
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(portfolios[0]?.Portfolio_ID || '');
  const [transType, setTransType] = useState('BUY');
  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState(stocks[0]?.Stock_Price || 1450.50);
  const [successMsg, setSuccessMsg] = useState('');

  // Update selected stock price when stock changes
  useEffect(() => {
    if (defaultStockId) {
      setSelectedStockId(defaultStockId);
    }
  }, [defaultStockId]);

  useEffect(() => {
    const found = stocks.find(s => s.Stock_ID === Number(selectedStockId));
    if (found) {
      setPrice(found.Stock_Price);
    }
  }, [selectedStockId, stocks]);

  const totalAmount = Number((Number(quantity || 0) * Number(price || 0)).toFixed(2));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStockId || !selectedPortfolioId || quantity <= 0 || price <= 0) {
      return;
    }

    const newTx = {
      Trans_ID: Math.floor(1000 + Math.random() * 9000),
      User_ID: 101,
      Portfolio_ID: Number(selectedPortfolioId),
      Stock_ID: Number(selectedStockId),
      Trans_Type: transType,
      Quantity: Number(quantity),
      Price: Number(price),
      Trans_Date: new Date().toISOString().split('T')[0],
      Trans_Time: new Date().toTimeString().split(' ')[0],
      Total_Amt: totalAmount
    };

    onRecordTransaction(newTx);
    setSuccessMsg(`Transaction ${newTx.Trans_ID} successfully recorded in Transactions table!`);
    
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Stock Transaction"
      subtitle="Simulates insert into 'Transactions' & updates 'Portfolio_Stock' (Local Demo State)"
    >
      {successMsg ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-emerald-300 font-medium text-sm">{successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type Radio Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Transaction Type (Trans_Type)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransType('BUY')}
                className={`py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                  transType === 'BUY'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-dark-850 text-slate-400 border border-white/5 hover:border-white/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                BUY (Purchase)
              </button>
              <button
                type="button"
                onClick={() => setTransType('SELL')}
                className={`py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                  transType === 'SELL'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'bg-dark-850 text-slate-400 border border-white/5 hover:border-white/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                SELL (Liquidate)
              </button>
            </div>
          </div>

          {/* Select Stock */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
              Stock (Stock_ID)
            </label>
            <select
              value={selectedStockId}
              onChange={(e) => setSelectedStockId(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              required
            >
              {stocks.map((stock) => (
                <option key={stock.Stock_ID} value={stock.Stock_ID} className="bg-dark-900 text-white">
                  {stock.Stock_Name} ({stock.Exchange}) — ₹{stock.Stock_Price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </option>
              ))}
            </select>
          </div>

          {/* Select Target Portfolio */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
              Destination Portfolio (Portfolio_ID)
            </label>
            <select
              value={selectedPortfolioId}
              onChange={(e) => setSelectedPortfolioId(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              required
            >
              {portfolios.map((portfolio) => (
                <option key={portfolio.Portfolio_ID} value={portfolio.Portfolio_ID} className="bg-dark-900 text-white">
                  {portfolio.Portfolio_Name} (ID: #{portfolio.Portfolio_ID})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity & Unit Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-dark-850 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Price per share (₹)
              </label>
              <input
                type="number"
                step="0.05"
                min="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-dark-850 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* MySQL Generated Total_Amt Display */}
          <div className="rounded-xl bg-dark-950 border border-purple-500/20 p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">
                Total_Amt (Quantity × Price)
              </span>
              <span className="text-xs text-purple-300">MySQL Generated Column</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-white font-mono tracking-tight">
                ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-coral hover:from-purple-600 hover:to-rose-600 shadow-[0_0_15px_rgba(139,92,246,0.35)] transition-all"
            >
              Confirm Transaction
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
