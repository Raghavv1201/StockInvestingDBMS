import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Phone,
  MapPin,
  ShieldCheck,
  Database,
  Key,
  Layers,
  CheckCircle2,
  FileCode,
  Copy,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { dbmsSchemaDocs } from '../data/mockData';

export default function Profile({ user, profile }) {
  const [copiedTable, setCopiedTable] = useState(null);

  const handleCopySchema = (tableName) => {
    setCopiedTable(tableName);
    setTimeout(() => setCopiedTable(null), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Investor Profile
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Users &amp; Profile Tables
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Personal identity and database relational schema metadata for <code className="text-purple-300">StockInvestingDB</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Security: Zero Credential Exposure</span>
        </div>
      </div>

      {/* Main Profile Grid: Identity & Profile Attributes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: User Identity & Account Details */}
        <div className="fintech-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-purple via-brand-violet to-brand-coral p-[2px] shadow-glow-purple">
                <div className="w-full h-full bg-dark-950 rounded-[14px] flex items-center justify-center text-xl font-extrabold text-purple-300">
                  {user?.Name ? user.Name.slice(0, 2).toUpperCase() : 'AM'}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">{user?.Name || 'Alex Morgan'}</h2>
                <p className="text-xs text-slate-400">Retail Equity Investor</p>
                <div className="mt-1">
                  <Badge variant="purple" size="xs">
                    User_ID: #{user?.User_ID || 101}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-mono">{user?.Email || 'alex.morgan@finvest.edu'}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Key className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-slate-400">
                  Password: <span className="font-mono text-slate-500 tracking-widest">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
                </span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="rounded-xl bg-dark-950 border border-purple-500/20 p-3.5 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              DBMS Security Policy
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Passwords are encrypted via bcrypt in the MySQL database and are strictly excluded from client-side payloads.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Profile Table Entity Information */}
        <div className="lg:col-span-2 fintech-card p-6 space-y-6">
          <div className="pb-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Profile Entity Attributes</h3>
              <p className="text-xs text-slate-400">
                1:1 Relation from <code className="text-purple-300">Profile</code> table referencing <code className="text-purple-300">Users(User_ID)</code>
              </p>
            </div>
            <span className="px-2 py-1 rounded bg-dark-950 border border-white/10 text-xs font-mono text-slate-300">
              Profile_ID: #{profile?.Profile_ID || 1}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DOB */}
            <div className="rounded-xl bg-dark-950/70 border border-white/5 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Date of Birth (DOB)</span>
              </div>
              <p className="text-base font-mono font-bold text-white pt-1">
                {profile?.DOB || '2002-05-18'}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">Format: YYYY-MM-DD</span>
            </div>

            {/* Phone */}
            <div className="rounded-xl bg-dark-950/70 border border-white/5 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Phone className="w-4 h-4 text-brand-coral" />
                <span>Contact Phone</span>
              </div>
              <p className="text-base font-mono font-bold text-white pt-1">
                {profile?.Phone || '+91 98765 43210'}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">Country Code: +91</span>
            </div>
          </div>

          {/* Address */}
          <div className="rounded-xl bg-dark-950/70 border border-white/5 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <MapPin className="w-4 h-4 text-brand-yellow" />
              <span>Registered Address</span>
            </div>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              {profile?.Address || '402 Silicon Heights, Innovation Tech Zone, Bangalore 560100, India'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Key: <code className="text-purple-300 font-mono">Profile_ID</code></span>
            <span>Foreign Key: <code className="text-purple-300 font-mono">User_ID &rarr; Users(User_ID)</code></span>
          </div>
        </div>
      </div>

      {/* Relational Schema Explorer for DBMS Project */}
      <div className="fintech-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">
                MySQL Database Schema Inspector
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Relational architecture of the 6 tables in <code className="text-purple-300">StockInvestingDB</code>
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
            DBMS Mini-Project Architecture
          </span>
        </div>

        {/* 6 Tables Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dbmsSchemaDocs.map((tableInfo) => (
            <div
              key={tableInfo.table}
              className="rounded-xl bg-dark-950 border border-white/10 p-4 space-y-3 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-sm text-purple-300 font-mono">
                  {tableInfo.table}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">TABLE</span>
              </div>

              <p className="text-[11px] text-slate-400 min-h-[30px]">
                {tableInfo.description}
              </p>

              <div className="space-y-1.5 pt-1">
                {tableInfo.columns.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between text-[11px] font-mono py-0.5 px-1.5 rounded bg-dark-900/60"
                  >
                    <div className="flex items-center gap-1.5">
                      {col.key.includes('PK') ? (
                        <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-bold">
                          PK
                        </span>
                      ) : col.key.includes('FK') ? (
                        <span className="text-[9px] px-1 rounded bg-purple-500/20 text-purple-300 font-bold">
                          FK
                        </span>
                      ) : (
                        <span className="w-2" />
                      )}
                      <span className="text-slate-200">{col.name}</span>
                    </div>
                    <span className="text-slate-500 text-[10px]">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
