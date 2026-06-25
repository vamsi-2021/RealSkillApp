import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { IS_TABLET, rf, H_PAD, WIN_WIDTH } from '../../utils/responsive';

// ─── Mock user data ────────────────────────────────────────────────────────────

const USER = {
  name: 'Sam Carter',
  initials: 'SC',
  role: 'Structural Welder',
  company: 'Ironworks Fabrication',
};

const PROFILE_STATS = [
  { value: '84%', label: 'MASTERY' },
  { value: '14d', label: 'STREAK' },
  { value: '3', label: 'CERTS' },
];

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

// ─── Icon components (no icon library) ───────────────────────────────────────

function BadgeIcon() {
  return (
    <View style={iconStyles.wrapper}>
      <View style={iconStyles.badgeCircle} />
      <View style={iconStyles.ribbonLeft} />
      <View style={iconStyles.ribbonRight} />
    </View>
  );
}

function GearIcon() {
  return (
    <View style={iconStyles.wrapper}>
      <View style={iconStyles.gearOuter}>
        <View style={iconStyles.gearInner} />
        {[0, 45, 90, 135].map(deg => (
          <View
            key={deg}
            style={[iconStyles.gearTooth, { transform: [{ rotate: `${deg}deg` }] }]}
          />
        ))}
      </View>
    </View>
  );
}

function GlobeIcon() {
  return (
    <View style={iconStyles.wrapper}>
      <View style={iconStyles.globeCircle}>
        <View style={iconStyles.globeH} />
        <View style={iconStyles.globeV} />
      </View>
    </View>
  );
}

function A11yIcon() {
  return (
    <View style={iconStyles.wrapper}>
      <View style={iconStyles.a11yHead} />
      <View style={iconStyles.a11yBody} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  wrapper: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Badge / ribbon
  badgeCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  ribbonLeft: {
    position: 'absolute',
    bottom: 0,
    left: 3,
    width: 7,
    height: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
    transform: [{ skewX: '-6deg' }],
  },
  ribbonRight: {
    position: 'absolute',
    bottom: 0,
    right: 3,
    width: 7,
    height: 10,
    backgroundColor: '#fff',
    borderBottomRightRadius: 2,
    transform: [{ skewX: '6deg' }],
  },

  // Gear
  gearOuter: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearInner: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  gearTooth: {
    position: 'absolute',
    width: 3,
    height: 16,
    backgroundColor: '#fff',
    borderRadius: 1.5,
    opacity: 0.9,
  },

  // Globe
  globeCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  globeH: {
    position: 'absolute',
    width: 16,
    height: 1.5,
    backgroundColor: '#fff',
  },
  globeV: {
    position: 'absolute',
    width: 1.5,
    height: 16,
    backgroundColor: '#fff',
  },

  // Accessibility person
  a11yHead: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  a11yBody: {
    width: 13,
    height: 13,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 3,
    position: 'absolute',
    bottom: 0,
    transform: [{ rotate: '10deg' }],
  },
});

// ─── Sign-out icon ─────────────────────────────────────────────────────────────

function ExitIcon() {
  return (
    <View style={exitStyles.root}>
      <View style={exitStyles.bracket} />
      <View style={exitStyles.arrowShaft} />
      <View style={exitStyles.arrowHeadTop} />
      <View style={exitStyles.arrowHeadBottom} />
    </View>
  );
}

const exitStyles = StyleSheet.create({
  root: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bracket: {
    position: 'absolute',
    left: 0,
    width: 2,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 1,
  },
  arrowShaft: {
    position: 'absolute',
    right: 0,
    width: 12,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  arrowHeadTop: {
    position: 'absolute',
    right: 0,
    top: 4,
    width: 7,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateX: 1 }],
  },
  arrowHeadBottom: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 7,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateX: 1 }],
  },
});

// ─── Menu item ────────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'certs',
    title: 'Certifications & badges',
    subtitle: 'AWS D1.1 active · 3G renewal in 41d',
    icon: <BadgeIcon />,
  },
  {
    id: 'goals',
    title: 'Goals & schedule',
    subtitle: '20 min/day · Structural Welder path',
    icon: <GearIcon />,
  },
  {
    id: 'language',
    title: 'Language',
    subtitle: 'English (US)',
    icon: <GlobeIcon />,
  },
  {
    id: 'a11y',
    title: 'Accessibility',
    subtitle: 'Captions on · Reduced motion off',
    icon: <A11yIcon />,
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <TouchableOpacity activeOpacity={0.72} style={styles.menuRow}>
      <View style={styles.menuIcon}>{item.icon}</View>
      <View style={styles.menuBody}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSub} numberOfLines={1}>{item.subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────

export function ProfileScreen() {
  const { logout } = useAuth();
  const { top, bottom } = useSafeAreaInsets();
  const CONTENT_WIDTH = IS_TABLET ? Math.min(WIN_WIDTH * 0.65, 580) : undefined;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: top + 32,
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
            width: CONTENT_WIDTH,
            alignSelf: IS_TABLET ? 'center' : undefined,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* ── Avatar ── */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>{USER.initials}</Text>
          </View>
        </View>

        {/* ── Name + role ── */}
        <Text style={styles.name}>{USER.name}</Text>
        <Text style={styles.role}>{USER.role} · {USER.company}</Text>

        {/* ── Stats row ── */}
        <View style={styles.statsRow}>
          {PROFILE_STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <View style={styles.statDivider} />}
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* ── Menu items ── */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <React.Fragment key={item.id}>
              {i > 0 && <View style={styles.menuDivider} />}
              <MenuRow item={item} />
            </React.Fragment>
          ))}
        </View>

        {/* ── Sign out ── */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logout}
          style={styles.signOutBtn}>
          <ExitIcon />
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SCREEN_BG = '#07111C';
const CARD_BG = '#0C1829';
const AVATAR_SIZE = 88;

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
    alignItems: 'center',
  },

  // ── Avatar ──
  avatarWrapper: {
    marginBottom: 16,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  avatarInitials: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },

  // ── Name / role ──
  name: {
    fontSize: rf(22),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    marginBottom: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.42)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },

  // ── Stats row ──
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 28,
    gap: 4,
  },
  statValue: {
    fontSize: rf(24),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.4,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  // ── Menu card ──
  menuCard: {
    width: '100%',
    backgroundColor: CARD_BG,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 14,
    overflow: 'hidden',
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginLeft: 72,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuBody: {
    flex: 1,
    gap: 3,
  },
  menuTitle: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },
  menuSub: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.28)',
    lineHeight: 24,
    flexShrink: 0,
  },

  // ── Sign out ──
  signOutBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: CARD_BG,
    borderRadius: 18,
    paddingVertical: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.1,
  },
});
