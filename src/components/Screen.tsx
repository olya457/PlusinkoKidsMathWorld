import React from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import type {AbstractBackgroundVariant} from '../theme/backgrounds';
import {useChromeInsets} from '../theme/useChromeInsets';
import {useResponsive} from '../theme/useResponsive';
import {AbstractBackground} from './AbstractBackground';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  withTabPadding?: boolean;
  backgroundVariant?: AbstractBackgroundVariant;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  scroll,
  withTabPadding = true,
  backgroundVariant = 'default',
  style,
  contentStyle,
}: ScreenProps) {
  const chrome = useChromeInsets();
  const responsive = useResponsive();
  const contentPadding = {
    paddingTop: chrome.top + (responsive.short ? 10 : 18),
    paddingBottom: withTabPadding ? chrome.tabReserved : chrome.bottomGap + 18,
    paddingHorizontal: responsive.narrow ? 16 : 20,
  };

  if (scroll) {
    return (
      <AbstractBackground variant={backgroundVariant} style={style}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={[
            styles.content,
            contentPadding,
            contentStyle,
          ]}>
          {children}
        </ScrollView>
      </AbstractBackground>
    );
  }

  return (
    <AbstractBackground variant={backgroundVariant} style={style}>
      <View style={[styles.content, contentPadding, contentStyle]}>
        {children}
      </View>
    </AbstractBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
