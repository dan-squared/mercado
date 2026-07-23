'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { INITIAL_CREATORS, CreatorProfile } from '@/lib/mock-data';
import { TrustTierBadge } from '@/components/ui/trust-tier-badge';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<CreatorProfile[]>(INITIAL_CREATORS);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePromoteTier = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, tier: 'Elite' } : u))
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              User Directory & Trust Management
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Inspect creator trust tiers, verified social handles, and manage account statuses.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search creator name or handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)] w-full sm:w-64"
          />
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-semibold">
                  <th className="py-3 px-3">Creator / Handle</th>
                  <th className="py-3 px-3">Trust Tier (Click for Stats)</th>
                  <th className="py-3 px-3">Verified Channels</th>
                  <th className="py-3 px-3">Campaigns Completed</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[var(--text-primary)]">
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p>{u.name}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-normal">{u.handle}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <TrustTierBadge tier={u.tier} creator={u} />
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex gap-1">
                        {u.channels.map((ch, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] bg-[var(--bg-secondary)] text-[var(--blue)] font-bold border border-[var(--border)]"
                          >
                            {ch.platform}: {(ch.followers / 1000).toFixed(0)}k
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-bold">{u.campaignsCompleted}</td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => handlePromoteTier(u.id)}
                        className="px-3 py-1 rounded-lg bg-[var(--blue-light)] text-[var(--blue)] font-bold text-[10px] hover:bg-[var(--blue)] hover:text-white transition-all"
                      >
                        Promote to Elite ⭐
                      </button>
                    </td>
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
