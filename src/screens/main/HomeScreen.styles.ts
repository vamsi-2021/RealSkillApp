import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, WIN_WIDTH, WIN_HEIGHT } from '../../utils/responsive';

const SCREEN_WIDTH = WIN_WIDTH;
const SCREEN_HEIGHT = WIN_HEIGHT;

const CTA_H_PADDING = 18;
const CTA_GAP = 14;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Card ──
  card: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: 'hidden',
  },

  // ── Background ──
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  bgAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.55,
    opacity: 0.45,
    borderTopLeftRadius: 120,
  },

  // ── Top bar ──
  topBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    fontSize: rf(13),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1.5,
    fontVariant: ['tabular-nums'],
  },
  liveChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  liveText: {
    fontSize: rf(10),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },

  // ── Right action bar ──
  actionBar: {
    position: 'absolute',
    right: 16,
    alignItems: 'center',
    gap: 20,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 5,
  },
  actionBtnCircle: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  actionBtnLiked: {
    backgroundColor: 'rgba(239,68,68,0.25)',
    borderColor: 'rgba(239,68,68,0.4)',
  },
  actionBtnSaved: {
    backgroundColor: 'rgba(96,165,250,0.25)',
    borderColor: 'rgba(96,165,250,0.4)',
  },
  actionBtnGreen: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  actionBtnIcon: {
    fontSize: rf(20),
    color: '#fff',
    lineHeight: rf(22),
  },
  actionBtnIconGreen: {
    color: '#fff',
    fontSize: rf(18),
  },
  actionBtnLabel: {
    fontSize: rf(9),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.8,
  },
  actionBtnLabelGreen: {
    color: Colors.accent,
  },

  // ── Bottom content ──
  bottomContent: {
    position: 'absolute',
    left: 18,
    right: 80,
    gap: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  categoryChip: {
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
  levelText: {
    fontSize: rf(11),
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(32),
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: rf(12),
    fontWeight: '500',
    color: DarkColors.textSecondary,
    letterSpacing: 0.3,
    fontVariant: ['tabular-nums'],
  },

  // ── CTA row — full-width absolute, pinned above tab bar ──
  ctaContainer: {
    position: 'absolute',
    left: CTA_H_PADDING,
    right: CTA_H_PADDING,
    flexDirection: 'row',
    gap: CTA_GAP,
  },
  ctaResume: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    // height is injected inline so it responds to IS_TABLET
  },
  ctaResumeIcon: {
    fontSize: rf(14),
    color: '#0A0A14',
    lineHeight: rf(16),
  },
  ctaResumeText: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#0A0A14',
    letterSpacing: 0.1,
  },
  ctaQuiz: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(10, 16, 38, 0.92)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    // height is injected inline
  },
  ctaQuizIcon: {
    fontSize: rf(15),
    color: '#fff',
    lineHeight: rf(17),
  },
  ctaQuizText: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.1,
  },

  // ── Floating AI button ──
  floatingAI: {
    position: 'absolute',
    left: 18,
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  floatingAIIcon: {
    fontSize: rf(22),
    color: '#fff',
  },
});
