import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {onboardingSlides} from '../data/onboarding';
import type {RootStackParamList} from '../navigation/types';
import {useAppState} from '../state/AppStateContext';
import {colors} from '../theme/theme';
import {useChromeInsets} from '../theme/useChromeInsets';
import {useResponsive} from '../theme/useResponsive';
import {cleanAudienceText} from '../utils/displayText';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({navigation}: Props) {
  const [index, setIndex] = useState(0);
  const chrome = useChromeInsets();
  const responsive = useResponsive();
  const {setOnboardingComplete} = useAppState();
  const slide = onboardingSlides[index];
  const compact = responsive.compact;

  const iconSize = useMemo(() => {
    if (responsive.tiny) {
      return 72;
    }

    if (responsive.short) {
      return 80;
    }

    if (responsive.compact) {
      return 88;
    }

    return Math.min(132, Math.max(104, responsive.height * 0.16));
  }, [
    responsive.compact,
    responsive.height,
    responsive.short,
    responsive.tiny,
  ]);

  function finish() {
    setOnboardingComplete(true);
    navigation.replace('Main');
  }

  function goNext() {
    if (index === onboardingSlides.length - 1) {
      finish();
      return;
    }

    setIndex(current => current + 1);
  }

  return (
    <ImageBackground
      source={slide.background}
      resizeMode="cover"
      style={styles.bg}>
      <View
        style={[
          styles.content,
          responsive.narrow && styles.contentNarrow,
          {
            paddingTop: chrome.top + (responsive.short ? 8 : 16),
            paddingBottom: chrome.bottomGap + (responsive.short ? 10 : 18),
          },
        ]}>
        <View
          style={[
            styles.hero,
            responsive.short && styles.heroShort,
            responsive.tiny && styles.heroTiny,
          ]}>
          <Image
            source={slide.icon}
            resizeMode="contain"
            style={[
              styles.slideIcon,
              responsive.short && styles.slideIconShort,
              {width: iconSize, height: iconSize},
            ]}
          />
        </View>

        <View
          style={[
            styles.copy,
            compact && styles.copyCompact,
            responsive.tiny && styles.copyTiny,
          ]}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            style={[
              styles.title,
              compact && styles.titleCompact,
              responsive.tiny && styles.titleTiny,
            ]}>
            {slide.title}
          </Text>
          <Text style={[styles.accent, responsive.short && styles.accentShort]}>
            {cleanAudienceText(slide.accent)}
          </Text>
          <Text
            numberOfLines={responsive.tiny ? 4 : compact ? 5 : 7}
            adjustsFontSizeToFit
            style={[styles.body, responsive.short && styles.bodyShort]}>
            {cleanAudienceText(slide.body)}
          </Text>
        </View>

        <View style={[styles.footer, responsive.short && styles.footerShort]}>
          <View style={styles.dots}>
            {onboardingSlides.map((item, dotIndex) => (
              <View
                key={item.id}
                style={[styles.dot, dotIndex === index && styles.activeDot]}
              />
            ))}
          </View>
          <GradientButton title={slide.button} onPress={goNext} />
          {index < onboardingSlides.length - 1 && (
            <Pressable onPress={finish} hitSlop={12} style={styles.skipWrap}>
              <Text style={styles.skip}>Skip for now</Text>
            </Pressable>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
  },
  contentNarrow: {
    paddingHorizontal: 22,
  },
  hero: {
    minHeight: 210,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heroShort: {
    minHeight: 150,
  },
  heroTiny: {
    minHeight: 118,
  },
  slideIcon: {
    transform: [{translateY: -60}],
  },
  slideIconShort: {
    transform: [{translateY: -44}],
  },
  copy: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  copyCompact: {
    minHeight: 180,
    gap: 10,
  },
  copyTiny: {
    minHeight: 148,
    gap: 7,
  },
  title: {
    color: colors.text,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '900',
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 26,
    lineHeight: 31,
  },
  titleTiny: {
    fontSize: 23,
    lineHeight: 28,
  },
  accent: {
    color: colors.pink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  accentShort: {
    fontSize: 13,
    lineHeight: 18,
  },
  body: {
    color: colors.mutedStrong,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  bodyShort: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    gap: 18,
  },
  footerShort: {
    gap: 12,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
    marginBottom: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.pink,
  },
  skipWrap: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  skip: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
    fontWeight: '700',
  },
});
