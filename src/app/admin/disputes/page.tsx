'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { SlideOverDrawer } from '@/components/ui/slide-over-drawer';
import { HugeIcon } from '@/components/ui/huge-icon';

interface Dispute {
  id: string;
  reporter: string;
  against: string;
  campaign: string;
  reason: string;
  amount: number;
  date: string;
  status: 'Open' | 'Resolved' | 'Dismissed';
}

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'disp-1',
    reporter: 'Sheba Agro Processing',
    against: 'Abebe Creator (@abebe_vlogs)',
    campaign: 'Kifiya Digital Wallet App Drive',
    reason: 'Content removed from TikTok prior to agreed 72-hour retention window.',
    amount: 3500,
    date: '2026-07-21',
    status: 'Open',
  },
  {
    id: 'disp-2',
    reporter: 'Ethio Foodies',
    against: 'Addis Express Logistics',
    campaign: 'Addis Courier Speed Campaign',
    reason: 'Payment release delay exceeding 48 hours post verified submission.',
    amount: 2800,
    date: '2026-07-19',
    status: 'Resolved',
  },
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  const handleResolve = (disputeId: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, status: 'Resolved' } : d))
    );
    setSelectedDispute(null);
  };

  return (
    <AppShell role="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-(--text-primary) tracking-tight">
            Escrow Dispute Arbitration
          </h2>
          <p className="text-xs text-(--text-muted)">
            Review reported campaign disputes, inspect timestamp audit logs, and enforce escrow releases.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-(--border) text-(--text-muted) font-semibold">
                  <th className="py-3 px-3">Dispute ID</th>
                  <th className="py-3 px-3">Reporter</th>
                  <th className="py-3 px-3">Against</th>
                  <th className="py-3 px-3">Reason</th>
                  <th className="py-3 px-3">Escrow Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border)">
                {disputes.map((d) => (
                  <tr key={d.id} className="hover:bg-(--bg-secondary) transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-(--blue)">{d.id}</td>
                    <td className="py-3.5 px-3 font-bold text-(--text-primary)">{d.reporter}</td>
                    <td className="py-3.5 px-3 font-semibold text-(--text-secondary)">
                      {d.against}
                    </td>
                    <td className="py-3.5 px-3 text-(--text-muted) truncate max-w-xs">
                      {d.reason}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-(--text-primary)">
                      ETB {d.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'Open'
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-emerald-500/10 text-emerald-600'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedDispute(d)}
                        className="px-3 py-1 rounded-lg bg-(--blue) text-white font-bold text-[11px]"
                      >
                        Arbitrate →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SlideOverDrawer
        isOpen={!!selectedDispute}
        onClose={() => setSelectedDispute(null)}
        title="Escrow Dispute Arbitration"
        subtitle={selectedDispute?.id}
      >
        {selectedDispute && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 space-y-1">
              <p className="font-bold">Claim Reason:</p>
              <p>{selectedDispute.reason}</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-(--bg-secondary) border border-(--border)">
              <div className="flex justify-between">
                <span className="text-(--text-muted)">Disputed Amount:</span>
                <span className="font-bold text-(--blue)">
                  ETB {selectedDispute.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--text-muted)">Filer:</span>
                <span className="font-bold">{selectedDispute.reporter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--text-muted)">Target:</span>
                <span className="font-bold">{selectedDispute.against}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-(--border)">
              <button
                onClick={() => handleResolve(selectedDispute.id)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors duration-150 btn-interactive flex items-center justify-center gap-1"
              >
                <HugeIcon name="check" size={16} />
                <span>Resolve & Release Funds</span>
              </button>
            </div>
          </div>
        )}
      </SlideOverDrawer>
    </AppShell>
  );
}
