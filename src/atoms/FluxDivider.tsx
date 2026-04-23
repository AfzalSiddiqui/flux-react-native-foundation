import React from 'react';
import { View, ViewStyle } from 'react-native';
import { FluxBorder, useFluxColors } from '@flux-ds/react-native-ds';

export type FluxDividerAxis = 'horizontal' | 'vertical';

export interface FluxDividerProps {
  axis?: FluxDividerAxis;
  color?: string;
  thickness?: number;
  cornerRadius?: number;
  style?: ViewStyle;
}

export function FluxDivider({
  axis = 'horizontal',
  color,
  thickness = FluxBorder.thin,
  cornerRadius = 0,
  style,
}: FluxDividerProps) {
  const colors = useFluxColors();
  const dividerColor = color ?? colors.divider;

  const dividerStyle: ViewStyle =
    axis === 'horizontal'
      ? { width: '100%', height: thickness }
      : { height: '100%', width: thickness };

  return (
    <View
      style={[dividerStyle, { backgroundColor: dividerColor, borderRadius: cornerRadius }, style]}
      accessibilityElementsHidden
    />
  );
}
