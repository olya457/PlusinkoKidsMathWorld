import React, {useMemo, useState} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {Screen} from '../components/Screen';
import {MathArticle, mathArticles} from '../data/articles';
import {useAppState} from '../state/AppStateContext';
import {colors, radii} from '../theme/theme';
import {useResponsive} from '../theme/useResponsive';
import {cleanAudienceText} from '../utils/displayText';

export function BlogScreen() {
  const [article, setArticle] = useState<MathArticle | null>(null);
  const {favoriteArticles, setFavoriteArticles} = useAppState();
  const responsive = useResponsive();
  const sortedArticles = useMemo(
    () =>
      [...mathArticles].sort((first, second) => {
        const firstSaved = favoriteArticles.includes(first.id);
        const secondSaved = favoriteArticles.includes(second.id);

        if (firstSaved === secondSaved) {
          return 0;
        }

        return firstSaved ? -1 : 1;
      }),
    [favoriteArticles],
  );

  function saved(id: string) {
    return favoriteArticles.includes(id);
  }

  function toggleFavorite(id: string) {
    setFavoriteArticles(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    );
  }

  async function shareArticle(item: MathArticle) {
    await Share.share({
      message: `${item.title}\n\n${cleanAudienceText(item.excerpt)}`,
    });
  }

  if (article) {
    const isSaved = saved(article.id);

    return (
      <Screen scroll contentStyle={styles.detailContent}>
        <View style={styles.detailHeader}>
          <Pressable
            onPress={() => setArticle(null)}
            style={[
              styles.circleButton,
              responsive.compact && styles.circleButtonCompact,
            ]}>
            <Text style={styles.circleText}>‹</Text>
          </Pressable>
          <Text numberOfLines={1} style={styles.detailHeaderTitle}>
            {article.title}
          </Text>
          <Pressable
            onPress={() => toggleFavorite(article.id)}
            style={[
              styles.circleButton,
              responsive.compact && styles.circleButtonCompact,
              isSaved && styles.savedCircle,
            ]}>
            <Text style={styles.circleIcon}>{isSaved ? '♥' : '♡'}</Text>
          </Pressable>
          <Pressable
            onPress={() => shareArticle(article)}
            style={[
              styles.circleButton,
              responsive.compact && styles.circleButtonCompact,
            ]}>
            <Text style={styles.circleIcon}>↗</Text>
          </Pressable>
        </View>

        <Image
          source={article.image}
          resizeMode="cover"
          style={[
            styles.heroImage,
            responsive.compact && styles.heroImageCompact,
          ]}
        />
        <View style={[styles.metaRow, styles.detailMetaRow]}>
          <Text style={styles.categoryPill}>{article.category}</Text>
          <Text style={styles.readTime}>{article.minutes} min read</Text>
        </View>
        <Text
          style={[
            styles.detailTitle,
            responsive.compact && styles.detailTitleCompact,
          ]}>
          {article.title}
        </Text>
        {article.body.map(paragraph => (
          <Text
            key={paragraph}
            style={[
              styles.paragraph,
              responsive.compact && styles.paragraphCompact,
            ]}>
            {cleanAudienceText(paragraph)}
          </Text>
        ))}
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={[styles.header, responsive.compact && styles.headerCompact]}>
        <Text style={[styles.title, responsive.compact && styles.titleCompact]}>
          Math Blog
        </Text>
        <Text
          style={[
            styles.subtitle,
            responsive.compact && styles.subtitleCompact,
          ]}>
          Fascinating stories from the world of math
        </Text>
      </View>

      <View style={[styles.list, responsive.compact && styles.listCompact]}>
        {sortedArticles.map(item => {
          const isSaved = saved(item.id);

          return (
            <Pressable
              key={item.id}
              onPress={() => setArticle(item)}
              style={[
                styles.card,
                responsive.compact && styles.cardCompact,
                isSaved && styles.favoriteCard,
              ]}>
              <View>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={[
                    styles.cardImage,
                    responsive.compact && styles.cardImageCompact,
                  ]}
                />
                {isSaved && (
                  <View style={styles.favoriteBadge}>
                    <Text style={styles.favoriteBadgeText}>★ Favorite</Text>
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.cardBody,
                  responsive.compact && styles.cardBodyCompact,
                ]}>
                <View style={styles.metaRow}>
                  <Text style={styles.categoryPill}>{item.category}</Text>
                  <Text style={styles.readTime}>{item.minutes} min</Text>
                </View>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.cardTitle,
                    responsive.compact && styles.cardTitleCompact,
                  ]}>
                  {item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.cardExcerpt,
                    responsive.compact && styles.cardExcerptCompact,
                  ]}>
                  {cleanAudienceText(item.excerpt)}
                </Text>
                <View
                  style={[
                    styles.actions,
                    responsive.narrow && styles.actionsNarrow,
                  ]}>
                  <Pressable
                    onPress={() => toggleFavorite(item.id)}
                    style={[
                      styles.actionButton,
                      isSaved && styles.actionActive,
                    ]}>
                    <Text style={styles.actionText}>
                      {isSaved ? '♥ Saved' : '♡ Save'}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => shareArticle(item)}
                    style={styles.actionButton}>
                    <Text style={styles.actionText}>↗ Share</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
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
  list: {
    gap: 16,
  },
  listCompact: {
    gap: 12,
  },
  card: {
    overflow: 'hidden',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(151,70,255,0.32)',
    backgroundColor: colors.surface,
  },
  cardCompact: {
    borderRadius: radii.sm,
  },
  favoriteCard: {
    borderColor: colors.pink,
  },
  cardImage: {
    width: '100%',
    height: 130,
    backgroundColor: colors.surfaceSoft,
  },
  cardImageCompact: {
    height: 112,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: colors.pink,
  },
  favoriteBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  cardBody: {
    padding: 16,
    gap: 10,
  },
  cardBodyCompact: {
    padding: 12,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailMetaRow: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  categoryPill: {
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    color: '#b875ff',
    backgroundColor: 'rgba(152,56,255,0.2)',
    fontSize: 12,
    fontWeight: '900',
  },
  readTime: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '900',
  },
  cardTitleCompact: {
    fontSize: 15,
    lineHeight: 21,
  },
  cardExcerpt: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  cardExcerptCompact: {
    fontSize: 12,
    lineHeight: 17,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionsNarrow: {
    gap: 8,
  },
  actionButton: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionActive: {
    backgroundColor: 'rgba(244,73,166,0.24)',
  },
  actionText: {
    color: colors.mutedStrong,
    fontSize: 12,
    fontWeight: '800',
  },
  detailContent: {
    paddingHorizontal: 0,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  detailHeaderTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButtonCompact: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  savedCircle: {
    backgroundColor: 'rgba(244,73,166,0.24)',
  },
  circleText: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 30,
  },
  circleIcon: {
    color: colors.pink,
    fontSize: 20,
    fontWeight: '900',
  },
  heroImage: {
    width: '100%',
    height: 170,
    backgroundColor: colors.surfaceSoft,
  },
  heroImageCompact: {
    height: 132,
  },
  detailTitle: {
    color: colors.text,
    paddingHorizontal: 20,
    marginTop: 8,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
  },
  detailTitleCompact: {
    fontSize: 22,
    lineHeight: 28,
  },
  paragraph: {
    color: colors.mutedStrong,
    paddingHorizontal: 20,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  paragraphCompact: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 23,
  },
});
