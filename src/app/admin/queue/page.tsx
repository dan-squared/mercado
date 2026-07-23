'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { INITIAL_SUBMISSIONS, SubmissionProof } from '@/lib/mock-data';
import { SlideOverDrawer } from '@/components/ui/slide-over-drawer';
import { TrustTierBadge } from '@/components/ui/trust-tier-badge';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function AdminVerificationQueuePage() {
  const [queue, setQueue] = useState<SubmissionProof[]>(INITIAL_SUBMISSIONS);
  const [selectedSub, setSelectedSub] = useState<SubmissionProof | null>(null);

  const handleApprove = (subId: string) => {
    setQueue((prev) => prev.map((s) => (s.id === subId ? { ...s, status: 'approved' } : s)));
    setSelectedSub(null);
  };

  const handleReject = (subId: string) => {
    setQueue((prev) => prev.map((s) => (s.id === subId ? { ...s, status: 'rejected' } : s)));
    setSelectedSub(null);
  };

  return (
    <AppShell role="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-(--text-primary) tracking-tight">
            Verification & Fraud Inspection Queue
          </h2>
          <p className="text-xs text-(--text-muted)">
            Review submissions flagged by automated anomaly detection (e.g. view count spikes or shared IP ranges).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-(--text-muted)">
              Flagged Submissions ({queue.filter((x) => x.status === 'pending').length} Action Required)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-(--border) text-(--text-muted) font-semibold">
                  <th className="py-3 px-3">Creator</th>
                  <th className="py-3 px-3">Campaign</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Flag Reason</th>
                  <th className="py-3 px-3">Submitted</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border)">
                {queue.map((sub) => (
                  <tr
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className="hover:bg-(--bg-secondary) transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-3 font-bold text-(--text-primary)">
                      <div className="flex items-center gap-2">
                        <img
                          src={sub.creatorAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p>{sub.creatorName}</p>
                          <TrustTierBadge tier={sub.creatorTier} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-(--text-primary)">
                      {sub.campaignTitle}
                    </td>

                    <td className="py-3.5 px-3 uppercase font-bold text-(--blue)">
                      {sub.platform}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-600 font-medium text-[11px]">
                        ⚠️ {sub.flagReason || 'Routine first-payout audit'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-(--text-muted)">{sub.submittedAt}</td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          sub.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-600'
                            : sub.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-red-500/10 text-red-600'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button className="px-3 py-1 rounded-lg bg-(--blue) text-white text-[11px] font-bold">
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* INSPECTION SLIDE-OVER DRAWER */}
      <SlideOverDrawer
        isOpen={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        title="Flagged Submission Inspection"
        subtitle={selectedSub?.creatorName}
      >
        {selectedSub && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-sm">
                <HugeIcon name="disputes" size={16} /> Anomaly Flag Reason
              </p>
              <p className="text-xs">{selectedSub.flagReason || 'First-payout manual review window'}</p>
            </div>

            {/* Proof Screenshot */}
            {selectedSub.screenshotUrl && (
              <div className="space-y-2">
                <p className="font-bold text-(--text-muted) uppercase tracking-wider">
                  Submitted Proof Artifact
                </p>
                <div className="rounded-xl overflow-hidden border border-(--border)">
                  <img src={selectedSub.screenshotUrl} alt="" className="w-full h-48 object-cover" />
                </div>
                <a
                  href={selectedSub.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-(--blue) font-bold hover:underline"
                >
                  <HugeIcon name="link" size={14} /> Open Live URL Spot Check →
                </a>
              </div>
            )}

            {/* Override Buttons */}
            <div className="flex gap-3 pt-4 border-t border-(--border)">
              <button
                onClick={() => handleReject(selectedSub.id)}
                className="flex-1 py-2.5 rounded-xl bg-red-500/10 text-red-600 font-bold hover:bg-red-500/20 transition-colors duration-150"
              >
                Reject & Flag Account
              </button>
              <button
                onClick={() => handleApprove(selectedSub.id)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors duration-150 btn-interactive flex items-center justify-center gap-1"
              >
                <HugeIcon name="check" size={16} />
                <span>Override & Release Escrow</span>
              </button>
            </div>
          </div>
        )}
      </SlideOverDrawer>
    </AppShell>
  );
}
