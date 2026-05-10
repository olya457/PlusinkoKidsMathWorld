import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {colors, radii, shadow} from '../theme/theme';
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
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: colors.pink,
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
    fontWeight: '800',
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
});
