import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PathStackParamList } from '../../navigation/PathStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { EyebrowLabel, LockIcon, ProgressBar, StatCard, StatusCircle } from '../../components/common';
import { TIERS, LEVEL_COLORS, Section, Tier, getTierStats } from '../../data/pathData';
import { styles } from './PathScreen.styles';

const { totalSections: TOTAL_SECTIONS, masteredSections: MASTERED } = getTierStats(TIERS);

type Props = NativeStackScreenProps<PathStackParamList, 'PathMain'>;

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

// ─── Section card ─────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: Section['status'] }) {
  if (status === 'completed') {
    return (
      <StatusCircle size={44} backgroundColor={Colors.accent}>
        <Text style={styles.iconCheckmark}>✓</Text>
      </StatusCircle>
    );
  }
  if (status === 'in_progress') {
    return (
      <StatusCircle
        size={44}
        backgroundColor="rgba(255,255,255,0.1)"
        borderWidth={StyleSheet.hairlineWidth}
        borderColor="rgba(255,255,255,0.12)">
        <Text style={styles.iconPlay}>▶</Text>
      </StatusCircle>
    );
  }
  return (
    <StatusCircle size={44} backgroundColor="rgba(255,255,255,0.05)">
      <LockIcon />
    </StatusCircle>
  );
}

function SectionCard({
  section,
  tierId,
  onPress,
}: {
  section: Section;
  tierId: string;
  onPress: (tierId: string, sectionId: string) => void;
}) {
  const isLocked = section.status === 'locked';

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 1 : 0.75}
      onPress={() => !isLocked && onPress(tierId, section.id)}
      style={[styles.lessonCard, isLocked && styles.lessonCardLocked]}>
      <View style={styles.lessonRow}>
        <StatusIcon status={section.status} />

        <View style={styles.lessonBody}>
          <Text
            style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}
            numberOfLines={1}>
            {section.title}
          </Text>

          {!isLocked && <ProgressBar progress={section.progress} />}

          {isLocked && <View style={styles.lockedSeparator} />}
        </View>

        {!isLocked && <Text style={styles.chevron}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

// ─── PathScreen ───────────────────────────────────────────────────────────────

export function PathScreen({ navigation }: Props) {
  const { top, bottom } = useSafeAreaInsets();

  const handleSectionPress = useCallback(
    (tierId: string, sectionId: string) => {
      navigation.navigate('TierDetail', { tierId, sectionId });
    },
    [navigation],
  );

  const contentContainerStyle = useMemo(
    () => [
      styles.scrollContent,
      {
        paddingTop: top + 24,
        paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
      },
    ],
    [top, bottom],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <EyebrowLabel style={{ marginBottom: 8 }}>
            SKILL PATH · STRUCTURAL SMAW WELDER
          </EyebrowLabel>
          <Text style={styles.heroTitle}>Your route to AWS-certified.</Text>

          <View style={styles.statsRow}>
            <StatCard label="MASTERED" value={`${MASTERED} / ${TOTAL_SECTIONS}`} />
            <StatCard label="NEXT CERT" value="42d" />
          </View>
        </View>

        {/* ── Tiers ── */}
        <View style={styles.tiersContainer}>
          {TIERS.map((tier, tierIdx) => (
            <View key={tier.id} style={tierIdx > 0 ? styles.tierSpacing : undefined}>
              <TierHeader tier={tier} />
              <View style={styles.lessonsContainer}>
                {tier.sections.map(section => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    tierId={tier.id}
                    onPress={handleSectionPress}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
