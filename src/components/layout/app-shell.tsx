'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HugeIcon, HugeIconName } from '@/components/ui/huge-icon';
import { Role } from '@/lib/mock-data';

/* ─── Types ───────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  icon: HugeIconName;
}

interface AppShellProps {
  children: React.ReactNode;
  role: Role;
}

/* ─── Nav config — single source of truth ─────────────────── */
// Emil: Good software engineering = one place to change when adding a route.
const NAV_CONFIG: Record<Role, NavItem[]> = {
  business: [
    { label: 'Dashboard',    href: '/business/dashboard',     icon: 'dashboard' },
    { label: 'New Campaign', href: '/business/campaigns/new', icon: 'megaphone' },
    { label: 'Settings',     href: '#',                       icon: 'settings'  },
  ],
  creator: [
    { label: 'Marketplace',  href: '/creator/marketplace', icon: 'compass'  },
    { label: 'My Campaigns', href: '/creator/campaigns',   icon: 'tasks'    },
    { label: 'Wallet',       href: '/creator/wallet',      icon: 'wallet'   },
    { label: 'Settings',     href: '#',                    icon: 'settings' },
  ],
  admin: [
    { label: 'Overview',           href: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Verification Queue', href: '/admin/queue',     icon: 'shield'    },
    { label: 'Users',              href: '/admin/users',     icon: 'users'     },
    { label: 'Campaigns',          href: '/admin/campaigns', icon: 'megaphone' },
    { label: 'Disputes',           href: '/admin/disputes',  icon: 'disputes'  },
    { label: 'AI Agent Hub',       href: '/admin/agents',    icon: 'ai'        },
  ],
};

const ROLE_LABELS: Record<Role, string> = {
  business: 'Sheba Foods',
  creator:  'Selam Tadesse',
  admin:    'Mercado Admin',
};

const ROLE_INITIALS: Record<Role, string> = {
  business: 'SF',
  creator:  'ST',
  admin:    'MA',
};

const ROLE_DEST: Record<Role, string> = {
  business: '/business/dashboard',
  creator:  '/creator/marketplace',
  admin:    '/admin/dashboard',
};

/* ═══════════════════════════════════════════════════════════ */
export const AppShell: React.FC<AppShellProps> = ({ children, role }) => {
  const pathname   = usePathname();
  const router     = useRouter();

  const [searchFocused, setSearchFocused]   = useState(false);
  const [searchQuery,   setSearchQuery]     = useState('');
  const [profileOpen,   setProfileOpen]     = useState(false);
  // Emil: track if dropdown is "visible" separately from mounted for exit animation
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems  = NAV_CONFIG[role];
  const userLabel = ROLE_LABELS[role];

  /* ── Dropdown open/close with animation ─────────────────── */
  // Emil: asymmetric timing — open fast (160ms), close even faster (120ms).
  // The user is watching most closely when it opens.
  const openDropdown  = useCallback(() => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setProfileOpen(true);
    requestAnimationFrame(() => setDropdownVisible(true));
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownVisible(false);
    dropdownTimerRef.current = setTimeout(() => setProfileOpen(false), 160);
  }, []);

  const toggleDropdown = () => (profileOpen ? closeDropdown() : openDropdown());

  /* ── Close dropdown on outside click ─────────────────────── */
  useEffect(() => () => { if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current); }, []);

  /* ── Role switch ─────────────────────────────────────────── */
  const handleRoleSwitch = (newRole: Role) => {
    closeDropdown();
    router.push(ROLE_DEST[newRole]);
  };

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
      {/* ─── SIDEBAR ──────────────────────────────────────────── */}
      <aside
        style={{
          width: 200,
          flexShrink: 0,
          padding: '28px 16px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          background: 'var(--page-bg)',
          // Emil: No border on sidebar. Whitespace itself creates the visual separation.
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: 21,
            letterSpacing: '-0.025em',
            color: 'var(--text-dark)',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 8px',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              background: 'var(--text-dark)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "'Fraunces', serif",
              flexShrink: 0,
            }}
          >
            M
          </span>
          Mercado
        </div>

        {/* Primary Nav
            Emil: stagger-item class cascades entry animation (30-70ms apart).
            Interaction never blocked — stagger is purely decorative. */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item, i) => {
            const isActive = pathname === item.href || (item.href !== '#' && pathname?.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="stagger-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : 'var(--text-mid)',
                  background: isActive ? 'var(--text-dark)' : 'transparent',
                  // Emil: specify exact properties — never transition: all
                  transition: 'color var(--dur-base) var(--ease), background-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
                  // Emil: stagger-item uses animation-delay from nth-child, so we inject per-item delay here
                  animationDelay: `${i * 40}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f2f2f1';
                    e.currentTarget.style.color = 'var(--text-dark)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-mid)';
                  }
                }}
              >
                <HugeIcon
                  name={item.icon}
                  size={16}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Campaigns quick-access — only for business/creator */}
        {(role === 'business' || role === 'creator') && (
          <div style={{ marginTop: 28 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--text-faint)',
                padding: '0 12px',
                marginBottom: 6,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Campaigns
              <button
                style={{
                  fontSize: 14,
                  lineHeight: 1,
                  color: 'var(--text-faint)',
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
                  transition: 'background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)',
                }}
                className="btn-interactive"
                onClick={() => router.push('/business/campaigns/new')}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f2f2f1'; e.currentTarget.style.color = 'var(--text-dark)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-faint)'; }}
              >
                +
              </button>
            </div>

            {/* Campaign dots — monochrome, no loud purple/green */}
            {[
              role === 'business' ? 'Sheba Injera Campaign' : 'Ethio Coffee Reel',
              role === 'business' ? 'Holiday Special'       : 'Fashion Brand UGC',
            ].map((name, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text-mid)',
                  cursor: 'pointer',
                  transition: 'background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f2f2f1'; e.currentTarget.style.color = 'var(--text-dark)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-mid)'; }}
              >
                {/* Emil: small neutral dot, no color for status here — keep sidebar calm */}
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--border-mid)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Sidebar bottom */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* ── Profile dropdown
              Emil: popover-origin class = transform-origin: bottom center so it
              scales from where the trigger is, not from screen center. */}
          <div style={{ position: 'relative' }}>
            {profileOpen && (
              <>
                {/* Click-outside trap */}
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                  onClick={closeDropdown}
                />
                {/* Dropdown panel
                    Emil: scale(0.95) start, ease-out, 160ms — punchy & fast.
                    transform-origin: bottom center → grows from trigger. */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    padding: 6,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)',
                    border: '1px solid var(--border)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    // Emil: origin-aware → opens from where the user triggered it
                    transformOrigin: 'bottom center',
                    // CSS transition — interruptible, not keyframes
                    transform: dropdownVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(4px)',
                    opacity: dropdownVisible ? 1 : 0,
                    transition: `transform 160ms var(--ease-out), opacity 160ms var(--ease-out)`,
                  }}
                >
                  <div
                    style={{
                      padding: '5px 10px 8px',
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: 'var(--text-faint)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Switch Role
                  </div>
                  {(['business', 'creator', 'admin'] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      style={{
                        padding: '9px 10px',
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)', // innerRadius = 16 - 6 = 10 → 8px
                        border: 'none',
                        cursor: 'pointer',
                        background: r === role ? '#f4f4f4' : 'transparent',
                        color: r === role ? 'var(--text-dark)' : 'var(--text-mid)',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        transition: 'background-color var(--dur-fast) var(--ease)',
                      }}
                      className="btn-interactive"
                      onMouseEnter={(e) => { if (r !== role) e.currentTarget.style.background = '#f4f4f4'; }}
                      onMouseLeave={(e) => { if (r !== role) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ textTransform: 'capitalize' }}>{r}</span>
                      {r === role && <HugeIcon name="check" size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Trigger button */}
            <button
              onClick={toggleDropdown}
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
                transition: 'background-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease-out)',
              }}
              className="btn-interactive"
              onMouseEnter={(e) => { if (!profileOpen) e.currentTarget.style.background = '#f2f2f1'; }}
              onMouseLeave={(e) => { if (!profileOpen) e.currentTarget.style.background = 'transparent'; }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
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
                {ROLE_INITIALS[role]}
              </div>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13.5 }}>
                {userLabel}
              </span>
              {/* Chevron — rotates to communicate dropdown open state */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-faint)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  flexShrink: 0,
                  transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--dur-base) var(--ease-out)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* Settings & Support */}
          {[
            { icon: 'settings' as HugeIconName, label: 'Settings' },
            { icon: 'shield'   as HugeIconName, label: 'Help & Support' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 13.5,
                fontWeight: 500,
                color: 'var(--text-faint)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease-out)',
              }}
              className="btn-interactive"
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f2f2f1'; e.currentTarget.style.color = 'var(--text-dark)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-faint)'; }}
            >
              <HugeIcon name={icon} size={16} />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ─── MAIN ─────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          padding: '32px 32px 48px 8px',
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}
        >
          {/* Search bar — Emil: focus ring uses monochrome --text-dark, not blue */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              border: `1px solid ${searchFocused ? 'var(--border-mid)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '11px 14px',
              color: 'var(--text-muted)',
              fontSize: 13.5,
              boxShadow: searchFocused ? '0 0 0 3px rgba(22,24,29,0.07)' : 'none',
              transition: 'border-color var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)',
            }}
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke={searchFocused ? 'var(--text-mid)' : 'var(--text-faint)'}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ flexShrink: 0, transition: 'stroke var(--dur-base) var(--ease)' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search or type a command…"
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
            {/* Keyboard shortcut hint — Emil: surface affordances, never hide them */}
            <span
              style={{
                marginLeft: 'auto',
                background: '#f4f4f4',
                borderRadius: 6,
                padding: '2px 7px',
                fontSize: 11.5,
                fontWeight: 600,
                color: 'var(--text-faint)',
                boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.04)',
                whiteSpace: 'nowrap',
              }}
            >
              ⌘ F
            </span>
          </div>

          {/* Primary CTA — monochrome, Emil: shadow only on dark buttons */}
          <Link
            href={role === 'business' ? '/business/campaigns/new' : role === 'creator' ? '/creator/marketplace' : '/admin/queue'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'var(--text-dark)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '11px 18px',
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease)',
            }}
            className="btn-interactive"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {role === 'business' ? 'New Campaign' : role === 'creator' ? 'Find Work' : 'New Action'}
          </Link>

          {/* Avatar — Emil: hover-scale class gates on pointer: fine, avoids touch stuck state */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#f4f4f4',
              border: '1px solid var(--border)',
              color: 'var(--text-dark)',
              fontWeight: 700,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform var(--dur-base) var(--ease-out)',
            }}
            className="hover-scale"
            title={userLabel}
          >
            {ROLE_INITIALS[role]}
          </div>
        </header>

        {/* Page content */}
        {children}
      </main>
    </div>
  );
};
