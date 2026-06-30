import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ProfileScreen,
  ProgressScreen,
  SearchScreen,
} from '../screens/main';
import { HomeStack } from './HomeStack';
import { PathStack } from './PathStack';
import { Colors } from '../theme';
import { IS_TABLET, rf, rs } from '../utils/responsive';
import { HomeIcon } from '../assets/icons/HomeIcon';
import { SearchIcon } from '../assets/icons/SearchIcon';
import { ProgressIcon } from '../assets/icons/ProgressIcon';
import { PathIcon } from '../assets/icons/PathIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';

const TAB_LABEL_SIZE = rf(13) + (IS_TABLET ? 2 : 0);
const TAB_ICON_SIZE = rs(23);

// Visible tab-bar content height (excludes safe-area inset)
export const TAB_BAR_CONTENT_HEIGHT = IS_TABLET ? 72 : 64;

// Returns the exact tab bar style used by MainNavigator so callers can restore it
export function buildTabBarStyle(bottom: number): ViewStyle {
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_CONTENT_HEIGHT + bottom,
    paddingBottom: bottom,
    paddingTop: 0,
    backgroundColor: 'rgba(8, 10, 18, 0.97)',
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
  };
}

export type MainTabParamList = {
  Home: undefined;
  Path: undefined;
  Search: undefined;
  Progress: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabName = 'Home' | 'Path' | 'Search' | 'Progress' | 'Profile';

const TAB_ICON_MAP: Record<TabName, React.ComponentType<{ size?: number; color?: string }>> = {
  Home: HomeIcon,
  Path: PathIcon,
  Search: SearchIcon,
  Progress: ProgressIcon,
  Profile: ProfileIcon,
};

interface TabIconProps {
  label: TabName;
  focused: boolean;
}

function TabIcon({ label, focused }: TabIconProps) {
  const Icon = TAB_ICON_MAP[label];
  const color = focused ? Colors.accent : 'rgba(255,255,255,0.4)';
  return (
    <View style={styles.iconContainer}>
      <Icon size={TAB_ICON_SIZE} color={color} />
      <Text
        style={[styles.labelText, focused && styles.labelActive]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}>
        {label}
      </Text>
    </View>
  );
}

export function MainNavigator() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name as TabName} focused={focused} />
        ),
        tabBarStyle: buildTabBarStyle(bottom),
        tabBarItemStyle: {
          paddingVertical: 0,
          flex: 1,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Path" component={PathStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  labelText: {
    fontSize: TAB_LABEL_SIZE,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
  labelActive: {
    color: Colors.accent,
    fontWeight: '600',
  },
});
