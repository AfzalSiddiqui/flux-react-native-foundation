import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxRadius,
  FluxSpacing,
  useFluxColors,
  hexToRgba,
} from '@flux-ds/react-native-ds';

export type FluxShimmerShape =
  | { type: 'line'; width?: number; height?: number }
  | { type: 'circle'; diameter?: number }
  | { type: 'rectangle'; width?: number | string; height?: number; radius?: number };

export interface FluxShimmerProps {
  shape: FluxShimmerShape;
  isAnimating?: boolean;
  style?: ViewStyle;
}

export function FluxShimmer({ shape, isAnimating = true, style }: FluxShimmerProps) {
  const colors = useFluxColors();
  const phase = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    if (isAnimating) {
      phase.setValue(-1);
      const anim = Animated.loop(
        Animated.timing(phase, { toValue: 1, duration: 1500, useNativeDriver: true }),
      );
      anim.start();
      return () => anim.stop();
    }
  }, [isAnimating]);

  const translateX = phase.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  const borderColor =
    colors.border.startsWith('#') ? hexToRgba(colors.border, 0.3) : colors.border;
  const surfaceColor =
    colors.surface.startsWith('#') ? hexToRgba(colors.surface, 0.6) : colors.surface;

  let shapeStyle: ViewStyle;
  switch (shape.type) {
    case 'line':
      shapeStyle = { width: shape.width ?? 120, height: shape.height ?? 12, borderRadius: 6 };
      break;
    case 'circle':
      const d = shape.diameter ?? 40;
      shapeStyle = { width: d, height: d, borderRadius: d / 2 };
      break;
    case 'rectangle':
      shapeStyle = {
        width: shape.width ?? '100%',
        height: shape.height ?? 80,
        borderRadius: shape.radius ?? FluxRadius.md,
      };
      break;
  }

  return (
    <View style={[shapeStyle, { backgroundColor: borderColor, overflow: 'hidden' }, style]}>
      {isAnimating && (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: surfaceColor,
            width: 200,
            alignSelf: 'center',
            transform: [{ translateX }],
          }}
        />
      )}
    </View>
  );
}

/** Helper: Multi-line text skeleton */
FluxShimmer.TextBlock = function TextBlock({
  lines = 3,
  spacing = FluxSpacing.xs,
}: {
  lines?: number;
  spacing?: number;
}) {
  return (
    <View style={{ gap: spacing }}>
      {Array.from({ length: lines }).map((_, i) => (
        <FluxShimmer
          key={i}
          shape={{ type: 'line', width: i === lines - 1 ? 80 : undefined }}
        />
      ))}
    </View>
  );
};

/** Helper: Full card skeleton */
FluxShimmer.Card = function Card() {
  return (
    <View style={{ gap: FluxSpacing.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: FluxSpacing.sm }}>
        <FluxShimmer shape={{ type: 'circle', diameter: 40 }} />
        <View style={{ flex: 1, gap: FluxSpacing.xxs }}>
          <FluxShimmer shape={{ type: 'line', width: 120 }} />
          <FluxShimmer shape={{ type: 'line', width: 80, height: 10 }} />
        </View>
      </View>
      <FluxShimmer shape={{ type: 'rectangle', height: 120 }} />
      <FluxShimmer.TextBlock lines={3} />
    </View>
  );
};
