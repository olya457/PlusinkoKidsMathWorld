import {useWindowDimensions} from 'react-native';

export function useResponsive() {
  const {width, height} = useWindowDimensions();

  return {
    width,
    height,
    narrow: width < 380,
    compact: height < 760,
    short: height < 700,
    tiny: height < 640,
  };
}
