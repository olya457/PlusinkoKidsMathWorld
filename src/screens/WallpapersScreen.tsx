import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Screen} from '../components/Screen';
import {wallpapers} from '../data/wallpapers';
import {useAppState} from '../state/AppStateContext';
import {colors, radii} from '../theme/theme';
import {useResponsive} from '../theme/useResponsive';

export function WallpapersScreen() {
  const {points, setPoints, unlockedWallpapers, setUnlockedWallpapers} =
    useAppState();
  const responsive = useResponsive();

  function isUnlocked(id: string) {
    return unlockedWallpapers.includes(id);
  }

  function unlock(id: string, cost: number) {
    if (isUnlocked(id) || points < cost) {
      return;
    }

    setPoints(current => current - cost);
    setUnlockedWallpapers(current => [...current, id]);
  }

  return (
    <Screen scroll>
      <View style={[styles.header, responsive.compact && styles.headerCompact]}>
        <Text style={[styles.title, responsive.compact && styles.titleCompact]}>
          Wallpapers
        </Text>
        <Text
          style={[
            styles.subtitle,
            responsive.compact && styles.subtitleCompact,
          ]}>
          Earn points in the game to unlock exclusive art
        </Text>
        <View
          style={[
            styles.pointsPill,
            responsive.compact && styles.pointsPillCompact,
          ]}>
          <Text
            style={[
              styles.pointsText,
              responsive.compact && styles.pointsTextCompact,
            ]}>
            ⚡ {points} points available
          </Text>
        </View>
      </View>

      <View style={[styles.grid, responsive.compact && styles.gridCompact]}>
        {wallpapers.map(item => {
          const unlocked = isUnlocked(item.id);
          const canUnlock = points >= item.cost;

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                responsive.compact && styles.cardCompact,
                responsive.narrow && styles.cardNarrow,
              ]}>
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={[
                  styles.wallPreview,
                  responsive.compact && styles.wallPreviewCompact,
                  responsive.narrow && styles.wallPreviewNarrow,
                ]}>
                <LinearGradient
                  colors={
                    unlocked
                      ? ['rgba(152,56,255,0.55)', 'rgba(244,73,166,0.45)']
                      : ['rgba(152,56,255,0.45)', 'rgba(5,4,15,0.78)']
                  }
                  style={StyleSheet.absoluteFill}
                />
                {unlocked ? (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                ) : (
                  <View style={styles.lockCircle}>
                    <Text style={styles.lockText}>🔒</Text>
                  </View>
                )}
              </ImageBackground>

              <View
                style={[
                  styles.cardFooter,
                  responsive.compact && styles.cardFooterCompact,
                ]}>
                {unlocked ? (
                  <View style={styles.unlockedStatus}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.unlockedText,
                        responsive.compact && styles.unlockedTextCompact,
                      ]}>
                      ✓ Unlocked
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    disabled={!canUnlock}
                    onPress={() => unlock(item.id, item.cost)}
                    style={[
                      styles.costButton,
                      !canUnlock && styles.costDisabled,
                    ]}>
                    <Text style={styles.costText}>{item.cost} pts</Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
    marginBottom: 20,
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
  pointsPill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,214,10,0.65)',
    backgroundColor: 'rgba(255,214,10,0.11)',
  },
  pointsPillCompact: {
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  pointsText: {
    color: colors.yellow,
    fontSize: 15,
    fontWeight: '900',
  },
  pointsTextCompact: {
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCompact: {
    gap: 10,
  },
  card: {
    width: '48%',
    overflow: 'hidden',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardCompact: {
    width: '48.2%',
  },
  cardNarrow: {
    width: '100%',
  },
  wallPreview: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wallPreviewCompact: {
    height: 108,
  },
  wallPreviewNarrow: {
    height: 140,
  },
  lockCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5,4,15,0.65)',
  },
  lockText: {
    fontSize: 21,
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42d676',
  },
  checkText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  cardFooter: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cardFooterCompact: {
    minHeight: 50,
    paddingHorizontal: 8,
  },
  costButton: {
    minHeight: 38,
    minWidth: 84,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: 'rgba(255,214,10,0.1)',
  },
  costDisabled: {
    opacity: 0.45,
  },
  costText: {
    color: colors.yellow,
    fontSize: 14,
    fontWeight: '900',
  },
  unlockedStatus: {
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(66,214,118,0.48)',
    backgroundColor: 'rgba(66,214,118,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedText: {
    color: '#42d676',
    fontSize: 13,
    fontWeight: '900',
  },
  unlockedTextCompact: {
    fontSize: 12,
  },
});
