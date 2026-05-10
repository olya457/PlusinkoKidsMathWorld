import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {Screen} from '../components/Screen';
import {quizLevels, QuizLevel, QuizQuestion} from '../data/quiz';
import {colors, radii} from '../theme/theme';
import {useResponsive} from '../theme/useResponsive';
import {sample} from '../utils/random';

type QuizMode = 'intro' | 'choose' | 'quiz' | 'result';

const letters = ['A', 'B', 'C', 'D'];
const quizSeconds = 15;

export function QuizScreen() {
  const [mode, setMode] = useState<QuizMode>('intro');
  const [level, setLevel] = useState<QuizLevel>(quizLevels[0]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [seconds, setSeconds] = useState(quizSeconds);
  const responsive = useResponsive();
  const compact = responsive.compact;
  const currentQuestion = questions[questionIndex];
  const correctCount = answers.filter(Boolean).length;

  useEffect(() => {
    if (mode !== 'quiz' || selected !== null) {
      return;
    }

    if (seconds <= 0) {
      setSelected(-1);
      setAnswers(current => [...current, false]);
      return;
    }

    const timer = setInterval(() => setSeconds(value => value - 1), 1000);

    return () => clearInterval(timer);
  }, [mode, seconds, selected]);

  function beginQuiz() {
    setQuestions(sample(level.questions, 5));
    setQuestionIndex(0);
    setSelected(null);
    setAnswers([]);
    setSeconds(quizSeconds);
    setMode('quiz');
  }

  function chooseOption(index: number) {
    if (selected !== null || !currentQuestion) {
      return;
    }

    setSelected(index);
    setAnswers(current => [...current, index === currentQuestion.answerIndex]);
  }

  function nextQuestion() {
    if (questionIndex === questions.length - 1) {
      setMode('result');
      return;
    }

    setQuestionIndex(current => current + 1);
    setSelected(null);
    setSeconds(quizSeconds);
  }

  function restart() {
    setMode('choose');
    setSelected(null);
    setAnswers([]);
    setQuestionIndex(0);
  }

  async function shareResult() {
    await Share.share({
      message: `I scored ${correctCount}/5 in MathSpark ${level.title} quiz!`,
    });
  }

  const quizProgress = useMemo(() => {
    if (!questions.length) {
      return 0;
    }

    return (questionIndex + 1) / questions.length;
  }, [questionIndex, questions.length]);

  if (mode === 'quiz' && currentQuestion) {
    return (
      <Screen
        scroll={responsive.short}
        contentStyle={[
          styles.quizContent,
          responsive.short && styles.quizContentShort,
        ]}>
        <View style={styles.topRow}>
          <Pressable onPress={restart} style={styles.roundButton}>
            <Text style={styles.roundButtonText}>‹</Text>
          </Pressable>
          <View style={styles.progressBlock}>
            <View style={styles.progressMeta}>
              <Text style={styles.progressText}>
                Question {questionIndex + 1} / {questions.length}
              </Text>
              <Text style={styles.timerText}>{seconds}s</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, {width: `${quizProgress * 100}%`}]}
              />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.questionWrap,
            responsive.short && styles.questionWrapShort,
          ]}>
          <Text style={[styles.levelLabel, {color: level.color}]}>
            {level.title.toUpperCase()}
          </Text>
          <Text
            numberOfLines={3}
            adjustsFontSizeToFit
            style={[styles.question, compact && styles.questionCompact]}>
            {currentQuestion.question}
          </Text>
        </View>

        <View style={styles.optionsGrid}>
          {currentQuestion.options.map((option, index) => {
            const optionCorrect = index === currentQuestion.answerIndex;
            const isPicked = selected === index;
            const reveal = selected !== null && optionCorrect;
            const wrong = isPicked && !optionCorrect;

            return (
              <Pressable
                key={option}
                disabled={selected !== null}
                onPress={() => chooseOption(index)}
                style={[
                  styles.option,
                  responsive.short && styles.optionShort,
                  reveal && styles.optionCorrect,
                  wrong && styles.optionWrong,
                ]}>
                <Text style={styles.optionLetter}>{letters[index]}</Text>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <View
          style={[
            styles.quizFooter,
            responsive.short && styles.quizFooterShort,
          ]}>
          <View style={styles.questionDots}>
            {questions.map((item, dotIndex) => (
              <View
                key={`${item.question}-${dotIndex}`}
                style={[
                  styles.questionDot,
                  dotIndex === questionIndex && styles.questionDotActive,
                ]}
              />
            ))}
          </View>
          <GradientButton
            title={
              selected === null
                ? 'Choose'
                : questionIndex === questions.length - 1
                ? 'Result'
                : 'Next question'
            }
            disabled={selected === null}
            onPress={nextQuestion}
          />
        </View>
      </Screen>
    );
  }

  if (mode === 'result') {
    const percent = Math.round((correctCount / 5) * 100);

    return (
      <Screen scroll={compact}>
        <View style={[styles.resultWrap, compact && styles.resultWrapCompact]}>
          <Text
            style={[styles.resultStar, compact && styles.resultStarCompact]}>
            ⭐
          </Text>
          <Text
            style={[styles.resultTitle, compact && styles.resultTitleCompact]}>
            {correctCount}/5 Correct!
          </Text>
          <Text
            style={[styles.resultStars, compact && styles.resultStarsCompact]}>
            {'★'.repeat(Math.max(1, Math.ceil(correctCount / 2)))}
            <Text style={styles.resultStarsMuted}>
              {'★'.repeat(3 - Math.max(1, Math.ceil(correctCount / 2)))}
            </Text>
          </Text>

          <View
            style={[styles.scorePanel, compact && styles.scorePanelCompact]}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scorePercent}>{percent}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, {width: `${percent}%`}]} />
            </View>
            <View style={styles.miniBars}>
              {answers.map((ok, index) => (
                <View
                  key={`${ok}-${index}`}
                  style={[
                    styles.miniBar,
                    {backgroundColor: ok ? colors.green : colors.red},
                  ]}
                />
              ))}
            </View>
          </View>

          <GradientButton title="Share" onPress={shareResult} />
          <Pressable onPress={restart} style={styles.outlineButton}>
            <Text style={styles.outlineText}>Back</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={compact}>
      <View
        style={[
          mode === 'intro' ? styles.intro : styles.choose,
          compact && styles.centerCompact,
        ]}>
        {mode === 'intro' ? (
          <>
            <Text style={[styles.bigEmoji, compact && styles.bigEmojiCompact]}>
              🧮
            </Text>
            <Text style={[styles.title, compact && styles.titleCompact]}>
              Math Quiz
            </Text>
            <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>
              Test your math knowledge across 3 difficulty levels. Each quiz has
              5 questions with a 15-second timer per question.
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.title, compact && styles.titleCompact]}>
              Choose Level
            </Text>
            <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>
              Pick your difficulty and start the quiz!
            </Text>
          </>
        )}

        <View style={[styles.levels, compact && styles.levelsCompact]}>
          {quizLevels.map(item => (
            <LevelCard
              key={item.id}
              item={item}
              active={mode === 'choose' && item.id === level.id}
              onPress={() => setLevel(item)}
              compact={compact}
            />
          ))}
        </View>

        <GradientButton
          title={mode === 'intro' ? "Let's Go! 🚀" : 'Choose'}
          onPress={mode === 'intro' ? () => setMode('choose') : beginQuiz}
        />
      </View>
    </Screen>
  );
}

function LevelCard({
  item,
  active,
  onPress,
  compact,
}: {
  item: QuizLevel;
  active: boolean;
  onPress: () => void;
  compact: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.levelCard,
        compact && styles.levelCardCompact,
        active && styles.levelCardActive,
      ]}>
      <View
        style={[
          styles.levelIcon,
          compact && styles.levelIconCompact,
          {backgroundColor: `${item.color}24`},
        ]}>
        <Text style={[styles.levelEmoji, compact && styles.levelEmojiCompact]}>
          {item.emoji}
        </Text>
      </View>
      <View style={styles.levelCopy}>
        <Text style={[styles.levelTitle, compact && styles.levelTitleCompact]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.levelSubtitle,
            compact && styles.levelSubtitleCompact,
          ]}>
          {item.subtitle}
        </Text>
      </View>
      <Text style={[styles.chevron, active && {color: item.color}]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
  },
  choose: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
  },
  centerCompact: {
    justifyContent: 'flex-start',
    gap: 12,
  },
  bigEmoji: {
    textAlign: 'center',
    fontSize: 42,
    marginBottom: 4,
  },
  bigEmojiCompact: {
    fontSize: 34,
    marginBottom: 0,
  },
  title: {
    color: colors.text,
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
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 19,
  },
  levels: {
    gap: 14,
    marginVertical: 12,
  },
  levelsCompact: {
    gap: 10,
    marginVertical: 6,
  },
  levelCard: {
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
  },
  levelCardCompact: {
    minHeight: 62,
    gap: 10,
    paddingHorizontal: 12,
  },
  levelCardActive: {
    borderColor: colors.borderStrong,
    backgroundColor: '#171428',
  },
  levelIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelIconCompact: {
    width: 38,
    height: 38,
    borderRadius: 12,
  },
  levelEmoji: {
    fontSize: 22,
  },
  levelEmojiCompact: {
    fontSize: 19,
  },
  levelCopy: {
    flex: 1,
  },
  levelTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  levelTitleCompact: {
    fontSize: 14,
  },
  levelSubtitle: {
    color: colors.muted,
    marginTop: 3,
    fontSize: 11,
    fontWeight: '700',
  },
  levelSubtitleCompact: {
    fontSize: 10,
  },
  chevron: {
    color: colors.muted,
    fontSize: 24,
  },
  quizContent: {
    justifyContent: 'space-between',
  },
  quizContentShort: {
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 30,
  },
  progressBlock: {
    flex: 1,
    gap: 7,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
  },
  timerText: {
    color: colors.violet,
    fontSize: 10,
    fontWeight: '900',
  },
  progressTrack: {
    height: 8,
    borderRadius: 6,
    backgroundColor: '#242235',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: colors.pink,
  },
  questionWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 150,
  },
  questionWrapShort: {
    minHeight: 104,
    gap: 8,
  },
  levelLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0,
  },
  question: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
  },
  questionCompact: {
    fontSize: 18,
    lineHeight: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    width: '47.8%',
    minHeight: 78,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  optionShort: {
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
  optionLetter: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
  },
  optionText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  quizFooter: {
    gap: 18,
  },
  quizFooterShort: {
    gap: 12,
  },
  questionDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  questionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#343043',
  },
  questionDotActive: {
    backgroundColor: colors.pink,
  },
  resultWrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
  },
  resultWrapCompact: {
    justifyContent: 'flex-start',
    gap: 14,
  },
  resultStar: {
    textAlign: 'center',
    fontSize: 74,
  },
  resultStarCompact: {
    fontSize: 56,
  },
  resultTitle: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '900',
  },
  resultTitleCompact: {
    fontSize: 23,
  },
  resultStars: {
    color: colors.yellow,
    textAlign: 'center',
    fontSize: 24,
  },
  resultStarsCompact: {
    fontSize: 21,
  },
  resultStarsMuted: {
    color: '#3b3849',
  },
  scorePanel: {
    gap: 12,
    padding: 18,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  scorePanelCompact: {
    padding: 14,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  scorePercent: {
    color: colors.violet,
    fontSize: 22,
    fontWeight: '900',
  },
  miniBars: {
    flexDirection: 'row',
    gap: 7,
  },
  miniBar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
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
