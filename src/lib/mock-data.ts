export type Role = 'business' | 'creator' | 'admin';

export type Platform = 'telegram' | 'tiktok' | 'youtube' | 'blog' | 'website';

export type CampaignType = 'fixed' | 'cpm';

export type ClaimMode = 'instant' | 'application';

export type CampaignStatus = 
  | 'Draft' 
  | 'Live' 
  | 'In Progress' 
  | 'Under Review' 
  | 'Completed' 
  | 'Rejected' 
  | 'Paused' 
  | 'Cancelled';

export type TrustTier = 'New' | 'Verified' | 'Trusted' | 'Elite';

export interface CreatorChannel {
  platform: Platform;
  handle: string;
  followers: number;
  verified: boolean;
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tier: TrustTier;
  phone: string;
  channels: CreatorChannel[];
  campaignsCompleted: number;
  disputeRate: string;
  joinedDate: string;
  status: 'verified' | 'pending' | 'suspended';
}

export interface SubmissionProof {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTier: TrustTier;
  campaignId: string;
  campaignTitle: string;
  platform: Platform;
  proofUrl: string;
  screenshotUrl?: string;
  notes?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  flagReason?: string;
}

export interface Campaign {
  id: string;
  title: string;
  businessName: string;
  businessLogo: string;
  type: CampaignType;
  platforms: Platform[];
  claimMode: ClaimMode;
  status: CampaignStatus;
  rate: number; // ETB
  totalBudget: number; // ETB
  spent: number; // ETB
  minFollowers: number;
  requirements: string;
  deadline: string;
  createdAt: string;
  estimatedReach: number;
  applicantsCount: number;
  submissionsCount: number;
}

// Initial Mock Datasets
export const INITIAL_CREATORS: CreatorProfile[] = [
  {
    id: 'c1',
    name: 'Selamawit Tech',
    handle: '@selam_tech_et',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tier: 'Elite',
    phone: '+251 91 123 4567',
    channels: [
      { platform: 'telegram', handle: 't.me/selam_tech', followers: 45000, verified: true },
      { platform: 'youtube', handle: 'youtube.com/@selamtech', followers: 28000, verified: true }
    ],
    campaignsCompleted: 34,
    disputeRate: '0%',
    joinedDate: 'Jan 2024',
    status: 'verified'
  },
  {
    id: 'c2',
    name: 'Abebe Creator',
    handle: '@abebe_vlogs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tier: 'Trusted',
    phone: '+251 92 888 1234',
    channels: [
      { platform: 'tiktok', handle: '@abebe_vlogs', followers: 120000, verified: true }
    ],
    campaignsCompleted: 19,
    disputeRate: '0%',
    joinedDate: 'Mar 2024',
    status: 'verified'
  },
  {
    id: 'c3',
    name: 'Ethio Foodies',
    handle: '@ethio_tasty',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    tier: 'Verified',
    phone: '+251 93 456 7890',
    channels: [
      { platform: 'telegram', handle: 't.me/ethiotasty', followers: 18500, verified: true },
      { platform: 'blog', handle: 'ethiotasty.com', followers: 8000, verified: true }
    ],
    campaignsCompleted: 8,
    disputeRate: '0%',
    joinedDate: 'Nov 2024',
    status: 'verified'
  },
  {
    id: 'c4',
    name: 'Yonas Gaming',
    handle: '@yonas_play',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tier: 'New',
    phone: '+251 94 999 0000',
    channels: [
      { platform: 'youtube', handle: 'youtube.com/@yonasplay', followers: 5200, verified: false }
    ],
    campaignsCompleted: 1,
    disputeRate: '0%',
    joinedDate: 'May 2026',
    status: 'pending'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Sheba Foods Launch Promotion',
    businessName: 'Sheba Agro Processing',
    businessLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    type: 'fixed',
    platforms: ['telegram', 'tiktok'],
    claimMode: 'instant',
    status: 'Live',
    rate: 3500,
    totalBudget: 35000,
    spent: 14000,
    minFollowers: 10000,
    requirements: 'Post a 30-second review reel of Sheba Crunchy Snacks with product placement and link to online store.',
    deadline: '2026-08-15',
    createdAt: '2026-07-20',
    estimatedReach: 85000,
    applicantsCount: 6,
    submissionsCount: 4
  },
  {
    id: 'camp-2',
    title: 'Kifiya Digital Wallet App Drive',
    businessName: 'Kifiya Financial Services',
    businessLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80',
    type: 'cpm',
    platforms: ['telegram', 'youtube'],
    claimMode: 'application',
    status: 'In Progress',
    rate: 1500, // per 1k views
    totalBudget: 45000,
    spent: 22500,
    minFollowers: 15000,
    requirements: 'Promote Kifiya App referral code in video description or Telegram channel pinned post for at least 72 hours.',
    deadline: '2026-08-20',
    createdAt: '2026-07-18',
    estimatedReach: 150000,
    applicantsCount: 12,
    submissionsCount: 8
  },
  {
    id: 'camp-3',
    title: 'Habesha Brews Summer Fest',
    businessName: 'Habesha Breweries',
    businessLogo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=100&auto=format&fit=crop&q=80',
    type: 'fixed',
    platforms: ['tiktok', 'youtube'],
    claimMode: 'application',
    status: 'Live',
    rate: 5000,
    totalBudget: 60000,
    spent: 15000,
    minFollowers: 25000,
    requirements: 'Create event teaser content highlighting ticket discount links in bio. Minimum 48hr post retention.',
    deadline: '2026-08-30',
    createdAt: '2026-07-22',
    estimatedReach: 200000,
    applicantsCount: 9,
    submissionsCount: 3
  },
  {
    id: 'camp-4',
    title: 'Addis Courier Speed Campaign',
    businessName: 'Addis Express Logistics',
    businessLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80',
    type: 'fixed',
    platforms: ['telegram', 'blog'],
    claimMode: 'instant',
    status: 'Under Review',
    rate: 2800,
    totalBudget: 28000,
    spent: 25200,
    minFollowers: 5000,
    requirements: 'Share express delivery pricing chart on your tech or business blog/channel.',
    deadline: '2026-08-10',
    createdAt: '2026-07-15',
    estimatedReach: 60000,
    applicantsCount: 10,
    submissionsCount: 9
  }
];

export const INITIAL_SUBMISSIONS: SubmissionProof[] = [
  {
    id: 'sub-1',
    creatorId: 'c1',
    creatorName: 'Selamawit Tech',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    creatorTier: 'Elite',
    campaignId: 'camp-1',
    campaignTitle: 'Sheba Foods Launch Promotion',
    platform: 'telegram',
    proofUrl: 'https://t.me/selam_tech/892',
    screenshotUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    notes: 'Published pinned post to 45k subscribers. Reached 18.4k views in first 24 hours.',
    submittedAt: '2026-07-23 14:20',
    status: 'pending'
  },
  {
    id: 'sub-2',
    creatorId: 'c2',
    creatorName: 'Abebe Creator',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    creatorTier: 'Trusted',
    campaignId: 'camp-2',
    campaignTitle: 'Kifiya Digital Wallet App Drive',
    platform: 'tiktok',
    proofUrl: 'https://tiktok.com/@abebe_vlogs/video/739281923',
    screenshotUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80',
    notes: 'Reel went viral — 94,000 views recorded with high engagement.',
    submittedAt: '2026-07-22 18:45',
    status: 'pending',
    flagReason: 'View count 4.2x higher than historical average — flagged for spot check'
  },
  {
    id: 'sub-3',
    creatorId: 'c3',
    creatorName: 'Ethio Foodies',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    creatorTier: 'Verified',
    campaignId: 'camp-4',
    campaignTitle: 'Addis Courier Speed Campaign',
    platform: 'blog',
    proofUrl: 'https://ethiotasty.com/reviews/addis-courier',
    screenshotUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
    notes: 'Full article feature with embedded delivery booking widget.',
    submittedAt: '2026-07-21 09:15',
    status: 'approved'
  }
];
