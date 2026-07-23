'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { CampaignType, ClaimMode, Platform } from '@/lib/mock-data';
import { PaymentModal } from '@/components/ui/payment-modal';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function CreateCampaignWizardPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 - Basics
  const [title, setTitle] = useState('Addis Tech Expo Promotion');
  const [description, setDescription] = useState(
    'Promote ticket sales for the annual Addis Tech Expo on your Telegram channel or TikTok account.'
  );
  const [type, setType] = useState<CampaignType>('fixed');
  const [claimMode, setClaimMode] = useState<ClaimMode>('instant');
  const [platforms, setPlatforms] = useState<Platform[]>(['telegram', 'tiktok']);

  // Step 2 - Requirements
  const [minFollowers, setMinFollowers] = useState<number>(10000);
  const [requirements, setRequirements] = useState(
    'Must include ticket booking link in bio and post during peak hours (6pm-9pm).'
  );
  const [deadline, setDeadline] = useState('2026-08-30');

  // Step 3 - Budget & Escrow
  const [rate, setRate] = useState<number>(4000); // ETB
  const [totalBudget, setTotalBudget] = useState<number>(40000); // ETB
  const [provider, setProvider] = useState<'telebirr' | 'cbebirr'>('telebirr');
  const [phone, setPhone] = useState('+251 91 123 4567');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const router = useRouter();

  // Live estimated reach formula
  const estimatedCreators = Math.floor(totalBudget / (rate || 1));
  const estimatedReach = estimatedCreators * (minFollowers * 1.8);

  const togglePlatform = (p: Platform) => {
    if (platforms.includes(p)) {
      setPlatforms(platforms.filter((x) => x !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handlePaymentSuccess = () => {
    setStep(4);
  };

  const handleLaunchCampaign = () => {
    router.push('/business/dashboard');
  };

  return (
    <AppShell role="business">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Wizard Header & Progress Bar */}
        <div className="space-y-4 text-center sm:text-left">
          <div>
            <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Create New Performance Campaign
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Fund your budget into escrow before going live to guarantee creator trust.
            </p>
          </div>

          {/* 4-Step Progress Indicator */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { num: 1, label: 'Basics' },
              { num: 2, label: 'Targeting' },
              { num: 3, label: 'Budget & Escrow' },
              { num: 4, label: 'Review & Live' },
            ].map((s) => (
              <div
                key={s.num}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  step === s.num
                    ? 'bg-[var(--blue-light)]/20 border-[var(--blue)] text-[var(--blue)] font-bold shadow-xs'
                    : step > s.num
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 font-bold'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider">Step {s.num}</div>
                <div className="text-xs font-semibold truncate">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1 — BASICS */}
        {step === 1 && (
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] pb-3">
              Step 1: Campaign Details & Platforms
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)] font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Brief / Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)]"
                />
              </div>

              {/* Campaign Type Toggle */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div
                  onClick={() => setType('fixed')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    type === 'fixed'
                      ? 'border-[var(--blue)] bg-[var(--blue-light)]/20 shadow-xs'
                      : 'border-[var(--border)] bg-[var(--bg-secondary)]'
                  }`}
                >
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    Fixed-Fee Post
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Flat rate per verified post/content (Simplest & Recommended)
                  </span>
                </div>

                <div
                  onClick={() => setType('cpm')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    type === 'cpm'
                      ? 'border-[var(--blue)] bg-[var(--blue-light)]/20 shadow-xs'
                      : 'border-[var(--border)] bg-[var(--bg-secondary)]'
                  }`}
                >
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    CPM (per 1,000 Views)
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Pay based on verified impression analytics
                  </span>
                </div>
              </div>

              {/* Claim Mode Toggle */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Creator Access Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClaimMode('instant')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      claimMode === 'instant'
                        ? 'border-[var(--blue)] text-[var(--blue)] bg-[var(--surface)]'
                        : 'border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    ⚡ Instant Claim (First-come-first-served)
                  </button>

                  <button
                    type="button"
                    onClick={() => setClaimMode('application')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      claimMode === 'application'
                        ? 'border-[var(--blue)] text-[var(--blue)] bg-[var(--surface)]'
                        : 'border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    📋 Require Creator Application
                  </button>
                </div>
              </div>

              {/* Platforms Multi-select */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Allowed Target Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['telegram', 'tiktok', 'youtube', 'blog', 'website'] as Platform[]).map((p) => {
                    const selected = platforms.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          selected
                            ? 'bg-[var(--blue)] text-white shadow-xs'
                            : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-[var(--blue)] text-white font-bold text-xs shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center gap-2"
              >
                <span>Continue to Targeting & Requirements</span>
                <HugeIcon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — TARGETING */}
        {step === 2 && (
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] pb-3">
              Step 2: Creator Requirements & Targeting
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Minimum Follower / Subscriber Threshold
                </label>
                <input
                  type="number"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)] font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Content Requirements & Brief Guidelines
                </label>
                <textarea
                  rows={4}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Campaign Submission Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)] font-bold"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-[var(--text-muted)]"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-[var(--blue)] text-white font-bold text-xs shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center gap-2"
              >
                <span>Continue to Budget & Escrow</span>
                <HugeIcon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — BUDGET & ESCROW */}
        {step === 3 && (
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] pb-3">
              Step 3: Budget Allocation & Telebirr Escrow Setup
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Rate per Creator Post (ETB)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--blue)] font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  Total Escrow Budget (ETB)
                </label>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--blue)] outline-none focus:border-[var(--blue)] font-black text-lg"
                />
              </div>
            </div>

            {/* LIVE ESTIMATED REACH INDICATOR */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-blue-100">
                <span>⚡ LIVE TELEMETRY ESTIMATE</span>
                <span className="px-2 py-0.5 rounded bg-white/20">Real-time Calculation</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <p className="text-[11px] text-blue-200">Estimated Total Reach</p>
                  <p className="text-2xl font-black">{estimatedReach.toLocaleString()} Views</p>
                </div>
                <div>
                  <p className="text-[11px] text-blue-200">Estimated Creator Slots</p>
                  <p className="text-2xl font-black">{estimatedCreators} Creators</p>
                </div>
              </div>
            </div>

            {/* Mobile Money Provider Selector */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                Select Mobile Money Escrow Source
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setProvider('telebirr')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    provider === 'telebirr'
                      ? 'border-sky-500 bg-sky-500/10 text-sky-600 font-bold'
                      : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                  }`}
                >
                  <span className="text-xs">Telebirr (Primary)</span>
                  {provider === 'telebirr' && <HugeIcon name="check" size={16} />}
                </div>

                <div
                  onClick={() => setProvider('cbebirr')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    provider === 'cbebirr'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-600 font-bold'
                      : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                  }`}
                >
                  <span className="text-xs">CBE Birr</span>
                  {provider === 'cbebirr' && <HugeIcon name="check" size={16} />}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                Account Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] outline-none font-semibold"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-bold text-[var(--text-muted)]"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="px-6 py-3 rounded-xl bg-[var(--blue)] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center gap-2"
              >
                <HugeIcon name="lock" size={16} />
                <span>Trigger Mobile Money Deposit → ETB {totalBudget.toLocaleString()}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — REVIEW & LIVE */}
        {step === 4 && (
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <HugeIcon name="check-circle" size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[var(--text-primary)]">
                Campaign is Funded & LIVE!
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Your ETB {totalBudget.toLocaleString()} escrow balance is locked. Creators in the
                marketplace can now view and claim this campaign.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Campaign Title:</span>
                <span className="font-bold text-[var(--text-primary)]">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Rate per Creator:</span>
                <span className="font-bold text-[var(--blue)]">ETB {rate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Target Platforms:</span>
                <span className="font-bold uppercase">{platforms.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Status:</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-bold">
                  ● Live in Marketplace
                </span>
              </div>
            </div>

            <button
              onClick={handleLaunchCampaign}
              className="px-8 py-3 rounded-xl bg-[var(--blue)] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[var(--blue-dark)] transition-all btn-interactive"
            >
              Return to Campaign Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Simulated Mobile Money Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        amount={totalBudget}
        provider={provider}
        phone={phone}
        onSuccess={handlePaymentSuccess}
        onClose={() => setShowPaymentModal(false)}
      />
    </AppShell>
  );
}
