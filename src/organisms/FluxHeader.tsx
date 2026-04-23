import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export interface FluxHeaderProps {
  title: string;
  subtitle?: string;
  leadingAction?: ReactNode;
  trailingAction?: ReactNode;
  style?: ViewStyle;
}

export function FluxHeader({
  title,
  subtitle,
  leadingAction,
  trailingAction,
  style,
}: FluxHeaderProps) {
  const colors = useFluxColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      <View style={styles.leading}>{leadingAction}</View>
      <View style={styles.center}>
        <Text style={[FluxTypography.title2, { color: colors.textPrimary, textAlign: 'center' }]}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              FluxTypography.subheadline,
              { color: colors.textSecondary, textAlign: 'center', marginTop: FluxSpacing.xxxs },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.trailing}>{trailingAction}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: FluxSpacing.md,
    paddingVertical: FluxSpacing.sm,
  },
  leading: {
    width: 40,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  trailing: {
    width: 40,
    alignItems: 'flex-end',
  },
});
