'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { INITIAL_CAMPAIGNS } from '@/lib/mock-data';
import { StatusChip } from '@/components/ui/status-chip';

export default function AdminCampaignsPage() {
  return (
    <AppShell role="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Platform-Wide Campaign Manager
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Monitor active escrow balances, budget utilization, and campaign statuses across all advertisers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-semibold">
                  <th className="py-3 px-3">Business / Campaign</th>
                  <th className="py-3 px-3">Platforms</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Escrow Budget</th>
                  <th className="py-3 px-3">Spent</th>
                  <th className="py-3 px-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {INITIAL_CAMPAIGNS.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="py-3 px-3 font-bold text-[var(--text-primary)]">
                      <div className="flex items-center gap-2">
                        <img src={c.businessLogo} alt="" className="w-7 h-7 rounded-lg object-cover" />
                        <div>
                          <p>{c.title}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-normal">{c.businessName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 uppercase font-bold text-[var(--blue)]">
                      {c.platforms.join(', ')}
                    </td>

                    <td className="py-3 px-3 font-semibold uppercase">{c.type}</td>

                    <td className="py-3 px-3">
                      <StatusChip status={c.status} />
                    </td>

                    <td className="py-3 px-3 font-bold text-[var(--blue)]">
                      ETB {c.totalBudget.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 font-bold text-emerald-600">
                      ETB {c.spent.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 text-[var(--text-muted)]">{c.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
