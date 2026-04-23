import React from 'react';
import { View, ViewStyle, Animated } from 'react-native';
import { useFluxColors, FluxSpacing } from '@flux-ds/react-native-ds';

export interface FluxPaginationDotsProps {
  count: number;
  activeIndex: number;
  activeDotWidth?: number;
  dotSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  spacing?: number;
  /** Pass an Animated.Value for smooth scroll-based interpolation */
  scrollProgress?: Animated.Value;
  style?: ViewStyle;
}

export function FluxPaginationDots({
  count,
  activeIndex,
  activeDotWidth = 24,
  dotSize = 8,
  activeColor,
  inactiveColor,
  spacing,
  scrollProgress,
  style,
}: FluxPaginationDotsProps) {
  const colors = useFluxColors();
  const gap = spacing ?? FluxSpacing.xs;
  const active = activeColor ?? colors.primary;
  const inactive = inactiveColor ?? colors.border;

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, style]}>
      {Array.from({ length: count }).map((_, i) => {
        if (scrollProgress) {
          const width = scrollProgress.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [dotSize, activeDotWidth, dotSize],
            extrapolate: 'clamp',
          });
          const backgroundColor = scrollProgress.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [inactive, active, inactive],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                width,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor,
                marginHorizontal: gap / 2,
              }}
            />
          );
        }

        const isActive = i === activeIndex;
        return (
          <View
            key={i}
            style={{
              width: isActive ? activeDotWidth : dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: isActive ? active : inactive,
              marginHorizontal: gap / 2,
            }}
          />
        );
      })}
    </View>
  );
}
