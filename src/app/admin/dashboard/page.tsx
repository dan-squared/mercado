'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function AdminDashboardPage() {
  return (
    <AppShell role="admin">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Platform Overview & Command Center
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Real-time platform telemetry across all Ethiopian business and creator activity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/queue"
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20 hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <HugeIcon name="shield" size={16} />
              <span>Verification Queue (3 Flagged)</span>
            </Link>

            <Link
              href="/admin/agents"
              className="px-4 py-2.5 rounded-xl bg-[var(--blue)] text-white font-bold text-xs shadow-md hover:bg-[var(--blue-dark)] transition-all flex items-center gap-1.5"
            >
              <HugeIcon name="ai" size={16} />
              <span>AI Agent Hub</span>
            </Link>
          </div>
        </div>

        {/* 8 KPI Stat Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[var(--text-muted)]">
              <span className="text-xs font-semibold">Total Signups</span>
              <HugeIcon name="users" size={18} className="text-blue-500" />
            </div>
            <p className="text-3xl font-black text-[var(--text-primary)]">2,480</p>
            <p className="text-[11px] text-emerald-600 font-semibold">1,840 Creators • 640 Businesses</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[var(--text-muted)]">
              <span className="text-xs font-semibold">Total Escrow Held</span>
              <HugeIcon name="coins" size={18} className="text-amber-500" />
            </div>
            <p className="text-3xl font-black text-[var(--blue)]">ETB 1.48M</p>
            <p className="text-[11px] text-[var(--text-muted)] font-medium">Locked in platform escrow</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[var(--text-muted)]">
              <span className="text-xs font-semibold">Commission Revenue</span>
              <HugeIcon name="sparkles" size={18} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-emerald-500">ETB 222,000</p>
            <p className="text-[11px] text-emerald-600 font-semibold">15% platform fee collected</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[var(--text-muted)]">
              <span className="text-xs font-semibold">Flagged Submissions</span>
              <HugeIcon name="disputes" size={18} className="text-amber-500" />
            </div>
            <p className="text-3xl font-black text-amber-500">3</p>
            <p className="text-[11px] text-amber-600 font-semibold">Awaiting manual spot check</p>
          </div>
        </div>

        {/* Quick Access Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/queue"
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--blue)] transition-all group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HugeIcon name="shield" size={20} />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--blue)]">
              Verification Queue →
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Review anomaly-flagged submissions, bot checks, and override automated holds.
            </p>
          </Link>

          <Link
            href="/admin/users"
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--blue)] transition-all group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <HugeIcon name="users" size={20} />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--blue)]">
              User & Trust Tiers →
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Inspect creator profiles, follower verification, and promote creators to Elite status.
            </p>
          </Link>

          <Link
            href="/admin/agents"
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--blue)] transition-all group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <HugeIcon name="ai" size={20} />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--blue)]">
              AI Agent Hub →
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Trigger automated fraud scans, batch-approve low-risk queues, and view agent logs.
            </p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
