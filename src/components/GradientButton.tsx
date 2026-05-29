import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradients, radii, shadow} from '../theme/theme';
import {useResponsive} from '../theme/useResponsive';

type GradientButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({
  title,
  onPress,
  disabled,
  loading,
  style,
}: GradientButtonProps) {
  const responsive = useResponsive();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        responsive.short && styles.buttonCompact,
        responsive.narrow && styles.buttonNarrow,
        style,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}>
      <LinearGradient
        colors={gradients.primary}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.gloss} />
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[styles.text, responsive.short && styles.textCompact]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: colors.pink,
    overflow: 'hidden',
    ...shadow,
  },
  buttonCompact: {
    minHeight: 48,
  },
  buttonNarrow: {
    paddingHorizontal: 16,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    textShadowColor: 'rgba(35,0,68,0.42)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  textCompact: {
    fontSize: 15,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{scale: 0.98}],
  },
  gloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '48%',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
});
