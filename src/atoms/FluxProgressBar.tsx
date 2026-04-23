import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useFluxColors, FluxRadius } from '@anthropic-flux/react-native-ds';

export interface FluxProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  trackColor?: string;
  progressColor?: string;
  borderRadius?: number;
  style?: ViewStyle;
}

export function FluxProgressBar({
  progress,
  height = 8,
  trackColor,
  progressColor,
  borderRadius,
  style,
}: FluxProgressBarProps) {
  const colors = useFluxColors();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const radius = borderRadius ?? FluxRadius.full;

  return (
    <View
      style={[
        {
          height,
          backgroundColor: trackColor ?? colors.border,
          borderRadius: radius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: '100%',
          width: `${clampedProgress * 100}%`,
          backgroundColor: progressColor ?? colors.primary,
          borderRadius: radius,
        }}
      />
    </View>
  );
}
