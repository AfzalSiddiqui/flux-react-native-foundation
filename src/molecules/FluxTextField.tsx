import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxBorder,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export interface FluxTextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  isSecure?: boolean;
  style?: ViewStyle;
}

export function FluxTextField({
  label,
  placeholder,
  value,
  onChangeText,
  errorMessage,
  isSecure = false,
  style,
}: FluxTextFieldProps) {
  const colors = useFluxColors();
  const [focused, setFocused] = useState(false);

  const borderColor = errorMessage
    ? colors.error
    : focused
      ? colors.primary
      : colors.border;

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[FluxTypography.subheadline, { color: colors.textPrimary, marginBottom: FluxSpacing.xs }]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isSecure}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          FluxTypography.body,
          {
            color: colors.textPrimary,
            backgroundColor: colors.surface,
            borderWidth: FluxBorder.medium,
            borderColor,
            borderRadius: FluxRadius.sm,
            paddingVertical: FluxSpacing.sm,
            paddingHorizontal: FluxSpacing.sm,
          },
        ]}
        accessibilityLabel={label}
      />
      {errorMessage ? (
        <Text style={[FluxTypography.caption, { color: colors.error, marginTop: FluxSpacing.xxs }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
