import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { sp } from './scale';

export const Typography = StyleSheet.create({
  h1: {
    fontSize: sp(32),
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: sp(22),
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  body: {
    fontSize: sp(15),
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: sp(23),
  },
  label: {
    fontSize: sp(14),
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  link: {
    fontSize: sp(14),
    fontWeight: '600',
    color: Colors.primary,
  },
  caption: {
    fontSize: sp(13),
    fontWeight: '400',
    color: Colors.textMuted,
  },
  button: {
    fontSize: sp(16),
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 0.3,
  },
});
