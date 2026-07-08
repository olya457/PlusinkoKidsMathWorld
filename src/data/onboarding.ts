import type {ImageSourcePropType} from 'react-native';
import type {AbstractBackgroundVariant} from '../theme/backgrounds';
import {images} from './assets';

export type OnboardingSlide = {
  id: string;
  title: string;
  accent: string;
  body: string;
  button: string;
  icon: ImageSourcePropType;
  backgroundVariant: AbstractBackgroundVariant;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    title: 'Welcome to MathSpark',
    accent: 'A fun way to learn mathematics',
    body: 'Explore mathematics through interactive activities designed for young learners. Practice skills, solve problems, and enjoy learning every day.',
    button: 'Continue',
    icon: images.onboardingSparkles,
    backgroundVariant: 'onboardingWelcome',
  },
  {
    id: 'quiz',
    title: 'Math Quizzes',
    accent: 'Choose your difficulty level',
    body: 'Practice with Beginner, Intermediate, and Advanced quizzes. Each quiz includes five timed questions with four answer choices.',
    button: 'Continue',
    icon: images.onboardingAbacus,
    backgroundVariant: 'onboardingQuiz',
  },
  {
    id: 'learn',
    title: 'Learn & Explore',
    accent: 'Articles, tips, and math facts',
    body: 'Read educational articles, discover interesting mathematical ideas, and learn helpful techniques while exploring new topics.',
    button: 'Continue',
    icon: images.onboardingBooks,
    backgroundVariant: 'onboardingLearn',
  },
  {
    id: 'play',
    title: 'Play & Score',
    accent: 'Practice your attention skills',
    body: 'Count the purple balls as they fall across the screen. Answer correctly after each round to earn points and unlock new wallpapers.',
    button: 'Continue',
    icon: images.onboardingGamepad,
    backgroundVariant: 'onboardingGame',
  },
  {
    id: 'start',
    title: 'Ready to Begin?',
    accent: 'Start your math journey',
    body: 'Practice mathematics at your own pace, improve your skills, and enjoy solving new challenges every day.',
    button: 'Get Started',
    icon: images.onboardingRocket,
    backgroundVariant: 'onboardingStart',
  },
];