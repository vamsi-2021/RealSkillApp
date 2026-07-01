import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, H_PAD } from '../../utils/responsive';

export const CARD_BG_ACCENT = DarkColors.cardBgAccent;
export const AMBER = '#F59E0B';

export const CHART_BAR_AREA = 160; // height available for bars
export const CHART_LABEL_H = 28; // height for day labels below bars
export const BAR_W = Math.min(rs(28), 36);
export const BAR_RADIUS = 8;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DarkColors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: H_PAD,
    gap: 0,
  },

  // ── Header ──
  breadcrumb: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.8,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: rf(30),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 24,
  },

  // ── Section label ──
  sectionLabel: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.8,
    marginTop: 28,
    marginBottom: 12,
  },

  // ── Stats grid ──
  statsGrid: {
    gap: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  // Stat card overrides (passed into the shared StatCard component)
  statCard: {
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  statCardAccent: {
    backgroundColor: CARD_BG_ACCENT,
    borderColor: 'rgba(34,197,94,0.15)',
  },
  statCardHeader: {
    marginBottom: 2,
  },
  statIcon: {
    fontSize: rf(14),
    lineHeight: rf(16),
  },
  statLabel: {
    fontSize: rf(9.5),
    flexShrink: 1,
  },
  statValue: {
    fontSize: rf(28),
  },
  statSub: {
    fontSize: rf(12),
    color: DarkColors.textTertiary,
  },

  // ── Techniques ──
  techniquesContainer: {
    gap: 10,
  },
  techniqueCard: {
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  techniqueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  techniqueTitle: {
    flex: 1,
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  techniqueScore: {
    fontSize: rf(14),
    fontWeight: '700',
    color: AMBER,
    letterSpacing: 0.2,
    flexShrink: 0,
  },

  // ── Certification ──
  certCard: {
    backgroundColor: CARD_BG_ACCENT,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(34,197,94,0.15)',
    marginBottom: 4,
  },
  certContent: {
    gap: 6,
    paddingRight: 80,
  },
  certStatus: {
    fontSize: rf(10),
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 1.8,
  },
  certTitle: {
    fontSize: rf(20),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    lineHeight: rf(26),
  },
  certSub: {
    fontSize: rf(13),
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
  },
});

export const chartStyles = StyleSheet.create({
  card: {
    backgroundColor: '#0B1627',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_BAR_AREA + CHART_LABEL_H,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: CHART_BAR_AREA + CHART_LABEL_H,
  },
  bar: {
    width: BAR_W,
    borderTopLeftRadius: BAR_RADIUS,
    borderTopRightRadius: BAR_RADIUS,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  segment: {
    width: '100%',
  },
  dayLabel: {
    marginTop: 8,
    fontSize: rf(11),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    height: CHART_LABEL_H - 8,
  },
});

export const certBadgeStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: rs(72),
    height: rs(88),
    alignItems: 'center',
    opacity: 0.18,
  },
  circle: {
    width: rs(60),
    height: rs(60),
    borderRadius: rs(30),
    borderWidth: 5,
    borderColor: Colors.accent,
    backgroundColor: 'transparent',
  },
  ribbonLeft: {
    position: 'absolute',
    bottom: 0,
    left: rs(6),
    width: rs(22),
    height: rs(34),
    backgroundColor: Colors.accent,
    borderBottomLeftRadius: rs(4),
    transform: [{ skewX: '-8deg' }],
  },
  ribbonRight: {
    position: 'absolute',
    bottom: 0,
    right: rs(6),
    width: rs(22),
    height: rs(34),
    backgroundColor: Colors.accent,
    borderBottomRightRadius: rs(4),
    transform: [{ skewX: '8deg' }],
  },
});
