import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Colors } from '../../theme';

export interface ProgressBarProps {
  /** 0-1 fraction complete. */
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

function ProgressBarBase({
  progress,
  height = 3,
  trackColor = 'rgba(255,255,255,0.1)',
  fillColor = Colors.accent,
  borderRadius = 2,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  // Round to one decimal place of percent to avoid floating-point string artifacts.
  const pct = `${Math.round(clamped * 1000) / 10}%`;

  return (
    <View
      style={[
        { height, backgroundColor: trackColor, borderRadius, overflow: 'hidden' },
        style,
      ]}>
      <View
        style={{
          height: '100%',
          width: pct as `${number}%`,
          backgroundColor: fillColor,
          borderRadius,
        }}
      />
    </View>
  );
}

export const ProgressBar = React.memo(ProgressBarBase);
