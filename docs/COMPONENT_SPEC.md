# Mercado — Component Specifications

> Every shared component defined precisely. Agents must build these once and reuse them everywhere they appear.

---

## 1. AppShell / Layout

### Structure
```tsx
<AppShell>
  <Sidebar role="business" | "creator" | "admin" />
  <main>
    <Topbar />
    <PageContent />
  </main>
</AppShell>
```

### Sidebar Props
- `role`: determines which nav items to show
- `collapsed`: boolean state (controlled)
- `onToggle`: callback

### Sidebar Nav Items by Role

**Business:**
- Dashboard (`/business/dashboard`) — grid icon
- Campaigns (`/business/campaigns/new`) — megaphone icon
- Settings — gear icon

**Creator:**
- Marketplace (`/creator/marketplace`) — compass/explore icon
- My Campaigns (`/creator/campaigns`) — list icon
- Wallet (`/creator/wallet`) — wallet icon
- Settings — gear icon

**Admin:**
- Dashboard (`/admin/dashboard`) — chart icon
- Queue (`/admin/queue`) — shield/check icon
- Users (`/admin/users`) — users icon
- Campaigns (`/admin/campaigns`) — megaphone icon
- Disputes (`/admin/disputes`) — flag icon
- AI Agents (`/admin/agents`) — cpu/bot icon

### Sidebar Search
- In collapsed state: search icon in the icon rail
- In expanded state: full `<input type="search" placeholder="Search..." />`
- Clicking icon in collapsed state → expands sidebar and auto-focuses search

### Topbar
- Left: current page title (e.g., "Dashboard", "Marketplace")
- Right: user avatar (circle, 32px, shows initials if no image) + optional role badge
- Height: 60px
- No notification bell, no search

---

## 2. Slide-over Drawer

### Usage
- Business Dashboard → campaign detail
- Admin Queue → submission detail
- Admin Disputes → dispute detail

### Behavior
- Slides in from the right
- Width: 480px (desktop), full-width (mobile)
- Backdrop: dimmed overlay behind drawer
- Close: X button top-right, or click backdrop
- Animation: `translateX(100%) → translateX(0)`, duration `var(--dur-slow)`, easing `var(--ease-out)`
- Scroll: drawer content scrolls independently

### Structure
```tsx
<Drawer isOpen={boolean} onClose={() => void} title="Campaign Title">
  <DrawerContent />
</Drawer>
```

---

## 3. Campaign Status Chip

```tsx
<StatusChip status="Live" | "Draft" | "InProgress" | "UnderReview" | "Completed" | "Rejected" | "Paused" | "Cancelled" />
```

- Renders a small pill with background + text color per status
- Font: 12px, weight 700
- Padding: 4px 10px
- Border-radius: 8px
- No border — background-only

---

## 4. Trust Tier Badge

```tsx
<TrustTierBadge tier="New" | "Verified" | "Trusted" | "Elite" creator={CreatorData} />
```

- Renders a small pill chip with tier color
- **Clickable** — clicking opens a Popover
- Popover content:
  ```
  [Tier Icon] Verified Creator
  ─────────────────────────
  ✓ 12 campaigns completed
  ✓ 0 disputes
  📅 Member since Jan 2025
  ─────────────────────────
  Channels:
  • @mytelegram ✅ Verified
  • @mytiktok ✅ Verified
  ```
- Popover: positioned below badge, `box-shadow: var(--shadow-md)`, border-radius 12px
- Dismisses: click outside, or Escape key

---

## 5. Campaign Card (Marketplace)

```tsx
<CampaignCard campaign={CampaignData} onClaim={fn} onApply={fn} />
```

**Layout:**
```
┌─────────────────────────────┐
│ [Logo] Business Name        │
│ Campaign Title (bold, lg)   │
│ [Telegram] [TikTok]         │
│                             │
│ ETB 2,500        [Fixed]    │
│ Min 10K followers           │
│ Deadline: Aug 15            │
│                             │
│ [⚡ Instant]  [Claim →]     │
└─────────────────────────────┘
```

- Card: `var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`
- Hover: subtle shadow increase + `translateY(-2px)` lift
- Payout amount: large (20px), bold, `var(--blue)` color
- Claim/Apply button: primary blue button

---

## 6. KPI Stat Card

```tsx
<StatCard label="Active Campaigns" value={7} icon={<Activity />} trend="+2 this week" />
```

- Background: `var(--surface)`
- Border: `var(--border)`
- Padding: 20px
- Icon: 20px, muted color
- Value: 28px bold
- Label: 13px muted
- Optional trend: green (positive) / red (negative) with arrow icon

---

## 7. Drag-and-Drop Upload Zone

```tsx
<UploadZone accept="image/*" onFile={fn} preview={boolean} />
```

- Default state: dashed border, "Drop file here or click to browse" text + upload icon
- Drag-over state: border becomes blue (`var(--blue)`), background tints lightly
- File dropped/selected: shows thumbnail preview (for images), filename, remove button
- No actual upload — stores file in component state as `File` object + creates `URL.createObjectURL()` for preview
- Supports click-to-browse via hidden `<input type="file" />`

---

## 8. Pill Segment Toggle

```tsx
<SegmentToggle
  options={["Business", "Creator"]}
  value={selected}
  onChange={fn}
/>
```

- Container: dark pill background (`#1a1a1a` dark / `#f0f0ee` light)
- Active segment: white background (dark) / dark background (light), rounded pill
- Transition: `var(--dur-base)` sliding indicator
- Font: 14px, weight 600

---

## 9. OTP Input

```tsx
<OTPInput length={6} onComplete={fn} />
```

- 6 individual `<input type="text" maxlength="1" />` boxes
- Auto-advances to next box on input
- Supports paste (splits across boxes)
- Backspace goes to previous box
- Box size: 48×56px
- Border: `var(--border)`, focused: `var(--blue)` border + glow ring

---

## 10. Mobile Money Payment Modal

```tsx
<PaymentModal
  isOpen={boolean}
  amount={number}
  provider="telebirr" | "cbebirr"
  phone={string}
  onConfirm={fn}
  onCancel={fn}
/>
```

**States:**
1. **Confirm:** Shows provider logo + amount + "Confirm this payment"
2. **OTP:** Enter 6-digit mobile money PIN (any accepted)
3. **Processing:** Spinner animation, "Processing payment..."
4. **Success:** Check animation, "Payment confirmed! Campaign is now Live."

---

## 11. Empty State

```tsx
<EmptyState
  icon={<Icon />}
  title="No campaigns yet"
  description="Create your first campaign to start reaching creators."
  action={{ label: "New Campaign", href: "/business/campaigns/new" }}
/>
```

- Centered, vertically centered in the content area
- Icon: 48px, muted
- Title: 18px bold
- Description: 14px muted
- Action: primary blue button

---

## 12. Wizard Progress Bar

```tsx
<WizardProgress steps={["Basics", "Requirements", "Budget", "Review"]} currentStep={0} />
```

- Horizontal step indicator at top of wizard
- Steps: numbered circles connected by lines
- Completed steps: blue filled circle
- Current step: blue border, white fill
- Future steps: gray border, gray text
- Step label below each circle

---

## Mock Data Shape

```typescript
interface Campaign {
  id: string;
  title: string;
  businessName: string;
  businessLogo?: string;
  type: 'fixed' | 'cpm';
  platforms: ('telegram' | 'tiktok' | 'youtube' | 'blog' | 'website')[];
  claimMode: 'instant' | 'application';
  status: 'draft' | 'live' | 'in_progress' | 'under_review' | 'completed' | 'rejected' | 'paused' | 'cancelled';
  rate: number; // ETB
  budget: number; // ETB total
  spent: number; // ETB spent
  minFollowers: number;
  requirements: string;
  deadline: Date;
  applicants: Creator[];
  submissions: Submission[];
}

interface Creator {
  id: string;
  name: string;
  avatar?: string;
  tier: 'new' | 'verified' | 'trusted' | 'elite';
  channels: Channel[];
  campaignsCompleted: number;
  disputes: number;
  joinedAt: Date;
}

interface Channel {
  platform: 'telegram' | 'tiktok' | 'youtube' | 'blog';
  handle: string;
  followers: number;
  verified: boolean;
}

interface Submission {
  id: string;
  creatorId: string;
  proofUrl: string;
  screenshotPreview?: string;
  notes?: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  flagReason?: string;
}
```
