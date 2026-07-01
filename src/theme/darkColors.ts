import { Colors } from './colors';

/**
 * Shared tokens for the app's dark-mode screens (Home, Path, Search, Profile,
 * Progress, Quiz, AIChat, TierDetail, LessonDetail, VideoPlayer). These were
 * previously hardcoded per-screen (e.g. `const SCREEN_BG = '#07111C'`); only
 * values reused 3+ times across screens are promoted here. Low-frequency
 * one-off opacities stay local to their screen's styles.ts.
 */
export const DarkColors = {
  screenBg: '#07111C',
  cardBg: '#0C1829',
  cardBgAccent: '#081B11',

  textPrimary: '#FFFFFF',
  textPrimaryMuted: 'rgba(255,255,255,0.88)',
  textSecondary: 'rgba(255,255,255,0.55)',
  textTertiary: 'rgba(255,255,255,0.38)',
  textDisabled: 'rgba(255,255,255,0.28)',

  hairline: 'rgba(255,255,255,0.08)',
  overlayScrim: 'rgba(0,0,0,0.45)',
  overlayScrimStrong: 'rgba(0,0,0,0.55)',

  accent: Colors.accent,
};
