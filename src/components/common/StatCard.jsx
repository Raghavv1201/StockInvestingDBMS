import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  change,
  isPositive,
  icon: Icon,
  accentColor = 'purple'
}) {
  const accentGradients = {
    purple: 'from-purple-500/20 to-brand-purple/5 text-purple-400 border-purple-500/30 hover:border-purple-500/50',
    coral: 'from-rose-500/20 to-brand-coral/5 text-rose-400 border-rose-500/30 hover:border-rose-500/50',
    yellow: 'from-amber-500/20 to-brand-yellow/5 text-amber-400 border-amber-500/30 hover:border-amber-500/50',
    cyan: 'from-cyan-500/20 to-brand-cyan/5 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/50',
    emerald: 'from-emerald-500/20 to-brand-emerald/5 text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50'
  };

  const iconBgClasses = {
    purple: 'bg-gradient-to-br from-purple-500/20 to-brand-purple/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.25)]',
    coral: 'bg-gradient-to-br from-rose-500/20 to-brand-coral/10 text-rose-300 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
    yellow: 'bg-gradient-to-br from-amber-500/20 to-brand-yellow/10 text-amber-300 border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.25)]',
    cyan: 'bg-gradient-to-br from-cyan-500/20 to-brand-cyan/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
    emerald: 'bg-gradient-to-br from-emerald-500/20 to-brand-emerald/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
  };

  return (
    <div className="relative group rounded-2xl bg-dark-900/90 border border-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:shadow-glow-card overflow-hidden">
      {/* Subtle top glowing line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity ${
        accentColor === 'coral' ? 'from-transparent via-rose-500 to-transparent' :
        accentColor === 'yellow' ? 'from-transparent via-amber-400 to-transparent' :
        accentColor === 'cyan' ? 'from-transparent via-cyan-400 to-transparent' :
        'from-transparent via-purple-500 to-transparent'
      }`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl ${iconBgClasses[accentColor] || iconBgClasses.purple}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        {change !== undefined && (
          <span
            className={`inline-flex items-center font-medium ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
        {subtext && <span className="text-slate-400">{subtext}</span>}
      </div>
    </div>
  );
}
