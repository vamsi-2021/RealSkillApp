import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/main';
import { LessonDetailScreen } from '../screens/lesson/LessonDetailScreen';
import { QuizScreen } from '../screens/quiz/QuizScreen';
import { VideoPlayerScreen } from '../screens/player/VideoPlayerScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  LessonDetail: { feedItemId: string };
  VideoPlayer: { feedItemId: string };
  Quiz: { feedItemId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}
