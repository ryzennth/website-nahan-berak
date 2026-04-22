# Nahan Berak — Community Website

> Tim konten kreatif yang selalu bikin kamu nahan tawa.

---

## 🗂 Project Structure

```
nahan-berak/
│
├── index.html               ← Application shell only (no markup)
│
├── assets/
│   ├── images/              ← Optimised .webp/.jpg images
│   ├── icons/               ← SVG icon sprites or individual icons
│   └── fonts/               ← Self-hosted fonts (if not using Google Fonts CDN)
│
├── css/
│   └── style.css            ← All custom design tokens + component styles
│
├── js/
│   ├── main.js              ← Bootstrap: loads components, calls all inits
│   ├── navbar.js            ← Sticky navbar + hamburger + active link highlight
│   ├── swiper.js            ← Hero carousel init + destroy + instance getter
│   ├── responsive.js        ← Scroll reveal + marquee pause + resize handler
│   └── footer.js            ← Auto year + external link safety + back-to-top
│
├── components/
│   ├── navbar.html          ← Sticky nav + desktop menu + mobile drawer
│   ├── hero.html            ← Swiper carousel + marquee ticker
│   ├── about.html           ← Welcome section + about cards + team grid
│   ├── community.html       ← Content cards + CTA banner
│   └── footer.html          ← Footer grid + copyright bar
│
└── config/
    └── constants.js         ← Single source of truth: all data, colors, config
```

---

## 🚀 Getting Started

**⚠️ ES Modules require a local server** (browsers block `fetch()` on `file://`).

```bash
# Option 1 — VS Code Live Server (recommended)
# Install the "Live Server" extension, right-click index.html → Open with Live Server

# Option 2 — Python
python3 -m http.server 3000

# Option 3 — Node.js (npx)
npx serve .

# Then open: http://localhost:3000
```

---

## 🏛 Architecture Philosophy

### Why NOT monolithic?

A single 900-line HTML file is fine for a demo. It's painful for a real project:

| Problem | Impact |
|---|---|
| Styles, markup, and JS in one file | Can't work on the same file in parallel |
| All logic in one `<script>` block | One bug requires reading everything to debug |
| No separation of concerns | Changing a button affects the whole file |
| Hardcoded data inline | Updating team members means editing HTML |

### Why THIS structure?

```
Separation of Concerns
  │
  ├── HTML (components/) = WHAT the page says
  ├── CSS  (style.css)   = HOW the page looks
  ├── JS   (js/)         = HOW the page behaves
  └── Data (constants.js)= WHAT the content is
```

Each file has **one reason to change**. The navbar module changes when nav behavior changes. The Swiper module changes when the carousel changes. They never need to touch each other.

---

## 📁 File Reference

### `index.html` — Shell
Pure scaffold. No layout markup. Loads dependencies and declares component mount points:
```html
<div data-component="navbar"></div>
<div data-component="hero"></div>
```
The component loader in `main.js` fetches and injects each component.

---

### `config/constants.js` — Single Source of Truth
All project-wide configuration: site metadata, team members, content cards, swiper config, color palette. Change data here → reflected everywhere. Exported as named ES Module exports.

**Key exports:**
- `SITE` — name, URLs, tagline
- `TEAM_MEMBERS` — array of team member objects
- `CONTENT_CARDS` — community section card data
- `SWIPER_CONFIG` — carousel settings
- `COLORS` — brand color values for JS use

---

### `css/style.css` — Styles
Custom CSS that Tailwind utilities can't cover:
- CSS Custom Properties (design tokens via `--nb-*` variables)
- Complex animations (`@keyframes`, `.float`, `.reveal`)
- Swiper override styles
- Scroll reveal state (`.reveal` / `.reveal.visible`)
- Responsive edge cases

---

### `js/main.js` — Bootstrap (Conductor)
The entry point. Does **zero logic itself** — only orchestrates:
1. `loadComponents()` — async component HTML injection
2. `initNavbar()`
3. `initHeroSwiper()`
4. `initResponsive()`
5. `initFooter()`

Adding a new module = add 2 lines here. Nothing else changes.

---

### `js/navbar.js` — Navbar Logic
- `initStickyNavbar()` — scroll listener adds `.scrolled` for glass effect
- `initHamburger()` — toggle open/close + X animation + Escape key close
- `initMobileLinkClose()` — auto-closes drawer on mobile nav click
- `initActiveHighlight()` — IntersectionObserver syncs active link to scroll

**Exports:** `initNavbar()`

---

### `js/swiper.js` — Carousel
- `initHeroSwiper(overrides)` — creates Swiper instance, stores reference
- `destroyHeroSwiper()` — clean teardown (useful for SPAs)
- `getSwiperInstance()` — exposes instance for external control (e.g., pause on modal)

**Exports:** `initHeroSwiper`, `destroyHeroSwiper`, `getSwiperInstance`

---

### `js/responsive.js` — Ambient Behaviors
- `initScrollReveal()` — IntersectionObserver adds `.visible` to `.reveal` elements
- `initMarquee()` — pauses marquee animation when tab is hidden (Page Visibility API)
- `initResizeHandler()` — debounced resize handler (auto-closes mobile menu on expand)

**Exports:** `initScrollReveal`, `initMarquee`, `initResizeHandler`, `initResponsive`

---

### `js/footer.js` — Footer
- `initAutoYear()` — fills `#copyright-year` with `new Date().getFullYear()`
- `initExternalLinkSafety()` — adds `rel="noopener noreferrer"` to `target="_blank"` links
- `initBackToTop()` — wires `#back-to-top` button if present

**Exports:** `initFooter()`

---

## ➕ Adding a New Section (Example)

Say you want to add a **Merchandise** section:

**1. Create the component:**
```bash
# components/merchandise.html
```

**2. Add the mount point in index.html:**
```html
<div data-component="community"></div>
<div data-component="merchandise"></div>  <!-- ← add here -->
<div data-component="footer"></div>
```

**3. Add data (if dynamic) in constants.js:**
```js
export const MERCH_ITEMS = [
  { name: 'NB Hoodie', price: 'Rp 250.000', emoji: '👕' },
  // ...
];
```

**4. Create JS logic (if needed):**
```bash
# js/merchandise.js
export function initMerchandise() { ... }
```

**5. Register in main.js:**
```js
import { initMerchandise } from './merchandise.js';
// ...
initMerchandise();
```

That's the full workflow. **Zero changes to existing files** except index.html and main.js.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--nb-accent` | `#f5c518` | Primary CTA, highlights, active states |
| `--nb-pop`    | `#ff4d4d` | Danger, energy, excitement |
| `--nb-teal`   | `#00c9a7` | Success, community, growth |
| `--nb-purple` | `#a78bfa` | Premium, creative |
| `--nb-muted`  | `#888888` | Body text, labels |

**Fonts:**
- `Bebas Neue` — display headings, numbers, labels
- `Nunito` — body text, readable content
- `Space Mono` — tags, badges, technical labels

---

## 🔧 Production Checklist

- [ ] Replace Tailwind CDN with `tailwindcss` CLI build + purge
- [ ] Replace Google Fonts CDN with self-hosted fonts in `assets/fonts/`
- [ ] Minify `css/style.css`
- [ ] Bundle + minify JS with Vite or Rollup
- [ ] Add real images to `assets/images/` and update hero slides
- [ ] Replace placeholder YouTube/Instagram/TikTok URLs in `config/constants.js`
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Test on real mobile devices
