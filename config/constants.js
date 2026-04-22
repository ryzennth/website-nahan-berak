/**
 * ============================================================
 * config/constants.js
 * ============================================================
 * Single Source of Truth for the entire Nahan Berak project.
 *
 * WHY THIS EXISTS:
 *   Instead of hardcoding values (colors, URLs, team data, copy)
 *   scattered across multiple files, ALL configurable data lives
 *   here. Change it once → reflected everywhere.
 *
 * USAGE:
 *   import { SITE, TEAM_MEMBERS, NAV_LINKS } from '../config/constants.js';
 * ============================================================
 */

// ─── Site Meta ────────────────────────────────────────────────
export const SITE = {
  name:        'Nahan Berak',
  tagline: 'Mengungkap sisi gelap internet dengan bukti dan tindakan.',
  description: 'Empat pemuda, satu misi. Mengungkap sisi gelap internet, mendokumentasikan bukti, dan memastikan pelaku sampai ke pihak yang seharusnya.',
  year:        2026,
  youtubeUrl:  'https://youtube.com/@nahan_berak',
  instagramUrl:'https://instagram.com/nahanberak.id',
  tiktokUrl:   'https://tiktok.com/@nahan.berak.clip',
};

// ─── Color Palette ────────────────────────────────────────────
// Mirror of tailwind.config colors — used in JS when dynamic styling is needed.
export const COLORS = {
  black:   '#0a0a0a',
  dark:    '#111111',
  card:    '#1a1a1a',
  border:  '#2a2a2a',
  accent:  '#18dbf5',
  pop:     '#ff4d4d',
  teal:    '#0050c9',
  muted:   '#888888',
  light:   '#f0f0f0',
  purple:  '#a78bfa',
};

// ─── Navigation Links ─────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',      href: '#home'      },
  { label: 'Investigation',     href: '#about'     },
  { label: 'Movement', href: '#community' },
];

// ─── Hero Slides ──────────────────────────────────────────────
export const HERO_SLIDES = [
  {
    id: 'slide-1',
    bgClass: 'slide-1',
    tagText: 'Digital Investigation Unit',
    tagColor: COLORS.accent,
    headingHtml: 'NAHAN <span class="grad-text">BERAK</span>',
    subtext:
      'Empat pemuda. Satu tujuan. Mengungkap sisi gelap internet dan membawa pelakunya ke tempat yang seharusnya.',
    ctaLabel: 'Mulai Investigasi →',
    ctaHref: '#welcome',
    ctaStyle: 'primary',
    floatEmoji: [
      { icon: '🎯', pos: 'top-1/4 left-[8%]', anim: 'float' },
      { icon: '📁', pos: 'bottom-1/4 right-[6%]', anim: 'float-delay' },
    ],
  },
  {
    id: 'slide-2',
    bgClass: 'slide-2',
    tagText: 'Squad Mission',
    tagColor: COLORS.teal,
    headingHtml:
      'DIGITAL <span style="color:#00c9a7;">HUNTERS</span><br/>YANG SOLID',
    subtext:
      'Empat orang, satu misi: memburu jejak digital, mengungkap kebenaran, dan tidak membiarkan kebusukan hidup nyaman.',
    ctaLabel: 'Siapa Kami? →',
    ctaHref: '#about',
    ctaStyle: 'ghost',
    ctaColor: COLORS.teal,
    floatEmoji: [
      { icon: '🔍', pos: 'top-1/3 right-[10%]', anim: 'float-delay2' },
    ],
  },
  {
    id: 'slide-3',
    bgClass: 'slide-3',
    tagText: 'New Case Every Week',
    tagColor: COLORS.pop,
    headingHtml:
      'KONTEN <span style="color:#ff4d4d;">INVESTIGATIF</span><br/>TANPA FILTER',
    subtext:
      'Pencidukan, investigasi digital, hingga penyerahan pelaku. Bukan sekadar tontonan, tapi tindakan nyata.',
    ctaLabel: 'Lihat Konten →',
    ctaHref: '#community',
    ctaStyle: 'primary',
    ctaBg: COLORS.pop,
    floatEmoji: [
      { icon: '⚠️', pos: 'bottom-1/4 left-[8%]', anim: 'float' },
    ],
  },
  {
    id: 'slide-4',
    bgClass: 'slide-4',
    tagText: 'Join The Movement',
    tagColor: COLORS.purple,
    headingHtml:
      'GABUNG <span style="color:#a78bfa;">GERAKAN</span><br/>YANG BERANI',
    subtext:
      'Kami tidak mencari penonton pasif. Kami membangun komunitas yang peduli, kritis, dan berani melawan hal yang salah.',
    ctaLabel: 'Join The Movement',
    ctaHref: '#community',
    ctaStyle: 'primary',
    ctaBg: COLORS.purple,
    ctaColor: '#fff',
    floatEmoji: [
      { icon: '📡', pos: 'top-1/4 right-[5%]', anim: 'float-delay' },
      { icon: '🛰️', pos: 'bottom-1/3 left-[5%]', anim: 'float' },
    ],
  },
];

// ─── Stats ────────────────────────────────────────────────────
export const STATS = [
  { value: '4', label: 'Anggota Tim Solid', span: 2 },
  { value: '8+', label: 'Kasus Terungkap', span: 1 },
  { value: '500K+', label: 'Audience Reached', span: 1 },
];

// ─── Team Members ─────────────────────────────────────────────
export const TEAM_MEMBERS = [
  {
    name: 'AARON',
    role: 'The Leader',
    image: '/assets/images/team/aaron.jpg',
    gradient: 'linear-gradient(135deg,#f5c518,#ff4d4d)',
  },
  {
    name: 'BINTANG',
    role: 'The Strategist',
    image: '/assets/images/team/bintang.jpg',
    gradient: 'linear-gradient(135deg,#00c9a7,#0a9cf5)',
  },
  {
    name: 'CHRIS',
    role: 'The Editor',
    image: '/assets/images/team/chris.jpg',
    gradient: 'linear-gradient(135deg,#ff4d4d,#c026d3)',
  },
  {
    name: 'PATRICK',
    role: 'The Executor',
    image: '/assets/images/team/patrick.jpg',
    gradient: 'linear-gradient(135deg,#a78bfa,#4f46e5)',
  },
];

// ─── Marquee Items ────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  'Nahan Berak',
  '★ Subscribe Sekarang',
  'Digital Investigation Channel',
  '★ New Case Every Week',
  'Expose • Investigate • Deliver',
  '★ Join The Movement',
];

// ─── Swiper Configuration ─────────────────────────────────────
export const SWIPER_CONFIG = {
  loop:     true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  speed:    900,
  effect:   'fade',
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el:        '.swiper-pagination',
    clickable: true,
  },
};

// ─── Scroll Reveal Observer Config ────────────────────────────
export const REVEAL_OBSERVER_CONFIG = {
  threshold:   0.12,
  rootMargin: '0px 0px -50px 0px',
};

// ─── Active Section Observer Config ───────────────────────────
export const SECTION_OBSERVER_CONFIG = {
  threshold: 0.5,
};
