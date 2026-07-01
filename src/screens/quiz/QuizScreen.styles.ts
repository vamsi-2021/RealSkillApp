import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, H_PAD } from '../../utils/responsive';

const GREEN = Colors.accent;
const RED = '#EF4444';
const CTA_H = Math.min(rs(56), 64);

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DarkColors.screenBg,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: H_PAD,
    paddingBottom: 14,
  },
  headerMeta: {
    flex: 1,
    gap: 3,
  },
  headerTitle: {
    fontSize: rf(13),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },

  // ── Progress segments ──
  segmentsRow: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: H_PAD,
    marginBottom: 4,
  },
  segment: {
    flex: 1,
    height: 3.5,
    borderRadius: 2,
  },
  segmentActive: {
    backgroundColor: GREEN,
  },
  segmentDone: {
    backgroundColor: GREEN,
    opacity: 0.7,
  },
  segmentPending: {
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  // ── Scroll ──
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: H_PAD,
  },

  // ── Counter + question ──
  counter: {
    fontSize: rf(11),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.8,
    marginTop: 18,
    marginBottom: 10,
  },
  questionText: {
    fontSize: rf(22),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(30),
    letterSpacing: -0.3,
    marginBottom: 24,
  },

  // ── Options ──
  optionsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  optionCorrect: {
    backgroundColor: 'rgba(34,197,94,0.1)',
    borderColor: GREEN,
  },
  optionWrong: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderColor: RED,
  },
  optionNeutral: {
    opacity: 0.55,
  },

  // Letter badge
  letterBadge: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  letterBadgeCorrect: {
    backgroundColor: 'rgba(34,197,94,0.2)',
    borderColor: 'rgba(34,197,94,0.5)',
  },
  letterBadgeWrong: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    borderColor: 'rgba(239,68,68,0.5)',
  },
  letterText: {
    fontSize: rf(12),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },
  letterTextCorrect: {
    color: GREEN,
  },
  letterTextWrong: {
    color: RED,
  },

  // Option text
  optionText: {
    flex: 1,
    fontSize: rf(15),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  optionTextAnswered: {
    color: '#fff',
  },
  optionTextNeutral: {
    color: 'rgba(255,255,255,0.45)',
  },

  // Feedback icon (right side)
  feedbackCircle: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  feedbackCircleCorrect: {
    backgroundColor: 'rgba(34,197,94,0.2)',
    borderWidth: 1.5,
    borderColor: GREEN,
  },
  feedbackCircleWrong: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    borderWidth: 1.5,
    borderColor: RED,
  },
  feedbackGlyph: {
    fontSize: rf(12),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(14),
  },

  // ── Explanation panel ──
  explanation: {
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
  },
  explanationCorrect: {
    backgroundColor: 'rgba(34,197,94,0.07)',
    borderColor: 'rgba(34,197,94,0.2)',
  },
  explanationWrong: {
    backgroundColor: 'rgba(239,68,68,0.07)',
    borderColor: 'rgba(239,68,68,0.18)',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  explanationBadge: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    flexShrink: 0,
  },
  explanationBadgeCorrect: {
    borderColor: GREEN,
    backgroundColor: 'rgba(34,197,94,0.2)',
  },
  explanationBadgeWrong: {
    borderColor: RED,
    backgroundColor: 'rgba(239,68,68,0.2)',
  },
  explanationBadgeGlyph: {
    fontSize: rf(10),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(12),
  },
  explanationTitle: {
    fontSize: rf(14),
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  explanationTitleCorrect: {
    color: GREEN,
  },
  explanationTitleWrong: {
    color: RED,
  },
  explanationBody: {
    fontSize: rf(14),
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  completionBanner: {
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.12)',
  },
  completionText: {
    fontSize: rf(13),
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
  },
  completionXP: {
    color: GREEN,
    fontWeight: '800',
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: H_PAD,
    paddingTop: 12,
    backgroundColor: DarkColors.screenBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  nextBtn: {
    flex: 7,
    height: CTA_H,
    backgroundColor: GREEN,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: rf(16),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.1,
  },
  askAIBtn: {
    flex: 3,
    height: CTA_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: 'rgba(10,18,42,0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  askAIIcon: {
    fontSize: rf(16),
    color: '#fff',
    lineHeight: rf(18),
  },
  askAIText: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
  },
});
