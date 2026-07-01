import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors, DarkColors } from '../../theme';
import { ProgressBar, StatCard } from '../../components/common';
import { styles, chartStyles, certBadgeStyles, AMBER, CHART_BAR_AREA } from './ProgressScreen.styles';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface StatItem {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  sub: string;
  accent: boolean;
}

const STATS: StatItem[] = [
  {
    id: 'streak',
    icon: '◈',
    iconColor: Colors.accent,
    label: 'STREAK',
    value: '14d',
    sub: 'Personal best',
    accent: true,
  },
  {
    id: 'xp',
    icon: '⟐',
    iconColor: 'rgba(255,255,255,0.5)',
    label: 'XP THIS WEEK',
    value: '1,420',
    sub: '+22% vs avg',
    accent: false,
  },
  {
    id: 'mastery',
    icon: '↗',
    iconColor: 'rgba(255,255,255,0.5)',
    label: 'BEAD MASTERY',
    value: '84%',
    sub: '+4 since Monday',
    accent: false,
  },
  {
    id: 'badges',
    icon: '◎',
    iconColor: 'rgba(255,255,255,0.5)',
    label: 'BADGES',
    value: '6',
    sub: '2 new',
    accent: false,
  },
];

interface ActivityDay {
  day: string;
  v: number;
}

const ACTIVITY: ActivityDay[] = [
  { day: 'M', v: 0.35 },
  { day: 'T', v: 0.65 },
  { day: 'W', v: 0.50 },
  { day: 'T', v: 0.83 },
  { day: 'F', v: 0.70 },
  { day: 'S', v: 0.96 },
  { day: 'S', v: 0.80 },
];

interface Technique {
  id: string;
  title: string;
  score: number;
}

const TECHNIQUES: Technique[] = [
  { id: 'r1', title: 'Vertical-up undercut control', score: 0.42 },
  { id: 'r2', title: 'Slag inclusion between passes', score: 0.58 },
  { id: 'r3', title: 'Overhead 4G travel angle', score: 0.64 },
];

// ─── Stat card ────────────────────────────────────────────────────────────────

function ProgressStatCard({ item }: { item: StatItem }) {
  return (
    <StatCard
      label={item.label}
      value={item.value}
      icon={item.icon}
      subtitle={item.sub}
      style={[styles.statCard, item.accent && styles.statCardAccent]}
      headerStyle={styles.statCardHeader}
      iconStyle={[styles.statIcon, { color: item.iconColor }]}
      labelStyle={styles.statLabel}
      valueStyle={styles.statValue}
      subtitleStyle={styles.statSub}
    />
  );
}

// ─── Activity bar chart ───────────────────────────────────────────────────────

function ActivityBar({ value }: { value: number }) {
  const barH = Math.max(12, value * CHART_BAR_AREA);
  return (
    <View style={[chartStyles.bar, { height: barH }]}>
      {/* Top 60% — deep green */}
      <View style={[chartStyles.segment, { flex: 3, backgroundColor: '#166534' }]} />
      {/* Middle 25% — mid green */}
      <View style={[chartStyles.segment, { flex: 1.5, backgroundColor: '#22c55e' }]} />
      {/* Bottom 15% — bright glow */}
      <View style={[chartStyles.segment, { flex: 0.8, backgroundColor: '#4ade80' }]} />
    </View>
  );
}

function ActivityChart() {
  return (
    <View style={chartStyles.card}>
      <View style={chartStyles.barsRow}>
        {ACTIVITY.map((d, i) => (
          <View key={i} style={chartStyles.column}>
            <ActivityBar value={d.v} />
            <Text style={chartStyles.dayLabel}>{d.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Technique card ───────────────────────────────────────────────────────────

function TechniqueCard({ item }: { item: Technique }) {
  const pct = Math.round(item.score * 100);
  return (
    <View style={styles.techniqueCard}>
      <View style={styles.techniqueRow}>
        <Text style={styles.techniqueTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.techniqueScore}>{pct}%</Text>
      </View>
      <ProgressBar progress={item.score} trackColor={DarkColors.hairline} fillColor={AMBER} />
    </View>
  );
}

// ─── Certification card ───────────────────────────────────────────────────────

function CertCard() {
  return (
    <View style={styles.certCard}>
      <View style={styles.certContent}>
        <Text style={styles.certStatus}>ACTIVE</Text>
        <Text style={styles.certTitle}>AWS D1.1 · 3G Plate · SMAW</Text>
        <Text style={styles.certSub}>Renews · Apr 12, 2026</Text>
      </View>
      {/* Decorative badge emblem */}
      <View style={certBadgeStyles.wrapper} pointerEvents="none">
        <View style={certBadgeStyles.circle} />
        <View style={certBadgeStyles.ribbonLeft} />
        <View style={certBadgeStyles.ribbonRight} />
      </View>
    </View>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

// ─── ProgressScreen ───────────────────────────────────────────────────────────

export function ProgressScreen() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: top + 24,
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* ── Hero header ── */}
        <Text style={styles.breadcrumb}>YOUR PROGRESS</Text>
        <Text style={styles.heroTitle}>Week 14 · On track.</Text>

        {/* ── Stats 2×2 grid ── */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <ProgressStatCard item={STATS[0]} />
            <ProgressStatCard item={STATS[1]} />
          </View>
          <View style={styles.statsRow}>
            <ProgressStatCard item={STATS[2]} />
            <ProgressStatCard item={STATS[3]} />
          </View>
        </View>

        {/* ── Activity chart ── */}
        <SectionLabel text="ACTIVITY · LAST 7 DAYS" />
        <ActivityChart />

        {/* ── Techniques to revisit ── */}
        <SectionLabel text="TECHNIQUES TO REVISIT" />
        <View style={styles.techniquesContainer}>
          {TECHNIQUES.map(t => <TechniqueCard key={t.id} item={t} />)}
        </View>

        {/* ── Certifications ── */}
        <SectionLabel text="CERTIFICATIONS" />
        <CertCard />

      </ScrollView>
    </View>
  );
}
