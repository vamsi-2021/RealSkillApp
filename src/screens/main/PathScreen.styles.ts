import { StyleSheet } from 'react-native';
import { DarkColors } from '../../theme';
import { rf, H_PAD } from '../../utils/responsive';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DarkColors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: H_PAD,
  },

  // ── Header ──
  header: {
    marginBottom: 28,
  },
  heroTitle: {
    fontSize: rf(28),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.4,
    lineHeight: rf(34),
    marginBottom: 20,
  },

  // ── Stat cards ──
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  // ── Tier sections ──
  tiersContainer: {},
  tierSpacing: {
    marginTop: 28,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  tierNumber: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 2,
    flexShrink: 0,
  },
  tierLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tierLevel: {
    fontSize: rf(10),
    fontWeight: '700',
    letterSpacing: 1.5,
    flexShrink: 0,
  },

  // ── Section cards ──
  lessonsContainer: {
    gap: 10,
  },
  lessonCard: {
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  lessonCardLocked: {
    backgroundColor: 'rgba(12,24,41,0.45)',
    borderColor: 'rgba(255,255,255,0.04)',
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  // ── Status icon glyphs ──
  iconCheckmark: {
    fontSize: rf(18),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(20),
  },
  iconPlay: {
    fontSize: rf(14),
    color: '#fff',
    lineHeight: rf(16),
    marginLeft: 2,
  },

  // ── Section body ──
  lessonBody: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  lessonTitle: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  lessonTitleLocked: {
    color: 'rgba(255,255,255,0.28)',
    fontWeight: '600',
  },
  lockedSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  // ── Chevron ──
  chevron: {
    fontSize: rf(22),
    color: 'rgba(255,255,255,0.3)',
    lineHeight: rf(24),
    flexShrink: 0,
    marginRight: 2,
  },
});
