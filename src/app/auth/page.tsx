'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/mock-data';

export default function AuthPage() {
  const [role, setRole] = useState<Role>('business');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mercado_user_role', role);
        localStorage.setItem('mercado_user_phone', `+251 ${phone}`);
      }
      router.push('/auth/verify');
    }, 600);
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
        {/* Brand Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--blue)',
              color: '#fff',
              fontFamily: 'var(--font-fraunces)',
              fontSize: 28,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 8px 20px -6px rgba(47,95,224,0.4)',
            }}
          >
            M
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--text-dark)',
                margin: '0 0 6px',
                letterSpacing: '-0.025em',
              }}
            >
              Welcome to Mercado
            </h1>
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              Ethiopia’s verified performance creator marketplace
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* Segmented Role Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              I want to use Mercado as:
            </label>
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
              {(['business', 'creator'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    padding: '9px 0',
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 9,
                    border: 'none',
                    cursor: 'pointer',
                    background: role === r ? '#fff' : 'transparent',
                    color: role === r ? 'var(--blue)' : 'var(--text-muted)',
                    boxShadow: role === r ? 'var(--shadow-xs)' : 'none',
                    transition: 'background-color var(--dur-base) var(--ease), color var(--dur-base) var(--ease)',
                    textTransform: 'capitalize',
                  }}
                >
                  {r === 'business' ? 'Business' : 'Creator'}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
              {role === 'business'
                ? 'Launch campaigns with escrow protection and reach verified local audiences.'
                : 'Browse campaigns, submit proof, and get weekly mobile money payouts.'}
            </p>
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* Form */}
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>
                Mobile Money Phone Number
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: '#f9f9f8',
                  overflow: 'hidden',
                  transition: 'border-color var(--dur-fast) var(--ease-out)',
                }}
                className="input-group"
              >
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#f3f3f2',
                    borderRight: '1px solid var(--border)',
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  🇪🇹 +251
                </div>
                <input
                  type="tel"
                  required
                  placeholder="91 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || phone.length < 9}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 12,
                background: (isSubmitting || phone.length < 9) ? '#a0a4ab' : 'var(--blue)',
                color: '#fff',
                fontSize: 13.5,
                fontWeight: 700,
                border: 'none',
                cursor: (isSubmitting || phone.length < 9) ? 'not-allowed' : 'pointer',
                boxShadow: (isSubmitting || phone.length < 9) ? 'none' : '0 2px 4px rgba(47,95,224,0.1), 0 8px 16px -6px rgba(47,95,224,0.4)',
                transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              className={(isSubmitting || phone.length < 9) ? '' : 'btn-interactive'}
            >
              {isSubmitting ? 'Sending OTP...' : 'Continue with Phone'}
              {!isSubmitting && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          </form>

          {/* Admin link */}
          <div style={{ textAlign: 'center', paddingTop: 16 }}>
            <a
              href="/admin"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color var(--dur-base) var(--ease)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Platform Owner / Admin Login →
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .input-group:focus-within {
          border-color: var(--blue) !important;
          box-shadow: 0 0 0 3px rgba(47,95,224,0.15);
        }
        input::placeholder {
          color: #b5b8be;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
