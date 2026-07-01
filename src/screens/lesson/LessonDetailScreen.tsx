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
import { CircleIconButton } from '../../components/common';
import { getLesson, getLessons } from '../../data/lessonData';
import { rf, WIN_HEIGHT } from '../../utils/responsive';
import { styles } from './LessonDetailScreen.styles';

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
      <CircleIconButton
        glyph="←"
        size={40}
        glyphSize={20}
        glyphStyle={{ lineHeight: rf(22), marginTop: -1 }}
        backgroundColor="rgba(0,0,0,0.55)"
        borderColor="rgba(255,255,255,0.18)"
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', left: 16, top: top + 12 }}
      />
    </View>
  );
}
