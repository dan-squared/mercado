'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/mock-data';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function AuthPage() {
  const [role, setRole] = useState<Role>('business');
  const [phone, setPhone] = useState('911234567');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Pass role & phone via localStorage/session for demo flow
      if (typeof window !== 'undefined') {
        localStorage.setItem('mercado_user_role', role);
        localStorage.setItem('mercado_user_phone', `+251 ${phone}`);
      }
      router.push('/auth/verify');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--blue)] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            M
          </div>
          <h1 className="text-2xl font-black tracking-tight">Welcome to Mercado</h1>
          <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
            Ethiopia&apos;s verified performance creator ad marketplace
          </p>
        </div>

        {/* Auth Card */}
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6">
          {/* Segmented Role Switcher — [ Business ] [ Creator ] */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              I want to use Mercado as:
            </label>
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] relative">
              <button
                type="button"
                onClick={() => setRole('business')}
                className={`py-2 text-xs font-bold rounded-lg transition-all duration-180 flex items-center justify-center gap-2 ${
                  role === 'business'
                    ? 'bg-[var(--surface)] text-[var(--blue)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <HugeIcon name="building" size={16} />
                <span>Business / Advertiser</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`py-2 text-xs font-bold rounded-lg transition-all duration-180 flex items-center justify-center gap-2 ${
                  role === 'creator'
                    ? 'bg-[var(--surface)] text-[var(--blue)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <HugeIcon name="sparkles" size={16} />
                <span>Creator / Publisher</span>
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] text-center">
              {role === 'business'
                ? '💼 Post campaigns with escrow protection and reach real audiences.'
                : '🎨 Claim campaigns, submit proof, and get weekly mobile money payouts.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                Mobile Money Phone Number
              </label>
              <div className="flex rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] focus-within:border-[var(--blue)] overflow-hidden transition-all">
                <span className="px-3.5 py-2.5 bg-[var(--surface)] border-r border-[var(--border)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  🇪🇹 +251
                </span>
                <input
                  type="tel"
                  required
                  placeholder="91 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none text-[var(--text-primary)] font-semibold placeholder-[var(--text-placeholder)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !phone}
              className="w-full py-3 rounded-xl bg-[var(--blue)] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Continue with Phone</span>
                  <HugeIcon name="arrow-right" size={16} />
                </>
              )}
            </button>
          </form>

          {/* Admin link */}
          <div className="pt-2 text-center border-t border-[var(--border)]">
            <a
              href="/admin"
              className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--blue)] transition-colors"
            >
              Platform Owner / Admin Login →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
