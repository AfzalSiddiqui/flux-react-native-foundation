import React from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { FluxSpacing, useFluxColors } from '@flux-ds/react-native-ds';

export type FluxLoaderSize = 'small' | 'medium' | 'large';

export interface FluxLoaderProps {
  size?: FluxLoaderSize;
  tint?: string;
  /** 0.0 to 1.0 for determinate bar, undefined for spinner */
  progress?: number;
  style?: ViewStyle;
}

const scaleMap: Record<FluxLoaderSize, 'small' | 'large'> = {
  small: 'small',
  medium: 'small',
  large: 'large',
};

export function FluxLoader({ size = 'medium', tint, progress, style }: FluxLoaderProps) {
  const colors = useFluxColors();
  const color = tint ?? colors.primary;

  if (progress !== undefined) {
    const clampedProgress = Math.min(1, Math.max(0, progress));
    return (
      <View style={[styles.barContainer, { backgroundColor: colors.surface }, style]}>
        <View
          style={[
            styles.barFill,
            { width: `${clampedProgress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={[styles.center, style]}>
      <ActivityIndicator
        size={scaleMap[size]}
        color={color}
        accessibilityLabel="Loading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
