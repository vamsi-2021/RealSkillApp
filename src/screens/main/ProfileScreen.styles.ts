import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, H_PAD } from '../../utils/responsive';

export const AVATAR_SIZE = rs(88);

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
    alignItems: 'center',
  },

  // ── Avatar ──
  avatarWrapper: {
    marginBottom: 16,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  avatarInitials: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },

  // ── Name / role ──
  name: {
    fontSize: rf(22),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    marginBottom: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: rf(14),
    color: 'rgba(255,255,255,0.42)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },

  // ── Stats row ──
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 28,
    gap: 4,
  },
  statValue: {
    fontSize: rf(24),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: rf(9.5),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.4,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  // ── Menu card ──
  menuCard: {
    width: '100%',
    backgroundColor: DarkColors.cardBg,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 14,
    overflow: 'hidden',
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginLeft: 72,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuIcon: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuBody: {
    flex: 1,
    gap: 3,
  },
  menuTitle: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  menuSub: {
    fontSize: rf(12.5),
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  chevron: {
    fontSize: rf(22),
    color: DarkColors.textDisabled,
    lineHeight: rf(24),
    flexShrink: 0,
  },

  // ── Sign out ──
  signOutBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: DarkColors.cardBg,
    borderRadius: 18,
    paddingVertical: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  signOutText: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.1,
  },
});

export const iconStyles = StyleSheet.create({
  wrapper: {
    width: rs(22),
    height: rs(22),
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Badge / ribbon
  badgeCircle: {
    width: rs(14),
    height: rs(14),
    borderRadius: rs(7),
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  ribbonLeft: {
    position: 'absolute',
    bottom: 0,
    left: rs(3),
    width: rs(7),
    height: rs(10),
    backgroundColor: '#fff',
    borderBottomLeftRadius: rs(2),
    transform: [{ skewX: '-6deg' }],
  },
  ribbonRight: {
    position: 'absolute',
    bottom: 0,
    right: rs(3),
    width: rs(7),
    height: rs(10),
    backgroundColor: '#fff',
    borderBottomRightRadius: rs(2),
    transform: [{ skewX: '6deg' }],
  },

  // Gear
  gearOuter: {
    width: rs(16),
    height: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearInner: {
    width: rs(7),
    height: rs(7),
    borderRadius: rs(3.5),
    borderWidth: 2,
    borderColor: '#fff',
  },
  gearTooth: {
    position: 'absolute',
    width: rs(3),
    height: rs(16),
    backgroundColor: '#fff',
    borderRadius: rs(1.5),
    opacity: 0.9,
  },

  // Globe
  globeCircle: {
    width: rs(16),
    height: rs(16),
    borderRadius: rs(8),
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  globeH: {
    position: 'absolute',
    width: rs(16),
    height: rs(1.5),
    backgroundColor: '#fff',
  },
  globeV: {
    position: 'absolute',
    width: rs(1.5),
    height: rs(16),
    backgroundColor: '#fff',
  },

  // Accessibility person
  a11yHead: {
    width: rs(7),
    height: rs(7),
    borderRadius: rs(3.5),
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  a11yBody: {
    width: rs(13),
    height: rs(13),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: rs(3),
    position: 'absolute',
    bottom: 0,
    transform: [{ rotate: '10deg' }],
  },
});

export const exitStyles = StyleSheet.create({
  root: {
    width: rs(18),
    height: rs(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bracket: {
    position: 'absolute',
    left: 0,
    width: rs(2),
    height: rs(18),
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 1,
  },
  arrowShaft: {
    position: 'absolute',
    right: 0,
    width: rs(12),
    height: rs(2),
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  arrowHeadTop: {
    position: 'absolute',
    right: 0,
    top: rs(4),
    width: rs(7),
    height: rs(2),
    backgroundColor: '#fff',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateX: 1 }],
  },
  arrowHeadBottom: {
    position: 'absolute',
    right: 0,
    bottom: rs(4),
    width: rs(7),
    height: rs(2),
    backgroundColor: '#fff',
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateX: 1 }],
  },
});
