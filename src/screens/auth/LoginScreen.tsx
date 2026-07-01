import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Typography } from '../../theme';
import { styles } from './LoginScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    // Simulate auth — replace with real API call
    setTimeout(() => {
      setLoading(false);
      login();
    }, 1000);
  };

  const handleForgotPassword = () => {
    // TODO: navigate to ForgotPasswordScreen
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentCard}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/BetaFlix_Logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.header}>
              <Text style={Typography.h1}>Welcome back</Text>
              <Text style={[Typography.body, styles.subtitle]}>
                Sign in to continue your BetaFlix learning journey.
              </Text>
            </View>

            <View style={styles.form}>
              <TextInput
                label="Email"
                leftIcon="✉"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
              />
              <TextInput
                label="Password"
                leftIcon="🔒"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                isPassword
                textContentType="password"
                autoComplete="password"
                rightAction={{
                  label: 'Forgot password?',
                  onPress: handleForgotPassword,
                }}
              />
            </View>

            <Button
              title="Log in"
              loading={loading}
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.signupRow}>
              <Text style={[Typography.body, styles.signupText]}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text style={Typography.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

