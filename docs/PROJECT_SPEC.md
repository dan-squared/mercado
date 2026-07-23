# Mercado — Master Project Specification

> **For AI agents:** This is the authoritative source of truth for everything Mercado. Read this before writing a single line of code. Do NOT guess — everything is defined here.

---

## 1. What Is Mercado

Mercado is a **frontend-only** (no backend) marketplace that connects **businesses** with **creators** through verified performance campaigns. It is built for the Ethiopian market (currency: ETB). All data is mocked — there is no real API. Every interaction is simulated UI.

---

## 2. Tech Stack

| Concern | Decision |
|---------|----------|
| Framework | Next.js (latest, App Router) |
| Styling | Tailwind CSS (latest) |
| Font | Inter — sourced from GitHub (rsms/inter), NOT Google Fonts |
| Font anti-aliasing | `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` |
| Color mode | System-aware (`prefers-color-scheme`) — light + dark both supported |
| Currency | ETB (Ethiopian Birr) |
| Backend | None — all data is mocked in-memory or as static fixtures |

---

## 3. Color System

### Base Colors
| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| Background | `#111111` | `#FCFCFC` |
| Surface (cards) | `#1a1a1a` | `#ffffff` |
| Border | `#2a2a2a` | `#ececec` |
| Text primary | `#FCFCFC` | `#16181d` |
| Text secondary | `#a0a0a0` | `#4b4f57` |
| Text muted | `#666666` | `#9a9ea6` |

### Accent Palette (from Mondays HTML reference — used in both modes)
| Name | Value | Usage |
|------|-------|-------|
| Blue | `#2f5fe0` | Primary CTA, active nav, Live status |
| Blue dark | `#2650c4` | Hover state on blue |
| Pink | `#eaa6f0` | Highlights, active calendar |
| Green | `#a3f2b0` | Success, verified, completed |
| Pill green bg | `#dcf5e0` | Completed status chip background |
| Pill green text | `#2f9e4a` | Completed status chip text |
| Pill purple bg | `#f1e3fb` | In Progress chip background |
| Pill purple text | `#9146c8` | In Progress chip text |
| Pill blue bg | `#dde6fb` | Live chip background |
| Pill blue text | `#3d63d1` | Live chip text |
| Amber | `#f59e0b` | Under Review chip |
| Red | `#ef4444` | Rejected / error |
| Orange | `#f97316` | Paused status |

### Trust Tier Colors
| Tier | Color |
|------|-------|
| New | Gray (`#9a9ea6`) |
| Verified | Blue (`#2f5fe0`) |
| Trusted | Green (`#2f9e4a`) |
| Elite | Gold/Amber (`#f59e0b`) |

### Motion Tokens (from Mondays HTML)
```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease: cubic-bezier(0.4, 0, 0.2, 1);
--dur-fast: 120ms;
--dur-base: 180ms;
--dur-slow: 260ms;
```

### Shadow Tokens
```css
--shadow-xs: 0 1px 1px rgba(16,17,20,0.02), 0 1px 2px rgba(16,17,20,0.03);
--shadow-sm: 0 2px 4px rgba(16,17,20,0.03), 0 8px 20px -6px rgba(16,17,20,0.06);
--shadow-md: 0 10px 30px -10px rgba(16,17,20,0.14);
```

---

## 4. Typography

- **Font family:** Inter (self-hosted from GitHub rsms/inter, variable font)
- **Anti-aliasing:** Always enabled globally
- **Scale:** Use Tailwind's default type scale
- **Heading weight:** 700
- **Body weight:** 400–500
- **Letter-spacing tight on headings:** `-0.025em`

---

## 5. Layout Architecture

### App Shell (authenticated pages)
```
┌─────────────────────────────────────────────────────┐
│  Sidebar (collapsible)  │  Main Content Area         │
│  [48px collapsed]       │  [flex-1]                  │
│  [240px expanded]       │  Topbar + Page content     │
└─────────────────────────────────────────────────────┘
```

### Sidebar Behavior
- **Collapsed:** ~48px wide icon-only rail
- **Expanded:** ~240px wide with icon + text labels
- **Toggle:** Button at top-left of sidebar. On hover → shows "Open sidebar" tooltip
- **Transition:** Smooth CSS transition (`width`, `opacity` of labels)
- **Mobile:** Sidebar hidden by default. Hamburger button in topbar → slides in as overlay

### Topbar (minimal)
- Left: Page title / breadcrumb
- Right: User avatar (shows initials or profile image) + role badge
- NO search bar (search is in sidebar)
- NO notification bell

### Sidebar Search
- Collapsed: magnifying glass icon in the icon rail
- Expanded: full text search input field
- Clicking search icon in collapsed state → expands sidebar and focuses search

---

## 6. User Roles & Auth Flow

### Role Selection
On the `/auth` page, a pill/segmented toggle at the top lets users choose:
`[ Business ]  [ Creator ]`
The selected role determines the form fields and post-signup flow.

### Business Auth Flow
```
/auth (signup/login)
  → Phone number input
  → /auth/verify (OTP input)
  → /onboarding/business (company name, industry, logo — skippable)
  → /business/dashboard
```

### Creator Auth Flow
```
/auth (signup/login)
  → Phone number input
  → /auth/verify (OTP input)
  → /onboarding/creator (connect social channels)
  → /onboarding/creator/pending (verification pending screen — locked)
  → [Admin approves] → /creator/marketplace
```

---

## 7. Pages — Complete Specification

### `/auth` — Sign Up / Login
- Phone number input with country code (+251 Ethiopia pre-selected)
- Role toggle at top: `[ Business ] [ Creator ]`
- "Continue" button → goes to OTP
- Below toggle: role-specific subtext (e.g. "Reach local audiences" for Business, "Earn from your content" for Creator)

### `/auth/verify` — OTP Verification
- 6-digit OTP input (individual boxes)
- Resend OTP countdown timer
- "Verify" button

### `/onboarding/business` — Business Profile Setup
- Company name (required)
- Industry (dropdown: Retail, Food & Beverage, Tech, Fashion, Healthcare, Education, Other)
- Logo upload (optional, drag-and-drop or click)
- "Complete Setup" button + "Skip for now" link

### `/onboarding/creator` — Connect Channels
- Instructional header: "Verify your channels to start earning"
- Add channel form: platform selector (Telegram / TikTok / YouTube / Blog/Website) + handle/URL input
- Can add multiple channels
- Each added channel shows as a row with: platform icon, handle, status badge (`⏳ Pending`)
- "Submit for Verification" button

### `/onboarding/creator/pending` — Verification Pending
- Illustration + message: "Your channels are being reviewed"
- Estimated time display
- List of submitted channels with their status badges
- Dashboard is locked (cannot navigate away to creator pages)

### `/business/dashboard` — Business Home
**Topbar:** "Dashboard" title + user avatar

**KPI Row 1 (Activity):** 4 cards
- Active Campaigns (count)
- Total Spent (ETB amount)
- Pending Submissions (count — needs review)
- Verified Completions (count)

**KPI Row 2 (Performance):** 4 cards
- Total Reach Achieved (impressions)
- Clicks Tracked
- Conversions
- Submissions Received

**Campaign List Table:**
Columns: Campaign Name | Platform | Type | Status chip | Budget | Spent | Deadline | Actions
- Clicking a row → slide-over drawer from right
- "New Campaign" button → navigates to `/business/campaigns/new`

**Campaign Drawer (slide-over):**
- Campaign title + status chip
- Description + requirements
- Tabs: "Applicants" | "Submissions"
- **Applicants tab:** list of creator applicants with avatar, name, trust tier badge (clickable → popover), channel stats, Approve / Reject buttons
- **Submissions tab:** proof link, screenshot thumbnail, submission notes, Approve ✓ / Reject ✗ buttons
- Drawer closes on backdrop click or X button

### `/business/campaigns/new` — Create Campaign Wizard
**4-step wizard with progress bar**

**Step 1 — Campaign Basics:**
- Title
- Description / brief
- Campaign type: `Fixed-fee Post` | `CPM (per 1,000 views)`
- Platform: Telegram | TikTok | YouTube | Blog | Website (multi-select)
- Claim mode toggle: `⚡ Instant Claim` | `📋 Application Required`

**Step 2 — Requirements & Targeting:**
- Minimum follower/subscriber count (number input)
- Content requirements (textarea)
- Audience location (optional)
- Campaign deadline (date picker)

**Step 3 — Budget & Escrow:**
- Rate (ETB per post / ETB per 1,000 views)
- Total budget (ETB)
- Live estimated-reach indicator: updates as user types (formula: budget ÷ rate × avg_views_per_post)
- Max number of creators (auto-calculated or manual)
- Payment method selector: Telebirr (primary, pre-selected) | CBE Birr
- Phone number input for mobile money
- "Confirm & Proceed" → simulated payment modal

**Simulated Payment Modal:**
- Shows: "Confirm ETB X,XXX deposit via Telebirr"
- Fake OTP field + "Confirm" button
- On confirm → success animation → campaign status = "Live"

**Step 4 — Review & Publish:**
- Full summary of all entered data
- "Fund & Launch Campaign" CTA (triggers payment modal)
- "Back" to edit

### `/creator/marketplace` — Campaign Feed
**LOCKED until creator is verified.**

- Horizontal filter pills at top: All | Telegram | TikTok | YouTube | Blog | Website
- Rate range filter
- Campaign cards grid (2–3 columns desktop, 1 column mobile)

**Campaign Card:**
- Business name + logo
- Campaign title
- Platform icon(s)
- Payout amount (prominent, large)
- Campaign type badge: `Fixed` | `CPM`
- Claim mode badge: `⚡ Instant` | `📋 Apply`
- Requirements summary (followers, deadline)
- "Claim" / "Apply" button

**On Claim (Instant):** Status immediately → "In Progress", appears in Creator's campaigns
**On Apply:** Short pitch modal → submitted → status "Application Sent"

### `/creator/campaigns` — My Campaigns
- Tabs: All | In Progress | Under Review | Completed
- Campaign cards showing: title, payout, deadline, status chip, progress indicator
- "Submit Proof" button on In Progress cards

**Submit Proof Panel (expands inline or as modal):**
- URL input field
- Drag-and-drop upload area (accepts images, shows thumbnail preview on drop)
- Click-to-browse also supported
- Optional notes textarea
- "Submit" button → status → "Under Review"

### `/creator/wallet` — Earnings & Payouts
**Hero Balance Card:**
- Pending balance (ETB, large display)
- Next payout date countdown
- Payout method: masked phone `+251 ••• ••• 1234` + "Edit" button (non-functional)

**Earnings Breakdown:**
- Per-campaign line items: campaign name, amount, status chip

**Payout History Table:**
Columns: Date | Campaign | Amount (ETB) | Status (Paid / Pending / Held)

### `/admin` — Admin Login
- Separate minimal login page (email + password, no phone OTP)
- "Mercado Admin" branding
- Same design language but distinct from creator/business auth

### `/admin/dashboard` — Platform Overview
**KPI Cards:**
- Total Users (breakdown: businesses vs creators)
- New Signups (this week)
- Active Campaigns
- Escrow Held (ETB total)
- Revenue Collected (ETB commissions)
- Flagged Submissions (needing review)
- Verified Completions (platform-wide)
- Disputes Open

**Charts/Graphs:** Signup trend, revenue trend, campaign volume (mocked data)

### `/admin/queue` — Verification Queue
- Table: Creator name | Trust tier | Campaign | Platform | Flag reason | Proof link | Date | Actions
- Flag reasons: "View count 4× above average", "New account", "Shared IP detected", etc.
- Approve ✓ / Reject ✗ buttons per row
- Clicking row → slide-over drawer with full submission details

### `/admin/users` — All Users
- Search bar
- Filter: All | Business | Creator | Flagged
- Table: Name | Role | Trust Tier | Joined | Campaigns | Status | Actions
- Trust tier badge clickable → popover with stats

### `/admin/campaigns` — All Campaigns
- Table: Title | Business | Platform | Type | Status | Budget | Spent | Created | Actions

### `/admin/disputes` — Disputes
- Table: Reporter | Against | Campaign | Reason | Date | Status | Actions
- Dispute detail → slide-over drawer

### `/admin/agents` — AI Agent Hub
- Clean UI with agent task log (mocked)
- Action trigger buttons: "Run fraud scan", "Batch-approve low-risk queue", "Generate weekly report"
- Last agent action timestamp + status
- JSON log viewer (mocked output)
- Designed for future AI agent integration

---

## 8. Campaign Status Reference

| Status | Chip Color | Meaning |
|--------|-----------|---------|
| Draft | Gray | Created, not funded |
| Live | Blue | Funded, accepting claims |
| In Progress | Purple | Creator working |
| Under Review | Amber | Submission received |
| Completed | Green | Verified, done |
| Rejected | Red | Submission rejected |
| Paused | Orange | Business paused |
| Cancelled | Gray/Red | Business cancelled |

---

## 9. Shared Components

- **Slide-over Drawer:** Used on Business Dashboard (campaign detail), Admin Queue, Admin Disputes
- **Trust Tier Badge:** Clickable → popover showing: tier, campaigns completed, dispute rate, member since, channel verification status
- **Campaign Status Chip:** Color-coded per status table above
- **Platform Icon:** Telegram, TikTok, YouTube, Blog, Website — consistent icon set
- **Drag-and-drop Upload:** Used on proof submission, logo upload, business profile
- **Simulated Payment Modal:** Used in campaign wizard Step 3
- **OTP Input:** 6 individual digit boxes
- **Pill Segment Toggle:** Used on auth page for role selection
- **Collapsible Sidebar:** Icon-only ↔ icon+label, search inside, role-based nav items

---

## 10. Mobile Behavior

- Not mobile-first but must be responsive
- Sidebar: hidden by default on mobile, hamburger toggle → overlay mode
- Tables: horizontal scroll on small screens
- Wizard: single column layout
- Cards: 1 column on mobile, 2–3 on desktop

---

## 11. Mocked Data Requirements

Every page needs realistic mocked data. Use:
- Ethiopian business names, creator names
- ETB amounts (realistic: campaigns 5,000–50,000 ETB)
- Realistic follower counts (Telegram: 2K–50K, TikTok: 10K–500K)
- Dates relative to "today" (use `new Date()` dynamically)
- 3–5 mock campaigns, 4–6 mock creators, 2–3 mock businesses

---

## 12. What NOT to Build

- No backend, no API calls (except potential Inter font fetch)
- No real file uploads (browser memory preview only)
- No real payments (simulated only)
- No real OTP (any 6 digits accepted)
- No real search (filter from mocked array)
- No landing/marketing page (out of scope for now)
