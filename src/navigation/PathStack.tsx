import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { PathScreen } from '../screens/main';
import { TierDetailScreen } from '../screens/path/TierDetailScreen';
import { LessonDetailScreen } from '../screens/lesson/LessonDetailScreen';
import { VideoPlayerScreen } from '../screens/player/VideoPlayerScreen';
import { QuizScreen } from '../screens/quiz/QuizScreen';

export type PathStackParamList = {
  PathMain: undefined;
  TierDetail: { tierId: string; sectionId: string };
  LessonDetail: { feedItemId: string };
  VideoPlayer: { feedItemId: string };
  Quiz: { feedItemId: string };
};

const Stack = createNativeStackNavigator<PathStackParamList>();

// Thin adapters cast PathStackParamList props to the shape each screen expects.
function LessonDetailAdapter(props: NativeStackScreenProps<PathStackParamList, 'LessonDetail'>) {
  return <LessonDetailScreen {...(props as any)} />;
}
function VideoPlayerAdapter(props: NativeStackScreenProps<PathStackParamList, 'VideoPlayer'>) {
  return <VideoPlayerScreen {...(props as any)} />;
}
function QuizAdapter(props: NativeStackScreenProps<PathStackParamList, 'Quiz'>) {
  return <QuizScreen {...(props as any)} />;
}

export function PathStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="PathMain" component={PathScreen} />
      <Stack.Screen name="TierDetail" component={TierDetailScreen} />
      <Stack.Screen name="LessonDetail" component={LessonDetailAdapter} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerAdapter} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Quiz" component={QuizAdapter} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}
