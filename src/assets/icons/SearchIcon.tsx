import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export function SearchIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m20 20-4.2-4.2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
