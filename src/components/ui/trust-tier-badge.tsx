'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TrustTier, CreatorProfile } from '@/lib/mock-data';
import { HugeIcon } from './huge-icon';

interface TrustTierBadgeProps {
  tier: TrustTier;
  creator?: CreatorProfile;
  className?: string;
}

export const TrustTierBadge: React.FC<TrustTierBadgeProps> = ({
  tier,
  creator,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getTierDetails = () => {
    switch (tier) {
      case 'Elite':
        return {
          bg: 'bg-[#fef3c7] text-[#b45309] dark:bg-[#451a03] dark:text-[#fbbf24]',
          icon: '👑',
          label: 'Elite Creator',
        };
      case 'Trusted':
        return {
          bg: 'bg-[#dcf5e0] text-[#2f9e4a] dark:bg-[#064e3b] dark:text-[#34d399]',
          icon: '⭐',
          label: 'Trusted Creator',
        };
      case 'Verified':
        return {
          bg: 'bg-[#dde6fb] text-[#2f5fe0] dark:bg-[#1e293b] dark:text-[#60a5fa]',
          icon: '✓',
          label: 'Verified Creator',
        };
      case 'New':
      default:
        return {
          bg: 'bg-[#f3f3f2] text-[#71717a] dark:bg-[#27272a] dark:text-[#a1a1aa]',
          icon: '🌱',
          label: 'New Creator',
        };
    }
  };

  const details = getTierDetails();

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight transition-all duration-150 btn-interactive ${details.bg} ${className}`}
      >
        <span>{details.icon}</span>
        <span>{tier}</span>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 left-0 mt-2 w-64 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xl animate-in fade-in zoom-in-95 duration-150 origin-top-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{details.icon}</span>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">{details.label}</h4>
              <p className="text-xs text-[var(--text-muted)]">Verified Trust Level</p>
            </div>
          </div>

          <div className="space-y-2 text-xs border-t border-b border-[var(--border)] py-2.5 my-2">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Completed Campaigns:</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {creator?.campaignsCompleted ?? 12}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Dispute Rate:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {creator?.disputeRate ?? '0%'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Member Since:</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {creator?.joinedDate ?? 'Jan 2025'}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
            <HugeIcon name="shield" size={14} className="text-blue-500" />
            Escrow protection active for all campaigns
          </div>
        </div>
      )}
    </div>
  );
};
