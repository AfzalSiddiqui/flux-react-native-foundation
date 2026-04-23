import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxShadow,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';
import { FluxIcon, FluxIconSource } from '../atoms/FluxIcon';

export type FluxInfoAlignment = 'horizontal' | 'vertical';

export interface FluxInfoViewProps {
  icon: FluxIconSource;
  iconColor?: string;
  title: string;
  description: string;
  alignment?: FluxInfoAlignment;
  style?: ViewStyle;
}

export function FluxInfoView({
  icon,
  iconColor,
  title,
  description,
  alignment = 'horizontal',
  style,
}: FluxInfoViewProps) {
  const colors = useFluxColors();
  const tint = iconColor ?? colors.primary;
  const isHorizontal = alignment === 'horizontal';

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: FluxRadius.md,
          padding: FluxSpacing.md,
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'center' : 'center',
          gap: FluxSpacing.sm,
          ...FluxShadow.small,
        },
        style,
      ]}
    >
      <FluxIcon source={icon} size="large" color={tint} />
      <View style={isHorizontal ? { flex: 1 } : { alignItems: 'center' }}>
        <Text style={[FluxTypography.headline, { color: colors.textPrimary }]}>{title}</Text>
        <Text
          style={[
            FluxTypography.footnote,
            {
              color: colors.textSecondary,
              marginTop: FluxSpacing.xxs,
              textAlign: isHorizontal ? 'left' : 'center',
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
