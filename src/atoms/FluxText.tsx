import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { FluxTypography, FluxTypographyKey, useFluxColors } from '@anthropic-flux/react-native-ds';

export type FluxTextStyle =
  | 'largeTitle' | 'title' | 'title2' | 'title3'
  | 'headline' | 'subheadline'
  | 'body' | 'callout' | 'footnote' | 'caption'
  | 'code';

export interface FluxTextSegment {
  text: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikethrough?: boolean;
  color?: string;
  fontSize?: number;
}

export interface FluxTextProps {
  children?: string;
  segments?: FluxTextSegment[];
  textStyle?: FluxTextStyle;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

const secondaryStyles = new Set<FluxTextStyle>(['caption', 'footnote', 'subheadline']);

export function FluxText({
  children,
  segments,
  textStyle = 'body',
  color,
  style,
  numberOfLines,
}: FluxTextProps) {
  const colors = useFluxColors();
  const defaultColor = secondaryStyles.has(textStyle) ? colors.textSecondary : colors.textPrimary;

  const getTypo = (): TextStyle => {
    if (textStyle === 'code') {
      return { ...FluxTypography.body, fontFamily: 'monospace' };
    }
    return FluxTypography[textStyle as FluxTypographyKey] ?? FluxTypography.body;
  };

  const typo = getTypo();

  if (segments && segments.length > 0) {
    return (
      <Text style={[typo, { color: color ?? defaultColor }, style]} numberOfLines={numberOfLines}>
        {segments.map((seg, i) => {
          const segStyle: TextStyle = {};
          if (seg.isBold) segStyle.fontWeight = '700';
          if (seg.isItalic) segStyle.fontStyle = 'italic';
          if (seg.isUnderline) segStyle.textDecorationLine = 'underline';
          if (seg.isStrikethrough) segStyle.textDecorationLine = 'line-through';
          if (seg.color) segStyle.color = seg.color;
          if (seg.fontSize) segStyle.fontSize = seg.fontSize;
          return <Text key={i} style={segStyle}>{seg.text}</Text>;
        })}
      </Text>
    );
  }

  return (
    <Text style={[typo, { color: color ?? defaultColor }, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
