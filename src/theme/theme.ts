import {Platform} from 'react-native';

export const colors = {
  background: '#05040f',
  surface: '#12111d',
  surfaceSoft: '#1a1828',
  border: 'rgba(255,255,255,0.1)',
  borderStrong: 'rgba(244,73,166,0.7)',
  text: '#ffffff',
  muted: '#8e8a9e',
  mutedStrong: '#c9c5d5',
  pink: '#f449a6',
  violet: '#9838ff',
  purple: '#6722d5',
  green: '#14bf73',
  red: '#f04464',
  yellow: '#ffd60a',
  blue: '#3e8cff',
  black: '#000000',
  overlay: 'rgba(3,2,10,0.78)',
};

export const gradients = {
  primary: ['#9d39ff', '#f449a6'],
  purple: ['#180632', '#9838ff', '#d11c6f'],
  green: ['#073d28', '#115d42'],
  red: ['#431017', '#691a2b'],
  card: ['#171524', '#11101c'],
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
};

export const layout = {
  tabHeight: 76,
  tabMargin: 18,
  tabBottomGap: Platform.OS === 'android' ? 30 : 20,
  androidEdgeGap: 30,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: colors.pink,
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
  },
  android: {
    elevation: 10,
  },
  default: {},
});
