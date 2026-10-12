import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  ArrowLeftRight,
  User,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Stocks', path: '/stocks', icon: TrendingUp },
    { name: 'Portfolios', path: '/portfolios', icon: Briefcase },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'User Profile', path: '/profile', icon: User },
  ];

  const handleNavClick = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-dark-900/95 border-r border-white/10 flex flex-col justify-between backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="h-20 px-6 flex items-center border-b border-white/10 bg-gradient-to-r from-purple-950/20 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple via-brand-violet to-brand-coral p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wide text-white block">
                  Finvest<span className="text-purple-400">DBMS</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono block">
                  Stock Portal
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 mt-2">
            <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Navigation Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 to-brand-coral/10 text-white border border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="flex-1">{item.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral shadow-[0_0_8px_#F43F5E]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom DBMS Status Badge Card */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-gradient-to-t from-dark-950 to-transparent">
          <div className="rounded-xl bg-dark-850 border border-white/10 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                <span>StockInvestingDB</span>
              </span>
              <span
                className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]"
                title="Demo Mode Active"
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Predefined relational schema &amp; sample records
            </p>
            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>6 Relational Tables</span>
              <span className="text-purple-400 font-semibold">Demo Mode</span>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-500 font-mono">
            College DBMS Mini-Project
          </div>
        </div>
      </aside>
    </>
  );
}
