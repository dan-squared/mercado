'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { INITIAL_CAMPAIGNS, Campaign, Platform } from '@/lib/mock-data';
import { StatusChip } from '@/components/ui/status-chip';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function CreatorMarketplacePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const [applyModalCamp, setApplyModalCamp] = useState<Campaign | null>(null);
  const [pitchText, setPitchText] = useState('');

  const handleInstantClaim = (campId: string) => {
    setClaimedIds((prev) => [...prev, campId]);
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campId ? { ...c, status: 'In Progress' } : c))
    );
  };

  const handleSubmitApplication = () => {
    if (!applyModalCamp) return;
    setClaimedIds((prev) => [...prev, applyModalCamp.id]);
    setCampaigns((prev) =>
      prev.map((c) => (c.id === applyModalCamp.id ? { ...c, status: 'In Progress' } : c))
    );
    setApplyModalCamp(null);
    setPitchText('');
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (filterPlatform !== 'all' && !c.platforms.includes(filterPlatform as Platform)) {
      return false;
    }
    return true;
  });

  return (
    <AppShell role="creator">
      <div className="space-y-6">
        {/* Marketplace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Creator Campaign Marketplace
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Browse verified performance campaigns, claim ones that fit your audience, and get paid weekly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/creator/campaigns"
              className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all flex items-center gap-1.5"
            >
              <HugeIcon name="tasks" size={16} />
              <span>My Claimed ({claimedIds.length})</span>
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[var(--border)]">
          <span className="text-xs font-bold text-[var(--text-muted)] mr-2 flex items-center gap-1">
            <HugeIcon name="filter" size={14} /> Filter:
          </span>
          {['all', 'telegram', 'tiktok', 'youtube', 'blog'].map((plat) => (
            <button
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all btn-interactive ${
                filterPlatform === plat
                  ? 'bg-[var(--blue)] text-white shadow-xs'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map((camp) => {
            const isClaimed = claimedIds.includes(camp.id);

            return (
              <div
                key={camp.id}
                className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Logo, Business Name, Status & Claim Mode */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={camp.businessLogo}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover border border-[var(--border)] group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                          {camp.businessName}
                        </h4>
                        <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">
                          {camp.title}
                        </h3>
                      </div>
                    </div>

                    <StatusChip status={camp.status} />
                  </div>

                  {/* Platforms & Claim Mode Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    {camp.platforms.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded-md font-bold uppercase bg-[var(--bg-secondary)] text-[var(--blue)] border border-[var(--border)]"
                      >
                        {p}
                      </span>
                    ))}

                    <span
                      className={`px-2 py-0.5 rounded-md font-bold ${
                        camp.claimMode === 'instant'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-purple-500/10 text-purple-600'
                      }`}
                    >
                      {camp.claimMode === 'instant' ? '⚡ Instant Claim' : '📋 Application Required'}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {camp.requirements}
                  </p>
                </div>

                {/* Bottom Row: Payout Amount & Claim Action */}
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">
                      Payout Offer
                    </span>
                    <span className="text-xl font-black text-[var(--blue)]">
                      ETB {camp.rate.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] ml-1 font-medium">
                      ({camp.type.toUpperCase()})
                    </span>
                  </div>

                  {isClaimed ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center gap-1">
                      <HugeIcon name="check" size={14} /> Claimed / Active
                    </span>
                  ) : camp.claimMode === 'instant' ? (
                    <button
                      onClick={() => handleInstantClaim(camp.id)}
                      className="px-5 py-2.5 rounded-xl bg-[var(--blue)] text-white text-xs font-bold shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center gap-1.5"
                    >
                      <span>Claim Campaign</span>
                      <HugeIcon name="arrow-right" size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setApplyModalCamp(camp)}
                      className="px-5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--blue)] text-[var(--blue)] text-xs font-bold hover:bg-[var(--blue-light)]/20 transition-all btn-interactive"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Pitch Modal */}
      {applyModalCamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setApplyModalCamp(null)}
          />
          <div className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 space-y-4 z-10 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Apply for {applyModalCamp.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Submit a quick message to the business owner explaining why your audience fits this campaign.
            </p>

            <textarea
              rows={4}
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              placeholder="Hi! I have 45k Telegram subscribers with 18% engagement rate..."
              className="w-full p-3 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)]"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setApplyModalCamp(null)}
                className="px-4 py-2 text-xs font-bold text-[var(--text-muted)]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                className="px-5 py-2 rounded-xl bg-[var(--blue)] text-white text-xs font-bold shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
