import React, { useEffect, useRef, ReactNode } from 'react';
import { Pressable, Animated, View, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxShadow,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';

export interface FluxCardFlapProps {
  isFlipped: boolean;
  front: ReactNode;
  back: ReactNode;
  flipDuration?: number;
  onFlip?: (flipped: boolean) => void;
  padding?: number;
  cornerRadius?: number;
  style?: ViewStyle;
}

export function FluxCardFlap({
  isFlipped,
  front,
  back,
  flipDuration = 600,
  onFlip,
  padding = FluxSpacing.md,
  cornerRadius = FluxRadius.md,
  style,
}: FluxCardFlapProps) {
  const colors = useFluxColors();
  const anim = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isFlipped ? 1 : 0,
      duration: flipDuration,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontRotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = anim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = anim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  const cardBase: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: cornerRadius,
    padding,
    ...FluxShadow.small,
    backfaceVisibility: 'hidden',
  };

  return (
    <Pressable
      onPress={() => onFlip?.(!isFlipped)}
      accessibilityRole="button"
      accessibilityHint="Tap to flip"
    >
      <View style={style}>
        <Animated.View
          style={[
            cardBase,
            {
              opacity: frontOpacity,
              transform: [{ perspective: 1000 }, { rotateY: frontRotation }],
            },
          ]}
        >
          {front}
        </Animated.View>
        <Animated.View
          style={[
            cardBase,
            StyleSheet.absoluteFill,
            {
              opacity: backOpacity,
              transform: [{ perspective: 1000 }, { rotateY: backRotation }],
            },
          ]}
        >
          {back}
        </Animated.View>
      </View>
    </Pressable>
  );
}
