import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getQuiz } from '../../data/quizData';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { TAB_BAR_CONTENT_HEIGHT } from '../../navigation/MainNavigator';
import { CircleIconButton, EyebrowLabel } from '../../components/common';
import { rf } from '../../utils/responsive';
import { styles } from './QuizScreen.styles';

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
        <CircleIconButton
          glyph="←"
          size={40}
          glyphSize={18}
          glyphStyle={{ lineHeight: rf(20), marginTop: Platform.OS === 'android' ? -2 : 0 }}
          backgroundColor="rgba(255,255,255,0.08)"
          bordered={false}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.75}
        />
        <View style={styles.headerMeta}>
          <EyebrowLabel fontSize={9.5} numberOfLines={1}>
            {`MASTERY CHECK · ${quiz.category}`}
          </EyebrowLabel>
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
