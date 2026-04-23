import React, { ReactNode } from 'react';
import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import {
  FluxSpacing,
  FluxRadius,
  FluxBorder,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';
import { FluxIcon, FluxIconSource } from '../atoms/FluxIcon';

export interface FluxFlapTab {
  title: string;
  icon?: FluxIconSource;
}

export type FluxFlapStyle = 'underlined' | 'filled' | 'pill';

export interface FluxFlapViewProps {
  tabs: FluxFlapTab[];
  selectedIndex: number;
  flapStyle?: FluxFlapStyle;
  onTabChanged?: (index: number) => void;
  children: (index: number) => ReactNode;
  style?: ViewStyle;
}

export function FluxFlapView({
  tabs,
  selectedIndex,
  flapStyle = 'underlined',
  onTabChanged,
  children,
  style,
}: FluxFlapViewProps) {
  const colors = useFluxColors();

  const renderTab = (tab: FluxFlapTab, index: number) => {
    const selected = index === selectedIndex;

    let tabStyle: ViewStyle;
    let textColor: string;

    switch (flapStyle) {
      case 'underlined':
        tabStyle = {
          borderBottomWidth: selected ? 2 : 0,
          borderBottomColor: colors.primary,
          paddingVertical: FluxSpacing.sm,
          paddingHorizontal: FluxSpacing.md,
        };
        textColor = selected ? colors.primary : colors.textSecondary;
        break;
      case 'filled':
        tabStyle = {
          backgroundColor: selected ? colors.primary : 'transparent',
          paddingVertical: FluxSpacing.sm,
          paddingHorizontal: FluxSpacing.md,
        };
        textColor = selected ? colors.onPrimary : colors.textSecondary;
        break;
      case 'pill':
        tabStyle = {
          backgroundColor: selected ? colors.primary : colors.surface,
          borderRadius: FluxRadius.full,
          paddingVertical: FluxSpacing.xs,
          paddingHorizontal: FluxSpacing.md,
          marginHorizontal: FluxSpacing.xxs,
        };
        textColor = selected ? colors.onPrimary : colors.textSecondary;
        break;
    }

    return (
      <Pressable
        key={index}
        onPress={() => onTabChanged?.(index)}
        style={[styles.tab, tabStyle]}
        accessibilityRole="tab"
        accessibilityState={{ selected }}
      >
        {tab.icon && <FluxIcon source={tab.icon} size="small" color={textColor} />}
        <Text style={[FluxTypography.subheadline, { color: textColor, fontWeight: selected ? '600' : '400' }]}>
          {tab.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={style}>
      <View style={[styles.tabBar, flapStyle === 'pill' ? { paddingHorizontal: FluxSpacing.xs } : undefined]}>
        {tabs.map(renderTab)}
      </View>
      <View style={styles.content}>{children(selectedIndex)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: FluxSpacing.xxs,
  },
  content: {
    marginTop: FluxSpacing.sm,
  },
});
