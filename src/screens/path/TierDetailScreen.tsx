import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PathStackParamList } from '../../navigation/PathStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { rf, H_PAD } from '../../utils/responsive';
import { TIERS, LEVEL_COLORS, SubLesson } from '../../data/pathData';

type Props = NativeStackScreenProps<PathStackParamList, 'TierDetail'>;

// ─── Lock icon ────────────────────────────────────────────────────────────────

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
  wrapper: { alignItems: 'center' },
  shackle: {
    width: 10,
    height: 7,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: -1,
  },
  body: {
    width: 17,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyhole: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

// ─── Sub-lesson left icon (numbered circle) ───────────────────────────────────

function LeftIcon({ status, index }: { status: SubLesson['status']; index: number }) {
  if (status === 'completed') {
    return (
      <View style={[styles.leftCircle, styles.leftCompleted]}>
        <Text style={styles.leftCheckmark}>✓</Text>
      </View>
    );
  }
  const active = status === 'in_progress';
  return (
    <View style={[styles.leftCircle, active ? styles.leftInProgress : styles.leftLocked]}>
      <Text style={[styles.leftNumber, active ? styles.leftNumberActive : styles.leftNumberLocked]}>
        {index + 1}
      </Text>
    </View>
  );
}

// ─── Sub-lesson right icon ────────────────────────────────────────────────────

function RightIcon({ status }: { status: SubLesson['status'] }) {
  if (status === 'completed') {
    return (
      <View style={[styles.rightCircle, styles.rightCompleted]}>
        <Text style={styles.rightCheck}>✓</Text>
      </View>
    );
  }
  if (status === 'in_progress') {
    return (
      <View style={[styles.rightCircle, styles.rightInProgress]}>
        <Text style={styles.rightPlay}>▶</Text>
      </View>
    );
  }
  return <LockIcon />;
}

// ─── Shield icon ──────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <View style={shieldStyles.outer}>
      <View style={shieldStyles.inner}>
        <Text style={shieldStyles.check}>✓</Text>
      </View>
    </View>
  );
}

const shieldStyles = StyleSheet.create({
  outer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  inner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22C55E',
    lineHeight: 11,
    includeFontPadding: false,
  },
});

// ─── TierDetailScreen ─────────────────────────────────────────────────────────

const SCREEN_BG = '#07111C';
const CARD_BG = '#0C1829';

export function TierDetailScreen({ route, navigation }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const { tierId, sectionId } = route.params;

  const tier = TIERS.find(t => t.id === tierId)!;
  const section = tier.sections.find(s => s.id === sectionId)!;
  const levelColor = LEVEL_COLORS[tier.level];
  const progressPct = Math.round(section.progress * 100);
  const isCompleted = section.status === 'completed';

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: top + 64, paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <Text style={[styles.tierBreadcrumb, { color: levelColor }]}>
              TIER {tier.number} · {tier.level}
            </Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedCheck}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionDescription}>{section.description}</Text>
        </View>

        {/* ── Progress card ── */}
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>YOUR PROGRESS</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressPct}>{progressPct}%</Text>
            <Text style={[styles.progressStatus, { color: isCompleted ? Colors.accent : '#F59E0B' }]}>
              {isCompleted ? 'Completed' : progressPct > 0 ? 'In Progress' : 'Not Started'}
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` as any }]} />
          </View>
        </View>

        {/* ── Lessons list ── */}
        <Text style={styles.lessonsLabel}>LESSONS</Text>
        <View style={styles.lessonsList}>
          {section.subLessons.map((sl, idx) => {
            const tappable = sl.status !== 'locked' && !!sl.lessonId;
            const Card = tappable ? TouchableOpacity : View;
            return (
              <Card
                key={sl.id}
                activeOpacity={0.75}
                onPress={tappable ? () => navigation.navigate('LessonDetail', { feedItemId: sl.lessonId! }) : undefined}
                style={styles.lessonCard}>
                <LeftIcon status={sl.status} index={idx} />
                <View style={styles.lessonBody}>
                  <Text
                    style={[
                      styles.lessonTitle,
                      sl.status === 'locked' && styles.lessonTitleLocked,
                    ]}
                    numberOfLines={1}>
                    {idx + 1}. {sl.title}
                  </Text>
                  <View style={styles.durationRow}>
                    <Text style={styles.clockGlyph}>⏱</Text>
                    <Text style={styles.durationText}>{sl.duration}</Text>
                  </View>
                </View>
                <RightIcon status={sl.status} />
              </Card>
            );
          })}
        </View>

        {/* ── Certificate note ── */}
        <View style={styles.certCard}>
          <ShieldIcon />
          <View style={styles.certBody}>
            <Text style={styles.certTitle}>Complete all lessons to master this section</Text>
            <Text style={styles.certSub}>You'll earn your certificate for this tier</Text>
          </View>
        </View>

        {/* ── Continue Learning button ── */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.goBack()}
          style={styles.continueBtn}>
          <Text style={styles.continueBtnText}>Continue Learning</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Back button ── */}
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
    backgroundColor: SCREEN_BG,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: H_PAD,
  },

  // ── Back button ──
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  backArrow: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 22,
    marginTop: -1,
  },

  // ── Header ──
  headerSection: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tierBreadcrumb: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  sectionTitle: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.4,
    lineHeight: rf(32),
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 22,
  },
  completedBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  completedCheck: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 24,
  },

  // ── Progress card ──
  progressCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 28,
    gap: 10,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  progressPct: {
    fontSize: rf(36),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
    lineHeight: rf(42),
  },
  progressStatus: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },

  // ── Lessons ──
  lessonsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  lessonsList: {
    gap: 10,
    marginBottom: 20,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },

  // Left circle
  leftCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  leftCompleted: {
    backgroundColor: Colors.accent,
  },
  leftInProgress: {
    borderWidth: 2,
    borderColor: Colors.accent,
    backgroundColor: 'transparent',
  },
  leftLocked: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  leftCheckmark: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 18,
  },
  leftNumber: {
    fontSize: rf(15),
    fontWeight: '700',
    lineHeight: rf(18),
  },
  leftNumberActive: {
    color: Colors.accent,
  },
  leftNumberLocked: {
    color: 'rgba(255,255,255,0.28)',
  },

  // Lesson body
  lessonBody: {
    flex: 1,
    gap: 5,
  },
  lessonTitle: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  lessonTitleLocked: {
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clockGlyph: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 13,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 0.2,
  },

  // Right circle
  rightCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rightCompleted: {
    backgroundColor: Colors.accent,
  },
  rightInProgress: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'transparent',
  },
  rightCheck: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 13,
    includeFontPadding: false,
  },
  rightPlay: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 10,
    marginLeft: 1,
  },

  // ── Certificate note ──
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 20,
  },
  certBody: {
    flex: 1,
    gap: 4,
  },
  certTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 18,
  },
  certSub: {
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 0.1,
  },

  // ── Continue button ──
  continueBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueBtnText: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
});
