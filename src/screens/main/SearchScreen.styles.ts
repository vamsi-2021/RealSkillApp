import { StyleSheet } from 'react-native';
import { Colors, DarkColors } from '../../theme';
import { rf, rs, H_PAD } from '../../utils/responsive';

export const THUMB_SIZE = rs(76);

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DarkColors.screenBg,
  },

  // ── Sticky header ──
  stickyHeader: {
    paddingHorizontal: H_PAD,
    paddingBottom: 12,
    backgroundColor: DarkColors.screenBg,
  },
  pageTitle: {
    fontSize: rf(28),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.4,
    marginBottom: 16,
  },

  // ── Search bar ──
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: rf(15),
    color: '#fff',
    padding: 0,
    margin: 0,
  },

  // ── Filter chips ──
  filtersScroll: {
    marginHorizontal: -H_PAD,
  },
  filtersRow: {
    paddingHorizontal: H_PAD,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  chipText: {
    fontSize: rf(13),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.1,
  },
  chipTextActive: {
    color: '#fff',
  },

  // ── List ──
  list: {
    paddingHorizontal: H_PAD,
    paddingTop: 6,
    gap: 10,
  },
  sectionLabel: {
    fontSize: rf(10),
    fontWeight: '700',
    color: DarkColors.textTertiary,
    letterSpacing: 1.8,
    marginBottom: 12,
    marginTop: 4,
  },

  // ── Card ──
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: DarkColors.cardBg,
    borderRadius: 16,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 2,
  },

  // ── Thumbnail ──
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 10,
    overflow: 'hidden',
    flexShrink: 0,
  },
  thumbAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: THUMB_SIZE * 0.6,
    opacity: 0.7,
    borderTopRightRadius: THUMB_SIZE,
  },
  thumbShimmer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: THUMB_SIZE * 0.3,
    height: THUMB_SIZE * 0.3,
    borderRadius: THUMB_SIZE * 0.15,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  // ── Card body ──
  cardBody: {
    flex: 1,
    gap: 6,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
    lineHeight: 21,
  },
  cardMeta: {
    fontSize: rf(10.5),
    fontWeight: '600',
    color: DarkColors.textTertiary,
    letterSpacing: 0.6,
  },

  // ── Empty state ──
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 10,
  },
  emptyIcon: {
    fontSize: rf(40),
    color: 'rgba(255,255,255,0.15)',
  },
  emptyTitle: {
    fontSize: rf(17),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
  },
  emptyBody: {
    fontSize: rf(14),
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export const magStyles = StyleSheet.create({
  root: { width: rs(18), height: rs(18) },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    borderWidth: 2,
  },
  handle: {
    position: 'absolute',
    bottom: 0,
    right: 1,
    width: rs(2),
    height: rs(8),
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});
