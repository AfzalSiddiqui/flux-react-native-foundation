import React, { ReactNode } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxTypography,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';

export interface FluxFormSectionProps {
  title?: string;
  spacing?: number;
  children: ReactNode;
  style?: ViewStyle;
}

export function FluxFormSection({
  title,
  spacing = FluxSpacing.sm,
  children,
  style,
}: FluxFormSectionProps) {
  const colors = useFluxColors();

  return (
    <View style={style}>
      {title ? (
        <Text
          style={[
            FluxTypography.headline,
            { color: colors.textPrimary, marginBottom: FluxSpacing.xs },
          ]}
        >
          {title}
        </Text>
      ) : null}
      <View style={{ gap: spacing }}>{children}</View>
    </View>
  );
}
