import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {Screen} from '../components/Screen';
import {MathTip, mathTips} from '../data/tips';
import {colors, radii, shadow} from '../theme/theme';
import {useResponsive} from '../theme/useResponsive';
import {randomInt} from '../utils/random';

export function TipsScreen() {
  const [activeTip, setActiveTip] = useState<MathTip | null>(null);
  const responsive = useResponsive();

  function randomTip() {
    setActiveTip(mathTips[randomInt(0, mathTips.length - 1)]);
  }

  async function shareTip(tip: MathTip) {
    await Share.share({
      message: `${tip.title}\n\n${tip.body}`,
    });
  }

  return (
    <>
      <Screen scroll>
        <View
          style={[styles.header, responsive.compact && styles.headerCompact]}>
          <Text
            style={[styles.title, responsive.compact && styles.titleCompact]}>
            Math Tips
          </Text>
          <Text
            style={[
              styles.subtitle,
              responsive.compact && styles.subtitleCompact,
            ]}>
            Level up your skills with expert advice
          </Text>
          <GradientButton
            title="🔀  Random Tip"
            onPress={randomTip}
            style={styles.randomButton}
          />
        </View>

        <View style={styles.list}>
          {mathTips.map(tip => (
            <Pressable
              key={tip.id}
              onPress={() => setActiveTip(tip)}
              style={[
                styles.tipCard,
                responsive.compact && styles.tipCardCompact,
              ]}>
              <Text
                style={[
                  styles.tipEmoji,
                  responsive.compact && styles.tipEmojiCompact,
                ]}>
                {tip.emoji}
              </Text>
              <View style={styles.tipCopy}>
                <Text
                  style={[
                    styles.tipTitle,
                    responsive.compact && styles.tipTitleCompact,
                  ]}>
                  {tip.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.tipSubtitle,
                    responsive.compact && styles.tipSubtitleCompact,
                  ]}>
                  {tip.subtitle}
                </Text>
              </View>
              <Pressable
                hitSlop={8}
                onPress={() => shareTip(tip)}
                style={[
                  styles.shareCircle,
                  responsive.compact && styles.shareCircleCompact,
                ]}>
                <Text style={styles.shareIcon}>↗</Text>
              </Pressable>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </Screen>

      <Modal transparent animationType="fade" visible={!!activeTip}>
        <View style={styles.modalWrap}>
          <Pressable
            onPress={() => setActiveTip(null)}
            style={StyleSheet.absoluteFill}
          />
          {activeTip && (
            <View
              style={[
                styles.modalCard,
                responsive.compact && styles.modalCardCompact,
                {maxHeight: responsive.height - (responsive.short ? 44 : 88)},
              ]}>
              <Pressable
                onPress={() => setActiveTip(null)}
                style={styles.backCircle}>
                <Text style={styles.backText}>‹</Text>
              </Pressable>
              <Text
                style={[
                  styles.modalEmoji,
                  responsive.compact && styles.modalEmojiCompact,
                ]}>
                {activeTip.emoji}
              </Text>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={[
                  styles.modalTitle,
                  responsive.compact && styles.modalTitleCompact,
                ]}>
                {activeTip.title}
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                  styles.modalBodyScroll,
                  responsive.compact && styles.modalBodyScrollCompact,
                ]}>
                <Text
                  style={[
                    styles.modalBody,
                    responsive.compact && styles.modalBodyCompact,
                  ]}>
                  {activeTip.body}
                </Text>
              </ScrollView>
              <GradientButton
                title="↗  Share This Tip"
                onPress={() => shareTip(activeTip)}
              />
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 12,
    marginBottom: 18,
  },
  headerCompact: {
    gap: 8,
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 19,
  },
  randomButton: {
    alignSelf: 'flex-start',
    minWidth: 150,
    marginTop: 6,
  },
  list: {
    gap: 14,
  },
  tipCard: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(151,70,255,0.35)',
    backgroundColor: colors.surface,
  },
  tipCardCompact: {
    minHeight: 74,
    gap: 10,
    paddingHorizontal: 12,
  },
  tipEmoji: {
    width: 34,
    fontSize: 24,
    textAlign: 'center',
  },
  tipEmojiCompact: {
    width: 28,
    fontSize: 21,
  },
  tipCopy: {
    flex: 1,
    gap: 5,
  },
  tipTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  tipTitleCompact: {
    fontSize: 14,
  },
  tipSubtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  tipSubtitleCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
  shareCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(244,73,166,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareCircleCompact: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  shareIcon: {
    color: colors.pink,
    fontSize: 17,
    fontWeight: '900',
  },
  chevron: {
    color: colors.muted,
    fontSize: 24,
  },
  modalWrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.overlay,
  },
  modalCard: {
    gap: 18,
    padding: 24,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.background,
    ...shadow,
  },
  modalCardCompact: {
    gap: 12,
    padding: 18,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 31,
  },
  modalEmoji: {
    textAlign: 'center',
    fontSize: 48,
  },
  modalEmojiCompact: {
    fontSize: 38,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
  },
  modalTitleCompact: {
    fontSize: 22,
    lineHeight: 27,
  },
  modalBodyScroll: {
    maxHeight: 260,
  },
  modalBodyScrollCompact: {
    maxHeight: 150,
  },
  modalBody: {
    color: colors.mutedStrong,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
  },
  modalBodyCompact: {
    fontSize: 14,
    lineHeight: 22,
  },
});
