import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { CircleIconButton } from '../../components/common';
import { getLesson, LessonData } from '../../data/lessonData';
import { rf, rs } from '../../utils/responsive';
import { styles } from './AIChatScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AIChat'>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
}

// ─── AI response simulation ──────────────────────────────────────────────────

function getAIResponse(userMsg: string, lesson: LessonData | null): string {
  const lower = userMsg.toLowerCase();

  if (lower.includes('explain simply') || (lower.includes('explain') && !lower.includes('example'))) {
    return lesson
      ? `In simple terms:\n\n• ${lesson.takeaways[0]}\n\n• ${lesson.takeaways[1]}\n\nDoes that help clarify things?`
      : "Of course! Let me break that down in simpler language. Which part would you like me to focus on?";
  }
  if (lower.includes('example')) {
    return lesson
      ? `Here's a real-world example from ${lesson.course}:\n\n${lesson.takeaways[2] ?? lesson.takeaways[0]}\n\nThis comes up constantly in ${lesson.category.toLowerCase()} work on the job site.`
      : "Great question — let me pull a practical example from real trade work for you.";
  }
  if (lower.includes('summarize') || lower.includes('summary')) {
    return lesson
      ? `Here's the quick summary:\n\n${lesson.summary}`
      : "Happy to summarize! Which lesson or concept would you like me to condense?";
  }
  if (lower.includes('quiz') || lower.includes('test me') || lower.includes('quiz me')) {
    return lesson
      ? `Let's test your knowledge on ${lesson.course}!\n\n${lesson.takeaways[0].split(' ').slice(0, 6).join(' ')}...\n\nTrue or False — and tell me why. Take your time.`
      : "Ready to quiz you! Head to the lesson and tap \"Take Quiz\" when you're ready, or describe what topic you want tested.";
  }
  if (lower.includes("what's next") || lower.includes('next lesson') || lower.includes('what next')) {
    return lesson
      ? `After this lesson on "${lesson.title}", I'd recommend practicing ${lesson.category.toLowerCase()} on real material before moving on. Check the Path tab — it'll show exactly what's queued up next in the ${lesson.course} series.`
      : "Check the Path tab for your personalized roadmap — it shows what's next based on where you left off.";
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return lesson
      ? `Hey! Great to see you working on ${lesson.course}. Got a question about the lesson, or want me to quiz you or give you a recap?`
      : "Hey! I'm WeldFlow Tutor. Ask me anything about your lessons, techniques, or tools — I'm here to help.";
  }

  return lesson
    ? `Good question. Based on "${lesson.title}":\n\n${lesson.summary.split('.')[0]}.`
    : "That's a solid question. Could you give me a bit more context so I can give you the most helpful answer?";
}

// ─── Initial greeting ────────────────────────────────────────────────────────

function buildGreeting(lesson: LessonData | null): Message {
  const text = lesson
    ? `Hi Sam — I noticed you're working on the ${lesson.course} lesson. Want me to summarize the key concepts, give you a practice scenario, or quiz you on this topic?`
    : "Hi Sam — I'm WeldFlow Tutor, your AI learning assistant. What can I help you with today?";
  return { id: '0', role: 'ai', text };
}

// ─── Mic icon ─────────────────────────────────────────────────────────────────

function MicIcon() {
  const C = 'rgba(255,255,255,0.88)';
  return (
    <View style={{ alignItems: 'center', width: rs(16), height: rs(22) }}>
      <View style={{ width: rs(12), height: rs(14), borderRadius: rs(6), borderWidth: 2, borderColor: C }} />
      <View style={{ marginTop: 2, width: rs(2), height: rs(4), backgroundColor: C, borderRadius: 1 }} />
      <View style={{ width: rs(12), height: rs(2), borderRadius: 1, backgroundColor: C }} />
    </View>
  );
}

// ─── Typing indicator ────────────────────────────────────────────────────────

function TypingBubble({ visible }: { visible: boolean }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      dot1.setValue(0);
      dot2.setValue(0);
      dot3.setValue(0);
      return;
    }
    const anim = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -6, duration: 280, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 280, useNativeDriver: true }),
          Animated.delay(Math.max(0, 560 - delay)),
        ]),
      );
    const animation = Animated.parallel([anim(dot1, 0), anim(dot2, 140), anim(dot3, 280)]);
    animation.start();
    return () => animation.stop();
  }, [visible, dot1, dot2, dot3]);

  if (!visible) return null;
  return (
    <View style={styles.bubbleAI}>
      <View style={styles.typingRow}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.typingDot, { transform: [{ translateY: dot }] }]}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

const Bubble = React.memo(function Bubble({ message }: { message: Message }) {
  const isAI = message.role === 'ai';
  return (
    <View style={[styles.bubbleRow, isAI ? styles.bubbleRowAI : styles.bubbleRowUser]}>
      <View style={[isAI ? styles.bubbleAI : styles.bubbleUser]}>
        <Text style={[styles.bubbleText, !isAI && styles.bubbleTextUser]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
});

// ─── Quick chip ───────────────────────────────────────────────────────────────

const CHIPS = ['Explain simply', 'Give an example', 'Summarize this', 'Quiz me', "What's next?"];

// ─── AIChatScreen ────────────────────────────────────────────────────────────

export function AIChatScreen({ route, navigation }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const lesson = route.params.feedItemId ? getLesson(route.params.feedItemId) : null;

  const [messages, setMessages] = useState<Message[]>([buildGreeting(lesson)]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: getAIResponse(trimmed, lesson),
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 1000 + Math.random() * 700);
  };

  // Scroll to bottom when messages change or typing indicator appears
  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);
  }, [messages, isTyping]);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => <Bubble message={item} />,
    [],
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: top + 10 }]}>
        <CircleIconButton
          glyph="‹"
          size={36}
          glyphSize={26}
          glyphStyle={{ lineHeight: rf(28), marginTop: -2 }}
          backgroundColor="rgba(255,255,255,0.09)"
          borderColor="rgba(255,255,255,0.15)"
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.8}
        />

        <View style={styles.aiAvatar}>
          <Text style={styles.aiAvatarIcon}>✦</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>WeldFlow Tutor</Text>
          <Text style={styles.headerSub}>LESSON-AWARE  ·  CITES SOURCES</Text>
        </View>
      </View>
      <View style={styles.headerDivider} />

      {/* ── Messages ── */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={<TypingBubble visible={isTyping} />}
        ListFooterComponentStyle={styles.typingFooter}
      />

      {/* ── Bottom panel ── */}
      <View style={[styles.bottomPanel, { paddingBottom: bottom + 12 }]}>
        {/* Quick chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          keyboardShouldPersistTaps="handled">
          {CHIPS.map(chip => (
            <TouchableOpacity
              key={chip}
              activeOpacity={0.75}
              onPress={() => sendMessage(chip)}
              style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything about this lesson..."
            placeholderTextColor="rgba(255,255,255,0.32)"
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
            blurOnSubmit={false}
            multiline={false}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {/* mic tap — no-op in prototype */}}
            style={styles.micBtn}>
            <MicIcon />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => sendMessage(input)}
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}>
            <Text style={styles.sendGlyph}>↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
