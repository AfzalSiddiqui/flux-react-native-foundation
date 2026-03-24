import { ViewStyle } from 'react-native';

export type FluxSize = 'small' | 'medium' | 'large';

export interface FluxComponentBase {
  style?: ViewStyle;
  testID?: string;
}
