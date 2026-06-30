/**
 * Central responsive-sizing system.
 *
 * Design baseline: iPhone 14 (390 logical px wide).
 * All rf()/rs() calls are resolved once at module initialisation and
 * are therefore safe inside StyleSheet.create(). Components that need
 * live orientation updates should call useLayout().
 */

import { Dimensions, useWindowDimensions } from 'react-native';

const DESIGN_W = 390;

// ── Piecewise scale functions ─────────────────────────────────────────────────

function fontScale(w: number): number {
  if (w <= 320) { return 0.82; }
  if (w <= 360) { return 0.88; }
  if (w <= 380) { return 0.94; }
  if (w <= 430) { return 1.00; }
  if (w <= 600) { return 1.04; }
  if (w <= 744) { return 1.10; }
  if (w <= 900) { return 1.24; }
  return 1.32;
}

function spaceScale(w: number): number {
  if (w <= 320) { return 0.80; }
  if (w <= 360) { return 0.87; }
  if (w <= 380) { return 0.94; }
  if (w <= 430) { return 1.00; }
  if (w <= 600) { return 1.06; }
  if (w <= 744) { return 1.18; }
  if (w <= 900) { return 1.26; }
  return 1.36;
}

// ── Static helpers (resolved once at module load) ─────────────────────────────

const { width: WIN_W, height: WIN_H } = Dimensions.get('window');

const _fs = fontScale(WIN_W);
const _ss = spaceScale(WIN_W);

/** Current logical screen width */
export const WIN_WIDTH = WIN_W;
/** Current logical screen height */
export const WIN_HEIGHT = WIN_H;

/** True when the narrowest dimension is ≥ 768 px (iPad / Android tablet) */
export const IS_TABLET = WIN_W >= 768;
/** True for very small Android phones (≤ 360 px) */
export const IS_SMALL = WIN_W <= 360;
/** True for iPhone Plus / Pro-Max / large Android (> 430 px, < tablet) */
export const IS_LARGE_PHONE = WIN_W > 430 && WIN_W < 768;

/** Scale a font size proportionally to the device width. */
export const rf = (size: number): number => Math.round(size * _fs);

/** Scale a spacing value (padding, margin, gap, width, height) proportionally. */
export const rs = (size: number): number => Math.round(size * _ss);

/** Standard horizontal page padding — responsive (17 → 20 → 25 px). */
export const H_PAD = rs(20);

/** Standard CTA button height — responsive (50 → 56 → 64 px). */
export const CTA_H = Math.min(rs(56), 64);

// ── Dynamic hook (updates on orientation change) ──────────────────────────────

export function useLayout() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height;
  const fs = fontScale(width);
  const ss = spaceScale(width);

  return {
    width,
    height,
    isTablet,
    isLandscape,
    isSmall: width <= 360,
    isLargePhone: width > 430 && width < 768,
    /** Scale a font size for the current window width */
    rf: (n: number) => Math.round(n * fs),
    /** Scale a spacing value for the current window width */
    rs: (n: number) => Math.round(n * ss),
    /** Responsive horizontal padding */
    hPad: Math.round(20 * ss),
    /**
     * Number of grid columns for current device / orientation.
     * @param phone      columns on phone (default 1)
     * @param portrait   columns on tablet portrait (default 2)
     * @param landscape  columns on tablet landscape (default 3)
     */
    numCols: (phone = 1, portrait = 2, landscape = 3): number =>
      !isTablet ? phone : isLandscape ? landscape : portrait,
    /**
     * Ideal content-container width — fills much more of the iPad screen.
     * @param frac  fraction of screen width (auto if omitted)
     * @param maxW  hard cap (default 1040)
     */
    contentW: (frac?: number, maxW = 1040): number => {
      if (!isTablet) { return width; }
      const auto = width >= 1024 ? 0.88 : 0.92;
      return Math.min(width * (frac ?? auto), maxW);
    },
  };
}
