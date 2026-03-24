import React from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  FluxSpacing,
  FluxTypography,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';
import { FluxIcon, FluxIconSource } from '../atoms/FluxIcon';

export interface FluxListRowProps {
  icon?: FluxIconSource;
  iconColor?: string;
  title: string;
  subtitle?: string;
  showChevron?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function FluxListRow({
  icon,
  iconColor,
  title,
  subtitle,
  showChevron = false,
  onPress,
  style,
}: FluxListRowProps) {
  const colors = useFluxColors();

  const content = (
    <View style={[styles.row, style]}>
      {icon && (
        <FluxIcon source={icon} size="medium" color={iconColor ?? colors.primary} />
      )}
      <View style={[styles.textContainer, icon ? { marginLeft: FluxSpacing.sm } : undefined]}>
        <Text style={[FluxTypography.body, { color: colors.textPrimary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[FluxTypography.caption, { color: colors.textSecondary }]}>{subtitle}</Text>
        ) : null}
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
      )}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: FluxSpacing.sm,
    paddingHorizontal: FluxSpacing.md,
  },
  textContainer: {
    flex: 1,
  },
});
