import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const isTablet = width >= 768;

// 375 is the iPhone SE/standard base design width.
// Phones scale up to 15% max; tablets get a fixed 1.4× boost.
const SCALE = isTablet ? 1.4 : Math.min(width / 375, 1.15);

/** Scale a font size to the current screen */
export const sp = (size: number): number => Math.round(size * SCALE);
