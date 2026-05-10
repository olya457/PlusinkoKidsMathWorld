import React, {useEffect, useMemo, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {Screen} from '../components/Screen';
import {useAppState} from '../state/AppStateContext';
import {colors, radii} from '../theme/theme';
import {useResponsive} from '../theme/useResponsive';
import {randomInt, shuffle} from '../utils/random';

type GameMode = 'intro' | 'play' | 'question' | 'result';

type FallingBall = {
  id: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  y: Animated.Value;
};

type RoundResult = {
  round: number;
  actual: number;
  answer: number;
  correct: boolean;
};

const totalRounds = 5;

export function GameScreen() {
  const responsive = useResponsive();
  const {height, width} = responsive;
  const {points, setPoints} = useAppState();
  const [mode, setMode] = useState<GameMode>('intro');
  const [round, setRound] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [actual, setActual] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [earned, setEarned] = useState(0);
  const [balls, setBalls] = useState<FallingBall[]>([]);
  const [results, setResults] = useState<RoundResult[]>([]);
  const compact = responsive.compact;

  useEffect(() => {
    if (mode !== 'play') {
      return;
    }

    if (seconds <= 0) {
      setMode('question');
      return;
    }

    const timer = setInterval(() => setSeconds(value => value - 1), 1000);

    return () => clearInterval(timer);
  }, [mode, seconds]);

  const options = useMemo(() => {
    if (!actual) {
      return [];
    }

    const values = new Set<number>([actual]);

    while (values.size < 4) {
      values.add(Math.max(1, actual + randomInt(-4, 4)));
    }

    return shuffle([...values]);
  }, [actual]);

  function makeBalls(count: number) {
    return Array.from({length: count}, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: randomInt(12, 82),
      size: randomInt(26, 42),
      delay: randomInt(0, 6200),
      duration: randomInt(1700, 3200),
      y: new Animated.Value(-80),
    }));
  }

  function animateBalls(nextBalls: FallingBall[]) {
    const distance = Math.max(responsive.short ? 300 : 360, height - 210);

    Animated.parallel(
      nextBalls.map(ball =>
        Animated.timing(ball.y, {
          toValue: distance,
          duration: ball.duration,
          delay: ball.delay,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ),
    ).start();
  }

  function startRound(nextRoundIndex: number) {
    const count = randomInt(6, 15);
    const nextBalls = makeBalls(count);

    setRound(nextRoundIndex);
    setActual(count);
    setSelected(null);
    setSeconds(10);
    setBalls(nextBalls);
    setMode('play');
    requestAnimationFrame(() => animateBalls(nextBalls));
  }

  function startGame() {
    setResults([]);
    setEarned(0);
    startRound(0);
  }

  function chooseAnswer(value: number) {
    if (selected !== null) {
      return;
    }

    const correct = value === actual;

    setSelected(value);
    setResults(current => [
      ...current,
      {round: round + 1, actual, answer: value, correct},
    ]);

    if (correct) {
      setEarned(current => current + 2);
      setPoints(current => current + 2);
    }
  }

  function nextRound() {
    if (round === totalRounds - 1) {
      setMode('result');
      return;
    }

    startRound(round + 1);
  }

  async function shareResult() {
    await Share.share({
      message: `I earned ${earned} points in MathSpark Ball Count Game!`,
    });
  }

  if (mode === 'play') {
    return (
      <Screen contentStyle={[styles.playContent]}>
        <View style={styles.gameTop}>
          <Pressable onPress={() => setMode('intro')} style={styles.backCircle}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <View style={styles.progressBlock}>
            <View style={styles.progressMeta}>
              <Text style={styles.progressText}>
                Round {round + 1} / {totalRounds}
              </Text>
              <Text style={styles.timerText}>◷ {seconds}s</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${(seconds / 10) * 100}%`},
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.playArea}>
          <Text style={styles.countText}>COUNT!</Text>
          {balls.map(ball => (
            <Animated.View
              key={ball.id}
              style={[
                styles.ball,
                {
                  width: ball.size,
                  height: ball.size,
                  left: (width - ball.size) * (ball.left / 100),
                  transform: [{translateY: ball.y}],
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.helperText}>
          Watch carefully and count the balls!
        </Text>
      </Screen>
    );
  }

  if (mode === 'question') {
    const answered = selected !== null;

    return (
      <Screen
        scroll={compact}
        contentStyle={[
          styles.questionScreen,
          compact && styles.questionScreenCompact,
        ]}>
        <View
          style={[styles.questionBox, compact && styles.questionBoxCompact]}>
          <Text style={[styles.thinking, compact && styles.thinkingCompact]}>
            🤔
          </Text>
          <Text
            style={[
              styles.questionTitle,
              compact && styles.questionTitleCompact,
            ]}>
            How many balls fell?
          </Text>
          <Text style={styles.roundSubtitle}>
            Round {round + 1} of {totalRounds} - Choose your answer!
          </Text>

          <View
            style={[styles.optionsGrid, compact && styles.optionsGridCompact]}>
            {options.map(option => {
              const correct = option === actual;
              const picked = selected === option;

              return (
                <Pressable
                  key={option}
                  disabled={answered}
                  onPress={() => chooseAnswer(option)}
                  style={[
                    styles.option,
                    compact && styles.optionCompact,
                    answered && correct && styles.optionCorrect,
                    picked && !correct && styles.optionWrong,
                  ]}>
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          {answered && (
            <Text
              style={[
                styles.answerState,
                selected === actual ? styles.answerCorrect : styles.answerWrong,
              ]}>
              {selected === actual ? '✅ Correct! +2 points' : 'Wrong!!!'}
            </Text>
          )}
        </View>

        <GradientButton
          title={round === totalRounds - 1 ? 'Result' : 'Next round'}
          disabled={!answered}
          onPress={nextRound}
        />
      </Screen>
    );
  }

  if (mode === 'result') {
    return (
      <Screen scroll={compact}>
        <View style={[styles.resultWrap, compact && styles.resultWrapCompact]}>
          <Text
            style={[styles.resultStar, compact && styles.resultStarCompact]}>
            ⭐
          </Text>
          <Text
            style={[styles.resultTitle, compact && styles.resultTitleCompact]}>
            Game Over!
          </Text>
          <Text style={styles.earned}>+{earned} points earned ⚡</Text>

          <View
            style={[styles.resultsList, compact && styles.resultsListCompact]}>
            {results.map(item => (
              <View
                key={item.round}
                style={[
                  styles.resultRow,
                  compact && styles.resultRowCompact,
                  item.correct ? styles.resultRowGood : styles.resultRowBad,
                ]}>
                <Text style={styles.resultRound}>Round {item.round}</Text>
                <Text style={styles.resultNumbers}>
                  You: {item.answer} | Actual: {item.actual}
                </Text>
                <Text style={styles.resultIcon}>
                  {item.correct ? '✅' : '✕'}
                </Text>
              </View>
            ))}
          </View>

          <GradientButton title="Share" onPress={shareResult} />
          <Pressable
            onPress={() => setMode('intro')}
            style={styles.outlineButton}>
            <Text style={styles.outlineText}>Back</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={compact}>
      <View style={[styles.intro, compact && styles.introCompact]}>
        <Text style={[styles.gameEmoji, compact && styles.gameEmojiCompact]}>
          🎮
        </Text>
        <Text style={[styles.title, compact && styles.titleCompact]}>
          Ball Count Game
        </Text>
        <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>
          Watch as purple balls fall across the screen for 10 seconds. After
          each round, tell us how many fell. Get it right to earn 2 points per
          round.
        </Text>

        <View style={[styles.rules, compact && styles.rulesCompact]}>
          <Rule
            emoji="🎯"
            title="5 rounds"
            text="Complete all 5 to see results"
            compact={compact}
          />
          <Rule
            emoji="⚡"
            title="2 points per round"
            text="Earned for each correct count"
            compact={compact}
          />
          <Rule
            emoji="🖼️"
            title="Trade points"
            text="Unlock exclusive wallpapers"
            compact={compact}
          />
          <View style={[styles.balance, compact && styles.balanceCompact]}>
            <Text style={styles.balanceText}>
              ⚡ Current Balance: {points} points
            </Text>
          </View>
        </View>

        <GradientButton title="▷  Start Game" onPress={startGame} />
      </View>
    </Screen>
  );
}

function Rule({
  emoji,
  title,
  text,
  compact,
}: {
  emoji: string;
  title: string;
  text: string;
  compact: boolean;
}) {
  return (
    <View style={[styles.rule, compact && styles.ruleCompact]}>
      <Text style={[styles.ruleEmoji, compact && styles.ruleEmojiCompact]}>
        {emoji}
      </Text>
      <View style={styles.ruleCopy}>
        <Text style={[styles.ruleTitle, compact && styles.ruleTitleCompact]}>
          {title}
        </Text>
        <Text style={[styles.ruleText, compact && styles.ruleTextCompact]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
  },
  introCompact: {
    justifyContent: 'flex-start',
    gap: 12,
  },
  gameEmoji: {
    textAlign: 'center',
    fontSize: 42,
  },
  gameEmojiCompact: {
    fontSize: 34,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    color: colors.muted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 19,
  },
  rules: {
    gap: 12,
    marginVertical: 10,
  },
  rulesCompact: {
    gap: 8,
    marginVertical: 4,
  },
  rule: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  ruleCompact: {
    minHeight: 50,
    gap: 10,
    paddingHorizontal: 12,
  },
  ruleEmoji: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  ruleEmojiCompact: {
    fontSize: 18,
    width: 24,
  },
  ruleCopy: {
    flex: 1,
  },
  ruleTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  ruleTitleCompact: {
    fontSize: 12,
  },
  ruleText: {
    color: colors.muted,
    marginTop: 3,
    fontSize: 11,
    fontWeight: '700',
  },
  ruleTextCompact: {
    fontSize: 10,
  },
  balance: {
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(255,214,10,0.5)',
    backgroundColor: 'rgba(255,214,10,0.12)',
  },
  balanceCompact: {
    minHeight: 38,
  },
  balanceText: {
    color: colors.yellow,
    fontSize: 13,
    fontWeight: '900',
  },
  playContent: {
    paddingHorizontal: 0,
  },
  gameTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  backCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
  },
  backText: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 30,
  },
  progressBlock: {
    flex: 1,
    gap: 8,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
  },
  timerText: {
    color: colors.violet,
    fontSize: 11,
    fontWeight: '900',
  },
  progressTrack: {
    height: 7,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#252236',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.pink,
  },
  playArea: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: 'rgba(255,255,255,0.08)',
    fontSize: 42,
    fontWeight: '900',
  },
  ball: {
    position: 'absolute',
    top: 0,
    borderRadius: 99,
    backgroundColor: colors.violet,
    shadowColor: colors.violet,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 0},
    elevation: 8,
  },
  helperText: {
    color: colors.muted,
    textAlign: 'center',
    paddingBottom: 8,
    fontSize: 11,
    fontWeight: '800',
  },
  questionScreen: {
    justifyContent: 'space-between',
  },
  questionScreenCompact: {
    gap: 14,
  },
  questionBox: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
  },
  questionBoxCompact: {
    justifyContent: 'flex-start',
    gap: 10,
  },
  thinking: {
    textAlign: 'center',
    fontSize: 66,
  },
  thinkingCompact: {
    fontSize: 50,
  },
  questionTitle: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
  },
  questionTitleCompact: {
    fontSize: 20,
    lineHeight: 25,
  },
  roundSubtitle: {
    color: colors.muted,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },
  optionsGridCompact: {
    gap: 10,
    marginTop: 4,
  },
  option: {
    width: '47.8%',
    minHeight: 74,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionCompact: {
    minHeight: 62,
  },
  optionCorrect: {
    borderColor: colors.green,
    backgroundColor: 'rgba(20,191,115,0.18)',
  },
  optionWrong: {
    borderColor: colors.red,
    backgroundColor: 'rgba(240,68,100,0.18)',
  },
  optionText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  answerState: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
  },
  answerCorrect: {
    color: colors.green,
  },
  answerWrong: {
    color: colors.red,
  },
  resultWrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  resultWrapCompact: {
    justifyContent: 'flex-start',
    gap: 12,
  },
  resultStar: {
    textAlign: 'center',
    fontSize: 74,
  },
  resultStarCompact: {
    fontSize: 54,
  },
  resultTitle: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 27,
    fontWeight: '900',
  },
  resultTitleCompact: {
    fontSize: 23,
  },
  earned: {
    color: colors.yellow,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
  },
  resultsList: {
    gap: 10,
  },
  resultsListCompact: {
    gap: 8,
  },
  resultRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  resultRowCompact: {
    minHeight: 42,
    paddingHorizontal: 12,
  },
  resultRowGood: {
    borderColor: 'rgba(20,191,115,0.35)',
    backgroundColor: 'rgba(20,191,115,0.13)',
  },
  resultRowBad: {
    borderColor: 'rgba(240,68,100,0.38)',
    backgroundColor: 'rgba(240,68,100,0.13)',
  },
  resultRound: {
    flex: 0.75,
    color: colors.mutedStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  resultNumbers: {
    flex: 1.5,
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  resultIcon: {
    width: 24,
    textAlign: 'center',
    color: colors.red,
    fontSize: 16,
    fontWeight: '900',
  },
  outlineButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  outlineText: {
    color: colors.text,
    fontWeight: '900',
  },
});
