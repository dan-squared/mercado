'use client';

import React, { useEffect } from 'react';
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
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-lg bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ease-[var(--ease-drawer)]">
          {/* Drawer Header */}
          <div className="h-[64px] px-6 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">{title}</h3>
              {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors btn-interactive"
            >
              <HugeIcon name="close" size={18} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
