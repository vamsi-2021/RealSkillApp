import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { styles, magStyles } from './SearchScreen.styles';

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

const ResultCard = React.memo(function ResultCard({ item }: { item: SearchItem }) {
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
});

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

  const renderItem = useCallback(
    ({ item }: { item: SearchItem }) => <ResultCard item={item} />,
    [],
  );

  return (
    <View style={styles.screen}>
      {/* ── Sticky header (title + search + chips) ── */}
      <View
        style={[
          styles.stickyHeader,
          {
            paddingTop: top + 20,
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
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
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

