import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from '../../components/common';
import { Colors, Typography } from '../../theme';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width >= 768 ? width * 0.6 : width * 0.88;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
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
    width: CARD_WIDTH,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 260,
    height: 100,
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
