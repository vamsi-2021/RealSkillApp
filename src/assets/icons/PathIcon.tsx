import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export function PathIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={9} y={2} width={6} height={5} rx={1} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x={2} y={17} width={6} height={5} rx={1} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x={16} y={17} width={6} height={5} rx={1} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 7v4M5 17v-3h14v3M12 11h7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
