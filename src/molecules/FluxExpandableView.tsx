import React, { useEffect, useRef, ReactNode } from 'react';
import { View, Pressable, Text, Animated, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  FluxSpacing,
  FluxRadius,
  FluxBorder,
  FluxShadow,
  FluxTypography,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';
import { FluxIcon, FluxIconSource } from '../atoms/FluxIcon';

export type FluxExpandableStyle = 'card' | 'plain' | 'bordered';

export interface FluxExpandableViewProps {
  title: string;
  icon?: FluxIconSource;
  isExpanded: boolean;
  expandStyle?: FluxExpandableStyle;
  onToggle?: (expanded: boolean) => void;
  children: ReactNode;
  style?: ViewStyle;
}

export function FluxExpandableView({
  title,
  icon,
  isExpanded,
  expandStyle = 'card',
  onToggle,
  children,
  style,
}: FluxExpandableViewProps) {
  const colors = useFluxColors();
  const rotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const contentHeight = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotation, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentHeight, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isExpanded]);

  const chevronRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const containerStyle = (): ViewStyle => {
    switch (expandStyle) {
      case 'card':
        return {
          backgroundColor: colors.surface,
          borderRadius: FluxRadius.md,
          ...FluxShadow.small,
        };
      case 'bordered':
        return {
          backgroundColor: colors.surface,
          borderRadius: FluxRadius.md,
          borderWidth: FluxBorder.thin,
          borderColor: colors.border,
        };
      case 'plain':
        return { backgroundColor: 'transparent' };
    }
  };

  return (
    <View style={[containerStyle(), style]}>
      <Pressable
        onPress={() => onToggle?.(!isExpanded)}
        style={styles.header}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        {icon && <FluxIcon source={icon} size="medium" color={colors.primary} />}
        <Text style={[FluxTypography.headline, { color: colors.textPrimary, flex: 1, marginLeft: icon ? FluxSpacing.sm : 0 }]}>
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Animated.View>
      </Pressable>
      {isExpanded && (
        <View style={styles.content}>
          {expandStyle === 'plain' && (
            <View style={{ height: FluxBorder.thin, backgroundColor: colors.divider }} />
          )}
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: FluxSpacing.md,
  },
  content: {
    paddingHorizontal: FluxSpacing.md,
    paddingBottom: FluxSpacing.md,
  },
});
