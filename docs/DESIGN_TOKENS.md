# Mercado — Design Tokens

> Single source of truth for all visual tokens. Agents must use these exact values — do not invent colors, spacings, or motion values.

---

## Colors

### Semantic Tokens (CSS custom properties in globals.css)

```css
:root {
  /* Base */
  --bg: #FCFCFC;
  --bg-secondary: #f7f7f5;
  --surface: #ffffff;
  --border: #ececec;
  --border-strong: #dcdde0;

  /* Text */
  --text-primary: #16181d;
  --text-secondary: #4b4f57;
  --text-muted: #9a9ea6;
  --text-placeholder: #b5b8be;

  /* Brand */
  --blue: #2f5fe0;
  --blue-dark: #2650c4;
  --blue-light: #dde6fb;

  /* Accents */
  --pink: #eaa6f0;
  --green: #a3f2b0;
  --green-text: #2f9e4a;
  --green-bg: #dcf5e0;
  --purple-text: #9146c8;
  --purple-bg: #f1e3fb;
  --amber: #f59e0b;
  --amber-bg: #fef3c7;
  --red: #ef4444;
  --red-bg: #fee2e2;
  --orange: #f97316;
  --orange-bg: #ffedd5;

  /* Shadows */
  --shadow-xs: 0 1px 1px rgba(16,17,20,0.02), 0 1px 2px rgba(16,17,20,0.03);
  --shadow-sm: 0 2px 4px rgba(16,17,20,0.03), 0 8px 20px -6px rgba(16,17,20,0.06);
  --shadow-md: 0 10px 30px -10px rgba(16,17,20,0.14);

  /* Motion */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 120ms;
  --dur-base: 180ms;
  --dur-slow: 260ms;

  /* Layout */
  --sidebar-collapsed: 48px;
  --sidebar-expanded: 240px;
  --topbar-height: 60px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}

.dark {
  --bg: #111111;
  --bg-secondary: #161616;
  --surface: #1a1a1a;
  --border: #2a2a2a;
  --border-strong: #3a3a3a;

  --text-primary: #FCFCFC;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;
  --text-placeholder: #4a4a4a;

  --shadow-xs: 0 1px 1px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3);
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.2), 0 8px 20px -6px rgba(0,0,0,0.3);
  --shadow-md: 0 10px 30px -10px rgba(0,0,0,0.5);
}
```

---

## Status Chip Styles

| Status | Background | Text Color |
|--------|-----------|------------|
| Draft | `#f3f3f2` (light) / `#2a2a2a` (dark) | `#9a9ea6` |
| Live | `#dde6fb` | `#3d63d1` |
| In Progress | `#f1e3fb` | `#9146c8` |
| Under Review | `#fef3c7` | `#b45309` |
| Completed | `#dcf5e0` | `#2f9e4a` |
| Rejected | `#fee2e2` | `#dc2626` |
| Paused | `#ffedd5` | `#c2410c` |
| Cancelled | `#f3f3f2` | `#6b7280` |

---

## Trust Tier Chip Styles

| Tier | Background | Text | Icon |
|------|-----------|------|------|
| New | `#f3f3f2` | `#9a9ea6` | 🌱 |
| Verified | `#dde6fb` | `#2f5fe0` | ✓ |
| Trusted | `#dcf5e0` | `#2f9e4a` | ⭐ |
| Elite | `#fef3c7` | `#b45309` | 👑 |

---

## Typography Scale

```css
/* All text uses Inter variable font */
font-family: 'Inter var', Inter, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;

/* Heading XL — page titles */
font-size: 30px; font-weight: 700; letter-spacing: -0.025em; line-height: 1.15;

/* Heading LG — card titles, section headers */
font-size: 20px; font-weight: 700; letter-spacing: -0.02em;

/* Heading MD — drawer titles, modal headers */
font-size: 16px; font-weight: 700;

/* Body — default text */
font-size: 14px; font-weight: 400; line-height: 1.5;

/* Body SM — secondary text, metadata */
font-size: 13px; font-weight: 400;

/* Label — table headers, field labels */
font-size: 12px; font-weight: 600; text-transform: none;

/* Micro — timestamps, footnotes */
font-size: 11px; font-weight: 500;
```

---

## Spacing Scale

Use Tailwind's default scale. Common values:
- `4px` (1) — icon gap, micro spacing
- `8px` (2) — tight component padding
- `12px` (3) — inner padding (small)
- `16px` (4) — standard padding
- `20px` (5) — card padding
- `24px` (6) — section gap
- `32px` (8) — page padding
- `48px` (12) — large section gap

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Buttons, chips, small elements |
| `--radius-md` | 12px | Inputs, medium buttons |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 20px | Large cards, modals |
| `--radius-full` | 9999px | Pills, toggles, avatars |

---

## Motion Guidelines

- **Micro-interactions** (hover, focus): `var(--dur-fast)` = 120ms
- **State transitions** (tab switch, toggle): `var(--dur-base)` = 180ms
- **Layout shifts** (sidebar expand, drawer open): `var(--dur-slow)` = 260ms
- **Easing default**: `var(--ease-out)` for enter, `var(--ease)` for exit
- **Reduced motion**: Always wrap in `@media (prefers-reduced-motion: reduce)`
- **Scale on press**: `transform: scale(0.97)` on button active
- **Hover lift**: subtle shadow increase on card hover

---

## Platform Icons

Use Lucide React icons + custom SVG where needed:
- Telegram: custom SVG (paper plane angle)
- TikTok: custom SVG (music note)
- YouTube: Lucide `Youtube`
- Blog/Website: Lucide `Globe`
- Mercado logo: logotype text "Mercado" in Inter 700, `-0.03em` tracking
