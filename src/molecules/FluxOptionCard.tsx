import React from 'react';
import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxBorder,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
  hexToRgba,
} from '@anthropic-flux/react-native-ds';
import { FluxIcon, FluxIconSource } from '../atoms/FluxIcon';

export type FluxOptionSelectionMode = 'single' | 'multi';

export interface FluxOption {
  icon: FluxIconSource;
  label: string;
  subtitle?: string;
}

export interface FluxOptionCardProps {
  options: FluxOption[];
  selectionMode?: FluxOptionSelectionMode;
  selectedIndices: Set<number>;
  onSelectionChanged?: (indices: Set<number>) => void;
  style?: ViewStyle;
}

export function FluxOptionCard({
  options,
  selectionMode = 'single',
  selectedIndices,
  onSelectionChanged,
  style,
}: FluxOptionCardProps) {
  const colors = useFluxColors();

  const handlePress = (index: number) => {
    const next = new Set(selectedIndices);
    if (selectionMode === 'single') {
      next.clear();
      next.add(index);
    } else {
      if (next.has(index)) next.delete(index);
      else next.add(index);
    }
    onSelectionChanged?.(next);
  };

  return (
    <View style={[{ gap: FluxSpacing.xs }, style]}>
      {options.map((option, index) => {
        const selected = selectedIndices.has(index);
        const bgColor = selected
          ? (colors.primary.startsWith('#')
            ? hexToRgba(colors.primary, FluxOpacity.subtle)
            : colors.primary)
          : colors.surface;

        return (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.option,
              {
                backgroundColor: bgColor,
                borderColor: selected ? colors.primary : colors.border,
                borderWidth: selected ? FluxBorder.thick : FluxBorder.thin,
                borderRadius: FluxRadius.md,
                padding: FluxSpacing.md,
              },
            ]}
            accessibilityRole={selectionMode === 'single' ? 'radio' : 'checkbox'}
            accessibilityState={{ selected }}
          >
            <FluxIcon
              source={option.icon}
              size="medium"
              color={selected ? colors.primary : colors.textSecondary}
            />
            <View style={styles.textContainer}>
              <Text style={[FluxTypography.body, { color: colors.textPrimary }]}>{option.label}</Text>
              {option.subtitle ? (
                <Text style={[FluxTypography.caption, { color: colors.textSecondary }]}>
                  {option.subtitle}
                </Text>
              ) : null}
            </View>
            <View style={[styles.indicator, { borderColor: selected ? colors.primary : colors.border }]}>
              {selected && (
                <View
                  style={[
                    selectionMode === 'single' ? styles.radioDot : styles.checkDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FluxSpacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
