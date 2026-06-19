import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CONTENT_WIDTH = Dimensions.get('window').width * 0.6;
import { SafeAreaView } from 'react-native-safe-area-context';
import { BetaFlixLogo, Button, TextInput } from '../../components/common';
import { Colors, Typography } from '../../theme';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    // TODO: wire up auth service
    setTimeout(() => setLoading(false), 1500);
  };

  const handleForgotPassword = () => {
    // TODO: navigate to ForgotPasswordScreen
  };

  const handleSignUp = () => {
    // TODO: navigate to SignUpScreen
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
              <BetaFlixLogo />
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
              trailingIcon="→"
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    width: CONTENT_WIDTH,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    marginBottom: 28,
    gap: 10,
  },
  subtitle: {
    marginTop: 4,
  },
  form: {
    gap: 22,
    marginBottom: 24,
  },
  loginButton: {
    marginBottom: 20,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: Colors.textSecondary,
  },
});
