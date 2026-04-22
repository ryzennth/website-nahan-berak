/**
 * ============================================================
 * js/main.js
 * ============================================================
 * APPLICATION BOOTSTRAP — Entry point for all JavaScript.
 *
 * ROLE:
 *   This file does ONE thing: orchestrate initialization.
 *   It imports each module and calls their init functions
 *   in the correct order after the DOM is ready.
 *
 *   Think of it as the conductor, not a player.
 *   No logic lives here — only wiring.
 *
 * ORDER OF EXECUTION:
 *   1. DOM ready (DOMContentLoaded)
 *   2. Navbar    — sticky, hamburger, active links
 *   3. Swiper    — hero carousel
 *   4. Responsive — scroll reveal, marquee, resize
 *   5. Footer    — auto year, external links
 *
 * ADDING A NEW MODULE:
 *   1. Create js/yourModule.js with an exported init function
 *   2. Import it here: import { initYourModule } from './yourModule.js'
 *   3. Call it inside DOMContentLoaded: initYourModule()
 *   That's it. Zero changes to other files needed.
 * ============================================================
 */

import { initNavbar }     from './navbar.js';
import { initHeroSwiper } from './swiper.js';
import { initResponsive } from './responsive.js';
import { initFooter }     from './footer.js';


// ─── Component Loader ─────────────────────────────────────────
/**
 * Fetches each HTML component file and injects it into the
 * matching [data-component] mount point in the DOM.
 *
 * HTML usage in index.html:
 *   <div data-component="navbar"></div>
 *   → fetches components/navbar.html and injects its innerHTML
 *
 * Components are loaded in parallel (Promise.all) then resolved
 * in DOM order, so layout never flashes or reorders.
 *
 * @returns {Promise<void>}
 */
async function loadComponents() {
  const mounts = document.querySelectorAll('[data-component]');
  if (!mounts.length) return;

  const loads = Array.from(mounts).map(async (mount) => {
    const name = mount.dataset.component;

    try {
      const res  = await fetch(`components/${name}.html`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} — components/${name}.html not found`);
      }

      const html = await res.text();
      mount.innerHTML = html;
    } catch (err) {
      console.error(`[main.js] Failed to load component "${name}":`, err.message);
      // Render a visible error in the mount point during development
      mount.innerHTML = `
        <div style="padding:20px; color:#ff4d4d; font-family:monospace; font-size:13px; border:1px solid #ff4d4d; margin:10px; border-radius:8px;">
          ⚠️ Component "<strong>${name}</strong>" failed to load.<br/>
          Make sure <code>components/${name}.html</code> exists and you're running on a local server.
        </div>
      `;
    }
  });

  // Wait for all components to inject before initializing JS features
  await Promise.all(loads);
}


// ─── Bootstrap ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {

  /**
   * [1] Load HTML Components
   * Fetches and injects all [data-component] fragments.
   * Everything else depends on this completing first.
   */
  await loadComponents();

  /**
   * [2] Navbar
   * Sticky glass effect + hamburger menu + active section highlight
   */
  initNavbar();

  /**
   * [3] Hero Swiper
   * Auto-slide carousel with fade transition.
   * Config comes from config/constants.js SWIPER_CONFIG.
   */
  initHeroSwiper();

  /**
   * [4] Responsive & Scroll Behaviors
   * Scroll reveal animations + marquee pause + resize handling.
   */
  initResponsive();

  /**
   * [5] Footer
   * Copyright year injection + external link safety.
   */
  initFooter();

  // ── Dev mode log (remove in production) ──────────────────────
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('%c[NB] App initialized ✓', 'color:#f5c518; font-weight:bold; font-size:13px;');
    console.log('%c[NB] Components loaded: navbar, hero, about, community, footer', 'color:#888; font-size:11px;');
  }
});
