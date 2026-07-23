'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { INITIAL_CAMPAIGNS, INITIAL_SUBMISSIONS, Campaign, SubmissionProof } from '@/lib/mock-data';
import { StatusChip } from '@/components/ui/status-chip';
import { TrustTierBadge } from '@/components/ui/trust-tier-badge';
import { SlideOverDrawer } from '@/components/ui/slide-over-drawer';
import { HugeIcon } from '@/components/ui/huge-icon';

/* ─── KPI definitions ─────────────────────────────────────── */
type KpiColor = 'blue' | 'amber' | 'purple' | 'green';

interface KpiCard {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  color: KpiColor;
}

const kpiColor: Record<KpiColor, { icon: string; value: string; subIcon: string }> = {
  blue:   { icon: '#2f5fe0',  value: '#16181d',  subIcon: '#9a9ea6' },
  amber:  { icon: '#d97706',  value: '#d97706',  subIcon: '#b45309' },
  purple: { icon: '#7c3aed',  value: '#16181d',  subIcon: '#9a9ea6' },
  green:  { icon: '#16a34a',  value: '#16a34a',  subIcon: '#16a34a' },
};

/* ─── Stat strip item ─────────────────────────────────────── */
function StatStrip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        fontSize: 13.5,
        color: '#7a7e85',
        transition: 'color var(--dur-base) var(--ease)',
      }}
    >
      {icon}
      <b style={{ color: 'var(--text-dark)', fontWeight: 700 }}>{value}</b>
      &nbsp;{label}
    </div>
  );
}

/* ─── Divider ─────────────────────────────────────────────── */
function StatDivider() {
  return <div style={{ width: 1, height: 20, background: 'var(--border)' }} />;
}

/* ─── Status pill — maps campaign status to pill style ───── */
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Live:        { bg: 'var(--pill-green-bg)',  text: 'var(--pill-green-text)'  },
    'In Progress':{ bg: 'var(--pill-blue-bg)',   text: 'var(--pill-blue-text)'   },
    Pending:     { bg: 'var(--pill-amber-bg)',   text: 'var(--pill-amber-text)'  },
    Draft:       { bg: '#f0f0ee',                text: '#767a82'                 },
    Completed:   { bg: 'var(--pill-blue-bg)',    text: 'var(--pill-blue-text)'   },
    Rejected:    { bg: 'var(--pill-red-bg)',     text: 'var(--pill-red-text)'    },
  };
  const style = map[status] ?? { bg: '#f0f0ee', text: '#767a82' };
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '5px 12px',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        background: style.bg,
        color: style.text,
        transition: 'transform var(--dur-base) var(--ease-out)',
      }}
    >
      {status}
    </span>
  );
}

/* ─── Greeting helper ─────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

/* ══════════════════════════════════════════════════════════ */
export default function BusinessDashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [submissions, setSubmissions] = useState<SubmissionProof[]>(INITIAL_SUBMISSIONS);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [drawerTab, setDrawerTab] = useState<'submissions' | 'applicants'>('submissions');

  const handleApprove = (subId: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'approved' } : s))
    );
    if (selectedCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === selectedCampaign.id ? { ...c, spent: c.spent + selectedCampaign.rate } : c
        )
      );
    }
  };

  const handleReject = (subId: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'rejected' } : s))
    );
  };

  /* ── KPI computations ───────────────────────────────────── */
  const activeCampaigns   = campaigns.filter((c) => c.status === 'Live' || c.status === 'In Progress').length;
  const totalSpent        = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const pendingCount      = submissions.filter((s) => s.status === 'pending').length;
  const approvedCount     = submissions.filter((s) => s.status === 'approved').length;

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <AppShell role="business">

      {/* ── Date line ───────────────────────────────────────── */}
      <p
        style={{
          fontSize: 13.5,
          color: '#9a9ea6',
          marginBottom: 4,
        }}
      >
        {dateStr}
      </p>

      {/* ── Greeting row ────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 22,
          gap: 16,
        }}
      >
        <h1
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: 'var(--text-dark)',
            margin: 0,
          }}
        >
          {getGreeting()}, Sheba Foods!
        </h1>

        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '9px 15px',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-dark)',
              cursor: 'pointer',
              transition: 'background-color var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
            }}
            className="btn-interactive"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
          <Link
            href="/business/campaigns/new"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'var(--blue)',
              border: '1px solid var(--blue)',
              borderRadius: 10,
              padding: '9px 15px',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 1px 2px rgba(47,95,224,0.15), 0 6px 16px -6px rgba(47,95,224,0.45)',
              transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease)',
            }}
            className="btn-interactive"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Campaign
          </Link>
        </div>
      </div>

      {/* ── Stat strip (Mondays-exact) ───────────────────────── */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          marginBottom: 22,
          boxShadow: 'var(--shadow-xs)',
          flexWrap: 'wrap',
        }}
      >
        <StatStrip
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          }
          label="Active Campaigns"
          value={String(activeCampaigns)}
        />
        <StatDivider />
        <StatStrip
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3d43" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          }
          label="Pending Submissions"
          value={String(pendingCount)}
        />
        <StatDivider />
        <StatStrip
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3d43" strokeWidth="2" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          }
          label="Verified Completions"
          value={String(approvedCount)}
        />
        <StatDivider />
        <StatStrip
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3d43" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          }
          label="Total Spent"
          value={`ETB ${totalSpent.toLocaleString()}`}
        />
        <StatDivider />
        <StatStrip
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3d43" strokeWidth="2" strokeLinecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          }
          label="Total Reach"
          value="495k"
        />
        <StatDivider />
        <StatStrip
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3d43" strokeWidth="2" strokeLinecap="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </svg>
          }
          label="Conversions"
          value="1,840"
        />
      </div>

      {/* ── Campaigns Table Card ─────────────────────────────── */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '20px 22px',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: 20,
        }}
      >
        {/* Card header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text-dark)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a9ea6" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            Active Campaigns
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f6f6f5',
                border: 'none',
                borderRadius: 9,
                padding: '6px 11px',
                fontSize: 12.5,
                fontWeight: 600,
                color: '#4b4f57',
                cursor: 'pointer',
                transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
              }}
              className="btn-interactive"
            >
              This Week
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#b5b8be" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <button
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: '#4b4f57',
                background: '#f6f6f5',
                padding: '7px 13px',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
              }}
              className="btn-interactive"
            >
              See All
            </button>
          </div>
        </div>

        {/* Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Campaign', 'Platforms', 'Type', 'Status', 'Budget (ETB)', 'Spent (ETB)', 'Submissions'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#9a9ea6',
                    padding: '10px 8px',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp, i) => (
              <tr
                key={camp.id}
                onClick={() => setSelectedCampaign(camp)}
                style={{
                  cursor: 'pointer',
                  transition: 'background-color var(--dur-base) var(--ease)',
                  animationDelay: `${i * 50}ms`,
                }}
                className="campaign-row"
              >
                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, color: 'var(--text-dark)' }}>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f3f3f2',
                        color: '#7a7e85',
                        fontSize: 12,
                        flexShrink: 0,
                        transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-base) var(--ease-out)',
                      }}
                      className="row-icon"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    </span>
                    {camp.title}
                  </div>
                </td>

                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {camp.platforms.map((p) => (
                      <span
                        key={p}
                        style={{
                          padding: '2px 8px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          background: 'var(--pill-blue-bg)',
                          color: 'var(--pill-blue-text)',
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </td>

                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-mid)', textTransform: 'capitalize' }}>
                    {camp.type}
                  </span>
                </td>

                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle' }}>
                  <StatusPill status={camp.status} />
                </td>

                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle', fontWeight: 600, color: 'var(--text-dark)' }}>
                  {camp.totalBudget.toLocaleString()}
                </td>

                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle', fontWeight: 600, color: '#16a34a' }}>
                  {camp.spent.toLocaleString()}
                </td>

                <td style={{ padding: '14px 8px', borderBottom: '1px solid #f2f2f1', fontSize: 13.5, verticalAlign: 'middle' }}>
                  <span
                    style={{
                      padding: '5px 12px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      background: 'var(--pill-amber-bg)',
                      color: 'var(--pill-amber-text)',
                    }}
                  >
                    {camp.submissionsCount} Proofs
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Bottom row: performance metrics ─────────────────── */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* Reach breakdown */}
        <div
          style={{
            flex: '1.05',
            minWidth: 0,
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '20px 22px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 16, fontWeight: 700, color: 'var(--text-dark)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a9ea6" strokeWidth="2" strokeLinecap="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Performance
            </div>
          </div>

          {[
            { label: 'Total Reach', value: '495,000 views', pct: 82, color: '#2f5fe0' },
            { label: 'Clicks',      value: '14,280 clicks', pct: 47, color: '#7c3aed' },
            { label: 'Conversions', value: '1,840 sales',   pct: 35, color: '#16a34a' },
          ].map(({ label, value, pct, color }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-dark)' }}>{label}</span>
                <span style={{ fontSize: 13.5, color: '#7a7e85' }}>{value}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: '#f0f0ee', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    background: color,
                    width: `${pct}%`,
                    transition: 'width 600ms var(--ease-out)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pending review queue */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '20px 22px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 16, fontWeight: 700, color: 'var(--text-dark)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a9ea6" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Pending Review
            </div>
          </div>

          {submissions.filter((s) => s.status === 'pending').slice(0, 3).map((sub) => (
            <div
              key={sub.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 10px',
                margin: '0 -10px',
                borderRadius: 12,
                borderTop: '1px solid #f2f2f1',
                transition: 'background-color var(--dur-base) var(--ease)',
                cursor: 'pointer',
              }}
              className="review-row"
            >
              <div
                style={{
                  width: 3,
                  alignSelf: 'stretch',
                  borderRadius: 3,
                  flexShrink: 0,
                  background: '#eaa6f0',
                }}
              />
              <img
                src={sub.creatorAvatar}
                alt=""
                style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 3 }}>
                  {sub.creatorName}
                </div>
                <div style={{ fontSize: 12, color: '#b5b8be' }}>
                  {sub.submittedAt}
                </div>
              </div>
              <button
                onClick={() => {
                  const camp = campaigns.find(c => c.submissionsCount > 0);
                  if (camp) setSelectedCampaign(camp);
                }}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#7a7e85',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color var(--dur-base) var(--ease)',
                }}
                className="btn-interactive"
              >
                ···
              </button>
            </div>
          ))}

          {submissions.filter((s) => s.status === 'pending').length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#9a9ea6', fontSize: 13.5 }}>
              🎉 All caught up — no pending reviews!
            </div>
          )}
        </div>
      </div>

      {/* ── Slide-over Drawer ───────────────────────────────── */}
      <SlideOverDrawer
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title={selectedCampaign?.title ?? 'Campaign Review'}
        subtitle={`Budget: ETB ${selectedCampaign?.totalBudget.toLocaleString()} · Rate: ETB ${selectedCampaign?.rate.toLocaleString()}`}
      >
        {selectedCampaign && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                padding: 4,
                borderRadius: 12,
                background: '#f0f0ee',
                border: '1px solid var(--border)',
              }}
            >
              {(['submissions', 'applicants'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  style={{
                    padding: '7px 0',
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 9,
                    border: 'none',
                    cursor: 'pointer',
                    background: drawerTab === tab ? '#fff' : 'transparent',
                    color: drawerTab === tab ? 'var(--blue)' : 'var(--text-muted)',
                    boxShadow: drawerTab === tab ? 'var(--shadow-xs)' : 'none',
                    transition: 'background-color var(--dur-base) var(--ease), color var(--dur-base) var(--ease)',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab === 'submissions'
                    ? `Proof Submissions (${submissions.length})`
                    : `Applicants (${selectedCampaign.applicantsCount})`}
                </button>
              ))}
            </div>

            {drawerTab === 'submissions' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: '#f7f7f5',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img
                          src={sub.creatorAvatar}
                          alt=""
                          style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(47,95,224,0.2)' }}
                        />
                        <div>
                          <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                            {sub.creatorName}
                          </p>
                          <TrustTierBadge tier={sub.creatorTier} />
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub.submittedAt}</span>
                    </div>

                    {sub.screenshotUrl && (
                      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                        <img
                          src={sub.screenshotUrl}
                          alt="Submission proof"
                          style={{ width: '100%', height: 144, objectFit: 'cover', display: 'block', transition: 'transform 200ms var(--ease-out)' }}
                        />
                        <a
                          href={sub.proofUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            padding: '4px 10px',
                            borderRadius: 6,
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)',
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          View Live Post ↗
                        </a>
                      </div>
                    )}

                    {sub.notes && (
                      <p style={{ fontSize: 12.5, color: 'var(--text-mid)', fontStyle: 'italic', background: '#fff', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', margin: 0 }}>
                        &ldquo;{sub.notes}&rdquo;
                      </p>
                    )}

                    {sub.flagReason && (
                      <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--pill-amber-bg)', border: '1px solid #fcd34d', fontSize: 12, color: 'var(--pill-amber-text)', fontWeight: 500 }}>
                        ⚠️ {sub.flagReason}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>
                        Payout: ETB {selectedCampaign.rate.toLocaleString()}
                      </span>

                      {sub.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            onClick={() => handleReject(sub.id)}
                            style={{
                              padding: '7px 14px',
                              borderRadius: 9,
                              background: 'var(--pill-red-bg)',
                              color: 'var(--pill-red-text)',
                              fontSize: 12.5,
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
                            }}
                            className="btn-interactive"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApprove(sub.id)}
                            style={{
                              padding: '7px 16px',
                              borderRadius: 9,
                              background: '#16a34a',
                              color: '#fff',
                              fontSize: 12.5,
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(22,163,74,0.15), 0 4px 12px -4px rgba(22,163,74,0.4)',
                              transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                            }}
                            className="btn-interactive"
                          >
                            <HugeIcon name="check" size={13} />
                            Approve &amp; Pay
                          </button>
                        </div>
                      ) : (
                        <span
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 12.5,
                            fontWeight: 700,
                            background: sub.status === 'approved' ? 'var(--pill-green-bg)' : 'var(--pill-red-bg)',
                            color: sub.status === 'approved' ? 'var(--pill-green-text)' : 'var(--pill-red-text)',
                          }}
                        >
                          {sub.status === 'approved' ? '✓ Payment Released' : '✕ Rejected'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: '#f7f7f5',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt=""
                      style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 2px' }}>Abebe Creator</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>120k TikTok Followers</p>
                      <TrustTierBadge tier="Trusted" />
                    </div>
                  </div>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: 10,
                      background: 'var(--blue)',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
                    }}
                    className="btn-interactive"
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </SlideOverDrawer>

      <style>{`
        .campaign-row:hover { background: #fbfbfa; }
        .campaign-row:hover .row-icon { background: #ebebe9; transform: scale(1.05); }
        .review-row:first-of-type { border-top: none; }
        .review-row:hover { background: #fbfbfa; }
      `}</style>
    </AppShell>
  );
}
