import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
