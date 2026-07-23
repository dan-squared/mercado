# Mercado — User Flows

> Step-by-step flows for every user journey. Agents building screens must follow these exactly.

---

## 1. Business Flow

### 1.1 Sign Up
```
/auth
  User sees: role toggle [Business] [Creator], phone input
  Selects: "Business"
  Enters: Ethiopian phone number (+251...)
  Clicks: "Continue"
  → /auth/verify

/auth/verify
  User sees: 6-digit OTP boxes, 60s resend timer
  Enters: any 6 digits (mocked — all accepted)
  Clicks: "Verify"
  → /onboarding/business

/onboarding/business
  User sees: "Set up your business profile" heading
  Fills: Company name (required), Industry (dropdown), Logo (optional upload)
  Clicks: "Complete Setup" OR "Skip for now"
  → /business/dashboard
```

### 1.2 Create Campaign
```
/business/dashboard
  Clicks: "New Campaign" button
  → /business/campaigns/new

/business/campaigns/new — Step 1 (Campaign Basics)
  Fills: Title, Description, Campaign Type, Platform(s), Claim Mode
  Clicks: "Next →"

Step 2 (Requirements)
  Fills: Min followers, Content requirements, Location (opt), Deadline
  Clicks: "Next →"

Step 3 (Budget & Escrow)
  Fills: Rate (ETB), Total Budget (ETB)
  Sees: Live estimated reach updates as they type
  Selects: Telebirr (default) or CBE Birr
  Enters: Mobile money phone number
  Clicks: "Confirm & Proceed"
  → Payment modal appears:
    Shows: "Confirm ETB X,XXX deposit via Telebirr to +251..."
    User enters: fake OTP (any 6 digits)
    Clicks: "Confirm"
    Sees: Success animation
  → Step 4

Step 4 (Review)
  Sees: Full summary of campaign
  Clicks: "Fund & Launch"
  → Campaign created with status "Live"
  → Redirected to /business/dashboard
```

### 1.3 Review Applicants & Submissions
```
/business/dashboard
  Sees: Campaign list table with status chips
  Clicks: A campaign row
  → Slide-over drawer opens from right

Drawer — Applicants tab:
  Sees: List of creators who applied/claimed
  Each row: Avatar, Name, Trust tier badge (clickable), Channel stats, [Approve] [Reject]
  Clicks: Trust tier badge → popover with trust stats
  Clicks: "Approve" → creator status → "In Progress", button changes to "Approved ✓"
  Clicks: "Reject" → creator removed from list

Drawer — Submissions tab:
  Sees: Proof submissions from creators
  Each: Proof URL link, screenshot thumbnail, notes, [Approve ✓] [Reject ✗]
  Clicks: "Approve ✓" → payment released to creator pending balance, status → "Completed"
  Clicks: "Reject ✗" → status → "Rejected", creator notified
```

---

## 2. Creator Flow

### 2.1 Sign Up + Verification
```
/auth
  User sees: role toggle [Business] [Creator]
  Selects: "Creator"
  Enters: phone number
  Clicks: "Continue"
  → /auth/verify

/auth/verify
  OTP verification (any 6 digits)
  → /onboarding/creator

/onboarding/creator (Connect Channels)
  Sees: "Verify your channels to start earning"
  Adds channels: selects platform → enters handle/URL → clicks "Add"
  Each added channel shows as a row: platform icon | handle | ⏳ Pending
  Must add at least 1 channel
  Clicks: "Submit for Verification"
  → /onboarding/creator/pending

/onboarding/creator/pending
  Sees: "We're reviewing your channels — usually takes 24 hours"
  Sees: List of submitted channels with status badges
  Dashboard is LOCKED — cannot navigate to marketplace
  [Simulated: clicking "Continue to Dashboard" demo button unlocks — for hackathon demo purposes]
  → /creator/marketplace (after "verification")
```

### 2.2 Browse & Claim Campaigns
```
/creator/marketplace
  Sees: Campaign cards grid
  Filters: Platform pills (All | Telegram | TikTok | YouTube | Blog | Website)
  
  For Instant campaigns:
    Clicks: "Claim" button
    → Campaign immediately appears in /creator/campaigns with status "In Progress"
    → Button changes to "Claimed ✓"

  For Application-required campaigns:
    Clicks: "Apply" button
    → Modal: short pitch textarea + "Submit Application"
    → Campaign appears in /creator/campaigns with status "Application Sent"
    → Business reviews in their drawer → Approves → status → "In Progress"
```

### 2.3 Submit Proof
```
/creator/campaigns
  Sees: Campaign cards with status tabs
  Finds: "In Progress" campaign
  Clicks: "Submit Proof" button
  → Proof submission area appears:

  Sees:
    - URL input field (required)
    - Drag-and-drop upload zone: "Drop screenshot here or click to browse"
    - On file drop: thumbnail preview shown inline
    - Optional notes textarea
  
  Clicks: "Submit Proof"
  → Campaign status → "Under Review"
  → Proof submission area closes
```

### 2.4 Check Wallet
```
/creator/wallet
  Sees:
    Hero card: "Pending Balance: ETB 3,200" + "Next payout: Friday, July 26"
    Payout method: "+251 ••• ••• 1234" + [Edit] button (non-functional)
    
    Earnings table:
      "TikTok Campaign - Sheba Foods" | ETB 2,000 | ✓ Verified
      "Telegram Post - Kifiya Tech" | ETB 1,200 | ⏳ Under Review
    
    Payout History table:
      Jun 28 | "YouTube Series - Ethio Telecom" | ETB 4,500 | Paid
      Jun 21 | "Blog Post - Mama's Kitchen" | ETB 800 | Paid
```

---

## 3. Admin Flow

### 3.1 Admin Login
```
/admin
  Separate login: email + password (mocked, any credentials accepted)
  Clicks: "Sign In"
  → /admin/dashboard
```

### 3.2 Review Verification Queue
```
/admin/queue
  Sees: Table of flagged submissions
  Each row: Creator | Campaign | Platform | Flag reason | Proof link | Date
  Clicks: Row → slide-over drawer with full details
  Drawer shows: Screenshot, proof URL, creator channel stats, flag reason detail
  Clicks: "Approve ✓" → payment released, status → Completed, removed from queue
  Clicks: "Reject ✗" → status → Rejected, added to dispute log
```

### 3.3 Manage Users
```
/admin/users
  Sees: Searchable, filterable user table
  Filters: All | Business | Creator | Flagged
  For creators: Trust tier badge visible (clickable → popover)
  Actions per row: View profile, Suspend, Approve verification
```

---

## 4. State Diagram — Campaign Lifecycle

```
[Created by Business]
         ↓
      [Draft]
         ↓ (Business funds escrow)
       [Live] ← ← ← ← ← ← ← ← ← ← ←
         ↓                             ↑
  Creator claims/applies               |
         ↓                             |
  [In Progress]                        |
         ↓ (Creator submits proof)     |
  [Under Review]                       |
         ↓                    ↓        |
      [Completed]         [Rejected] ──┘
```

---

## 5. Empty States

Every list/table page must have a thoughtful empty state:

| Page | Empty state message | CTA |
|------|-------------------|-----|
| Business Dashboard | "No campaigns yet. Create your first one." | "New Campaign →" |
| Creator Marketplace | "No campaigns match your filters." | "Clear filters" |
| Creator My Campaigns | "You haven't claimed any campaigns yet." | "Browse Marketplace →" |
| Creator Wallet | "No earnings yet. Start by claiming a campaign." | "Browse →" |
| Admin Queue | "No flagged submissions. All clear! ✓" | — |
| Admin Disputes | "No open disputes." | — |
