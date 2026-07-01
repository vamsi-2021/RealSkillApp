import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, H_PAD } from '../../utils/responsive';

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
  },

  // ── Header ──
  headerSection: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tierBreadcrumb: {
    fontSize: rf(11),
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  sectionTitle: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.4,
    lineHeight: rf(32),
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: rf(14),
    fontWeight: '400',
    color: DarkColors.textSecondary,
    lineHeight: rf(22),
  },
  completedCheck: {
    fontSize: rf(22),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(24),
  },
  completedBadgeShadow: {
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },

  // ── Progress card ──
  progressCard: {
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 28,
    gap: 10,
  },
  progressLabel: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  progressPct: {
    fontSize: rf(36),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
    lineHeight: rf(42),
  },
  progressStatus: {
    fontSize: rf(14),
    fontWeight: '700',
  },

  // ── Lessons ──
  lessonsLabel: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  lessonsList: {
    gap: 10,
    marginBottom: 20,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },

  // Left circle glyphs
  leftCheckmark: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(18),
  },
  leftNumber: {
    fontSize: rf(15),
    fontWeight: '700',
    lineHeight: rf(18),
  },
  leftNumberActive: {
    color: Colors.accent,
  },
  leftNumberLocked: {
    color: 'rgba(255,255,255,0.28)',
  },

  // Lesson body
  lessonBody: {
    flex: 1,
    gap: 5,
  },
  lessonTitle: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  lessonTitleLocked: {
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clockGlyph: {
    fontSize: rf(11),
    color: 'rgba(255,255,255,0.35)',
    lineHeight: rf(13),
  },
  durationText: {
    fontSize: rf(12),
    fontWeight: '500',
    color: DarkColors.textTertiary,
    letterSpacing: 0.2,
  },

  // Right circle glyphs
  rightCheck: {
    fontSize: rf(12),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(13),
    includeFontPadding: false,
  },
  rightPlay: {
    fontSize: rf(9),
    color: 'rgba(255,255,255,0.45)',
    lineHeight: rf(10),
    marginLeft: 1,
  },

  // ── Certificate note ──
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 20,
  },
  certBody: {
    flex: 1,
    gap: 4,
  },
  certTitle: {
    fontSize: rf(13),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.82)',
    lineHeight: rf(18),
  },
  certSub: {
    fontSize: rf(11),
    fontWeight: '400',
    color: DarkColors.textTertiary,
    letterSpacing: 0.1,
  },

  // Shield icon
  shieldOuter: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(10),
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  shieldInner: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
    borderWidth: 1.5,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldCheck: {
    fontSize: rf(10),
    fontWeight: '800',
    color: '#22C55E',
    lineHeight: rf(11),
    includeFontPadding: false,
  },

  // ── Continue button ──
  continueBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueBtnText: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
});
