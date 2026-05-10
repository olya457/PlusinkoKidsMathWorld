import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {layout} from './theme';
import {useResponsive} from './useResponsive';

export function useChromeInsets() {
  const insets = useSafeAreaInsets();
  const responsive = useResponsive();
  const tabHeight = responsive.compact ? 68 : layout.tabHeight;
  const top =
    Platform.OS === 'android'
      ? Math.max(insets.top, layout.androidEdgeGap)
      : insets.top;
  const bottomGap =
    Platform.OS === 'android' ? layout.androidEdgeGap : layout.tabBottomGap;

  return {
    top,
    bottomGap,
    tabBottom: bottomGap,
    tabHeight,
    tabReserved: tabHeight + bottomGap + (responsive.compact ? 10 : 18),
  };
}
