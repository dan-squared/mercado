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
        return 'bg-[#dde6fb] text-[#3d63d1] dark:bg-[#1e293b] dark:text-[#60a5fa]';
      case 'In Progress':
        return 'bg-[#f1e3fb] text-[#9146c8] dark:bg-[#2e1065] dark:text-[#c084fc]';
      case 'Under Review':
        return 'bg-[#fef3c7] text-[#b45309] dark:bg-[#451a03] dark:text-[#fbbf24]';
      case 'Completed':
        return 'bg-[#dcf5e0] text-[#2f9e4a] dark:bg-[#064e3b] dark:text-[#34d399]';
      case 'Rejected':
        return 'bg-[#fee2e2] text-[#dc2626] dark:bg-[#450a0a] dark:text-[#f87171]';
      case 'Paused':
        return 'bg-[#ffedd5] text-[#c2410c] dark:bg-[#431407] dark:text-[#fb923c]';
      case 'Draft':
      case 'Cancelled':
      default:
        return 'bg-[#f3f3f2] text-[#71717a] dark:bg-[#27272a] dark:text-[#a1a1aa]';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-tight transition-transform duration-150 hover:scale-105 ${getStyle()} ${className}`}
    >
      {status}
    </span>
  );
};
