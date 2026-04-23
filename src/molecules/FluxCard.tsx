import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxShadow,
  FluxShadowStyle,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export interface FluxCardProps {
  children: ReactNode;
  padding?: number;
  cornerRadius?: number;
  shadow?: FluxShadowStyle;
  style?: ViewStyle;
}

export function FluxCard({
  children,
  padding = FluxSpacing.md,
  cornerRadius = FluxRadius.md,
  shadow = FluxShadow.small,
  style,
}: FluxCardProps) {
  const colors = useFluxColors();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: cornerRadius,
          padding,
          ...shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
