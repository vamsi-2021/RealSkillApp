import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs } from '../../utils/responsive';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DarkColors.screenBg,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 12,
  },
  aiAvatar: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  aiAvatarIcon: {
    fontSize: rf(18),
    color: '#fff',
    lineHeight: rf(20),
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: rf(17),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
  headerSub: {
    fontSize: rf(10),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: 1.2,
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // ── Messages ──
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bubbleRowAI: {
    justifyContent: 'flex-start',
  },
  bubbleRowUser: {
    justifyContent: 'flex-end',
  },
  bubbleAI: {
    maxWidth: '86%',
    backgroundColor: DarkColors.cardBg,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  bubbleUser: {
    maxWidth: '80%',
    backgroundColor: Colors.accent,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  bubbleText: {
    fontSize: rf(15),
    fontWeight: '400',
    color: '#fff',
    lineHeight: rf(23),
    letterSpacing: -0.1,
  },
  bubbleTextUser: {
    fontWeight: '500',
  },

  // ── Typing indicator ──
  typingFooter: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  typingRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  // ── Bottom panel ──
  bottomPanel: {
    backgroundColor: DarkColors.screenBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 10,
    gap: 10,
  },
  chipsRow: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  chipText: {
    fontSize: rf(13),
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 18,
    fontSize: rf(15),
    color: '#fff',
  },
  micBtn: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  sendBtnDisabled: {
    backgroundColor: 'rgba(34,197,94,0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendGlyph: {
    fontSize: rf(20),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(22),
    marginTop: -1,
  },
});
