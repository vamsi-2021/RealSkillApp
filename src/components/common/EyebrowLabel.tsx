import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { DarkColors } from '../../theme';
import { rf } from '../../utils/responsive';

export interface EyebrowLabelProps {
  children: string;
  color?: string;
  /** Raw (pre-scaled) font size. */
  fontSize?: number;
  letterSpacing?: number;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

function EyebrowLabelBase({
  children,
  color = DarkColors.textTertiary,
  fontSize = 10,
  letterSpacing = 1.4,
  numberOfLines,
  style,
}: EyebrowLabelProps) {
  return (
    <Text
      style={[
        { fontSize: rf(fontSize), fontWeight: '700', color, letterSpacing },
        style,
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export const EyebrowLabel = React.memo(EyebrowLabelBase);
