/**
 * ============================================================
 * js/footer.js
 * ============================================================
 * Handles Footer dynamic behaviors:
 *   1. Auto-updates copyright year — never manually edit it again
 *   2. Back-to-top smooth scroll
 *   3. External link safety (rel="noopener noreferrer")
 *
 * WHY SEPARATE:
 *   Footer has unique concerns (legal copy, external links)
 *   that shouldn't be mixed into navbar or responsive logic.
 *   Separating also makes it easy to add newsletter signup
 *   or cookie consent in the future.
 *
 * EXPORTS: initFooter()
 * ============================================================
 */

import { SITE } from '../config/constants.js';


// ─── Feature: Auto Year ───────────────────────────────────────
/**
 * Finds all elements with data-year attribute and fills them
 * with the current year. Also updates any #copyright-year span.
 *
 * HTML usage:
 *   <span id="copyright-year"></span>
 *   <span data-year></span>
 */
function initAutoYear() {
  const year    = new Date().getFullYear();
  const targets = document.querySelectorAll('#copyright-year, [data-year]');

  targets.forEach(el => {
    el.textContent = year;
  });
}


// ─── Feature: External Link Safety ───────────────────────────
/**
 * Automatically adds rel="noopener noreferrer" to all footer
 * anchor tags that open in a new tab.
 * Prevents reverse tabnapping security vulnerability.
 */
function initExternalLinkSafety() {
  const footerLinks = document.querySelectorAll('footer a[target="_blank"]');

  footerLinks.forEach(link => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) {
      link.setAttribute('rel', rel + ' noopener noreferrer'.trim());
    }
  });
}


// ─── Feature: Back To Top ─────────────────────────────────────
/**
 * If a #back-to-top button exists in the footer,
 * wires it up to smoothly scroll to the top of the page.
 *
 * HTML usage (optional):
 *   <button id="back-to-top">↑ Back to top</button>
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ─── Public Init ──────────────────────────────────────────────
/**
 * Main entry point for footer module.
 * Call once from main.js after DOM ready.
 */
export function initFooter() {
  initAutoYear();
  initExternalLinkSafety();
  initBackToTop();
}
