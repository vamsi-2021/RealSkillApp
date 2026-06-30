import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { rf } from '../../utils/responsive';

interface Props extends TouchableOpacityProps {
  title: string;
  trailingIcon?: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  title,
  trailingIcon,
  loading,
  variant = 'primary',
  style,
  ...props
}: Props) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[styles.base, isPrimary ? styles.primary : styles.secondary, style]}
      activeOpacity={0.85}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.primary} />
      ) : (
        <View style={styles.content}>
          <Text style={[Typography.button, !isPrimary && styles.secondaryText]}>
            {title}
          </Text>
          {trailingIcon && (
            <Text style={[styles.icon, !isPrimary && styles.secondaryText]}>
              {trailingIcon}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: rf(16),
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.primary,
  },
});
