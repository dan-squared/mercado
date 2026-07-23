'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto focus next box
    if (numericValue && index < 5) {
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-md)',
              background: 'var(--text-dark)', // Monochrome logo
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 26,
                fontWeight: 700,
                color: 'var(--text-dark)',
                margin: '0 0 6px',
                letterSpacing: '-0.02em',
              }}
            >
              Verify your number
            </h1>
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              We sent a 6-digit code to your phone
            </p>
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            padding: '32px', // Increased padding
            display: 'flex',
            flexDirection: 'column',
            gap: 28, // Increased gap
          }}
        >
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* 6 Individual Digit Inputs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  style={{
                    width: 46,
                    height: 56,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    background: '#f9f9f8',
                    border: '1px solid var(--border)',
                    color: 'var(--text-dark)',
                    outline: 'none',
                    transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
                  }}
                  className="otp-input"
                />
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
              Didn&apos;t receive code?{' '}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dark)', // monochrome
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Resend SMS (0:45)
              </button>
            </p>

            <button
              type="submit"
              disabled={isVerifying || otp.join('').length < 6}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: (isVerifying || otp.join('').length < 6) ? '#e5e7eb' : 'var(--text-dark)', // monochrome
                color: (isVerifying || otp.join('').length < 6) ? '#a1a1aa' : '#fff',
                fontSize: 13.5,
                fontWeight: 700,
                border: 'none',
                cursor: (isVerifying || otp.join('').length < 6) ? 'not-allowed' : 'pointer',
                boxShadow: (isVerifying || otp.join('').length < 6) ? 'none' : 'var(--shadow-sm)',
                transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              className={(isVerifying || otp.join('').length < 6) ? '' : 'btn-interactive'}
            >
              {isVerifying ? 'Verifying...' : 'Verify Phone Number'}
              {!isVerifying && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .otp-input:focus {
          border-color: var(--text-dark) !important;
          box-shadow: 0 0 0 3px rgba(22, 24, 29, 0.1);
        }
      `}</style>
    </div>
  );
}
