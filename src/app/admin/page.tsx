'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeIcon } from '@/components/ui/huge-icon';

// Emil: Admin login is a rare, one-time-per-session action. It can be visually
// distinct from the rest of the app. Dark theme here creates a clear
// "secure/elevated" context signal — a UX affordance, not just aesthetics.
export default function AdminLoginPage() {
  const [email, setEmail]       = useState('admin@mercado.et');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network latency. Emil: button must reflect loading state immediately.
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: '#0d0d0f',
        color: '#fff',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {/* Icon mark — simple monochrome, no gradient. Emil: restraint over decoration. */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: '#1a1a1d',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HugeIcon name="shield" size={26} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 6px',
                letterSpacing: '-0.02em',
              }}
            >
              Command Center
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Platform Owner · Fraud Verification Operations
            </p>
          </div>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          style={{
            background: '#141416',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
              ADMIN EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                fontSize: 13.5,
                fontWeight: 500,
                borderRadius: 12,
                background: '#0d0d0f',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                outline: 'none',
                fontFamily: "'Inter', sans-serif",
                transition: 'border-color var(--dur-base) var(--ease)',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                fontSize: 13.5,
                fontWeight: 500,
                borderRadius: 12,
                background: '#0d0d0f',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                outline: 'none',
                fontFamily: "'Inter', sans-serif",
                transition: 'border-color var(--dur-base) var(--ease)',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Submit — Emil: button must immediately reflect loading state.
              Disabled + dimmed while loading prevents double-submits. */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              background: loading ? 'rgba(255,255,255,0.08)' : '#fff',
              color: loading ? 'rgba(255,255,255,0.3)' : '#0d0d0f',
              fontSize: 13.5,
              fontWeight: 700,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--dur-base) var(--ease), color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            className={loading ? '' : 'btn-interactive'}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderTopColor: 'rgba(255,255,255,0.6)',
                    animation: 'spin 600ms linear infinite',
                  }}
                />
                Authenticating…
              </>
            ) : (
              <>
                Access Command Center
                <HugeIcon name="arrow-right" size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
