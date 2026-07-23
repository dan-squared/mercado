'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Platform } from '@/lib/mock-data';
import { HugeIcon } from '@/components/ui/huge-icon';

interface ChannelInput {
  platform: Platform;
  handle: string;
}

export default function CreatorOnboardingPage() {
  const [channels, setChannels] = useState<ChannelInput[]>([
    { platform: 'telegram', handle: 't.me/selam_tech' },
    { platform: 'tiktok', handle: '@selam_vlogs' },
  ]);
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [handle, setHandle] = useState('');
  const router = useRouter();

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle) return;
    setChannels([...channels, { platform, handle }]);
    setHandle('');
  };

  const handleRemove = (index: number) => {
    setChannels(channels.filter((_, i) => i !== index));
  };

  const handleSubmitVerification = () => {
    router.push('/onboarding/creator/pending');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[var(--blue)] flex items-center justify-center mx-auto">
            <HugeIcon name="sparkles" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Connect Your Channels</h1>
          <p className="text-xs text-[var(--text-muted)]">
            We verify channel ownership & follower stats before granting marketplace access
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6">
          {/* Add Channel Form */}
          <form onSubmit={handleAddChannel} className="space-y-3">
            <label className="block text-xs font-semibold text-[var(--text-secondary)]">
              Add Channel / Social Media Handle
            </label>
            <div className="flex gap-2">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="px-3 py-2 text-xs font-bold rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none"
              >
                <option value="telegram">Telegram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="blog">Blog / Website</option>
              </select>

              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@handle or URL..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)]"
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[var(--blue)] text-white text-xs font-bold shadow-sm hover:bg-[var(--blue-dark)] transition-all btn-interactive"
              >
                Add
              </button>
            </div>
          </form>

          {/* Connected Channels List */}
          <div className="space-y-2 border-t border-[var(--border)] pt-4">
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Submitted Channels ({channels.length})
            </label>

            {channels.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-4 text-center">
                No channels added yet. Add at least one channel above.
              </p>
            ) : (
              <div className="space-y-2">
                {channels.map((ch, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="capitalize font-bold text-[var(--blue)]">{ch.platform}</span>
                      <span className="font-semibold text-[var(--text-primary)]">{ch.handle}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        ⏳ Pending Check
                      </span>
                      <button
                        onClick={() => handleRemove(idx)}
                        className="text-[var(--text-muted)] hover:text-red-500"
                      >
                        <HugeIcon name="close" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmitVerification}
            disabled={channels.length === 0}
            className="w-full py-3 rounded-xl bg-[var(--blue)] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center justify-center gap-2"
          >
            <span>Submit for Verification</span>
            <HugeIcon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
