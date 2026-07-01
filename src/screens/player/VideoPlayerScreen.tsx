import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { buildTabBarStyle } from '../../navigation/MainNavigator';
import { CircleIconButton } from '../../components/common';
import { getLesson } from '../../data/lessonData';
import { rf, rs, WIN_WIDTH, WIN_HEIGHT } from '../../utils/responsive';
import { styles } from './VideoPlayerScreen.styles';

const SW = WIN_WIDTH;
const SH = WIN_HEIGHT;

type Props = NativeStackScreenProps<HomeStackParamList, 'VideoPlayer'>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseDuration(str: string): number {
  const [m, s] = str.split(':').map(Number);
  return m * 60 + (s || 0);
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PauseIcon() {
  return (
    <View style={styles.pauseWrap}>
      <View style={styles.pauseBar} />
      <View style={styles.pauseBar} />
    </View>
  );
}

function FullscreenIcon() {
  const C = 'rgba(255,255,255,0.88)';
  const W = rs(2);
  const L = rs(8);
  return (
    <View style={styles.fsIcon}>
      {/* TL */}
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <View style={{ width: L, height: W, backgroundColor: C }} />
        <View style={{ width: W, height: L, backgroundColor: C }} />
      </View>
      {/* TR */}
      <View style={{ position: 'absolute', top: 0, right: 0, alignItems: 'flex-end' }}>
        <View style={{ width: L, height: W, backgroundColor: C }} />
        <View style={{ width: W, height: L, backgroundColor: C, alignSelf: 'flex-end' }} />
      </View>
      {/* BL */}
      <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <View style={{ width: W, height: L, backgroundColor: C }} />
        <View style={{ width: L, height: W, backgroundColor: C }} />
      </View>
      {/* BR */}
      <View style={{ position: 'absolute', bottom: 0, right: 0, alignItems: 'flex-end' }}>
        <View style={{ width: W, height: L, backgroundColor: C, alignSelf: 'flex-end' }} />
        <View style={{ width: L, height: W, backgroundColor: C }} />
      </View>
    </View>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  const C = 'rgba(255,255,255,0.88)';
  if (muted) {
    return (
      <View style={styles.volIcon}>
        {/* Speaker body */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <View style={{ width: rs(6), height: rs(10), backgroundColor: C, borderRadius: 1 }} />
          <View style={{ width: 0, height: 0, borderTopWidth: rs(7), borderBottomWidth: rs(7), borderLeftWidth: rs(7), borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: C }} />
        </View>
        {/* X slash */}
        <View style={{ position: 'absolute', right: 0, top: 3 }}>
          <Text style={{ fontSize: rf(12), color: C, fontWeight: '800', lineHeight: rf(14) }}>✕</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.volIcon}>
      <View style={{ width: rs(6), height: rs(10), backgroundColor: C, borderRadius: 1 }} />
      <View style={{ width: 0, height: 0, borderTopWidth: rs(7), borderBottomWidth: rs(7), borderLeftWidth: rs(7), borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: C }} />
      {/* Sound waves */}
      <View style={{ gap: 3, justifyContent: 'center' }}>
        <View style={{ width: rs(4), height: rs(1.5), backgroundColor: C, borderRadius: 1, opacity: 0.7 }} />
        <View style={{ width: rs(6), height: rs(1.5), backgroundColor: C, borderRadius: 1 }} />
        <View style={{ width: rs(4), height: rs(1.5), backgroundColor: C, borderRadius: 1, opacity: 0.7 }} />
      </View>
    </View>
  );
}

// ─── Gradient overlays (pseudo-gradient using stacked views) ─────────────────

function TopOverlay() {
  return (
    <View style={styles.topOverlay} pointerEvents="none">
      {Array.from({ length: 8 }, (_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: (SH * 0.3) * (1 - i / 8),
            backgroundColor: 'rgba(0,0,0,0.065)',
          }}
        />
      ))}
    </View>
  );
}

function BottomOverlay() {
  return (
    <View style={styles.bottomOverlay} pointerEvents="none">
      {Array.from({ length: 8 }, (_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: (SH * 0.36) * (1 - i / 8),
            backgroundColor: 'rgba(0,0,0,0.075)',
          }}
        />
      ))}
    </View>
  );
}

// ─── VideoPlayerScreen ────────────────────────────────────────────────────────

export function VideoPlayerScreen({ route, navigation }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const lesson = getLesson(route.params.feedItemId);
  const durationSec = parseDuration(lesson.duration);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [quality, setQuality] = useState<'AUTO' | 'HD' | '720p' | '360p'>('HD');

  const controlsAnim = useRef(new Animated.Value(1)).current;
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const seekBarWidthRef = useRef(SW - 40);
  const isPlayingRef = useRef(false);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // Hide tab bar and status bar while player is open; restore exact style on exit
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    StatusBar.setHidden(true, 'fade');
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: buildTabBarStyle(bottom) });
      StatusBar.setHidden(false, 'fade');
    };
  }, [navigation, bottom]);

  // Simulated playback timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(t => {
          if (t >= durationSec) {
            setIsPlaying(false);
            return durationSec;
          }
          return t + 0.5;
        });
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, durationSec]);

  // ── Controls show / hide ────────────────────────────────────────────────────

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const scheduleHide = () => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      Animated.timing(controlsAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setControlsVisible(false));
    }, 3000);
  };

  const bringUpControls = () => {
    setControlsVisible(true);
    Animated.timing(controlsAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    if (isPlayingRef.current) scheduleHide();
  };

  // Auto-hide when playback starts; bring back controls when paused
  useEffect(() => {
    if (isPlaying) {
      scheduleHide();
    } else {
      clearHideTimer();
      bringUpControls();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => () => clearHideTimer(), []);

  const toggleControls = () => {
    if (controlsVisible) {
      clearHideTimer();
      Animated.timing(controlsAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setControlsVisible(false));
    } else {
      bringUpControls();
    }
  };

  // ── Seek ───────────────────────────────────────────────────────────────────

  const seek = (x: number) => {
    const ratio = Math.max(0, Math.min(1, x / seekBarWidthRef.current));
    setCurrentTime(ratio * durationSec);
    if (isPlayingRef.current) scheduleHide();
  };

  const skip = (secs: number) => {
    setCurrentTime(t => Math.max(0, Math.min(durationSec, t + secs)));
    bringUpControls();
  };

  const cycleQuality = () => {
    setQuality(q => q === 'HD' ? '720p' : q === '720p' ? '360p' : 'HD');
  };

  const progressRatio = durationSec > 0 ? currentTime / durationSec : 0;
  const bufferedRatio = Math.min(1, progressRatio + 0.18);

  return (
    <View style={styles.screen}>
      {/* ── Video content placeholder ── */}
      <View style={StyleSheet.absoluteFillObject}>
        {/* Lesson color as stand-in for video frame */}
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: lesson.bgColor }]}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: lesson.accentColor, opacity: 0.38 },
            ]}
          />
        </View>
        {/* Scan lines */}
        {Array.from({ length: 12 }, (_, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              top: (i / 12) * SH,
              left: 0,
              right: 0,
              height: 1.5,
              backgroundColor: 'rgba(255,255,255,0.018)',
            }}
          />
        ))}
        {/* Global dimming */}
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: 'rgba(0,0,0,0.3)' },
          ]}
        />
      </View>

      {/* ── Tap catcher (falls through to controls overlay) ── */}
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        activeOpacity={1}
        onPress={toggleControls}
      />

      {/* ── Controls overlay ── */}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: controlsAnim }]}
        pointerEvents={controlsVisible ? 'box-none' : 'none'}>

        <TopOverlay />
        <BottomOverlay />

        {/* ── Top bar ── */}
        <View style={[styles.topBar, { paddingTop: top + 10 }]}>
          <CircleIconButton
            glyph="←"
            size={40}
            glyphSize={20}
            glyphStyle={{ lineHeight: rf(22), marginTop: -1 }}
            backgroundColor="rgba(0,0,0,0.45)"
            borderColor="rgba(255,255,255,0.2)"
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.8}
          />

          <View style={styles.titleBlock}>
            <Text style={styles.topTitle} numberOfLines={1}>{lesson.title}</Text>
            <Text style={styles.topMeta}>{lesson.course}  ·  {lesson.level}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMuted(m => !m)}
            style={styles.topActionBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <VolumeIcon muted={muted} />
          </TouchableOpacity>
        </View>

        {/* ── Center playback controls ── */}
        <View style={styles.centerRow}>
          {/* Skip back */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => skip(-15)}
            style={styles.skipBtn}
            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}>
            <Text style={styles.skipArrow}>↺</Text>
            <Text style={styles.skipLabel}>15s</Text>
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsPlaying(p => !p)}
            style={styles.playPauseBtn}>
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <Text style={styles.playGlyph}>▶</Text>
            )}
          </TouchableOpacity>

          {/* Skip forward */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => skip(15)}
            style={styles.skipBtn}
            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}>
            <Text style={styles.skipArrow}>↻</Text>
            <Text style={styles.skipLabel}>15s</Text>
          </TouchableOpacity>
        </View>

        {/* ── Bottom bar ── */}
        <View style={[styles.bottomBar, { paddingBottom: bottom + 18 }]}>
          {/* Seek bar */}
          <View
            style={styles.seekTrack}
            onLayout={e => { seekBarWidthRef.current = e.nativeEvent.layout.width; }}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={e => seek(e.nativeEvent.locationX)}
            onResponderMove={e => seek(e.nativeEvent.locationX)}>
            {/* Rail */}
            <View style={styles.seekRail} />
            {/* Buffered */}
            <View
              style={[
                styles.seekBuffered,
                { width: `${bufferedRatio * 100}%` },
              ]}
            />
            {/* Progress + thumb */}
            <View
              style={[
                styles.seekProgress,
                { width: `${progressRatio * 100}%` },
              ]}>
              <View style={styles.seekThumb} />
            </View>
          </View>

          {/* Time + quality + fullscreen */}
          <View style={styles.seekFooter}>
            <Text style={styles.timeText}>
              {formatTime(currentTime)}
              {'  /  '}
              {formatTime(durationSec)}
            </Text>

            <View style={styles.seekFooterRight}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={cycleQuality}
                style={styles.qualityChip}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                <Text style={styles.qualityText}>{quality}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.fsBtn}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                <FullscreenIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
