import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { rf } from '../../utils/responsive';

export interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  subtitle?: string;
  /** Card container override, merged after the default card style. */
  style?: StyleProp<ViewStyle>;
  /** Icon + label row override. */
  headerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

function StatCardBase({
  label,
  value,
  icon,
  subtitle,
  style,
  headerStyle,
  iconStyle,
  labelStyle,
  valueStyle,
  subtitleStyle,
}: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      {icon ? (
        <View style={[styles.headerRow, headerStyle]}>
          <Text style={[styles.icon, iconStyle]}>{icon}</Text>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      ) : (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <Text style={[styles.value, valueStyle]}>{value}</Text>
      {subtitle ? <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: rf(13),
  },
  label: {
    fontSize: rf(10),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.2,
  },
  value: {
    fontSize: rf(26),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: rf(11),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.45)',
  },
});

export const StatCard = React.memo(StatCardBase);
