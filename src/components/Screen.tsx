import React from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../theme/theme';
import {useChromeInsets} from '../theme/useChromeInsets';
import {useResponsive} from '../theme/useResponsive';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  withTabPadding?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  scroll,
  withTabPadding = true,
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
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[styles.container, style]}
        contentContainerStyle={[styles.content, contentPadding, contentStyle]}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.content, contentPadding, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
