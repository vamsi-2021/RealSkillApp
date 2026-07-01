import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { rf, rs, WIN_HEIGHT } from '../../utils/responsive';

const SH = WIN_HEIGHT;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Gradient overlays ──
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SH * 0.3,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SH * 0.36,
  },

  // ── Top bar ──
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  topTitle: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  topMeta: {
    fontSize: rf(11),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.52)',
    letterSpacing: 0.3,
  },
  topActionBtn: {
    width: rs(40),
    height: rs(40),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // ── Volume icon ──
  volIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: rs(28),
    height: rs(20),
  },

  // ── Center controls ──
  centerRow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 44,
  },
  skipBtn: {
    alignItems: 'center',
    gap: 6,
  },
  skipArrow: {
    fontSize: rf(34),
    color: 'rgba(255,255,255,0.88)',
    lineHeight: rf(36),
  },
  skipLabel: {
    fontSize: rf(11),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.3,
  },
  playPauseBtn: {
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.88)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playGlyph: {
    fontSize: rf(28),
    color: '#fff',
    lineHeight: rf(30),
    marginLeft: 5,
  },
  pauseWrap: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBar: {
    width: rs(5),
    height: rs(26),
    borderRadius: rs(3),
    backgroundColor: '#fff',
  },

  // ── Bottom bar ──
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    gap: 10,
  },
  seekTrack: {
    height: 24,
    justifyContent: 'center',
    paddingVertical: 6,
  },
  seekRail: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  seekBuffered: {
    position: 'absolute',
    left: 0,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
  seekProgress: {
    position: 'absolute',
    left: 0,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.accent,
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'visible',
  },
  seekThumb: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.accent,
    position: 'absolute',
    right: -7.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },
  seekFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: rf(12),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.82)',
    letterSpacing: 0.3,
    fontVariant: ['tabular-nums'],
  },
  seekFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qualityChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.32)',
  },
  qualityText: {
    fontSize: rf(11),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  fsBtn: {
    width: rs(36),
    height: rs(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fsIcon: {
    width: rs(22),
    height: rs(22),
  },
});
