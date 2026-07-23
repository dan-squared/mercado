'use client';

import React from 'react';
import { CampaignStatus } from '@/lib/mock-data';

interface StatusChipProps {
  status: CampaignStatus;
  size?: 'sm' | 'md';
  className?: string;
}

// Emil: Components should have great defaults. The size prop gives flexibility
// without requiring callers to manually specify padding/font size every time.
const sizeStyles = {
  sm: { padding: '3px 8px', fontSize: 10 },
  md: { padding: '5px 12px', fontSize: 11 },
};

// Emil: Reusable design token — single source of truth for each status.
// Callers never think about colors; the component handles it.
const statusConfig: Record<CampaignStatus, {
  bg: string;
  color: string;
  border: string;
  dot?: boolean;
  check?: boolean;
  label?: string;
}> = {
  Live: {
    bg: 'rgba(47,95,224,0.07)',
    color: 'var(--blue)',
    border: '1px solid rgba(47,95,224,0.18)',
    dot: true,
  },
  'In Progress': {
    bg: '#fff',
    color: 'var(--text-dark)',
    border: '1px solid var(--border)',
  },
  'Under Review': {
    bg: '#fff',
    color: 'var(--text-dark)',
    border: '1px solid var(--border)',
  },
  Completed: {
    bg: 'var(--text-dark)',
    color: '#fff',
    border: '1px solid var(--text-dark)',
    check: true,
  },
  Pending: {
    bg: 'var(--pill-default-bg)',
    color: 'var(--text-mid)',
    border: '1px solid var(--pill-outline)',
  },
  Draft: {
    bg: 'var(--pill-default-bg)',
    color: 'var(--text-mid)',
    border: '1px solid var(--pill-outline)',
  },
  Rejected: {
    bg: 'var(--pill-default-bg)',
    color: 'var(--text-mid)',
    border: '1px solid var(--pill-outline)',
  },
  Paused: {
    bg: 'var(--pill-default-bg)',
    color: 'var(--text-mid)',
    border: '1px solid var(--pill-outline)',
  },
  Cancelled: {
    bg: 'var(--pill-default-bg)',
    color: 'var(--text-mid)',
    border: '1px solid var(--pill-outline)',
  },
};

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  const config = statusConfig[status] ?? statusConfig.Draft;
  const sz = sizeStyles[size];

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-sm)',
        background: config.bg,
        color: config.color,
        border: config.border,
        // Emil: Never animate things users see tens/hundreds of times per day unnecessarily.
        // A subtle transform on chip hover is fine — it's decorative, rare, and snappy.
        transition: 'transform var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Live: pulsing dot signals real-time activity */}
      {config.dot && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'currentColor',
            flexShrink: 0,
          }}
        />
      )}
      {/* Completed: checkmark communicates done-state without relying on color alone */}
      {config.check && (
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ flexShrink: 0 }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {config.label ?? status}
    </span>
  );
};
