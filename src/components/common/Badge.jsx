import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] font-semibold tracking-wide',
    sm: 'px-2.5 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-xs font-semibold'
  };

  const variantClasses = {
    buy: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    sell: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    nse: 'bg-brand-purple/15 text-purple-300 border border-brand-purple/30',
    bse: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    coral: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    yellow: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    default: 'bg-slate-800 text-slate-300 border border-slate-700'
  };

  const selectedVariant = variantClasses[variant.toLowerCase()] || variantClasses.default;
  const selectedSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide transition-all ${selectedSize} ${selectedVariant} ${className}`}
    >
      {children}
    </span>
  );
}
