import React from 'react';
import { View, Text, Switch, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export type FluxToggleSize = 'small' | 'medium' | 'large';

export interface FluxToggleProps {
  isOn: boolean;
  label?: string;
  size?: FluxToggleSize;
  tintColor?: string;
  isDisabled?: boolean;
  onToggle?: (value: boolean) => void;
  style?: ViewStyle;
}

const fontMap = {
  small: FluxTypography.footnote,
  medium: FluxTypography.body,
  large: FluxTypography.headline,
};

export function FluxToggle({
  isOn,
  label,
  size = 'medium',
  tintColor,
  isDisabled = false,
  onToggle,
  style,
}: FluxToggleProps) {
  const colors = useFluxColors();
  const tint = tintColor ?? colors.primary;
  const font = fontMap[size];

  return (
    <View style={[styles.row, { opacity: isDisabled ? FluxOpacity.disabled : 1 }, style]}>
      {label ? (
        <Text style={[font, { color: colors.textPrimary, flex: 1 }]}>{label}</Text>
      ) : null}
      <Switch
        value={isOn}
        onValueChange={onToggle}
        disabled={isDisabled}
        trackColor={{ false: colors.border, true: tint }}
        thumbColor="#FFFFFF"
        accessibilityRole="switch"
        accessibilityState={{ checked: isOn, disabled: isDisabled }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
