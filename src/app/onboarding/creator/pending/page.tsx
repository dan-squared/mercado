'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function CreatorVerificationPendingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-(--bg) text-(--text-primary)">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-inner animate-pulse">
          <HugeIcon name="shield" size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight">Channel Verification Pending</h1>
          <p className="text-xs text-(--text-muted) max-w-xs mx-auto">
            Our automated rules + spot-check team are verifying your follower counts and channel ownership.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-(--surface) border border-(--border) shadow-xl text-left space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-(--border)">
            <span className="font-semibold text-(--text-muted)">Verification Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
              ⏳ Under Review (Avg ~2 hrs)
            </span>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-(--text-primary)">Submitted Channels:</p>
            <div className="p-2.5 rounded-lg bg-(--bg-secondary) flex justify-between items-center">
              <span>t.me/selam_tech</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Bot Check Passed</span>
            </div>
            <div className="p-2.5 rounded-lg bg-(--bg-secondary) flex justify-between items-center">
              <span>@selam_vlogs</span>
              <span className="text-[10px] text-amber-600 font-bold">⏳ Manual Spot Check</span>
            </div>
          </div>
        </div>

        {/* Demo Fast-Track Button */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
          <p className="text-xs font-bold text-(--blue)">Demo Environment Shortcut</p>
          <button
            onClick={() => router.push('/creator/marketplace')}
            className="w-full py-2.5 rounded-lg bg-(--blue) text-white font-bold text-xs hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive"
          >
            Simulate Instant Verification → Unlock Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}
