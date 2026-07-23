'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function CreatorWalletPage() {
  const pendingBalance = 3200; // ETB
  const nextPayoutDate = 'Friday, July 26, 2026';
  const maskedPhone = '+251 ••• ••• 1234';

  return (
    <AppShell role="creator">
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Wallet Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Creator Earnings & Wallet
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Weekly automated payouts directly to your local mobile money account.
          </p>
        </div>

        {/* HERO BALANCE CARD */}
        <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
              <HugeIcon name="wallet" size={16} /> Pending Escrow Balance
            </span>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
              ETB {pendingBalance.toLocaleString()}
            </h1>
            <p className="text-xs text-blue-100 font-medium">
              📅 Next Weekly Batch Payout: <span className="font-bold underline">{nextPayoutDate}</span>
            </p>
          </div>

          {/* Connected Payout Method (Masked Phone + Edit Button) */}
          <div className="z-10 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-100 uppercase">Payout Destination</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400 text-slate-950">
                Telebirr
              </span>
            </div>
            <p className="text-base font-black tracking-widest">{maskedPhone}</p>
            <button
              onClick={() => alert('Payout account edit form modal (UI demonstration)')}
              className="text-xs font-bold text-white underline hover:text-blue-200 transition-colors"
            >
              Edit Payout Method →
            </button>
          </div>
        </div>

        {/* EARNINGS BREAKDOWN & PAYOUT HISTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Breakdown */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <HugeIcon name="coins" size={18} className="text-amber-500" />
              <span>Earnings Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex justify-between items-center">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">Sheba Foods Launch</p>
                  <p className="text-[10px] text-[var(--text-muted)]">TikTok Video</p>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">ETB 2,000</span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex justify-between items-center">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">Kifiya Digital Wallet</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Telegram Post</p>
                </div>
                <span className="font-bold text-amber-600">ETB 1,200</span>
              </div>
            </div>
          </div>

          {/* Payout History Table */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-4 lg:col-span-2">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Itemized Payout History</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-semibold">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Campaign / Source</th>
                    <th className="py-2.5 px-3">Amount (ETB)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-3 px-3 text-[var(--text-muted)]">Jun 28, 2026</td>
                    <td className="py-3 px-3 font-bold text-[var(--text-primary)]">
                      YouTube Series — Ethio Telecom
                    </td>
                    <td className="py-3 px-3 font-bold text-[var(--blue)]">4,500</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                        Paid via Telebirr
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 text-[var(--text-muted)]">Jun 21, 2026</td>
                    <td className="py-3 px-3 font-bold text-[var(--text-primary)]">
                      Blog Feature — Mama&apos;s Kitchen
                    </td>
                    <td className="py-3 px-3 font-bold text-[var(--blue)]">800</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                        Paid via Telebirr
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
