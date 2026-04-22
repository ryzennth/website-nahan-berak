/**
 * ============================================================
 * js/responsive.js
 * ============================================================
 * Handles all scroll-driven and viewport-aware behaviors:
 *   1. Scroll Reveal   — animates elements into view
 *   2. Marquee Clone   — ensures seamless loop by detecting overflow
 *   3. Resize Handler  — responds to viewport changes
 *
 * WHY SEPARATE:
 *   These are "ambient" behaviors not tied to a specific
 *   component. Isolating them prevents responsive utilities
 *   from cluttering navbar.js or swiper.js.
 *
 * EXPORTS: initScrollReveal(), initMarquee(), initResponsive()
 * DEPENDS ON: REVEAL_OBSERVER_CONFIG from config/constants.js
 * ============================================================
 */

import { REVEAL_OBSERVER_CONFIG } from '../config/constants.js';


// ─── Feature: Scroll Reveal ───────────────────────────────────
/**
 * Observes all .reveal elements. When they enter the viewport,
 * adds .visible class which triggers the CSS fade-up animation.
 *
 * Supports per-element stagger via inline style:
 *   <div class="reveal" style="transition-delay: .2s">
 *
 * Once revealed, the observer stops watching that element
 * (unobserve) to free memory — animations are one-shot.
 */
export function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseFloat(el.style.transitionDelay) || 0;

      // Delay accounts for stagger set via inline style
      setTimeout(() => {
        el.classList.add('visible');
      }, delay * 1000);

      observer.unobserve(el);
    });
  }, REVEAL_OBSERVER_CONFIG);

  revealEls.forEach(el => observer.observe(el));
}


// ─── Feature: Marquee Accessibility & Performance ────────────
/**
 * Ensures the marquee ticker is accessible and smooth.
 * Pauses animation when the tab is not visible (Page Visibility API)
 * to save CPU/battery on mobile devices.
 */
export function initMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  // Pause when tab is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      marqueeTrack.style.animationPlayState = 'paused';
    } else {
      marqueeTrack.style.animationPlayState = 'running';
    }
  });
}


// ─── Feature: Resize Handler ─────────────────────────────────
/**
 * Debounced resize listener for any layout recalculations
 * needed on viewport change.
 *
 * Currently handles:
 *   - Closing mobile menu on resize to desktop width
 *
 * Add more handlers inside onResize() as the project grows.
 *
 * @param {Function} closeMenuCallback — from navbar.js if needed
 */
export function initResizeHandler(closeMenuCallback) {
  let resizeTimer;

  const onResize = () => {
    // Auto-close mobile menu when viewport widens past md breakpoint
    if (window.innerWidth >= 768 && typeof closeMenuCallback === 'function') {
      closeMenuCallback();
    }
  };

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(onResize, 150); // debounce 150ms
  }, { passive: true });
}


// ─── Master Init ─────────────────────────────────────────────
/**
 * Initializes all responsive & scroll-driven behaviors.
 * Call this once from main.js after DOM is ready.
 *
 * @param {Object} [options]
 * @param {Function} [options.closeMenu] — optional mobile menu close callback
 */
export function initResponsive({ closeMenu } = {}) {
  initScrollReveal();
  initMarquee();
  initResizeHandler(closeMenu);
}
