import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Colors } from '../../theme';
import { getLesson, LessonData } from '../../data/lessonData';
import { rf, rs } from '../../utils/responsive';

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

function Bubble({ message }: { message: Message }) {
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
}

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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: top + 10 }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

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
        renderItem={({ item }) => <Bubble message={item} />}
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#07111C',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: 'rgba(255,255,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  backArrow: {
    fontSize: rf(26),
    color: '#fff',
    lineHeight: rf(28),
    marginTop: -2,
  },
  aiAvatar: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  aiAvatarIcon: {
    fontSize: rf(18),
    color: '#fff',
    lineHeight: rf(20),
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: rf(17),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
  headerSub: {
    fontSize: rf(10),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: 1.2,
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // ── Messages ──
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bubbleRowAI: {
    justifyContent: 'flex-start',
  },
  bubbleRowUser: {
    justifyContent: 'flex-end',
  },
  bubbleAI: {
    maxWidth: '86%',
    backgroundColor: '#0C1829',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  bubbleUser: {
    maxWidth: '80%',
    backgroundColor: Colors.accent,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  bubbleText: {
    fontSize: rf(15),
    fontWeight: '400',
    color: '#fff',
    lineHeight: rf(23),
    letterSpacing: -0.1,
  },
  bubbleTextUser: {
    fontWeight: '500',
  },

  // ── Typing indicator ──
  typingFooter: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  typingRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  // ── Bottom panel ──
  bottomPanel: {
    backgroundColor: '#07111C',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 10,
    gap: 10,
  },
  chipsRow: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  chipText: {
    fontSize: rf(13),
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 18,
    fontSize: rf(15),
    color: '#fff',
  },
  micBtn: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  sendBtnDisabled: {
    backgroundColor: 'rgba(34,197,94,0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendGlyph: {
    fontSize: rf(20),
    fontWeight: '700',
    color: '#fff',
    lineHeight: rf(22),
    marginTop: -1,
  },
});
