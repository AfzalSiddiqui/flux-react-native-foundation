import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  FluxSpacing,
  FluxRadius,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
  hexToRgba,
} from '@flux-ds/react-native-ds';

export type FluxAlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface FluxAlertViewProps {
  variant?: FluxAlertVariant;
  title: string;
  message?: string;
  isDismissible?: boolean;
  isVisible?: boolean;
  onDismiss?: () => void;
  style?: ViewStyle;
}

const variantIcons: Record<FluxAlertVariant, string> = {
  info: 'information-circle',
  success: 'checkmark-circle',
  warning: 'warning',
  error: 'close-circle',
};

export function FluxAlertView({
  variant = 'info',
  title,
  message,
  isDismissible = false,
  isVisible = true,
  onDismiss,
  style,
}: FluxAlertViewProps) {
  const colors = useFluxColors();
  const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const variantColorMap: Record<FluxAlertVariant, string> = {
    info: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  const variantColor = variantColorMap[variant];
  const bgColor = variantColor.startsWith('#')
    ? hexToRgba(variantColor, FluxOpacity.light)
    : variantColor;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderLeftColor: variantColor,
          borderRadius: FluxRadius.sm,
          opacity,
        },
        style,
      ]}
    >
      <Ionicons
        name={variantIcons[variant] as keyof typeof Ionicons.glyphMap}
        size={20}
        color={variantColor}
      />
      <View style={styles.textContainer}>
        <Text style={[FluxTypography.headline, { color: colors.textPrimary }]}>{title}</Text>
        {message ? (
          <Text style={[FluxTypography.footnote, { color: colors.textSecondary, marginTop: FluxSpacing.xxs }]}>
            {message}
          </Text>
        ) : null}
      </View>
      {isDismissible && (
        <Pressable onPress={onDismiss} hitSlop={8}>
          <Ionicons name="close" size={18} color={colors.textSecondary} />
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: FluxSpacing.md,
    borderLeftWidth: 4,
    gap: FluxSpacing.sm,
  },
  textContainer: {
    flex: 1,
  },
});
