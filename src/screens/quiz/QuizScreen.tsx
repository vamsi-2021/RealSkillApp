import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getQuiz } from '../../data/quizData';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { Colors } from '../../theme';
import { rf, rs, H_PAD } from '../../utils/responsive';

type Props = NativeStackScreenProps<HomeStackParamList, 'Quiz'>;

type OptionState = 'default' | 'correct' | 'wrong' | 'neutral';

// ─── Option card ──────────────────────────────────────────────────────────────

function OptionCard({
  letter,
  text,
  state,
  onPress,
}: {
  letter: string;
  text: string;
  state: OptionState;
  onPress: () => void;
}) {
  const isCorrect = state === 'correct';
  const isWrong = state === 'wrong';
  const isAnswered = state !== 'default';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isAnswered ? 1 : 0.72}
      style={[
        styles.option,
        isCorrect && styles.optionCorrect,
        isWrong && styles.optionWrong,
        state === 'neutral' && styles.optionNeutral,
      ]}>
      {/* Letter badge */}
      <View
        style={[
          styles.letterBadge,
          isCorrect && styles.letterBadgeCorrect,
          isWrong && styles.letterBadgeWrong,
        ]}>
        <Text
          style={[
            styles.letterText,
            isCorrect && styles.letterTextCorrect,
            isWrong && styles.letterTextWrong,
          ]}>
          {letter}
        </Text>
      </View>

      {/* Option text */}
      <Text
        style={[
          styles.optionText,
          (isCorrect || isWrong) && styles.optionTextAnswered,
          state === 'neutral' && styles.optionTextNeutral,
        ]}>
        {text}
      </Text>

      {/* Feedback icon */}
      {isCorrect && (
        <View style={[styles.feedbackCircle, styles.feedbackCircleCorrect]}>
          <Text style={styles.feedbackGlyph}>✓</Text>
        </View>
      )}
      {isWrong && (
        <View style={[styles.feedbackCircle, styles.feedbackCircleWrong]}>
          <Text style={styles.feedbackGlyph}>✗</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── Explanation panel ────────────────────────────────────────────────────────

function ExplanationPanel({
  correct,
  xp,
  text,
  isLast,
  totalXP,
}: {
  correct: boolean;
  xp: number;
  text: string;
  isLast: boolean;
  totalXP: number;
}) {
  return (
    <View style={[styles.explanation, correct ? styles.explanationCorrect : styles.explanationWrong]}>
      <View style={styles.explanationHeader}>
        <View style={[styles.explanationBadge, correct ? styles.explanationBadgeCorrect : styles.explanationBadgeWrong]}>
          <Text style={styles.explanationBadgeGlyph}>{correct ? '✓' : '✗'}</Text>
        </View>
        <Text style={[styles.explanationTitle, correct ? styles.explanationTitleCorrect : styles.explanationTitleWrong]}>
          {correct ? `Correct · +${xp} XP` : 'Not quite — review below'}
        </Text>
      </View>
      <Text style={styles.explanationBody}>{text}</Text>
      {isLast && (
        <View style={styles.completionBanner}>
          <Text style={styles.completionText}>
            {'Quiz complete  ·  Total earned: '}
            <Text style={styles.completionXP}>+{totalXP} XP</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── QuizScreen ───────────────────────────────────────────────────────────────

export function QuizScreen({ route, navigation }: Props) {
  const { feedItemId } = route.params;
  const { top, bottom } = useSafeAreaInsets();
  const quiz = getQuiz(feedItemId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  const question = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const isLast = currentIndex === total - 1;
  const isCorrect = selected === question.correctLetter;

  const handleSelect = (letter: string) => {
    if (answered) return;
    setSelected(letter);
    setAnswered(true);
    if (letter === question.correctLetter) {
      setTotalXP(xp => xp + question.xp);
    }
    Animated.spring(footerAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  };

  const handleNext = () => {
    if (isLast) {
      navigation.goBack();
      return;
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setAnswered(false);
      footerAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const getOptionState = (letter: string): OptionState => {
    if (!answered) return 'default';
    if (letter === question.correctLetter) return 'correct';
    if (letter === selected) return 'wrong';
    return 'neutral';
  };

  const FOOTER_H = 72 + TAB_BAR_CONTENT_HEIGHT + bottom;

  const footerTranslate = footerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [FOOTER_H, 0],
  });

  return (
    <View style={styles.screen}>

      {/* ── Header ── */}
      <View
        style={[
          styles.header,
          {
            paddingTop: top + (Platform.OS === 'android' ? 8 : 10),
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerMeta}>
          <Text style={styles.headerBreadcrumb} numberOfLines={1}>
            MASTERY CHECK · {quiz.category}
          </Text>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {quiz.title}
          </Text>
        </View>
      </View>

      {/* ── Progress segments ── */}
      <View style={styles.segmentsRow}>
        {quiz.questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i < currentIndex
                ? styles.segmentDone
                : i === currentIndex
                ? styles.segmentActive
                : styles.segmentPending,
            ]}
          />
        ))}
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: answered ? FOOTER_H + 16 : 32,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Counter */}
          <Text style={styles.counter}>
            QUESTION {String(currentIndex + 1).padStart(2, '0')} OF {String(total).padStart(2, '0')}
          </Text>

          {/* Question text */}
          <Text style={styles.questionText}>{question.question}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {question.options.map(opt => (
              <OptionCard
                key={opt.letter}
                letter={opt.letter}
                text={opt.text}
                state={getOptionState(opt.letter)}
                onPress={() => handleSelect(opt.letter)}
              />
            ))}
          </View>

          {/* Explanation (slides in after answering) */}
          {answered && (
            <ExplanationPanel
              correct={isCorrect}
              xp={question.xp}
              text={question.explanation}
              isLast={isLast}
              totalXP={totalXP + (isCorrect ? 0 : 0)}
            />
          )}
        </Animated.View>
      </ScrollView>

      {/* ── Footer CTA (slides up on answer) ── */}
      <Animated.View
        style={[
          styles.footer,
          {
            paddingBottom: TAB_BAR_CONTENT_HEIGHT + bottom + 12,
            transform: [{ translateY: footerTranslate }],
          },
        ]}
        pointerEvents={answered ? 'auto' : 'none'}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleNext}
          style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>
            {isLast ? 'Next Lesson' : 'Next Question'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.askAIBtn}>
          <Text style={styles.askAIIcon}>✦</Text>
          <Text style={styles.askAIText}>Ask AI</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SCREEN_BG = '#07111C';
const CARD_BG = '#0C1829';
const GREEN = Colors.accent;
const RED = '#EF4444';
const CTA_H = Math.min(rs(56), 64);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: H_PAD,
    paddingBottom: 14,
  },
  backBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  backArrow: {
    fontSize: rf(18),
    color: '#fff',
    lineHeight: rf(20),
    marginTop: Platform.OS === 'android' ? -2 : 0,
  },
  headerMeta: {
    flex: 1,
    gap: 3,
  },
  headerBreadcrumb: {
    fontSize: rf(9.5),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.4,
  },
  headerTitle: {
    fontSize: rf(13),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.1,
  },

  // ── Progress segments ──
  segmentsRow: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: H_PAD,
    marginBottom: 4,
  },
  segment: {
    flex: 1,
    height: 3.5,
    borderRadius: 2,
  },
  segmentActive: {
    backgroundColor: GREEN,
  },
  segmentDone: {
    backgroundColor: GREEN,
    opacity: 0.7,
  },
  segmentPending: {
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  // ── Scroll ──
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: H_PAD,
  },

  // ── Counter + question ──
  counter: {
    fontSize: rf(11),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.8,
    marginTop: 18,
    marginBottom: 10,
  },
  questionText: {
    fontSize: rf(22),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(30),
    letterSpacing: -0.3,
    marginBottom: 24,
  },

  // ── Options ──
  optionsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  optionCorrect: {
    backgroundColor: 'rgba(34,197,94,0.1)',
    borderColor: GREEN,
  },
  optionWrong: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderColor: RED,
  },
  optionNeutral: {
    opacity: 0.55,
  },

  // Letter badge
  letterBadge: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  letterBadgeCorrect: {
    backgroundColor: 'rgba(34,197,94,0.2)',
    borderColor: 'rgba(34,197,94,0.5)',
  },
  letterBadgeWrong: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    borderColor: 'rgba(239,68,68,0.5)',
  },
  letterText: {
    fontSize: rf(12),
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },
  letterTextCorrect: {
    color: GREEN,
  },
  letterTextWrong: {
    color: RED,
  },

  // Option text
  optionText: {
    flex: 1,
    fontSize: rf(15),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  optionTextAnswered: {
    color: '#fff',
  },
  optionTextNeutral: {
    color: 'rgba(255,255,255,0.45)',
  },

  // Feedback icon (right side)
  feedbackCircle: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  feedbackCircleCorrect: {
    backgroundColor: 'rgba(34,197,94,0.2)',
    borderWidth: 1.5,
    borderColor: GREEN,
  },
  feedbackCircleWrong: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    borderWidth: 1.5,
    borderColor: RED,
  },
  feedbackGlyph: {
    fontSize: rf(12),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(14),
  },

  // ── Explanation panel ──
  explanation: {
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
  },
  explanationCorrect: {
    backgroundColor: 'rgba(34,197,94,0.07)',
    borderColor: 'rgba(34,197,94,0.2)',
  },
  explanationWrong: {
    backgroundColor: 'rgba(239,68,68,0.07)',
    borderColor: 'rgba(239,68,68,0.18)',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  explanationBadge: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    flexShrink: 0,
  },
  explanationBadgeCorrect: {
    borderColor: GREEN,
    backgroundColor: 'rgba(34,197,94,0.2)',
  },
  explanationBadgeWrong: {
    borderColor: RED,
    backgroundColor: 'rgba(239,68,68,0.2)',
  },
  explanationBadgeGlyph: {
    fontSize: rf(10),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(12),
  },
  explanationTitle: {
    fontSize: rf(14),
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  explanationTitleCorrect: {
    color: GREEN,
  },
  explanationTitleWrong: {
    color: RED,
  },
  explanationBody: {
    fontSize: rf(14),
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  completionBanner: {
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.12)',
  },
  completionText: {
    fontSize: rf(13),
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
  },
  completionXP: {
    color: GREEN,
    fontWeight: '800',
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: H_PAD,
    paddingTop: 12,
    backgroundColor: SCREEN_BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  nextBtn: {
    flex: 7,
    height: CTA_H,
    backgroundColor: GREEN,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: rf(16),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.1,
  },
  askAIBtn: {
    flex: 3,
    height: CTA_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: 'rgba(10,18,42,0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  askAIIcon: {
    fontSize: rf(16),
    color: '#fff',
    lineHeight: rf(18),
  },
  askAIText: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#fff',
  },
});
