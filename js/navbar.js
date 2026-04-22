/**
 * ============================================================
 * js/navbar.js
 * ============================================================
 * Handles all Navbar interactivity:
 *   1. Sticky fixed navbar — tetap terlihat saat scroll
 *   2. Glassmorphism effect — blur + opacity saat scroll
 *   3. Hamburger menu — open/close with animated icon morph
 *   4. Active link highlight — synced with scroll position
 *   5. Close mobile menu on link click
 * ============================================================
 */

import { SECTION_OBSERVER_CONFIG } from '../config/constants.js';

let menuOpen = false;

const getEls = () => ({
  navbar: document.getElementById('navbar'),
  hamburger: document.getElementById('hamburger'),
  mobileMenu: document.getElementById('mobile-menu'),
  hamburgerLines: document.querySelectorAll('.hamburger-line'),
  navLinks: document.querySelectorAll('.nav-link'),
  mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
  sections: document.querySelectorAll('section[id]'),
});


/* ============================================================
   Sticky Navbar + Blur Effect
============================================================ */
function initStickyNavbar(navbar) {
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  handleScroll();
}


/* ============================================================
   Hamburger Menu
============================================================ */
function initHamburger(hamburger, mobileMenu, lines) {
  const open = () => {
    menuOpen = true;
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');

    lines[0].style.transform = 'translateY(8px) rotate(45deg)';
    lines[1].style.opacity = '0';
    lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  };

  const close = () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');

    lines[0].style.transform = '';
    lines[1].style.opacity = '1';
    lines[2].style.transform = '';
  };

  hamburger.addEventListener('click', () => {
    menuOpen ? close() : open();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      close();
    }
  });

  return { close };
}


/* ============================================================
   Close Mobile Menu After Click
============================================================ */
function initMobileLinkClose(mobileNavLinks, closeMenu) {
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}


/* ============================================================
   Active Link Highlight
============================================================ */
function initActiveHighlight(sections, navLinks) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    });
  }, SECTION_OBSERVER_CONFIG);

  sections.forEach((section) => observer.observe(section));
}


/* ============================================================
   Init Navbar
============================================================ */
export function initNavbar() {
  const {
    navbar,
    hamburger,
    mobileMenu,
    hamburgerLines,
    navLinks,
    mobileNavLinks,
    sections,
  } = getEls();

  if (!navbar) {
    return console.warn('[navbar.js] #navbar not found');
  }

  if (!hamburger) {
    return console.warn('[navbar.js] #hamburger not found');
  }

  initStickyNavbar(navbar);

  const { close: closeMenu } = initHamburger(
    hamburger,
    mobileMenu,
    hamburgerLines
  );

  initMobileLinkClose(mobileNavLinks, closeMenu);
  initActiveHighlight(sections, navLinks);
}
