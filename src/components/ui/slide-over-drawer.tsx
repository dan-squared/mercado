'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HugeIcon } from './huge-icon';

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const SlideOverDrawer: React.FC<SlideOverDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  // Emil: use CSS transitions for interruptible UI — not keyframes.
  // Drawer tracks its own "visible" state so the exit animation plays before unmounting.
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // One frame delay so the browser registers the starting transform before transitioning.
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      // Wait for exit animation to finish before unmounting.
      closeTimerRef.current = setTimeout(() => setMounted(false), 280);
    }
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [isOpen]);

  // Escape key dismissal — Emil: keyboard actions must be responsive (no lag).
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, overflow: 'hidden' }}>
      {/* Backdrop — fades in/out. Emil: opacity transitions aid comprehension even under reduced motion. */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.40)',
          backdropFilter: 'blur(4px)',
          opacity: visible ? 1 : 0,
          // Emil: specify exact properties — never transition: all
          transition: 'opacity 260ms var(--ease-out)',
        }}
      />

      {/* Drawer Panel — slides from right. Emil: spatial consistency — enters and exits from same direction. */}
      <div
        style={{
          position: 'fixed',
          inset: '0 0 0 auto',
          width: '100%',
          maxWidth: 520,
          background: '#fff',
          borderLeft: '1px solid var(--border)',
          boxShadow: '-4px 0 40px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          // Emil: translateX with percentage = works regardless of element width.
          // ease-drawer (iOS-like) = feels natural for sheet interactions.
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform 280ms var(--ease-drawer), box-shadow 280ms var(--ease)`,
          willChange: 'transform',
        }}
      >
        {/* Header */}
        <div
          style={{
            height: 64,
            padding: '0 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{title}</h3>
            {subtitle && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>{subtitle}</p>
            )}
          </div>
          {/* Emil: close button must feel responsive — btn-interactive gives scale(0.97) on press. */}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease-out)',
            }}
            className="btn-interactive"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#f4f4f4';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dark)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
          >
            <HugeIcon name="close" size={18} />
          </button>
        </div>

        {/* Content — scrollable, with generous padding */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
