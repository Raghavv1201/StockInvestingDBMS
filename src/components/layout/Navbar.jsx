import React from 'react';
import { Menu, PlusCircle, Database, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenTradeModal, setIsMobileOpen, user }) {
  return (
    <header className="sticky top-0 z-30 h-20 bg-dark-950/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger & Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
          title="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono">
              StockInvestingDB
            </span>
            <span className="text-slate-500 text-xs">/</span>
            <span className="text-xs text-slate-400 font-medium">DBMS Mini-Project Dashboard</span>
          </div>
        </div>
      </div>

      {/* Right: Demo Mode Indicator, Quick Trade CTA & User Profile */}
      <div className="flex items-center gap-3">
        {/* Simple & Clean Demo Mode Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
          <span className="font-medium">Demo Mode &bull; Predefined Data</span>
        </div>

        {/* Quick Trade Button */}
        {onOpenTradeModal && (
          <button
            onClick={onOpenTradeModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-coral hover:from-purple-600 hover:to-rose-600 shadow-[0_0_15px_rgba(139,92,246,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Record Trade</span>
            <span className="sm:hidden">Trade</span>
          </button>
        )}

        {/* User Avatar & Name */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-white/10">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 p-[1.5px] shadow-[0_0_12px_rgba(139,92,246,0.4)]">
            <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center text-purple-300 font-bold text-xs">
              {user?.Name ? user.Name.slice(0, 2).toUpperCase() : 'AM'}
            </div>
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-white">{user?.Name || 'Alex Morgan'}</div>
            <div className="text-[10px] text-slate-400 font-mono">UID: #{user?.User_ID || 101}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
