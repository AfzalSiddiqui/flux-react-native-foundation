import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import {
  FluxSpacing,
  FluxTypography,
  useFluxColors,
} from '@flux-ds/react-native-ds';

export interface FluxWebViewProps {
  url: string;
  showProgressBar?: boolean;
  style?: ViewStyle;
}

export function FluxWebView({
  url,
  showProgressBar = true,
  style,
}: FluxWebViewProps) {
  const colors = useFluxColors();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  if (!url) {
    return (
      <View style={[styles.center, style]}>
        <Ionicons name="globe-outline" size={48} color={colors.textSecondary} />
        <Text style={[FluxTypography.body, { color: colors.textSecondary, marginTop: FluxSpacing.sm }]}>
          No URL provided
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, style]}>
        <Ionicons name="warning" size={48} color={colors.error} />
        <Text style={[FluxTypography.body, { color: colors.error, marginTop: FluxSpacing.sm }]}>
          {error}
        </Text>
        <Pressable
          onPress={() => setError(null)}
          style={[styles.retryButton, { borderColor: colors.primary }]}
        >
          <Text style={[FluxTypography.body, { color: colors.primary }]}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {showProgressBar && loading && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress * 100}%`, backgroundColor: colors.primary },
            ]}
          />
        </View>
      )}
      <WebView
        source={{ uri: url }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onError={(syntheticEvent) => {
          setError(syntheticEvent.nativeEvent.description || 'Failed to load page');
          setLoading(false);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: FluxSpacing.lg,
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'transparent',
  },
  progressBar: {
    height: '100%',
  },
  retryButton: {
    marginTop: FluxSpacing.md,
    paddingVertical: FluxSpacing.xs,
    paddingHorizontal: FluxSpacing.md,
    borderWidth: 1,
    borderRadius: 8,
  },
});
