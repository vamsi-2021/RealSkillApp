import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PathStackParamList } from '../../navigation/PathStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { CircleIconButton, LockIcon, ProgressBar, StatusCircle } from '../../components/common';
import { rf } from '../../utils/responsive';
import { TIERS, LEVEL_COLORS, SubLesson, findTierAndSection } from '../../data/pathData';
import { styles } from './TierDetailScreen.styles';

type Props = NativeStackScreenProps<PathStackParamList, 'TierDetail'>;

// ─── Sub-lesson left icon (numbered circle) ───────────────────────────────────

function LeftIcon({ status, index }: { status: SubLesson['status']; index: number }) {
  if (status === 'completed') {
    return (
      <StatusCircle size={40} backgroundColor={Colors.accent}>
        <Text style={styles.leftCheckmark}>✓</Text>
      </StatusCircle>
    );
  }
  const active = status === 'in_progress';
  return (
    <StatusCircle
      size={40}
      backgroundColor={active ? 'transparent' : 'rgba(255,255,255,0.06)'}
      borderWidth={active ? 2 : undefined}
      borderColor={active ? Colors.accent : undefined}>
      <Text style={[styles.leftNumber, active ? styles.leftNumberActive : styles.leftNumberLocked]}>
        {index + 1}
      </Text>
    </StatusCircle>
  );
}

// ─── Sub-lesson right icon ────────────────────────────────────────────────────

function RightIcon({ status }: { status: SubLesson['status'] }) {
  if (status === 'completed') {
    return (
      <StatusCircle size={28} backgroundColor={Colors.accent}>
        <Text style={styles.rightCheck}>✓</Text>
      </StatusCircle>
    );
  }
  if (status === 'in_progress') {
    return (
      <StatusCircle
        size={28}
        backgroundColor="transparent"
        borderWidth={1.5}
        borderColor="rgba(255,255,255,0.25)">
        <Text style={styles.rightPlay}>▶</Text>
      </StatusCircle>
    );
  }
  return (
    <LockIcon
      size={17}
      shackleColor="rgba(255,255,255,0.25)"
      shackleBorderWidth={2}
      bodyColor="rgba(255,255,255,0.18)"
    />
  );
}

// ─── Shield icon ──────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <View style={styles.shieldOuter}>
      <View style={styles.shieldInner}>
        <Text style={styles.shieldCheck}>✓</Text>
      </View>
    </View>
  );
}

// ─── TierDetailScreen ─────────────────────────────────────────────────────────

export function TierDetailScreen({ route, navigation }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const { tierId, sectionId } = route.params;

  const { tier, section } = findTierAndSection(TIERS, tierId, sectionId);
  const levelColor = LEVEL_COLORS[tier.level];
  const progressPct = Math.round(section.progress * 100);
  const isCompleted = section.status === 'completed';

  const contentContainerStyle = useMemo(
    () => [styles.content, { paddingTop: top + 64, paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24 }],
    [top, bottom],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <Text style={[styles.tierBreadcrumb, { color: levelColor }]}>
              TIER {tier.number} · {tier.level}
            </Text>
            {isCompleted && (
              <StatusCircle size={52} backgroundColor={Colors.accent} style={styles.completedBadgeShadow}>
                <Text style={styles.completedCheck}>✓</Text>
              </StatusCircle>
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
          <ProgressBar
            progress={section.progress}
            height={6}
            trackColor="rgba(255,255,255,0.08)"
            borderRadius={3}
          />
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
      <CircleIconButton
        glyph="←"
        size={38}
        glyphSize={20}
        glyphStyle={{ lineHeight: rf(22), marginTop: -1 }}
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', left: 16, top: top + 12 }}
      />
    </View>
  );
}
