import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { IS_TABLET, rf, rs, H_PAD, WIN_WIDTH } from '../../utils/responsive';

// ─── Data ─────────────────────────────────────────────────────────────────────

type LessonStatus = 'completed' | 'in_progress' | 'locked';
type TierLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface Lesson {
  id: string;
  title: string;
  status: LessonStatus;
  progress: number;
}

interface Tier {
  id: string;
  number: string;
  level: TierLevel;
  lessons: Lesson[];
}

const TIERS: Tier[] = [
  {
    id: 't1',
    number: '01',
    level: 'BEGINNER',
    lessons: [
      { id: 'l1', title: 'Workshop Safety & PPE', status: 'completed', progress: 1 },
      { id: 'l2', title: 'Machine Setup & Polarity', status: 'completed', progress: 1 },
      { id: 'l3', title: 'Striking & Restarting the Arc', status: 'completed', progress: 1 },
    ],
  },
  {
    id: 't2',
    number: '02',
    level: 'INTERMEDIATE',
    lessons: [
      { id: 'l4', title: '1G Flat Stringer Beads', status: 'in_progress', progress: 0.65 },
      { id: 'l5', title: '2G Horizontal Fillet', status: 'in_progress', progress: 0.28 },
      { id: 'l6', title: 'Bead Profile & Inspection', status: 'in_progress', progress: 0 },
    ],
  },
  {
    id: 't3',
    number: '03',
    level: 'ADVANCED',
    lessons: [
      { id: 'l7', title: '3G Vertical-Up Plate', status: 'locked', progress: 0 },
      { id: 'l8', title: '4G Overhead Groove', status: 'locked', progress: 0 },
      { id: 'l9', title: 'AWS D1.1 Plate Certification', status: 'locked', progress: 0 },
    ],
  },
];

const TOTAL_LESSONS = TIERS.reduce((acc, t) => acc + t.lessons.length, 0);
const MASTERED = TIERS.reduce(
  (acc, t) => acc + t.lessons.filter(l => l.status === 'completed').length,
  0,
);

const LEVEL_COLORS: Record<TierLevel, string> = {
  BEGINNER: '#22C55E',
  INTERMEDIATE: '#F59E0B',
  ADVANCED: '#EF4444',
};

// ─── Lock icon (View-based, no icon library needed) ───────────────────────────

function LockIcon() {
  return (
    <View style={lockStyles.wrapper}>
      <View style={lockStyles.shackle} />
      <View style={lockStyles.body}>
        <View style={lockStyles.keyhole} />
      </View>
    </View>
  );
}

const lockStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 0,
  },
  shackle: {
    width: 12,
    height: 8,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.28)',
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: -1,
  },
  body: {
    width: 20,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyhole: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

// ─── Tier header ──────────────────────────────────────────────────────────────

function TierHeader({ tier }: { tier: Tier }) {
  const levelColor = LEVEL_COLORS[tier.level];
  return (
    <View style={styles.tierHeader}>
      <Text style={styles.tierNumber}>TIER {tier.number}</Text>
      <View style={styles.tierLine} />
      <Text style={[styles.tierLevel, { color: levelColor }]}>{tier.level}</Text>
    </View>
  );
}

// ─── Lesson card ──────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: LessonStatus }) {
  if (status === 'completed') {
    return (
      <View style={[styles.iconCircle, styles.iconCompleted]}>
        <Text style={styles.iconCheckmark}>✓</Text>
      </View>
    );
  }
  if (status === 'in_progress') {
    return (
      <View style={[styles.iconCircle, styles.iconInProgress]}>
        <Text style={styles.iconPlay}>▶</Text>
      </View>
    );
  }
  return (
    <View style={[styles.iconCircle, styles.iconLocked]}>
      <LockIcon />
    </View>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const isLocked = lesson.status === 'locked';

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 1 : 0.75}
      style={[styles.lessonCard, isLocked && styles.lessonCardLocked]}>
      <View style={styles.lessonRow}>
        <StatusIcon status={lesson.status} />

        <View style={styles.lessonBody}>
          <Text
            style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}
            numberOfLines={1}>
            {lesson.title}
          </Text>

          {!isLocked && (
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${lesson.progress * 100}%` },
                ]}
              />
            </View>
          )}

          {isLocked && <View style={styles.lockedSeparator} />}
        </View>

        {!isLocked && (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── PathScreen ───────────────────────────────────────────────────────────────

export function PathScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const CONTENT_WIDTH = IS_TABLET ? Math.min(WIN_WIDTH * 0.72, 600) : WIN_WIDTH;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: top + 24,
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
            alignItems: IS_TABLET ? 'center' : undefined,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={[styles.header, { width: IS_TABLET ? CONTENT_WIDTH : undefined }]}>
          <Text style={styles.breadcrumb}>SKILL PATH · STRUCTURAL SMAW WELDER</Text>
          <Text style={styles.heroTitle}>Your route to AWS-certified.</Text>

          <View style={styles.statsRow}>
            <StatCard label="MASTERED" value={`${MASTERED} / ${TOTAL_LESSONS}`} />
            <StatCard label="NEXT CERT" value="42d" />
          </View>
        </View>

        {/* ── Tiers ── */}
        <View style={[styles.tiersContainer, { width: IS_TABLET ? CONTENT_WIDTH : undefined }]}>
          {TIERS.map((tier, tierIdx) => (
            <View key={tier.id} style={tierIdx > 0 ? styles.tierSpacing : undefined}>
              <TierHeader tier={tier} />
              <View style={styles.lessonsContainer}>
                {tier.lessons.map(lesson => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CARD_BG = '#0C1829';
const SCREEN_BG = '#07111C';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: H_PAD,
  },

  // ── Header ──
  header: {
    marginBottom: 28,
  },
  breadcrumb: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: rf(28),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.4,
    lineHeight: rf(34),
    marginBottom: 20,
  },

  // ── Stat cards ──
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 6,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.2,
  },
  statValue: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },

  // ── Tier sections ──
  tiersContainer: {},
  tierSpacing: {
    marginTop: 28,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  tierNumber: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 2,
    flexShrink: 0,
  },
  tierLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tierLevel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    flexShrink: 0,
  },

  // ── Lesson cards ──
  lessonsContainer: {
    gap: 10,
  },
  lessonCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  lessonCardLocked: {
    backgroundColor: 'rgba(12,24,41,0.45)',
    borderColor: 'rgba(255,255,255,0.04)',
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  // ── Status icons ──
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconCompleted: {
    backgroundColor: Colors.accent,
  },
  iconInProgress: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  iconLocked: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  iconCheckmark: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 20,
  },
  iconPlay: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 16,
    marginLeft: 2,
  },

  // ── Lesson body ──
  lessonBody: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  lessonTitle: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  lessonTitleLocked: {
    color: 'rgba(255,255,255,0.28)',
    fontWeight: '600',
  },

  // ── Progress bar ──
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  lockedSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  // ── Chevron ──
  chevron: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.3)',
    lineHeight: 24,
    flexShrink: 0,
    marginRight: 2,
  },
});
