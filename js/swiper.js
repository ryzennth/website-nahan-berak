/**
 * ============================================================
 * js/swiper.js
 * ============================================================
 * Initializes and manages the Hero Swiper carousel.
 *
 * WHY SEPARATE:
 *   Swiper has its own lifecycle (init, destroy, update).
 *   Keeping it isolated makes it easy to swap carousel
 *   libraries (e.g., Splide, Embla) without touching other files.
 *
 * EXPORTS: initHeroSwiper(), destroyHeroSwiper()
 * DEPENDS ON: Swiper global (loaded via CDN in index.html)
 *             SWIPER_CONFIG from config/constants.js
 * ============================================================
 */

import { SWIPER_CONFIG } from '../config/constants.js';

// ─── Module-level swiper instance reference ───────────────────
// Stored so we can call .destroy() or .update() from outside
let swiperInstance = null;


/**
 * Initializes the hero Swiper on .hero-swiper element.
 * Merges SWIPER_CONFIG from constants with any runtime overrides.
 *
 * @param {Object} [overrides={}] — optional config overrides
 * @returns {Swiper|null}
 */
export function initHeroSwiper(overrides = {}) {
  const el = document.querySelector('.hero-swiper');

  if (!el) {
    console.warn('[swiper.js] .hero-swiper element not found. Skipping init.');
    return null;
  }

  if (typeof Swiper === 'undefined') {
    console.error('[swiper.js] Swiper library not loaded. Check CDN script in index.html.');
    return null;
  }

  // Merge base config with any passed overrides
  const config = { ...SWIPER_CONFIG, ...overrides };

  swiperInstance = new Swiper(el, config);

  return swiperInstance;
}


/**
 * Destroys the Swiper instance and cleans up event listeners.
 * Useful if the hero section is dynamically removed from DOM.
 */
export function destroyHeroSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}


/**
 * Returns the current Swiper instance (or null if not initialized).
 * Useful for external control (e.g., pause on modal open).
 *
 * @returns {Swiper|null}
 */
export function getSwiperInstance() {
  return swiperInstance;
}
