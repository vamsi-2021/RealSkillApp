import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { rf } from '../../utils/responsive';

interface Props extends TextInputProps {
  label: string;
  leftIcon?: string;
  rightAction?: {
    label?: string;
    onPress: () => void;
  };
  isPassword?: boolean;
  error?: string;
}

export function TextInput({
  label,
  leftIcon,
  rightAction,
  isPassword,
  error,
  onFocus,
  onBlur,
  ...inputProps
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={Typography.label}>{label}</Text>
        {rightAction && (
          <TouchableOpacity onPress={rightAction.onPress} activeOpacity={0.7}>
            <Text style={Typography.link}>{rightAction.label}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputFocused,
        error ? styles.inputError : null,
      ]}>
        {leftIcon && (
          <Text style={[styles.leftIcon, isFocused && styles.leftIconFocused]}>{leftIcon}</Text>
        )}
        <RNTextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={e => { setIsFocused(true); onFocus?.(e); }}
          onBlur={e => { setIsFocused(false); onBlur?.(e); }}
          {...inputProps}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            activeOpacity={0.7}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 16,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    height: 60,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  leftIcon: {
    fontSize: rf(18),
    marginRight: 12,
    color: Colors.textMuted,
  },
  leftIconFocused: {
    color: Colors.primary,
  },
  input: {
    flex: 1,
    fontSize: rf(16),
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: rf(16),
  },
  errorText: {
    fontSize: rf(12),
    color: Colors.error,
    marginTop: 2,
  },
});
