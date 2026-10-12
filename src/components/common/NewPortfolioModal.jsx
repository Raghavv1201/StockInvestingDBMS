import React, { useState } from 'react';
import Modal from './Modal';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function NewPortfolioModal({ isOpen, onClose, onCreatePortfolio }) {
  const [portfolioName, setPortfolioName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!portfolioName.trim()) return;

    const newPortfolio = {
      Portfolio_ID: Math.floor(10 + Math.random() * 90),
      User_ID: 101,
      Portfolio_Name: portfolioName.trim(),
      Created_At: new Date().toISOString().split('T')[0],
      holdings: [],
      Total_Value: 0,
      Total_Stocks_Count: 0
    };

    onCreatePortfolio(newPortfolio);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setPortfolioName('');
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Portfolio"
      subtitle="Adds a new portfolio to local demo state (aligned with MySQL Portfolio table)"
    >
      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-purple-300 font-medium text-sm">Portfolio created successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
              Portfolio Name (Portfolio_Name)
            </label>
            <input
              type="text"
              placeholder="e.g. High Dividend Yield, Bluechip Core"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="rounded-xl bg-dark-950 border border-white/5 p-3.5 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span>User_ID:</span>
              <span className="text-white">101 (Raghav)</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Created_At:</span>
              <span className="text-white">{new Date().toISOString().split('T')[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-coral hover:from-purple-600 hover:to-rose-600 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              Create Portfolio
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
