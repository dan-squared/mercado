'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HugeIcon, HugeIconName } from '@/components/ui/huge-icon';
import { Role } from '@/lib/mock-data';

interface NavItem {
  label: string;
  href: string;
  icon: HugeIconName;
}

interface AppShellProps {
  children: React.ReactNode;
  role: Role;
}

export const AppShell: React.FC<AppShellProps> = ({ children, role }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = RouterHook();

  function RouterHook() {
    try {
      return useRouter();
    } catch {
      return null;
    }
  }

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'business':
        return [
          { label: 'Dashboard',    href: '/business/dashboard',     icon: 'dashboard' },
          { label: 'New Campaign', href: '/business/campaigns/new', icon: 'megaphone' },
          { label: 'Settings',     href: '#',                       icon: 'settings'  },
        ];
      case 'creator':
        return [
          { label: 'Marketplace',  href: '/creator/marketplace', icon: 'compass'   },
          { label: 'My Campaigns', href: '/creator/campaigns',   icon: 'tasks'     },
          { label: 'Wallet',       href: '/creator/wallet',      icon: 'wallet'    },
          { label: 'Settings',     href: '#',                    icon: 'settings'  },
        ];
      case 'admin':
        return [
          { label: 'Overview',           href: '/admin/dashboard',  icon: 'dashboard' },
          { label: 'Verification Queue', href: '/admin/queue',      icon: 'shield'    },
          { label: 'Users',              href: '/admin/users',      icon: 'users'     },
          { label: 'Campaigns',          href: '/admin/campaigns',  icon: 'megaphone' },
          { label: 'Disputes',           href: '/admin/disputes',   icon: 'disputes'  },
          { label: 'AI Agent Hub',       href: '/admin/agents',     icon: 'ai'        },
        ];
    }
  };

  const navItems = getNavItems();

  const handleRoleSwitch = (newRole: Role) => {
    if (newRole === 'business') router?.push('/business/dashboard');
    else if (newRole === 'creator') router?.push('/creator/marketplace');
    else router?.push('/admin/dashboard');
  };

  const userLabel =
    role === 'business' ? 'Sheba Foods' :
    role === 'creator'  ? 'Selam Tadesse' : 'Mercado Admin';

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--page-bg)',
        color: 'var(--text-dark)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ─── SIDEBAR ─────────────────────────────────────────── */}
      <aside
        style={{
          width: 192,
          flexShrink: 0,
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          background: 'var(--page-bg)',
        }}
      >
        {/* Logo — Fraunces serif, like Mondays */}
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.02em',
            color: 'var(--text-dark)',
            marginBottom: 34,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--blue)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "'Fraunces', serif",
            }}
          >
            M
          </span>
          Mercado
        </div>

        {/* Primary Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 10,
                  fontSize: 13.5,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : '#767a82',
                  background: isActive ? 'var(--blue)' : 'transparent',
                  boxShadow: isActive ? '0 4px 10px -3px rgba(47,95,224,0.45)' : 'none',
                  transition: 'color var(--dur-base) var(--ease), background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
                }}
                className="nav-item-link"
              >
                <span
                  style={{
                    width: 15,
                    fontSize: 14,
                    textAlign: 'center',
                    color: isActive ? '#fff' : '#a7abb2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color var(--dur-base) var(--ease)',
                  }}
                >
                  <HugeIcon name={item.icon} size={16} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Section: Campaigns quick-access */}
        <div style={{ marginTop: 34 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 12.5,
              fontWeight: 600,
              color: '#b5b8be',
              padding: '0 12px',
              marginBottom: 10,
            }}
          >
            CAMPAIGNS
            <button
              style={{
                fontSize: 11,
                color: '#b5b8be',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: 20,
                height: 20,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'background-color var(--dur-base) var(--ease)',
              }}
              onClick={() => router?.push('/business/campaigns/new')}
            >
              +
            </button>
          </div>
          {role === 'business' && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  borderRadius: 9,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: 'var(--text-mid)',
                  transition: 'background-color var(--dur-base) var(--ease)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eaa6f0', flexShrink: 0 }} />
                Sheba Injera Campaign
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  borderRadius: 9,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: 'var(--text-mid)',
                  transition: 'background-color var(--dur-base) var(--ease)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a3f2b0', flexShrink: 0 }} />
                Holiday Special
              </div>
            </>
          )}
          {role === 'creator' && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  borderRadius: 9,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: 'var(--text-mid)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eaa6f0', flexShrink: 0 }} />
                Ethio Coffee Reel
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  borderRadius: 9,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: 'var(--text-mid)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a3f2b0', flexShrink: 0 }} />
                Fashion Brand UGC
              </div>
            </>
          )}
        </div>

        {/* Sidebar bottom: role-switch + settings */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Floating Profile Dropdown matching ChatGPT design */}
          <div style={{ position: 'relative' }}>
            {profileOpen && (
              <>
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                  onClick={() => setProfileOpen(false)}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: 0,
                    width: '100%',
                    background: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    padding: 8,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                    border: '1px solid var(--border)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    animation: 'slideUp var(--dur-fast) var(--ease-out)',
                  }}
                >
                  <div style={{ padding: '6px 12px 10px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Switch Demo Role
                  </div>
                  {(['business', 'creator', 'admin'] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => { handleRoleSwitch(r); setProfileOpen(false); }}
                      style={{
                        padding: '10px 12px',
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)', // nested radius: 16 - 8 = 8px
                        border: 'none',
                        cursor: 'pointer',
                        background: 'transparent',
                        color: role === r ? 'var(--text-dark)' : 'var(--text-mid)',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'background-color var(--dur-fast) var(--ease)',
                      }}
                      className="nav-item-link"
                    >
                      <span style={{ textTransform: 'capitalize' }}>{r}</span>
                      {role === r && <HugeIcon name="check" size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 13.5,
                fontWeight: 600,
                color: 'var(--text-dark)',
                background: profileOpen ? '#f4f4f4' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color var(--dur-fast) var(--ease)',
              }}
              className="hover-bg-gray"
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#f4f4f4',
                  border: '1px solid var(--border)',
                  color: 'var(--text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {role === 'business' ? 'SF' : role === 'creator' ? 'ST' : 'AD'}
              </div>
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {userLabel}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a7abb2" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 500,
              color: '#b5b8be',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <HugeIcon name="settings" size={16} />
            Settings
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 500,
              color: '#b5b8be',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <HugeIcon name="shield" size={16} />
            Help &amp; Support
            <span
              style={{
                marginLeft: 'auto',
                background: '#dcf5e0',
                color: '#2f9e4a',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 6,
                padding: '1px 7px',
              }}
            >
              8
            </span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN ────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          padding: '32px 32px 32px 8px',
          minWidth: 0,
        }}
      >
        {/* Topbar — search + create + avatar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              border: `1px solid ${searchFocused ? '#9db3f0' : 'var(--border)'}`,
              borderRadius: 12,
              padding: '11px 14px',
              color: 'var(--text-muted)',
              fontSize: 13.5,
              boxShadow: searchFocused ? '0 0 0 4px rgba(47,95,224,0.10)' : 'none',
              transition: 'border-color var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)',
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={searchFocused ? '#6b88e0' : '#c2c5cb'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, transition: 'stroke var(--dur-base) var(--ease)' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search or type a command"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--text-dark)',
                fontSize: 13.5,
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <span
              style={{
                marginLeft: 'auto',
                background: '#f4f4f4',
                borderRadius: 6,
                padding: '2px 7px',
                fontSize: 11.5,
                fontWeight: 600,
                color: '#a7abb2',
                boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              ⌘ F
            </span>
          </div>

          {/* New Campaign button */}
          <Link
            href={role === 'business' ? '/business/campaigns/new' : '#'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--blue)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '11px 18px',
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 2px rgba(47,95,224,0.15), 0 6px 16px -6px rgba(47,95,224,0.45)',
              transition: 'background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease)',
            }}
            className="btn-interactive"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {role === 'business' ? 'New Campaign' : role === 'creator' ? 'Find Work' : 'New Action'}
            <span
              style={{
                borderLeft: '1px solid rgba(255,255,255,.35)',
                paddingLeft: 12,
                marginLeft: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </Link>

          {/* Avatar (Top right) - now minimalist monochrome */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#f4f4f4',
              border: '1px solid var(--border)',
              color: 'var(--text-dark)',
              fontWeight: 700,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform var(--dur-base) var(--ease-out)',
              title: userLabel,
            } as React.CSSProperties}
            className="hover-scale"
            title={userLabel}
          >
            {role === 'business' ? 'SF' : role === 'creator' ? 'ST' : 'MA'}
          </div>
        </header>

        {/* PAGE CONTENT */}
        {children}
      </main>

      {/* Nav item hover style */}
      <style>{`
        .nav-item-link:hover:not([style*="var(--blue)"]) {
          color: var(--text-dark) !important;
          background: #f2f2f1 !important;
        }
        .nav-item-link:active { transform: scale(0.98); }
        .hover-bg-gray:hover { background: #f4f4f4 !important; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
