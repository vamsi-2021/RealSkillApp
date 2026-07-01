import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { ProgressBar } from '../../components/common';
import { IS_TABLET, WIN_HEIGHT } from '../../utils/responsive';
import { styles } from './HomeScreen.styles';

const SCREEN_HEIGHT = WIN_HEIGHT;

// ─── Mock feed data ───────────────────────────────────────────────────────────

interface FeedItem {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  course: string;
  progress: number;
  likes: string;
  saved: boolean;
  backgroundColor: string;
  accentColor: string;
  isLive: boolean;
}

const FEED_DATA: FeedItem[] = [
  {
    id: '1',
    title: 'Striking the Arc with E7018 Low-Hydrogen',
    category: 'ELECTRODE TECHNIQUE',
    level: 'INTERMEDIATE',
    duration: '3:45',
    course: 'SMAW Arc Control',
    progress: 0.6,
    likes: '1.4K',
    saved: false,
    backgroundColor: '#06111E',
    accentColor: '#1A3A6B',
    isLive: true,
  },
  {
    id: '2',
    title: 'Running a Bead: Travel Speed & Angle Control',
    category: 'TECHNIQUE',
    level: 'BEGINNER',
    duration: '5:20',
    course: 'MIG Welding Fundamentals',
    progress: 0.0,
    likes: '892',
    saved: true,
    backgroundColor: '#0B1A0D',
    accentColor: '#1A3A1A',
    isLive: false,
  },
  {
    id: '3',
    title: 'Residential Panel Wiring: 200A Main Breaker',
    category: 'PANEL WORK',
    level: 'ADVANCED',
    duration: '8:12',
    course: 'Electrical Systems',
    progress: 0.3,
    likes: '2.1K',
    saved: false,
    backgroundColor: '#13100A',
    accentColor: '#3A2A0A',
    isLive: false,
  },
  {
    id: '4',
    title: 'Press Fit vs Solder: Which to Use & When',
    category: 'PIPE FITTING',
    level: 'INTERMEDIATE',
    duration: '4:50',
    course: 'Plumbing Essentials',
    progress: 0.0,
    likes: '674',
    saved: false,
    backgroundColor: '#080F1A',
    accentColor: '#0A1A3A',
    isLive: true,
  },
  {
    id: '5',
    title: 'Framing a Load-Bearing Wall Step by Step',
    category: 'FRAMING',
    level: 'BEGINNER',
    duration: '6:30',
    course: 'Carpentry Fundamentals',
    progress: 0.8,
    likes: '1.8K',
    saved: true,
    backgroundColor: '#140C06',
    accentColor: '#3A1A06',
    isLive: false,
  },
];

// ─── Gradient overlay (no external lib needed) ────────────────────────────────

function GradientOverlay() {
  const STEPS = 12;
  const OVERLAY_HEIGHT = SCREEN_HEIGHT * 0.72;
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {/* Subtle full-screen darkening */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.18)' }]} />
      {/* Layered bottom-to-top gradient */}
      {Array.from({ length: STEPS }, (_, i) => {
        const progress = (i + 1) / STEPS;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: OVERLAY_HEIGHT * progress,
              backgroundColor: `rgba(0,0,0,${0.065})`,
            }}
          />
        );
      })}
    </View>
  );
}

// ─── Single feed card ─────────────────────────────────────────────────────────

interface FeedCardProps {
  item: FeedItem;
  index: number;
  total: number;
  topInset: number;
  bottomInset: number;
}

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: '#22C55E',
  INTERMEDIATE: '#F59E0B',
  ADVANCED: '#EF4444',
};

function ActionButton({
  icon,
  label,
  onPress,
  green,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
  green?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.actionBtn}>
      <View style={[styles.actionBtnCircle, green && styles.actionBtnGreen]}>
        <Text style={[styles.actionBtnIcon, green && styles.actionBtnIconGreen]}>
          {icon}
        </Text>
      </View>
      {label ? (
        <Text style={[styles.actionBtnLabel, green && styles.actionBtnLabelGreen]}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const CTA_HEIGHT = IS_TABLET ? 60 : 56;
const CTA_H_PADDING = 18;
const CTA_GAP = 14;

function FeedCard({ item, index, total, topInset, bottomInset }: FeedCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(item.saved);

  const TAB_BAR_HEIGHT = TAB_BAR_CONTENT_HEIGHT + bottomInset;
  const CTA_BOTTOM = TAB_BAR_HEIGHT + 16;
  const TEXT_BOTTOM = CTA_BOTTOM + CTA_HEIGHT + 14;

  return (
    <View style={styles.card}>
      {/* ── Background ── */}
      <View style={[styles.background, { backgroundColor: item.backgroundColor }]}>
        <View style={[styles.bgAccent, { backgroundColor: item.accentColor }]} />
      </View>

      {/* ── Gradient overlay ── */}
      <GradientOverlay />

      {/* ── Top bar ── */}
      <View style={[styles.topBar, { top: topInset + 16 }]}>
        <Text style={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Text>
        {item.isLive && (
          <View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE FEED</Text>
          </View>
        )}
      </View>

      {/* ── Right action bar ── */}
      <View style={[styles.actionBar, { bottom: TEXT_BOTTOM + 140 }]}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setLiked(l => !l)}
          style={styles.actionBtn}>
          <View style={[styles.actionBtnCircle, liked && styles.actionBtnLiked]}>
            <Text style={styles.actionBtnIcon}>{liked ? '♥' : '♡'}</Text>
          </View>
          <Text style={styles.actionBtnLabel}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setSaved(s => !s)}
          style={styles.actionBtn}>
          <View style={[styles.actionBtnCircle, saved && styles.actionBtnSaved]}>
            <Text style={styles.actionBtnIcon}>{saved ? '⊠' : '⊡'}</Text>
          </View>
          <Text style={styles.actionBtnLabel}>SAVE</Text>
        </TouchableOpacity>

        <ActionButton icon="↗" label="SHARE" />
        <ActionButton
          icon="✦"
          label="ASK"
          green
          onPress={() => (navigation as any).navigate('AIChat', { feedItemId: item.id })}
        />
      </View>

      {/* ── Bottom text content ── */}
      <View style={[styles.bottomContent, { bottom: TEXT_BOTTOM }]}>
        {/* Progress bar */}
        {item.progress > 0 && (
          <ProgressBar progress={item.progress} height={2.5} trackColor="rgba(255,255,255,0.2)" />
        )}

        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{item.category}</Text>
          </View>
          <Text style={[styles.levelText, { color: LEVEL_COLORS[item.level] ?? '#fff' }]}>
            {item.level}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>

        {/* Meta */}
        <Text style={styles.meta}>
          {item.duration}{'  ·  '}{item.course}
        </Text>
      </View>

      {/* ── CTA row — full-width, pinned above tab bar ── */}
      <View style={[styles.ctaContainer, { bottom: CTA_BOTTOM }]}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('LessonDetail', { feedItemId: item.id })}
          style={[styles.ctaResume, { height: CTA_HEIGHT }]}>
          <Text style={styles.ctaResumeIcon}>▶</Text>
          <Text style={styles.ctaResumeText}>
            {item.progress > 0 ? 'Resume' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('Quiz', { feedItemId: item.id })}
          style={[styles.ctaQuiz, { height: CTA_HEIGHT }]}>
          <Text style={styles.ctaQuizIcon}>⊙</Text>
          <Text style={styles.ctaQuizText}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────

export function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const navGlobal = useNavigation<any>();
  const flatListRef = useRef<FlatList<FeedItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItem; index: number }) => (
      <FeedCard
        item={item}
        index={index}
        total={FEED_DATA.length}
        topInset={top}
        bottomInset={bottom}
      />
    ),
    [top, bottom],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={FEED_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.98}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        removeClippedSubviews={Platform.OS === 'android'}
      />

      {/* ── Floating AI button ── */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navGlobal.navigate('AIChat', {
          feedItemId: FEED_DATA[currentIndex]?.id,
        })}
        style={[styles.floatingAI, { bottom: TAB_BAR_CONTENT_HEIGHT + bottom + 14 }]}>
        <Text style={styles.floatingAIIcon}>✦</Text>
      </TouchableOpacity>
    </View>
  );
}
