import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Rect, Line, Circle, Path, G, Text as SvgText } from 'react-native-svg';
import {
  FluxSpacing,
  FluxRadius,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export type FluxChartType = 'bar' | 'line' | 'pie';

export interface FluxDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface FluxGraphProps {
  chartType: FluxChartType;
  data: FluxDataPoint[];
  title?: string;
  showLabels?: boolean;
  showValues?: boolean;
  barColor?: string;
  lineColor?: string;
  animate?: boolean;
  style?: ViewStyle;
}

const CHART_HEIGHT = 200;
const CHART_WIDTH = 320;

const defaultColors = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#5BC0BE', '#6C63FF', '#F78166'];

export function FluxGraph({
  chartType,
  data,
  title,
  showLabels = true,
  showValues = false,
  barColor,
  lineColor,
  animate = true,
  style,
}: FluxGraphProps) {
  const colors = useFluxColors();
  const progress = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (animate) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [chartType, animate]);

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const renderBar = () => {
    const barWidth = Math.max(20, (CHART_WIDTH - FluxSpacing.md * 2) / data.length - FluxSpacing.xs);
    return (
      <View style={styles.chartContainer}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 30}>
          {data.map((point, i) => {
            const barH = (point.value / maxValue) * (CHART_HEIGHT - 20);
            const x = FluxSpacing.md + i * (barWidth + FluxSpacing.xs);
            const y = CHART_HEIGHT - barH;
            const fill = point.color ?? barColor ?? colors.primary;

            return (
              <G key={i}>
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx={FluxRadius.xs}
                  fill={fill}
                />
                {showValues && (
                  <SvgText
                    x={x + barWidth / 2}
                    y={y - 4}
                    fontSize={10}
                    fill={colors.textSecondary}
                    textAnchor="middle"
                  >
                    {point.value}
                  </SvgText>
                )}
                {showLabels && (
                  <SvgText
                    x={x + barWidth / 2}
                    y={CHART_HEIGHT + 14}
                    fontSize={10}
                    fill={colors.textSecondary}
                    textAnchor="middle"
                  >
                    {point.label}
                  </SvgText>
                )}
              </G>
            );
          })}
        </Svg>
      </View>
    );
  };

  const renderLine = () => {
    const stepX = (CHART_WIDTH - FluxSpacing.md * 2) / Math.max(data.length - 1, 1);
    const points = data.map((point, i) => ({
      x: FluxSpacing.md + i * stepX,
      y: CHART_HEIGHT - 20 - (point.value / maxValue) * (CHART_HEIGHT - 40),
    }));

    const pathD = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    const fill = lineColor ?? colors.primary;

    return (
      <View style={styles.chartContainer}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 30}>
          <Path d={pathD} stroke={fill} strokeWidth={2} fill="none" />
          {points.map((p, i) => (
            <G key={i}>
              <Circle cx={p.x} cy={p.y} r={4} fill={fill} />
              {showValues && (
                <SvgText
                  x={p.x}
                  y={p.y - 8}
                  fontSize={10}
                  fill={colors.textSecondary}
                  textAnchor="middle"
                >
                  {data[i].value}
                </SvgText>
              )}
              {showLabels && (
                <SvgText
                  x={p.x}
                  y={CHART_HEIGHT + 14}
                  fontSize={10}
                  fill={colors.textSecondary}
                  textAnchor="middle"
                >
                  {data[i].label}
                </SvgText>
              )}
            </G>
          ))}
        </Svg>
      </View>
    );
  };

  const renderPie = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const cx = CHART_WIDTH / 2;
    const cy = 100;
    const r = 80;
    let startAngle = -Math.PI / 2;

    const slices = data.map((point, i) => {
      const sweepAngle = (point.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sweepAngle;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = sweepAngle > Math.PI ? 1 : 0;
      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      const fill = point.color ?? defaultColors[i % defaultColors.length];
      startAngle = endAngle;
      return <Path key={i} d={d} fill={fill} />;
    });

    return (
      <View>
        <Svg width={CHART_WIDTH} height={200}>
          {slices}
        </Svg>
        {showLabels && (
          <View style={styles.legend}>
            {data.map((point, i) => (
              <View key={i} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: point.color ?? defaultColors[i % defaultColors.length] },
                  ]}
                />
                <Text style={[FluxTypography.caption, { color: colors.textSecondary }]}>
                  {point.label}{showValues ? ` (${point.value})` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={style}>
      {title && (
        <Text style={[FluxTypography.headline, { color: colors.textPrimary, marginBottom: FluxSpacing.sm }]}>
          {title}
        </Text>
      )}
      {chartType === 'bar' && renderBar()}
      {chartType === 'line' && renderLine()}
      {chartType === 'pie' && renderPie()}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: FluxSpacing.sm,
    paddingHorizontal: FluxSpacing.md,
    marginTop: FluxSpacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FluxSpacing.xxs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
