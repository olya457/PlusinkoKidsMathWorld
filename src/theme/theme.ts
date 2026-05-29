import {Platform} from 'react-native';

export const colors = {
  background: '#1a0b35',
  surface: 'rgba(22,16,54,0.9)',
  surfaceSoft: 'rgba(73,55,160,0.82)',
  border: 'rgba(255,255,255,0.24)',
  borderStrong: 'rgba(255,112,202,0.76)',
  text: '#fff8ff',
  muted: '#e7dcff',
  mutedStrong: '#fff0ff',
  pink: '#ff5ab8',
  violet: '#b86cff',
  purple: '#7c4dff',
  green: '#33e68b',
  red: '#ff5f84',
  yellow: '#ffe86a',
  blue: '#55c3ff',
  black: '#000000',
  overlay: 'rgba(7,4,22,0.82)',
};

export const gradients = {
  primary: ['#7d5cff', '#ff5ab8', '#41b9ff'],
  purple: ['#241052', '#8f5dff', '#ff5ab8'],
  green: ['#06452f', '#1fbf77'],
  red: ['#531122', '#b92f57'],
  card: ['rgba(38,25,88,0.94)', 'rgba(18,12,48,0.94)'],
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
    shadowOpacity: 0.36,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 12},
  },
  android: {
    elevation: 10,
  },
  default: {},
});
