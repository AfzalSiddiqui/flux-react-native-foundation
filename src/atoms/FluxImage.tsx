import React, { useState } from 'react';
import { Image, Pressable, View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FluxRadius, FluxBorder, useFluxColors } from '@flux-ds/react-native-ds';

export type FluxImageSource =
  | { type: 'system'; name: string }
  | { type: 'asset'; name: string }
  | { type: 'uri'; uri: string };

export type FluxImageSize = 'small' | 'medium' | 'large' | { custom: number } | 'flexible';

export type FluxContentMode = 'cover' | 'contain' | 'stretch' | 'center';

export interface FluxImageProps {
  source: FluxImageSource;
  size?: FluxImageSize;
  contentMode?: FluxContentMode;
  cornerRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const sizeMap = { small: 40, medium: 80, large: 160 };

function resolveSize(size: FluxImageSize): number | undefined {
  if (size === 'flexible') return undefined;
  if (typeof size === 'object') return size.custom;
  return sizeMap[size];
}

export function FluxImage({
  source,
  size = 'medium',
  contentMode = 'cover',
  cornerRadius = FluxRadius.md,
  borderColor,
  borderWidth = 0,
  onPress,
  style,
}: FluxImageProps) {
  const colors = useFluxColors();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const resolved = resolveSize(size);

  const containerStyle: ViewStyle = {
    width: resolved,
    height: resolved,
    borderRadius: cornerRadius,
    overflow: 'hidden',
    ...(borderColor ? { borderColor, borderWidth } : {}),
  };

  const renderContent = () => {
    if (source.type === 'system') {
      return (
        <View style={[styles.center, { width: resolved, height: resolved }]}>
          <Ionicons
            name={source.name as keyof typeof Ionicons.glyphMap}
            size={resolved ? resolved * 0.5 : 40}
            color={colors.textSecondary}
          />
        </View>
      );
    }

    if (failed) {
      return (
        <View style={[styles.center, { width: resolved, height: resolved, backgroundColor: colors.surface }]}>
          <Ionicons name="warning" size={24} color={colors.textSecondary} />
        </View>
      );
    }

    const imageSource = source.type === 'uri' ? { uri: source.uri } : { uri: source.name };

    return (
      <>
        <Image
          source={imageSource}
          style={{ width: resolved ?? '100%', height: resolved ?? '100%' }}
          resizeMode={contentMode}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setFailed(true); setLoading(false); }}
        />
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )}
      </>
    );
  };

  const content = (
    <View style={[containerStyle, style]}>
      {renderContent()}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
