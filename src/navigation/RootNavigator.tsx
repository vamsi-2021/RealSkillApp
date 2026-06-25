import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AIChatScreen } from '../screens/ai/AIChatScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export type RootStackParamList = {
  Main: undefined;
  AIChat: { feedItemId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <AuthNavigator />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen
        name="AIChat"
        component={AIChatScreen}
        options={{ animation: 'slide_from_bottom', gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
}
