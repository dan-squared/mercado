'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(['5', '2', '8', '9', '0', '1']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [role, setRole] = useState<string>('business');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('mercado_user_role');
      if (storedRole) setRole(storedRole);
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      if (role === 'business') {
        router.push('/onboarding/business');
      } else {
        router.push('/onboarding/creator');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[var(--blue)] flex items-center justify-center mx-auto">
            <HugeIcon name="shield" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Enter Verification Code</h1>
          <p className="text-xs text-[var(--text-muted)]">
            We sent a 6-digit code to your phone number
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-6">
          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 Individual Digit Inputs */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-14 text-center text-xl font-bold rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              ))}
            </div>

            <p className="text-center text-xs text-[var(--text-muted)]">
              Didn&apos;t receive code?{' '}
              <button type="button" className="text-[var(--blue)] font-bold hover:underline">
                Resend SMS (0:45)
              </button>
            </p>

            <button
              type="submit"
              disabled={isVerifying || otp.join('').length < 6}
              className="w-full py-3 rounded-xl bg-[var(--blue)] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[var(--blue-dark)] transition-all btn-interactive flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Verify Phone Number</span>
                  <HugeIcon name="check" size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
