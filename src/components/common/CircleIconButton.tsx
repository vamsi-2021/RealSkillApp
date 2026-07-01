import React from 'react';
import {
  Insets,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { DarkColors } from '../../theme';
import { rf, rs } from '../../utils/responsive';

export interface CircleIconButtonProps {
  /** Glyph rendered in the center, e.g. '←' or '‹'. */
  glyph: string;
  onPress: () => void;
  /** Raw (pre-scaled) circle diameter. */
  size?: number;
  /** Raw (pre-scaled) glyph font size. Defaults to ~half the circle size. */
  glyphSize?: number;
  glyphStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  bordered?: boolean;
  borderColor?: string;
  activeOpacity?: number;
  hitSlop?: Insets;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

function CircleIconButtonBase({
  glyph,
  onPress,
  size = 40,
  glyphSize,
  glyphStyle,
  backgroundColor = DarkColors.overlayScrim,
  bordered = true,
  borderColor = 'rgba(255,255,255,0.15)',
  activeOpacity = 0.8,
  hitSlop,
  style,
  accessibilityLabel = 'Go back',
}: CircleIconButtonProps) {
  const dim = rs(size);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        },
        bordered && { borderWidth: StyleSheet.hairlineWidth, borderColor },
        style,
      ]}>
      <Text style={[{ fontSize: rf(glyphSize ?? size * 0.5), color: '#fff' }, glyphStyle]}>
        {glyph}
      </Text>
    </TouchableOpacity>
  );
}

export const CircleIconButton = React.memo(CircleIconButtonBase);
