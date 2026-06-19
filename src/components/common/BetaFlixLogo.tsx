import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme';

export function BetaFlixLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.orbitOuter}>
        <View style={styles.orbitInner}>
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>
      </View>
      <Text style={styles.logoText}>
        <Text style={styles.logoTextBold}>Beta</Text>
        <Text style={styles.logoTextLight}>Flix</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orbitOuter: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: Colors.accentBlue,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-20deg' }],
  },
  orbitInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 8,
    color: Colors.white,
    marginLeft: 1,
  },
  logoText: {
    fontSize: 24,
    letterSpacing: -0.3,
  },
  logoTextBold: {
    fontWeight: '700',
    color: Colors.primary,
  },
  logoTextLight: {
    fontWeight: '400',
    color: Colors.primary,
  },
});
