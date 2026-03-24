import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxBorder,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';

export type FluxButtonVariant = 'primary' | 'secondary' | 'destructive';
export type FluxButtonSize = 'small' | 'medium' | 'large';

export interface FluxButtonProps {
  title: string;
  variant?: FluxButtonVariant;
  size?: FluxButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const sizeConfig: Record<FluxButtonSize, { font: TextStyle; paddingV: number; paddingH: number; radius: number }> = {
  small: { font: FluxTypography.footnote, paddingV: FluxSpacing.xs, paddingH: FluxSpacing.sm, radius: FluxRadius.sm },
  medium: { font: FluxTypography.body, paddingV: FluxSpacing.sm, paddingH: FluxSpacing.md, radius: FluxRadius.md },
  large: { font: FluxTypography.headline, paddingV: FluxSpacing.md, paddingH: FluxSpacing.lg, radius: FluxRadius.lg },
};

export function FluxButton({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  isDisabled = false,
  onPress,
  style,
}: FluxButtonProps) {
  const colors = useFluxColors();
  const config = sizeConfig[size];
  const disabled = isDisabled || isLoading;

  const getStyles = (): { container: ViewStyle; text: TextStyle; spinnerColor: string } => {
    switch (variant) {
      case 'primary':
        return {
          container: { backgroundColor: colors.primary },
          text: { color: colors.onPrimary },
          spinnerColor: colors.onPrimary,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: FluxBorder.medium,
            borderColor: colors.primary,
          },
          text: { color: colors.primary },
          spinnerColor: colors.primary,
        };
      case 'destructive':
        return {
          container: { backgroundColor: colors.error },
          text: { color: colors.onError },
          spinnerColor: colors.onError,
        };
    }
  };

  const variantStyles = getStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      style={[
        styles.base,
        variantStyles.container,
        {
          paddingVertical: config.paddingV,
          paddingHorizontal: config.paddingH,
          borderRadius: config.radius,
          opacity: disabled ? FluxOpacity.disabled : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyles.spinnerColor} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            variantStyles.text,
            { fontSize: config.font.fontSize, fontWeight: config.font.fontWeight },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
