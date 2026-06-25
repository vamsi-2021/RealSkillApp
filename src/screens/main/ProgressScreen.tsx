import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { IS_TABLET, rf, rs, H_PAD, WIN_WIDTH } from '../../utils/responsive';

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

function StatCard({ item }: { item: StatItem }) {
  return (
    <View style={[styles.statCard, item.accent && styles.statCardAccent]}>
      <View style={styles.statCardHeader}>
        <Text style={[styles.statIcon, { color: item.iconColor }]}>{item.icon}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statSub}>{item.sub}</Text>
    </View>
  );
}

// ─── Activity bar chart ───────────────────────────────────────────────────────

const CHART_BAR_AREA = 160; // height available for bars
const CHART_LABEL_H = 28;   // height for day labels below bars
const BAR_W = Math.min(rs(28), 36);
const BAR_RADIUS = 8;

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

const chartStyles = StyleSheet.create({
  card: {
    backgroundColor: '#0B1627',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_BAR_AREA + CHART_LABEL_H,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: CHART_BAR_AREA + CHART_LABEL_H,
  },
  bar: {
    width: BAR_W,
    borderTopLeftRadius: BAR_RADIUS,
    borderTopRightRadius: BAR_RADIUS,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  segment: {
    width: '100%',
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    height: CHART_LABEL_H - 8,
  },
});

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
      <View style={styles.techniqueTrack}>
        <View style={[styles.techniqueFill, { width: `${pct}%` }]} />
      </View>
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

const certBadgeStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 72,
    height: 88,
    alignItems: 'center',
    opacity: 0.18,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: Colors.accent,
    backgroundColor: 'transparent',
  },
  ribbonLeft: {
    position: 'absolute',
    bottom: 0,
    left: 6,
    width: 22,
    height: 34,
    backgroundColor: Colors.accent,
    borderBottomLeftRadius: 4,
    transform: [{ skewX: '-8deg' }],
  },
  ribbonRight: {
    position: 'absolute',
    bottom: 0,
    right: 6,
    width: 22,
    height: 34,
    backgroundColor: Colors.accent,
    borderBottomRightRadius: 4,
    transform: [{ skewX: '8deg' }],
  },
});

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

// ─── ProgressScreen ───────────────────────────────────────────────────────────

export function ProgressScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const CONTENT_WIDTH = IS_TABLET ? Math.min(WIN_WIDTH * 0.72, 640) : undefined;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: top + 24,
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
            width: CONTENT_WIDTH,
            alignSelf: IS_TABLET ? 'center' : undefined,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* ── Hero header ── */}
        <Text style={styles.breadcrumb}>YOUR PROGRESS</Text>
        <Text style={styles.heroTitle}>Week 14 · On track.</Text>

        {/* ── Stats 2×2 grid ── */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard item={STATS[0]} />
            <StatCard item={STATS[1]} />
          </View>
          <View style={styles.statsRow}>
            <StatCard item={STATS[2]} />
            <StatCard item={STATS[3]} />
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const SCREEN_BG = '#07111C';
const CARD_BG = '#0C1829';
const CARD_BG_ACCENT = '#081B11';
const AMBER = '#F59E0B';

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
    gap: 0,
  },

  // ── Header ──
  breadcrumb: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.8,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: rf(30),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 24,
  },

  // ── Section label ──
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.8,
    marginTop: 28,
    marginBottom: 12,
  },

  // ── Stats grid ──
  statsGrid: {
    gap: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  statCardAccent: {
    backgroundColor: CARD_BG_ACCENT,
    borderColor: 'rgba(34,197,94,0.15)',
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statIcon: {
    fontSize: 14,
    lineHeight: 16,
  },
  statLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.2,
    flexShrink: 1,
  },
  statValue: {
    fontSize: rf(28),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  statSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.38)',
    fontWeight: '500',
  },

  // ── Techniques ──
  techniquesContainer: {
    gap: 10,
  },
  techniqueCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  techniqueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  techniqueTitle: {
    flex: 1,
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  techniqueScore: {
    fontSize: 14,
    fontWeight: '700',
    color: AMBER,
    letterSpacing: 0.2,
    flexShrink: 0,
  },
  techniqueTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  techniqueFill: {
    height: '100%',
    backgroundColor: AMBER,
    borderRadius: 2,
  },

  // ── Certification ──
  certCard: {
    backgroundColor: CARD_BG_ACCENT,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(34,197,94,0.15)',
    marginBottom: 4,
  },
  certContent: {
    gap: 6,
    paddingRight: 80,
  },
  certStatus: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 1.8,
  },
  certTitle: {
    fontSize: rf(20),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    lineHeight: rf(26),
  },
  certSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
  },
});
