import React from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FluxSpacing, useFluxColors } from '@flux-ds/react-native-ds';

export type FluxIconSource =
  | { type: 'ionicon'; name: string }
  | { type: 'asset'; name: string }
  | { type: 'uri'; uri: string };

export type FluxIconSize = 'small' | 'medium' | 'large' | { custom: number };

export interface FluxIconProps {
  source: FluxIconSource;
  size?: FluxIconSize;
  color?: string;
}

const sizeMap = {
  small: FluxSpacing.md,   // 16
  medium: FluxSpacing.lg,  // 24
  large: FluxSpacing.xl,   // 32
};

function resolveSize(size: FluxIconSize): number {
  if (typeof size === 'object') return size.custom;
  return sizeMap[size];
}

export function FluxIcon({ source, size = 'medium', color }: FluxIconProps) {
  const colors = useFluxColors();
  const resolved = resolveSize(size);
  const tint = color ?? colors.textPrimary;

  if (source.type === 'ionicon') {
    return (
      <Ionicons
        name={source.name as keyof typeof Ionicons.glyphMap}
        size={resolved}
        color={tint}
        accessibilityElementsHidden
      />
    );
  }

  if (source.type === 'uri') {
    return (
      <Image
        source={{ uri: source.uri }}
        style={{ width: resolved, height: resolved, tintColor: tint }}
        accessibilityElementsHidden
      />
    );
  }

  // asset type
  return (
    <Image
      source={{ uri: source.name }}
      style={{ width: resolved, height: resolved, tintColor: tint }}
      accessibilityElementsHidden
    />
  );
}
