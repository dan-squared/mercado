'use client';

import React from 'react';
import { CampaignStatus } from '@/lib/mock-data';

interface StatusChipProps {
  status: CampaignStatus;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className = '' }) => {
  const getStyle = () => {
    switch (status) {
      case 'Live':
        return { bg: 'var(--pill-accent-bg)', text: 'var(--pill-accent-text)', border: '1px solid rgba(47,95,224,0.15)' };
      case 'In Progress':
      case 'Under Review':
        return { bg: '#fff', text: 'var(--text-dark)', border: '1px solid var(--border)' };
      case 'Completed':
        return { bg: 'var(--pill-strong-bg)', text: 'var(--pill-strong-text)', border: '1px solid var(--pill-strong-bg)' };
      case 'Rejected':
      case 'Paused':
      case 'Cancelled':
      case 'Draft':
      default:
        return { bg: 'var(--pill-default-bg)', text: 'var(--pill-default-text)', border: '1px solid var(--pill-outline)' };
    }
  };

  const style = getStyle();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider font-bold transition-transform duration-150 hover:scale-105 ${className}`}
      style={{
        background: style.bg,
        color: style.text,
        border: style.border,
      }}
    >
      {status === 'Completed' && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ marginRight: 4 }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
      {status === 'Live' && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', marginRight: 5, opacity: 0.8 }} />
      )}
      {status}
    </span>
  );
};
