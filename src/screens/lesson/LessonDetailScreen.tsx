import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { getLesson, getLessons } from '../../data/lessonData';
import { rf, H_PAD, WIN_HEIGHT } from '../../utils/responsive';

const HERO_H = WIN_HEIGHT * 0.43;

type Props = NativeStackScreenProps<HomeStackParamList, 'LessonDetail'>;

// ─── Hero gradient ─────────────────────────────────────────────────────────────

function HeroGradient() {
  const STEPS = 10;
  const GRAD_H = HERO_H * 0.68;
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.25)' }]} />
      {Array.from({ length: STEPS }, (_, i) => {
        const p = (i + 1) / STEPS;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: GRAD_H * p,
              backgroundColor: 'rgba(0,0,0,0.07)',
            }}
          />
        );
      })}
    </View>
  );
}

// ─── Takeaway check icon ──────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <View style={styles.checkCircle}>
      <Text style={styles.checkMark}>✓</Text>
    </View>
  );
}

// ─── Related lesson card ──────────────────────────────────────────────────────

function RelatedCard({ id, onPress }: { id: string; onPress: (id: string) => void }) {
  const lesson = getLesson(id);
  return (
    <TouchableOpacity
      activeOpacity={0.76}
      onPress={() => onPress(id)}
      style={styles.relatedCard}>
      <View style={[styles.relatedThumb, { backgroundColor: lesson.bgColor }]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: lesson.accentColor, opacity: 0.5 },
          ]}
        />
        <Text style={styles.relatedThumbPlay}>▶</Text>
      </View>
      <View style={styles.relatedMeta}>
        <Text style={styles.relatedTitle} numberOfLines={2}>
          {lesson.title}
        </Text>
        <Text style={styles.relatedSub}>
          {lesson.duration}{'  ·  '}{lesson.level}
        </Text>
      </View>
      <Text style={styles.relatedChevron}>›</Text>
    </TouchableOpacity>
  );
}

// ─── LessonDetailScreen ───────────────────────────────────────────────────────

export function LessonDetailScreen({ route, navigation }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [lessonId, setLessonId] = useState(route.params.feedItemId);

  const lesson = getLesson(lessonId);
  const relatedLessons = getLessons(lesson.relatedIds);

  const handleRelatedTap = (id: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setLessonId(id);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.screen}>
      {/* ── Scrollable content (fades during lesson transitions) ── */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 32 }}
          showsVerticalScrollIndicator={false}>

          {/* ─ Hero ─ */}
          <View style={[styles.hero, { height: HERO_H }]}>
            {/* Background */}
            <View style={[styles.heroBg, { backgroundColor: lesson.bgColor }]}>
              <View
                style={[
                  styles.heroBgAccent,
                  { backgroundColor: lesson.accentColor },
                ]}
              />
            </View>

            {/* Gradient overlay */}
            <HeroGradient />

            {/* Play button — centered in upper 70% of hero */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('VideoPlayer', { feedItemId: lessonId })}
              style={styles.playWrap}>
              <View style={styles.playCircle}>
                <Text style={styles.playGlyph}>▶</Text>
              </View>
            </TouchableOpacity>

            {/* Category chip + title + meta pinned at the hero bottom */}
            <View style={styles.heroFooter}>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>{lesson.category}</Text>
              </View>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {lesson.title}
              </Text>
              <Text style={styles.heroMeta}>
                {lesson.duration}{'  ·  '}{lesson.course}{'  ·  '}{lesson.level}
              </Text>
            </View>
          </View>

          {/* ─ Scrollable detail ─ */}
          <View style={styles.detail}>

            {/* ── Action row ── */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Quiz', { feedItemId: lessonId })}
                style={styles.quizBtn}>
                <Text style={styles.quizBtnIcon}>⊙</Text>
                <Text style={styles.quizBtnText}>
                  Take quiz · +{lesson.xp} XP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => (navigation as any).navigate('AIChat', { feedItemId: lessonId })}
                style={styles.iconBtn}>
                <Text style={styles.iconGlyph}>✦</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.75} style={styles.iconBtn}>
                <Text style={styles.iconGlyph}>⊡</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.75} style={styles.iconBtn}>
                <Text style={styles.iconGlyph}>⬇</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* ── Summary ── */}
            <Text style={styles.sectionLabel}>SUMMARY</Text>
            <Text style={styles.summaryText}>{lesson.summary}</Text>

            {/* ── Key takeaways ── */}
            <Text style={[styles.sectionLabel, styles.sectionGap]}>KEY TAKEAWAYS</Text>
            {lesson.takeaways.map((item, i) => (
              <View key={i} style={styles.takeawayRow}>
                <CheckIcon />
                <Text style={styles.takeawayText}>{item}</Text>
              </View>
            ))}

            {/* ── Related lessons ── */}
            <Text style={[styles.sectionLabel, styles.sectionGap]}>RELATED LESSONS</Text>
            {relatedLessons.map(r => (
              <RelatedCard key={r.id} id={r.id} onPress={handleRelatedTap} />
            ))}
          </View>
        </ScrollView>
      </Animated.View>

      {/* ── Back button — fixed above scroll ── */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { top: top + 12 }]}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#07111C',
  },
  scroll: {
    flex: 1,
  },

  // ── Hero ──
  hero: {
    width: '100%',
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroBgAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_H * 0.6,
    opacity: 0.5,
    borderTopLeftRadius: 80,
  },
  playWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: HERO_H * 0.32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.90)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  playGlyph: {
    fontSize: 28,
    color: '#07111C',
    lineHeight: 30,
    marginLeft: 4,
  },
  heroFooter: {
    position: 'absolute',
    left: H_PAD,
    right: H_PAD,
    bottom: 18,
    gap: 8,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryChipText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: rf(24),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(30),
    letterSpacing: -0.3,
  },
  heroMeta: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.4,
  },

  // ── Back button ──
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  backArrow: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 22,
    marginTop: -1,
  },

  // ── Detail content ──
  detail: {
    paddingHorizontal: H_PAD,
    paddingTop: 22,
  },

  // ── Action row ──
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  quizBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    backgroundColor: Colors.accent,
    borderRadius: 26,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  quizBtnIcon: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 18,
  },
  quizBtnText: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.1,
  },
  iconBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  iconGlyph: {
    fontSize: 19,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 21,
  },

  // ── Divider ──
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 22,
  },

  // ── Section label ──
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  sectionGap: {
    marginTop: 28,
  },

  // ── Summary ──
  summaryText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
  },

  // ── Takeaways ──
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 13,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  checkMark: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    lineHeight: 11,
    includeFontPadding: false,
  },
  takeawayText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
  },

  // ── Related lessons ──
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#0C1829',
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  relatedThumb: {
    width: 68,
    height: 68,
    borderRadius: 10,
    overflow: 'hidden',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedThumbPlay: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 18,
    marginLeft: 2,
  },
  relatedMeta: {
    flex: 1,
    gap: 5,
  },
  relatedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 18,
    letterSpacing: -0.1,
  },
  relatedSub: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: 0.3,
  },
  relatedChevron: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.25)',
    lineHeight: 26,
  },
});
