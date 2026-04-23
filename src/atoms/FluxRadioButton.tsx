import React, { useEffect, useRef } from 'react';
import { Pressable, View, Text, Animated, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export type FluxRadioButtonSize = 'small' | 'medium' | 'large';

export interface FluxRadioButtonProps {
  label?: string;
  isSelected: boolean;
  size?: FluxRadioButtonSize;
  color?: string;
  isDisabled?: boolean;
  onSelect?: () => void;
  style?: ViewStyle;
}

const sizeConfig = {
  small: { circle: 16, dot: 8 },
  medium: { circle: 20, dot: 10 },
  large: { circle: 24, dot: 12 },
};

export function FluxRadioButton({
  label,
  isSelected,
  size = 'medium',
  color,
  isDisabled = false,
  onSelect,
  style,
}: FluxRadioButtonProps) {
  const colors = useFluxColors();
  const scale = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const tint = color ?? colors.primary;
  const config = sizeConfig[size];

  useEffect(() => {
    Animated.timing(scale, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  return (
    <Pressable
      onPress={() => !isDisabled && onSelect?.()}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      style={[styles.row, { opacity: isDisabled ? FluxOpacity.disabled : 1 }, style]}
    >
      <View
        style={{
          width: config.circle,
          height: config.circle,
          borderRadius: config.circle / 2,
          borderWidth: 2,
          borderColor: isSelected ? tint : colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: config.dot,
            height: config.dot,
            borderRadius: config.dot / 2,
            backgroundColor: tint,
            transform: [{ scale }],
          }}
        />
      </View>
      {label ? (
        <Text style={[FluxTypography.body, { color: colors.textPrimary, marginLeft: FluxSpacing.xs }]}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
