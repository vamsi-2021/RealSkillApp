import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, H_PAD, WIN_HEIGHT } from '../../utils/responsive';

const HERO_H = WIN_HEIGHT * 0.43;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DarkColors.screenBg,
  },
  scroll: {
    flex: 1,
  },

  // ── Hero ──
  hero: {
    width: '100%',
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroBgAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_H * 0.6,
    opacity: 0.5,
    borderTopLeftRadius: 80,
  },
  playWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: HERO_H * 0.32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    backgroundColor: 'rgba(255,255,255,0.90)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  playGlyph: {
    fontSize: rf(28),
    color: '#07111C',
    lineHeight: rf(30),
    marginLeft: 4,
  },
  heroFooter: {
    position: 'absolute',
    left: H_PAD,
    right: H_PAD,
    bottom: 18,
    gap: 8,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryChipText: {
    fontSize: rf(9),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: rf(24),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(30),
    letterSpacing: -0.3,
  },
  heroMeta: {
    fontSize: rf(11),
    fontWeight: '500',
    color: DarkColors.textSecondary,
    letterSpacing: 0.4,
  },

  // ── Detail content ──
  detail: {
    paddingHorizontal: H_PAD,
    paddingTop: 22,
  },

  // ── Action row ──
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  quizBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    backgroundColor: Colors.accent,
    borderRadius: 26,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  quizBtnIcon: {
    fontSize: rf(16),
    color: '#fff',
    lineHeight: rf(18),
  },
  quizBtnText: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.1,
  },
  iconBtn: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(14),
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  iconGlyph: {
    fontSize: rf(19),
    color: 'rgba(255,255,255,0.82)',
    lineHeight: rf(21),
  },

  // ── Divider ──
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 22,
  },

  // ── Section label ──
  sectionLabel: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  sectionGap: {
    marginTop: 28,
  },

  // ── Summary ──
  summaryText: {
    fontSize: rf(15),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: rf(24),
  },

  // ── Takeaways ──
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 13,
  },
  checkCircle: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    borderWidth: 1.5,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  checkMark: {
    fontSize: rf(10),
    fontWeight: '800',
    color: Colors.accent,
    lineHeight: rf(11),
    includeFontPadding: false,
  },
  takeawayText: {
    flex: 1,
    fontSize: rf(14),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: rf(22),
  },

  // ── Related lessons ──
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: DarkColors.cardBg,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  relatedThumb: {
    width: rs(68),
    height: rs(68),
    borderRadius: rs(10),
    overflow: 'hidden',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedThumbPlay: {
    fontSize: rf(16),
    color: 'rgba(255,255,255,0.65)',
    lineHeight: rf(18),
    marginLeft: 2,
  },
  relatedMeta: {
    flex: 1,
    gap: 5,
  },
  relatedTitle: {
    fontSize: rf(13),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(18),
    letterSpacing: -0.1,
  },
  relatedSub: {
    fontSize: rf(11),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: 0.3,
  },
  relatedChevron: {
    fontSize: rf(24),
    color: 'rgba(255,255,255,0.25)',
    lineHeight: rf(26),
  },
});
