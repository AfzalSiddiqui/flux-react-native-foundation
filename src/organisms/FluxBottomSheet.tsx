import React, { useEffect, useRef, ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  FluxSpacing,
  FluxRadius,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export type FluxBottomSheetDetent = 'small' | 'medium' | 'large';

export interface FluxBottomSheetProps {
  isPresented: boolean;
  title?: string;
  detent?: FluxBottomSheetDetent;
  showHandle?: boolean;
  showCloseButton?: boolean;
  isDismissibleByDrag?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

const detentMap: Record<FluxBottomSheetDetent, number> = {
  small: 0.25,
  medium: 0.50,
  large: 0.85,
};

export function FluxBottomSheet({
  isPresented,
  title,
  detent = 'medium',
  showHandle = true,
  showCloseButton = false,
  isDismissibleByDrag = true,
  onDismiss,
  children,
  style,
}: FluxBottomSheetProps) {
  const colors = useFluxColors();
  const screenHeight = Dimensions.get('window').height;
  const sheetHeight = screenHeight * detentMap[detent];
  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const dragOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPresented) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: sheetHeight,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isPresented]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isDismissibleByDrag,
      onMoveShouldSetPanResponder: (_, gesture) =>
        isDismissibleByDrag && gesture.dy > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          dragOffset.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) {
          onDismiss?.();
        }
        Animated.timing(dragOffset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  if (!isPresented) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.overlay, opacity: overlayOpacity },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sheet,
          {
            height: sheetHeight,
            backgroundColor: colors.surface,
            transform: [
              { translateY: Animated.add(translateY, dragOffset) },
            ],
          },
          style,
        ]}
      >
        {showHandle && (
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>
        )}

        {(title || showCloseButton) && (
          <View style={styles.header}>
            <Text
              style={{
                flex: 1,
                fontSize: 17,
                fontWeight: '600',
                color: colors.textPrimary,
              }}
            >
              {title}
            </Text>
            {showCloseButton && (
              <Pressable onPress={onDismiss} hitSlop={8}>
                <Ionicons name="close-circle" size={28} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>
        )}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: FluxRadius.xl,
    borderTopRightRadius: FluxRadius.xl,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: FluxSpacing.xs,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: FluxSpacing.md,
    paddingBottom: FluxSpacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: FluxSpacing.md,
  },
});
