'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { INITIAL_CAMPAIGNS, Campaign } from '@/lib/mock-data';
import { StatusChip } from '@/components/ui/status-chip';
import { UploadZone } from '@/components/ui/upload-zone';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function MyCreatorCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [activeProofCamp, setActiveProofCamp] = useState<Campaign | null>(null);
  const [proofUrl, setProofUrl] = useState('https://t.me/selam_tech/901');
  const [notes, setNotes] = useState('Published pinned post to 45,000 active subscribers.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProofCamp) return;

    // Update campaign status to Under Review
    setCampaigns((prev) =>
      prev.map((c) => (c.id === activeProofCamp.id ? { ...c, status: 'Under Review' } : c))
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setActiveProofCamp(null);
    }, 1200);
  };

  return (
    <AppShell role="creator">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-(--text-primary) tracking-tight">
              My Claimed Campaigns
            </h2>
            <p className="text-xs text-(--text-muted)">
              Track your active campaign work, submit proof screenshots/links, and view status.
            </p>
          </div>

          <Link
            href="/creator/marketplace"
            className="px-4 py-2 rounded-xl bg-(--blue) text-white text-xs font-bold shadow-md hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive flex items-center gap-1.5"
          >
            <HugeIcon name="plus" size={16} />
            <span>Browse More Campaigns</span>
          </Link>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-(--surface) border border-(--border) shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={camp.businessLogo}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover border border-(--border)"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-(--text-primary)">{camp.title}</h3>
                    <StatusChip status={camp.status} />
                  </div>

                  <p className="text-xs text-(--text-muted)">
                    {camp.businessName} • Payout Offer:{' '}
                    <span className="font-bold text-(--blue)">
                      ETB {camp.rate.toLocaleString()}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-(--text-muted) pt-1">
                    <span>📅 Deadline: {camp.deadline}</span>
                    <span>📍 Platforms: {camp.platforms.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {camp.status === 'In Progress' || camp.status === 'Live' ? (
                  <button
                    onClick={() => setActiveProofCamp(camp)}
                    className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-(--blue) text-white font-bold text-xs shadow-md hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive flex items-center justify-center gap-2"
                  >
                    <HugeIcon name="upload" size={16} />
                    <span>Submit Proof & Claim Payout</span>
                  </button>
                ) : camp.status === 'Under Review' ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                    ⏳ Proof Submitted — Awaiting Business Verification
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-xs">
                    ✓ Verified & Payout Released
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROOF SUBMISSION EXPANDED PANEL / MODAL */}
      {activeProofCamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveProofCamp(null)}
          />

          <div className="relative w-full max-w-lg bg-(--surface) border border-(--border) rounded-2xl shadow-2xl p-6 space-y-5 z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-(--border) pb-3">
              <div>
                <h3 className="text-base font-bold text-(--text-primary)">
                  Submit Proof for {activeProofCamp.title}
                </h3>
                <p className="text-xs text-(--text-muted)">
                  Expected Payout: ETB {activeProofCamp.rate.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setActiveProofCamp(null)}
                className="p-1 rounded-lg text-(--text-muted) hover:bg-(--bg-secondary)"
              >
                <HugeIcon name="close" size={18} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-2 text-emerald-500 animate-in zoom-in-90 duration-200">
                <HugeIcon name="check-circle" size={40} className="mx-auto" />
                <h4 className="text-base font-bold">Proof Submitted Successfully!</h4>
                <p className="text-xs text-(--text-muted)">
                  Status updated to Under Review. You will be notified once funds are released.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-(--text-secondary)">
                    Live Content / Post URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    placeholder="https://t.me/yourchannel/123 or TikTok link..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-(--bg-secondary) border border-(--border) text-(--text-primary) outline-none focus:border-(--blue) font-semibold"
                  />
                </div>

                {/* Drag-and-drop screenshot uploader with thumbnail preview */}
                <UploadZone label="Upload Proof Screenshot (Optional but speeds verification)" />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-(--text-secondary)">
                    Submission Notes / Engagement Stats
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-(--bg-secondary) border border-(--border) text-(--text-primary) outline-none focus:border-(--blue)"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-(--border)">
                  <button
                    type="button"
                    onClick={() => setActiveProofCamp(null)}
                    className="px-4 py-2 text-xs font-bold text-(--text-muted)"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-(--blue) text-white text-xs font-bold shadow-md hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive flex items-center gap-1.5"
                  >
                    <HugeIcon name="check" size={16} />
                    <span>Submit Proof for Verification</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
