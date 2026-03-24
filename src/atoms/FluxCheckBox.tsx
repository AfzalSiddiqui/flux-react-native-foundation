import React, { useEffect, useRef } from 'react';
import { Pressable, View, Text, Animated, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';

export type FluxCheckBoxStyle = 'filled' | 'outlined';
export type FluxCheckBoxSize = 'small' | 'medium' | 'large';

export interface FluxCheckBoxProps {
  isChecked: boolean;
  label?: string;
  checkStyle?: FluxCheckBoxStyle;
  size?: FluxCheckBoxSize;
  color?: string;
  isDisabled?: boolean;
  onToggle?: (checked: boolean) => void;
  style?: ViewStyle;
}

const sizeConfig = {
  small: { box: 16, check: 8, radius: 3 },
  medium: { box: 20, check: 10, radius: 4 },
  large: { box: 24, check: 14, radius: 6 },
};

export function FluxCheckBox({
  isChecked,
  label,
  checkStyle = 'filled',
  size = 'medium',
  color,
  isDisabled = false,
  onToggle,
  style,
}: FluxCheckBoxProps) {
  const colors = useFluxColors();
  const animValue = useRef(new Animated.Value(isChecked ? 1 : 0)).current;
  const tint = color ?? colors.primary;
  const config = sizeConfig[size];

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isChecked ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isChecked]);

  const boxBg = checkStyle === 'filled'
    ? animValue.interpolate({ inputRange: [0, 1], outputRange: ['transparent', tint] })
    : 'transparent';

  const borderColor = isChecked ? tint : colors.border;

  return (
    <Pressable
      onPress={() => !isDisabled && onToggle?.(!isChecked)}
      disabled={isDisabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled: isDisabled }}
      style={[styles.row, { opacity: isDisabled ? FluxOpacity.disabled : 1 }, style]}
    >
      <Animated.View
        style={[
          {
            width: config.box,
            height: config.box,
            borderRadius: config.radius,
            borderWidth: 2,
            borderColor,
            backgroundColor: boxBg,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        {isChecked && (
          <Text style={{ color: checkStyle === 'filled' ? '#FFFFFF' : tint, fontSize: config.check, fontWeight: '700' }}>
            ✓
          </Text>
        )}
      </Animated.View>
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
