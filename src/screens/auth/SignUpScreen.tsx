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
import { rf, rs } from '../../utils/responsive';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width >= 768 ? width * 0.6 : width * 0.88;

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      Alert.alert('Terms required', 'Please agree to the Terms and Privacy Policy.');
      return;
    }
    setLoading(true);
    // TODO: wire up auth service
    setTimeout(() => setLoading(false), 1500);
  };

  const handleLogIn = () => {
    navigation.goBack();
  };

  const handleTerms = () => {
    // TODO: navigate to TermsScreen
  };

  const handlePrivacyPolicy = () => {
    // TODO: navigate to PrivacyPolicyScreen
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
              <Text style={Typography.h1}>Create your account</Text>
              <Text style={[Typography.body, styles.subtitle]}>
                It only takes a minute to start learning.
              </Text>
            </View>

            <View style={styles.form}>
              <TextInput
                label="Full name"
                leftIcon="👤"
                placeholder="Jane Smith"
                value={fullName}
                onChangeText={setFullName}
                textContentType="name"
                autoComplete="name"
                autoCapitalize="words"
              />
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
                textContentType="newPassword"
                autoComplete="new-password"
              />
              <TextInput
                label="Confirm password"
                leftIcon="🔒"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
                textContentType="newPassword"
                autoComplete="new-password"
              />
            </View>

            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreedToTerms(prev => !prev)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[Typography.body, styles.termsText]}>
                I agree to the{' '}
                <Text style={Typography.link} onPress={handleTerms}>
                  Terms
                </Text>
                {' '}and{' '}
                <Text style={Typography.link} onPress={handlePrivacyPolicy}>
                  Privacy Policy
                </Text>
                .
              </Text>
            </TouchableOpacity>

            <Button
              title="Create account"
              loading={loading}
              onPress={handleCreateAccount}
              style={styles.createButton}
            />

            <View style={styles.loginRow}>
              <Text style={[Typography.body, styles.loginText]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleLogIn} activeOpacity={0.7}>
                <Text style={Typography.link}>Log in</Text>
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
    width: rs(260),
    height: rs(100),
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
    marginBottom: 20,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  checkbox: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(5),
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    fontSize: rf(12),
    color: Colors.white,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    color: Colors.textSecondary,
  },
  createButton: {
    marginBottom: 20,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: Colors.textSecondary,
  },
});
