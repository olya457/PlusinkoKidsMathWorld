import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AbstractBackgroundVariant,
  abstractBackgrounds,
} from '../theme/backgrounds';

type AbstractBackgroundProps = {
  children: React.ReactNode;
  variant?: AbstractBackgroundVariant;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function AbstractBackground({
  children,
  variant = 'default',
  style,
  contentStyle,
}: AbstractBackgroundProps) {
  const palette = abstractBackgrounds[variant];

  return (
    <LinearGradient
      colors={[...palette.colors]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.root, style]}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View
          style={[
            styles.glow,
            styles.topGlow,
            {backgroundColor: palette.glows[0]},
          ]}
        />
        <View
          style={[
            styles.glow,
            styles.midGlow,
            {backgroundColor: palette.glows[1]},
          ]}
        />
        <View
          style={[
            styles.glow,
            styles.bottomGlow,
            {backgroundColor: palette.glows[2]},
          ]}
        />
        <View style={[styles.ribbon, {backgroundColor: palette.ribbon}]} />
      </View>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  glow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  topGlow: {
    top: -98,
    right: -104,
  },
  midGlow: {
    top: '35%',
    left: -150,
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  bottomGlow: {
    right: 26,
    bottom: -142,
    width: 330,
    height: 330,
    borderRadius: 165,
  },
  ribbon: {
    position: 'absolute',
    top: '27%',
    left: '-18%',
    width: '138%',
    height: 150,
    transform: [{rotate: '-16deg'}],
  },
});
