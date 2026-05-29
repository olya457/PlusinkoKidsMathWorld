import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {AbstractBackground} from '../components/AbstractBackground';
import {images} from '../data/assets';
import type {RootStackParamList} from '../navigation/types';
import {useAppState} from '../state/AppStateContext';
import {colors, radii} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({navigation}: Props) {
  const {width} = useWindowDimensions();
  const scale = useRef(new Animated.Value(0.9)).current;
  const float = useRef(new Animated.Value(0)).current;
  const {hydrated, onboardingComplete} = useAppState();

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.04,
            duration: 1050,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.94,
            duration: 1050,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(float, {
            toValue: -10,
            duration: 1200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(float, {
            toValue: 6,
            duration: 1200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [float, scale]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hydrated) {
        return;
      }

      navigation.replace(onboardingComplete ? 'Main' : 'Onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, [hydrated, navigation, onboardingComplete]);

  const cardSize = Math.min(width - 70, 320);

  return (
    <AbstractBackground variant="splash" style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.imageFrame,
            {
              width: cardSize,
              height: cardSize,
              transform: [{translateY: float}, {scale}],
            },
          ]}>
          <Image
            source={images.splashMathWorld}
            resizeMode="cover"
            style={styles.image}
          />
        </Animated.View>
      </View>
    </AbstractBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFrame: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
