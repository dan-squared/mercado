'use client';

import React from 'react';
import {
  LayoutDashboard,
  Megaphone,
  Settings,
  Compass,
  CheckSquare,
  Wallet,
  ShieldCheck,
  Users,
  AlertCircle,
  Cpu,
  Search,
  Sidebar,
  Menu,
  Plus,
  CheckCircle,
  ArrowRight,
  X,
  Eye,
  MousePointer,
  Coins,
  Filter,
  Check,
  Sparkles,
  Lock,
  Upload,
  Link as LinkIcon,
  Building2
} from 'lucide-react';

export type HugeIconName =
  | 'dashboard'
  | 'megaphone'
  | 'settings'
  | 'compass'
  | 'tasks'
  | 'wallet'
  | 'shield'
  | 'users'
  | 'disputes'
  | 'ai'
  | 'search'
  | 'sidebar'
  | 'menu'
  | 'plus'
  | 'check-circle'
  | 'arrow-right'
  | 'close'
  | 'eye'
  | 'click'
  | 'coins'
  | 'filter'
  | 'check'
  | 'sparkles'
  | 'lock'
  | 'upload'
  | 'link'
  | 'building';

interface HugeIconProps {
  name: HugeIconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const HugeIcon: React.FC<HugeIconProps> = ({
  name,
  className = '',
  size = 20,
  strokeWidth = 1.8,
}) => {
  const iconProps = { className, size, strokeWidth };

  switch (name) {
    case 'dashboard':
      return <LayoutDashboard {...iconProps} />;
    case 'megaphone':
      return <Megaphone {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    case 'tasks':
      return <CheckSquare {...iconProps} />;
    case 'wallet':
      return <Wallet {...iconProps} />;
    case 'shield':
      return <ShieldCheck {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'disputes':
      return <AlertCircle {...iconProps} />;
    case 'ai':
      return <Cpu {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'sidebar':
      return <Sidebar {...iconProps} />;
    case 'menu':
      return <Menu {...iconProps} />;
    case 'plus':
      return <Plus {...iconProps} />;
    case 'check-circle':
      return <CheckCircle {...iconProps} />;
    case 'arrow-right':
      return <ArrowRight {...iconProps} />;
    case 'close':
      return <X {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;
    case 'click':
      return <MousePointer {...iconProps} />;
    case 'coins':
      return <Coins {...iconProps} />;
    case 'filter':
      return <Filter {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'lock':
      return <Lock {...iconProps} />;
    case 'upload':
      return <Upload {...iconProps} />;
    case 'link':
      return <LinkIcon {...iconProps} />;
    case 'building':
      return <Building2 {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};
