# Mercado — Project Conversation Log

> Every agent interaction, thinking, question, and decision recorded here for full transparency and future agent reference.

---

## Session 1 — 2026-07-23

### Initial Context Provided by User

**Skills Installed:**
- `mattpocock/skills` → grill-me, grilling, handoff, codebase-design, implement, to-spec, to-tickets, prototype, wayfinder, research, triage, code-review, domain-modeling, etc.
- `emilkowalski/skills` → animation-vocabulary, apple-design, emil-design-eng, find-animation-opportunities, improve-animations, pick-ui-library, review-animations

**Project Name:** Mercado

**Tech Stack Decided:**
- Next.js (latest) + Tailwind CSS (latest)
- Frontend-only (no backend) — all data is mocked/static
- Inter font from GitHub (not Google Fonts)
- Font anti-aliasing enabled
- Black: `#111111`, White: `#FCFCFC`

**HTML Theme Reference:** `/Users/dan_cubed/Downloads/Hackaton/Mondays Dashboard - Scaling Pixel Art.html`

### Product Brief (from user)

**Problem:** Small businesses want local advertising but existing options (Facebook ads) are expensive, complicated, and target poorly. Publishers (blogs, Telegram channels, social pages) can't earn reliably — stuck with low-paying opaque foreign ad networks.

**Solution — Mercado:** A marketplace connecting businesses with creators through verified performance campaigns. Escrow-based, fraud-resistant, trust-tier system.

**Key Differentiators:**
- Escrow-based marketplace (not passive ad-serving)
- Built-in verification layer (automated + manual review)
- Multi-format: website, Telegram, TikTok/YouTube, blog
- Weekly payouts via local mobile money
- Lightweight, low-bandwidth-friendly

**Campaign Types (launch scope):**
- Fixed-fee post/placement (primary)
- CPM (cost per 1,000 views)
- CPC (later phase)

**Trust Tiers:** New → Verified → Trusted → Elite

**Payment Flow:** Business deposits to escrow → Creator submits proof → Platform verifies → Funds move to pending → Weekly payout batch

**Revenue Streams:** Commission (15–20%), Featured listings, Tiered commission

### Pages Specified by User

1. **Sign up / Login** — Phone OTP verification
2. **Business — Create Campaign** — Offer type, rate, budget, requirements, live estimated-reach indicator
3. **Business — Fund Escrow** — Deposit amount, mobile money trigger, confirmation
4. **Business — Campaign Dashboard** — Campaign list, spend vs remaining, approve/reject applicants
5. **Creator — Marketplace** — Feed of open campaigns, filterable
6. **Creator — My Campaigns** — Claimed campaigns by status, proof submission
7. **Creator — Wallet** — Pending balance, next payout, payout history
8. **Admin — Verification Queue** — Flagged submissions for manual review

---

### Q2 — Sidebar Navigation Pattern

**Question:** Is the navigation sidebar always visible once logged in, or are there pages with a different layout?

**Agent recommendation:** Sidebar always visible with role-based nav items.

**User answer (with screenshots):** Collapsible sidebar — exact ChatGPT pattern:
- **Collapsed state:** ~48px icon-only rail. Toggle button at top-left. On hover over the toggle icon → shows "Open sidebar" tooltip/indicator.
- **Expanded state:** ~240px full sidebar with icon + text label per nav item.
- **Transition:** Smooth slide animation between collapsed/expanded.
- **Mobile:** Software is NOT mobile-first but should be responsive. On mobile, sidebar collapses by default (hamburger toggle).

**Decision recorded:**
- Sidebar is always present on authenticated pages
- It is collapsible (icon-only ↔ icon+label)
- Hover on collapse toggle shows "Open sidebar" label
- Mobile: sidebar hidden by default, overlay mode on toggle

---

### Q3 — Color Theme

**Question:** What is the color theme for Mercado — dark, light, or both?

**User answer:** System-aware — supports both light and dark mode (`prefers-color-scheme`). Use Mondays HTML file accent colors for graphs, status pills, and accent elements.

**Decision recorded:**
- `#111111` = dark mode background / near-black surface
- `#FCFCFC` = light mode background / near-white surface
- `#111111` / `#FCFCFC` swap roles depending on mode
- Accent palette pulled from Mondays HTML:
  - Blue: `#2f5fe0` (primary CTA)
  - Pink: `#eaa6f0` (highlights / active states)
  - Green: `#a3f2b0` (success / verified)
  - Pill greens, purples, blues for status chips
  - Motion tokens: `--ease-out`, `--ease-in-out`, `--ease`, `--dur-fast (120ms)`, `--dur-base (180ms)`, `--dur-slow (260ms)`
  - Shadow system: `--shadow-xs`, `--shadow-sm`, `--shadow-md`

---

### Q4 — Campaign Detail Navigation Pattern

**Question:** When a business clicks a campaign to review submissions, does it open in a slide-over panel, separate page, or modal?

**User answer:** Slide-over / drawer panel — stays on dashboard, slides in from the right.

**Decision recorded:**
- Campaign list lives on the Business Dashboard page
- Clicking a campaign row → right-side drawer slides in
- Drawer shows: campaign details, list of creator applicants with trust tier + stats, submission proof (link/screenshot), and Approve / Reject buttons
- Dashboard stays visible behind the drawer (dimmed overlay)

---

### Q5 — Creator Claim Flow

**Question:** How does a creator claim a campaign — instant or application?

**User answer:** It depends on the campaign — the business sets the claim mode when creating the campaign.

**Decision recorded:**
- "Create Campaign" form has a toggle: `Instant Claim` | `Application Required`
- **Instant Claim:** Creator hits "Claim" → immediately assigned, status → "In Progress"
- **Application Required:** Creator submits a short pitch/message → business reviews in their dashboard drawer → Approve/Reject → creator notified
- Campaign cards in the Marketplace show a badge indicating which mode: e.g. `⚡ Instant` or `📋 Apply`

---

### Q6 — Creator Wallet — Payout Method Display

**Question:** Does the wallet page show the connected mobile money account + an "Edit" button?

**User answer:** Yes (Option A).

**Decision recorded:**
- Wallet hero card: pending balance + next payout date
- Payout method section: masked number e.g. `+251 ••• ••• 1234` + "Edit" button (non-functional, UI only)
- Earnings breakdown: per-campaign line items with status
- Payout history table: date, campaign, amount, status chip (Paid / Pending / Held)

---

### Q7 — Create Campaign Form Layout

**Question:** Is the Create Campaign flow a multi-step wizard or a single long-scroll form?

**User answer:** Multi-step wizard (Option A).

**Decision recorded:**
- 4-step wizard with progress indicator at top
- **Step 1 — Campaign Basics:** Title, description, campaign type (Fixed / CPM), platform (Telegram / TikTok / YouTube / Blog / Website), claim mode (Instant / Application Required)
- **Step 2 — Requirements & Targeting:** Min follower count, content brief, audience requirements, deadline
- **Step 3 — Budget & Escrow:** Rate per unit, total budget, live estimated-reach indicator (updates as user types), confirm deposit amount
- **Step 4 — Review & Publish:** Summary of all fields, "Fund & Launch" CTA

---

### Q8 — Admin Panel Architecture

**Question:** Separate admin login or same login with admin role?

**User answer:** Completely separate URL (`/admin`). The admin is the platform owner (Mercado itself), not a regular user role.

**Decision recorded:**

**Admin panel lives at `/admin` — separate entry point, same design system.**

Admin pages/sections:
1. **Overview Dashboard** — Platform-wide KPIs: total users, total signups (business vs creator), total campaign volume, escrow held, revenue (commissions collected), active campaigns, flagged submissions count
2. **Verification Queue** — Table of flagged submissions: creator name + tier, campaign name, proof link, flag reason, Approve ✓ / Reject ✗ buttons. Row click → slide-over drawer (same pattern as business dashboard)
3. **Users** — Searchable table of all users (businesses + creators) with tier badges, account status, payout history
4. **Campaigns** — Full campaign list across all businesses with status, budget, spend
5. **Disputes** — Reported disputes from either party, with resolution controls
6. **AI Agent Hub** *(AI-agent-ready section)* — Clean UI showing automation hooks: queued tasks, last agent action log, trigger buttons (e.g. "Run fraud scan", "Batch-approve low-risk queue") — designed so AI agents can be connected later

**Design notes:**
- Same sidebar/drawer/card design language as creator + business dashboards
- Table-based data views with slide-over drawers for detail
- Status chips consistent with the rest of the platform

---

### Q9 — Proof Submission + CRITICAL: Creator Verification Onboarding

**Question:** How does the screenshot upload work on proof submission?

**User answer:** Option A — drag-and-drop with file preview (browser memory only). Clean, polished UI.

**CRITICAL new information revealed — Creator Verification Onboarding:**

Creators do NOT get immediate dashboard access after signup. There is a mandatory verification phase:

**Creator Onboarding Flow (new screens required):**

1. **Signup** (phone OTP + "Creator" role selected)
2. **Connect Your Channels screen** — creator inputs all their social handles:
   - Telegram channel username/link
   - TikTok handle
   - YouTube channel URL
   - Blog/website URL
   - (can add multiple)
3. **Verification Pending screen** — "We're reviewing your channels. This usually takes X hours." Locked dashboard, can't access marketplace yet.
4. **Verified → Full Dashboard unlocked** — creator can now browse and claim campaigns.

**Verification checks (UI must reflect these states):**
- Follower count verification (display their reported vs verified count)
- Channel ownership proof
- Each handle has a verification status badge: `⏳ Pending` / `✅ Verified` / `❌ Failed`

**Impact on other pages:**
- Admin "Users" table shows verification status per creator
- Admin can manually approve/reject creators from their panel
- Marketplace is LOCKED behind verification (not accessible until verified)
- Business side: campaigns are visible to all verified creators (no per-campaign creator whitelisting — business just sets requirements)

**Proof Submission (confirmed):**
- Drag-and-drop upload area: accepts image files, shows thumbnail preview inline
- Also supports click-to-browse (not just drag)
- URL input field alongside the uploader
- Optional notes field
- After submit: campaign card status → "Under Review"

---

### Q10 — Trust Tier Badge Interaction

**Question:** Is the trust tier badge just a label, a popover, or a full profile link?

**User answer:** Option B — clickable, opens a small popover with the creator's trust stats.

**Decision recorded:**
- Trust tier badge appears on: creator applicant list (business drawer), marketplace cards, admin users table
- **Tier colors:**
  - `New` → gray chip
  - `Verified` → blue chip (`#2f5fe0`)
  - `Trusted` → green chip
  - `Elite` → gold/amber chip
- **Clicking the badge** → small popover appears showing:
  - Tier name + icon
  - Total campaigns completed
  - Dispute rate (e.g. "0 disputes")
  - Member since date
  - Verification status per channel
- Popover dismisses on click-outside or Escape key

---

### Q11 — Mobile Money Provider Context

**Question:** Which mobile money providers to show in the escrow payment simulation?

**User answer:** Ethiopian context — Telebirr (primary) + CBE Birr (secondary).

**Decision recorded:**
- Escrow Step 3 shows deposit summary with amount in ETB (Ethiopian Birr)
- Payment method selector: **Telebirr** (primary, pre-selected) + **CBE Birr** (secondary option)
- Simulated flow: user selects provider → enters phone number → fake "Confirm Payment" modal → success state → campaign goes Live
- Currency throughout the platform: **ETB (Ethiopian Birr)**
- Payout format in Creator Wallet: also ETB

---

### Q12 — URL / Routing Structure

**Question:** Separate route spaces (`/business/...` + `/creator/...`) or single `/dashboard` with role-based rendering?

**User answer:** Option A — separate route spaces.

**Decision recorded — Full Route Map:**
```
/                          → redirect to /auth
/auth                      → Sign up / Login (phone number input)
/auth/verify               → OTP verification step
/onboarding                → Creator channel connect + verification pending
/business/dashboard        → Business home (KPI cards + campaign list)
/business/campaigns/new    → Create campaign wizard (4 steps)
/creator/marketplace       → Open campaigns feed
/creator/campaigns         → My claimed campaigns + proof submission
/creator/wallet            → Earnings + payout history
/admin                     → Admin login (separate entry, separate design shell)
/admin/dashboard           → Platform KPI overview
/admin/queue               → Verification queue (flagged submissions)
/admin/users               → All users table
/admin/campaigns           → All campaigns table
/admin/disputes            → Disputes list
/admin/agents              → AI Agent Hub
```

---

## Extended Grilling Session — Round 2

*Continuing the grilling skill to surface remaining unknowns before any code is written.*

---

### Q1 — Role Selection on Signup

**Question:** When a user signs up, how do they choose their role — Business or Creator?

**Agent recommendation:** A toggle/choice on the registration screen itself.

**User answer:** A pill/segmented toggle switcher on the signup page itself — like Apple's "Chat | Work" pill — but with "Business | Creator". The selected segment determines the flow/fields shown below. No separate screen.

**Decision recorded:** Role is chosen on the signup page via an inline pill toggle: `[ Business ] [ Creator ]`


---

### R2-Q1 — Business Dashboard KPIs

**Question:** What KPIs does the business owner see at the top of their dashboard?

**User answer:** Both performance AND activity KPIs combined.

**Decision recorded — 8 KPI cards in two rows:**

Row 1 — Activity:
- Active Campaigns
- Total Spent (ETB)
- Pending Submissions (needing review)
- Verified Completions

Row 2 — Performance:
- Total Reach Achieved
- Clicks Tracked
- Conversions
- Submissions Received

Layout: 4-column grid × 2 rows of stat cards above the campaign list table.

---


### R2-Q2 — Landing Page

**Question:** Public landing page at `/` or redirect straight to `/auth`?

**User answer:** No landing page for now. `/` → redirect to `/auth`.

**Decision recorded:** Scope is tight — no marketing page. Auth is the entry point.

---

### R2-Q3 — Business Onboarding

**Question:** Do businesses need onboarding steps after signup?

**User answer:** Option B — light onboarding, 1 screen, skippable.

**Decision recorded:**
- After phone OTP as "Business" → one onboarding screen appears
- Fields: Company name, Industry (dropdown), Logo upload (optional)
- "Skip for now" link visible — not a hard gate
- Completing or skipping → lands on `/business/dashboard` with empty state

---

### R2-Q4 — Notifications & Topbar

**Question:** In-app notification dropdown? And where does search live?

**User answer:** No notifications. Search lives in the sidebar (like the ChatGPT screenshot reference), NOT in the topbar.

**Decision recorded:**
- No notification bell/dropdown
- **Topbar:** Minimal — page title/breadcrumb on the left, user avatar/profile on the right. Nothing else.
- **Search:** Sits inside the sidebar (a search icon in the collapsed state, expands to a search input in the expanded state — exactly like ChatGPT's sidebar pattern)
- This matches the reference screenshots provided

---

### R2-Q5 — Campaign Status List

**Question:** Does the campaign status list cover everything?

**User answer:** Option A — perfect as-is.

**Decision recorded — Complete status set with chip colors:**

| Status | Color | Meaning |
|--------|-------|---------|
| `Draft` | Gray | Created but not yet funded |
| `Live` | Blue (`#2f5fe0`) | Funded, accepting claims/applications |
| `In Progress` | Purple | At least one creator working on it |
| `Under Review` | Amber/Yellow | Submission received, awaiting verification |
| `Completed` | Green | All verified, campaign ended |
| `Rejected` | Red | Submission rejected, returns to In Progress |
| `Paused` | Orange | Business paused the campaign |
| `Cancelled` | Gray/Red | Business cancelled before completion |

---

## ✅ Grilling Complete — Shared Understanding Reached

All decisions recorded. Ready to write spec documents and initialize the project.

### R2-Q5 — Campaign Status List

**Question:** Does the campaign status list cover everything?

**User answer:** Option A — perfect as-is.

**Decision recorded — Complete status set:**

| Status | Chip Color | Meaning |
|--------|-----------|---------|
| `Draft` | Gray | Created but not funded |
| `Live` | Blue (`#2f5fe0`) | Funded, accepting claims |
| `In Progress` | Purple | At least one creator working |
| `Under Review` | Amber | Submission received, awaiting verification |
| `Completed` | Green | All verified, done |
| `Rejected` | Red | Submission rejected |
| `Paused` | Orange | Business paused |
| `Cancelled` | Gray/Red | Business cancelled |

---

## ✅ Grilling Complete — Shared Understanding Reached

**All context documents written:**
- `docs/PROJECT_SPEC.md` — Master specification (pages, flows, all decisions)
- `docs/DESIGN_TOKENS.md` — Colors, typography, motion, shadows
- `docs/USER_FLOWS.md` — Step-by-step flows for Business, Creator, Admin
- `docs/COMPONENT_SPEC.md` — Every shared component defined with props + behavior

**Next.js project initialized.**
