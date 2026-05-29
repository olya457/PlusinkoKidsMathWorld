import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, layout, radii, shadow} from '../theme/theme';
import {useChromeInsets} from '../theme/useChromeInsets';
import {useResponsive} from '../theme/useResponsive';

const labels: Record<string, {emoji: string; title: string}> = {
  Quiz: {emoji: '🧠', title: 'Quiz'},
  Tips: {emoji: '✨', title: 'Tips'},
  Blog: {emoji: '📖', title: 'Blog'},
  Game: {emoji: '🎮', title: 'Game'},
  Walls: {emoji: '⭐', title: 'Walls'},
};

export function FloatingTabBar({state, navigation}: BottomTabBarProps) {
  const chrome = useChromeInsets();
  const responsive = useResponsive();

  return (
    <View
      style={[
        styles.wrap,
        responsive.narrow && styles.wrapNarrow,
        {
          bottom: chrome.tabBottom,
          height: chrome.tabHeight,
        },
      ]}>
      <View style={[styles.bar, responsive.compact && styles.barCompact]}>
        {state.routes.map((route, index) => {
          const active = state.index === index;
          const item = labels[route.name] ?? {emoji: '•', title: route.name};

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={active ? {selected: true} : {}}
              onPress={() => navigation.navigate(route.name)}
              style={styles.item}>
              <View
                style={[
                  styles.iconWrap,
                  responsive.compact && styles.iconWrapCompact,
                  active && styles.iconWrapActive,
                ]}>
                <Text
                  style={[
                    styles.emoji,
                    responsive.compact && styles.emojiCompact,
                    active && styles.emojiActive,
                  ]}>
                  {item.emoji}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.label,
                  responsive.compact && styles.labelCompact,
                  active && styles.labelActive,
                ]}>
                {item.title}
              </Text>
              <View style={[styles.dot, active && styles.dotActive]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: layout.tabMargin,
    right: layout.tabMargin,
  },
  wrapNarrow: {
    left: 12,
    right: 12,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(20,13,50,0.94)',
    ...shadow,
  },
  barCompact: {
    paddingHorizontal: 8,
    borderRadius: 22,
  },
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrap: {
    width: 34,
    height: 30,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapCompact: {
    width: 31,
    height: 27,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(255,90,184,0.24)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.32)',
  },
  emoji: {
    fontSize: 18,
    opacity: 0.55,
  },
  emojiCompact: {
    fontSize: 16,
  },
  emojiActive: {
    opacity: 1,
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
  },
  labelCompact: {
    fontSize: 9,
  },
  labelActive: {
    color: colors.text,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    backgroundColor: colors.yellow,
  },
});
