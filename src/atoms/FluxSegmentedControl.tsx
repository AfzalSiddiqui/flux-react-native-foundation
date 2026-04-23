import React from 'react';
import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
  hexToRgba,
} from '@flux-ds/react-native-ds';

export type FluxSegmentedControlSize = 'small' | 'medium' | 'large';
export type FluxSegmentedControlStyle = 'filled' | 'outlined';

export interface FluxSegmentedControlProps {
  items: string[];
  selectedIndex: number;
  size?: FluxSegmentedControlSize;
  segmentStyle?: FluxSegmentedControlStyle;
  isDisabled?: boolean;
  onSelectionChanged?: (index: number) => void;
  style?: ViewStyle;
}

const sizeConfig = {
  small: { font: FluxTypography.footnote, pv: FluxSpacing.xxs, ph: FluxSpacing.xs },
  medium: { font: FluxTypography.body, pv: FluxSpacing.xs, ph: FluxSpacing.sm },
  large: { font: FluxTypography.headline, pv: FluxSpacing.sm, ph: FluxSpacing.md },
};

export function FluxSegmentedControl({
  items,
  selectedIndex,
  size = 'medium',
  segmentStyle = 'filled',
  isDisabled = false,
  onSelectionChanged,
  style,
}: FluxSegmentedControlProps) {
  const colors = useFluxColors();
  const config = sizeConfig[size];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: FluxRadius.sm,
          opacity: isDisabled ? FluxOpacity.disabled : 1,
        },
        style,
      ]}
    >
      {items.map((item, index) => {
        const selected = index === selectedIndex;
        const bgColor = selected
          ? segmentStyle === 'filled'
            ? colors.primary
            : hexToRgba(colors.primary.startsWith('#') ? colors.primary : '#007AFF', 0.1)
          : 'transparent';
        const textColor = selected
          ? segmentStyle === 'filled'
            ? colors.onPrimary
            : colors.primary
          : colors.textSecondary;

        return (
          <Pressable
            key={index}
            onPress={() => !isDisabled && onSelectionChanged?.(index)}
            style={[
              styles.segment,
              {
                backgroundColor: bgColor,
                paddingVertical: config.pv,
                paddingHorizontal: config.ph,
                borderRadius: FluxRadius.xs,
              },
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Text
              style={[
                config.font,
                { color: textColor, textAlign: 'center' },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
