import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { rs } from '../../utils/responsive';

export interface LockIconProps {
  /** Raw (pre-scaled) lock-body width; shackle/keyhole are derived as fractions of it. */
  size?: number;
  shackleColor?: string;
  shackleBorderWidth?: number;
  bodyColor?: string;
  keyholeColor?: string;
  style?: StyleProp<ViewStyle>;
}

function LockIconBase({
  size = 20,
  shackleColor = 'rgba(255,255,255,0.28)',
  shackleBorderWidth = 2.5,
  bodyColor = 'rgba(255,255,255,0.22)',
  keyholeColor = 'rgba(0,0,0,0.4)',
  style,
}: LockIconProps) {
  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <View
        style={{
          width: rs(size * 0.6),
          height: rs(size * 0.4),
          borderWidth: shackleBorderWidth,
          borderColor: shackleColor,
          borderBottomWidth: 0,
          borderTopLeftRadius: rs(size * 0.3),
          borderTopRightRadius: rs(size * 0.3),
          marginBottom: -1,
        }}
      />
      <View
        style={{
          width: rs(size),
          height: rs(size * 0.7),
          backgroundColor: bodyColor,
          borderRadius: rs(size * 0.2),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: rs(size * 0.2),
            height: rs(size * 0.2),
            borderRadius: rs(size * 0.1),
            backgroundColor: keyholeColor,
          }}
        />
      </View>
    </View>
  );
}

export const LockIcon = React.memo(LockIconBase);
