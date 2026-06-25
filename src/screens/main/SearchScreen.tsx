import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { IS_TABLET, rf, rs, H_PAD, WIN_WIDTH } from '../../utils/responsive';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILTERS = ['All', 'Safety', 'Electrodes', 'Positions', 'Inspection'] as const;
type Filter = (typeof FILTERS)[number];

interface SearchItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  filterKey: Exclude<Filter, 'All'>;
  thumbBg: string;
  thumbAccent: string;
}

const ALL_ITEMS: SearchItem[] = [
  {
    id: '1',
    title: 'Striking the Arc with E7018 Low-Hydrogen',
    category: 'ELECTRODE TECHNIQUE',
    duration: '3:45',
    level: 'INTERMEDIATE',
    filterKey: 'Electrodes',
    thumbBg: '#06121E',
    thumbAccent: '#0A2848',
  },
  {
    id: '2',
    title: 'Vertical-Up 3G Weave on Structural Plate',
    category: 'JOINT POSITIONS',
    duration: '5:12',
    level: 'ADVANCED',
    filterKey: 'Positions',
    thumbBg: '#081A10',
    thumbAccent: '#0D3018',
  },
  {
    id: '3',
    title: 'Reading the Bead: Porosity, Undercut & Overlap',
    category: 'WELD INSPECTION',
    duration: '4:20',
    level: 'INTERMEDIATE',
    filterKey: 'Inspection',
    thumbBg: '#181006',
    thumbAccent: '#2A1A06',
  },
  {
    id: '4',
    title: 'PPE & Hot Work Safety for SMAW',
    category: 'SAFETY PROTOCOL',
    duration: '2:55',
    level: 'BEGINNER',
    filterKey: 'Safety',
    thumbBg: '#10081A',
    thumbAccent: '#1E0E2E',
  },
  {
    id: '5',
    title: 'E6010 vs E7018: Electrode Selection Guide',
    category: 'ELECTRODE TECHNIQUE',
    duration: '6:10',
    level: 'INTERMEDIATE',
    filterKey: 'Electrodes',
    thumbBg: '#061218',
    thumbAccent: '#0A2030',
  },
  {
    id: '6',
    title: '2F Horizontal Fillet in Tight Spaces',
    category: 'JOINT POSITIONS',
    duration: '3:30',
    level: 'BEGINNER',
    filterKey: 'Positions',
    thumbBg: '#0A160C',
    thumbAccent: '#142210',
  },
];

// ─── Magnifying-glass icon (no icon lib needed) ───────────────────────────────

function MagnifyIcon({ color = 'rgba(255,255,255,0.35)' }: { color?: string }) {
  return (
    <View style={magStyles.root} pointerEvents="none">
      <View style={[magStyles.circle, { borderColor: color }]} />
      <View style={[magStyles.handle, { backgroundColor: color }]} />
    </View>
  );
}

const magStyles = StyleSheet.create({
  root: { width: 18, height: 18 },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  handle: {
    position: 'absolute',
    bottom: 0,
    right: 1,
    width: 2,
    height: 8,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});

// ─── Thumbnail placeholder ────────────────────────────────────────────────────

function Thumbnail({ bg, accent }: { bg: string; accent: string }) {
  return (
    <View style={[styles.thumb, { backgroundColor: bg }]}>
      <View style={[styles.thumbAccent, { backgroundColor: accent }]} />
      <View style={styles.thumbShimmer} />
    </View>
  );
}

// ─── Result card ─────────────────────────────────────────────────────────────

function ResultCard({ item }: { item: SearchItem }) {
  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.card}>
      <Thumbnail bg={item.thumbBg} accent={item.thumbAccent} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardMeta} numberOfLines={1}>
          {item.category}{'  ·  '}{item.duration}{'  ·  '}{item.level}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── SearchScreen ─────────────────────────────────────────────────────────────

export function SearchScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const results = useMemo(() => {
    let items = ALL_ITEMS;
    if (activeFilter !== 'All') {
      items = items.filter(i => i.filterKey === activeFilter);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        i =>
          i.title.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.level.toLowerCase().includes(q),
      );
    }
    return items;
  }, [query, activeFilter]);

  const sectionLabel =
    query.trim() ? `RESULTS FOR "${query.trim().toUpperCase()}"` : 'TRENDING IN YOUR SHOP';

  const CONTENT_WIDTH = IS_TABLET ? Math.min(WIN_WIDTH * 0.72, 640) : WIN_WIDTH;

  return (
    <View style={styles.screen}>
      {/* ── Sticky header (title + search + chips) ── */}
      <View
        style={[
          styles.stickyHeader,
          {
            paddingTop: top + 20,
            width: IS_TABLET ? CONTENT_WIDTH : undefined,
            alignSelf: IS_TABLET ? 'center' : undefined,
          },
        ]}>
        <Text style={styles.pageTitle}>Search the library</Text>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <MagnifyIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Lessons, electrodes, positions..."
            placeholderTextColor="rgba(255,255,255,0.28)"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
          style={styles.filtersScroll}>
          {FILTERS.map(f => {
            const active = f === activeFilter;
            return (
              <TouchableOpacity
                key={f}
                activeOpacity={0.75}
                onPress={() => setActiveFilter(f)}
                style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Results list ── */}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ResultCard item={item} />}
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
            width: IS_TABLET ? CONTENT_WIDTH : undefined,
            alignSelf: IS_TABLET ? 'center' : undefined,
          },
        ]}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>{sectionLabel}</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptyBody}>
              Try a different keyword or clear the filter.
            </Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SCREEN_BG = '#07111C';
const CARD_BG = '#0C1829';
const THUMB_SIZE = rs(76);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },

  // ── Sticky header ──
  stickyHeader: {
    paddingHorizontal: H_PAD,
    paddingBottom: 12,
    backgroundColor: SCREEN_BG,
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
    fontSize: 15,
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
    fontSize: 13,
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
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.8,
    marginBottom: 12,
    marginTop: 4,
  },

  // ── Card ──
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: CARD_BG,
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
    fontSize: 10.5,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 0.6,
  },

  // ── Empty state ──
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 40,
    color: 'rgba(255,255,255,0.15)',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
  },
  emptyBody: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
