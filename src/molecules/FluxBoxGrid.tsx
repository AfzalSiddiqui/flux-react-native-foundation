import React from 'react';
import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxBorder,
  FluxOpacity,
  FluxTypography,
  useFluxColors,
} from '@anthropic-flux/react-native-ds';
import { FluxIcon, FluxIconSource } from '../atoms/FluxIcon';

export type FluxBoxGridSelectionMode = 'none' | 'single' | 'multi';
export type FluxBoxGridItemSize = 'small' | 'medium' | 'large';

export interface FluxBoxGridItem {
  icon: FluxIconSource;
  label: string;
  color?: string;
}

export interface FluxBoxGridProps {
  items: FluxBoxGridItem[];
  columns?: number;
  selectionMode?: FluxBoxGridSelectionMode;
  selectedIndices?: Set<number>;
  itemSize?: FluxBoxGridItemSize;
  onSelectionChanged?: (indices: Set<number>) => void;
  style?: ViewStyle;
}

const sizeConfig = {
  small: { iconSize: 'small' as const, padding: FluxSpacing.xs, font: FluxTypography.caption },
  medium: { iconSize: 'medium' as const, padding: FluxSpacing.sm, font: FluxTypography.footnote },
  large: { iconSize: 'large' as const, padding: FluxSpacing.md, font: FluxTypography.body },
};

export function FluxBoxGrid({
  items,
  columns = 3,
  selectionMode = 'none',
  selectedIndices = new Set(),
  itemSize = 'medium',
  onSelectionChanged,
  style,
}: FluxBoxGridProps) {
  const colors = useFluxColors();
  const config = sizeConfig[itemSize];

  const handlePress = (index: number) => {
    if (selectionMode === 'none') return;
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

  const rows: FluxBoxGridItem[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View style={[{ gap: FluxSpacing.xs }, style]}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={{ flexDirection: 'row', gap: FluxSpacing.xs }}>
          {row.map((item, colIdx) => {
            const index = rowIdx * columns + colIdx;
            const selected = selectedIndices.has(index);
            return (
              <Pressable
                key={index}
                onPress={() => handlePress(index)}
                style={[
                  styles.cell,
                  {
                    flex: 1,
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                    borderWidth: FluxBorder.thin,
                    borderRadius: FluxRadius.md,
                    padding: config.padding,
                  },
                ]}
              >
                <FluxIcon
                  source={item.icon}
                  size={config.iconSize}
                  color={selected ? colors.onPrimary : (item.color ?? colors.textPrimary)}
                />
                <Text
                  style={[
                    config.font,
                    {
                      color: selected ? colors.onPrimary : colors.textPrimary,
                      marginTop: FluxSpacing.xxs,
                      textAlign: 'center',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
          {/* Fill empty cells in last row */}
          {row.length < columns &&
            Array.from({ length: columns - row.length }).map((_, i) => (
              <View key={`empty-${i}`} style={{ flex: 1 }} />
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
