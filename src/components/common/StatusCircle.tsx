import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { rs } from '../../utils/responsive';

export interface StatusCircleProps {
  /** Raw (pre-scaled) circle diameter. */
  size: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Sized circular shell used for completed/in-progress/locked indicators.
 * Deliberately state-agnostic — callers pass their own background/border
 * values and glyph content per state, since the visual contract differs
 * slightly across screens (see PathScreen.StatusIcon vs TierDetailScreen's
 * LeftIcon/RightIcon).
 */
function StatusCircleBase({
  size,
  backgroundColor = 'transparent',
  borderColor,
  borderWidth,
  style,
  children,
}: StatusCircleProps) {
  const dim = rs(size);

  return (
    <View
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor,
          borderColor,
          borderWidth,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export const StatusCircle = React.memo(StatusCircleBase);
