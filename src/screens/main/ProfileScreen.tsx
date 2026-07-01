import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { styles, iconStyles, exitStyles } from './ProfileScreen.styles';

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

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: top + 32,
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 24,
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

