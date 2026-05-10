import type {ImageSourcePropType} from 'react-native';
import {images} from './assets';

export type OnboardingSlide = {
  id: string;
  title: string;
  accent: string;
  body: string;
  button: string;
  icon: ImageSourcePropType;
  background: ImageSourcePropType;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    title: 'Welcome to MathSpark!',
    accent: 'The math adventure built for kids',
    body: 'Specially crafted for young learners who want to explore the magical world of mathematics. Fun, engaging, and designed to help children develop real math skills!',
    button: 'Continue',
    icon: images.onboardingSparkles,
    background: images.onboardingBgWelcome,
  },
  {
    id: 'quiz',
    title: 'Quiz Yourself!',
    accent: 'Three levels of challenge await',
    body: 'Test your skills across Beginner, Intermediate, and Advanced categories. Each quiz has 5 timed questions with 4 choices. How many can you get right?',
    button: 'Continue',
    icon: images.onboardingAbacus,
    background: images.onboardingBgQuiz,
  },
  {
    id: 'learn',
    title: 'Learn & Discover',
    accent: 'Tips and mind-blowing math facts',
    body: "Unlock expert tips to sharpen your skills, and explore our blog packed with fascinating math discoveries from infinite hotels to nature's secret formula!",
    button: 'Continue',
    icon: images.onboardingBooks,
    background: images.onboardingBgLearn,
  },
  {
    id: 'play',
    title: 'Play & Earn Points',
    accent: 'The ultimate attention challenge',
    body: 'Watch carefully as purple balls fall across the screen. Count every single one! Answer correctly after each round to earn points and unlock exclusive wallpapers!',
    button: 'Continue',
    icon: images.onboardingGamepad,
    background: images.onboardingBgGame,
  },
  {
    id: 'start',
    title: 'Your Journey Starts Now!',
    accent: 'Join thousands of young math champions',
    body: 'Whether you are just starting out or already love numbers, MathSpark grows with you. Every problem you solve makes you smarter. Ready to spark your math genius?',
    button: 'Get Started! 🚀',
    icon: images.onboardingRocket,
    background: images.onboardingBgStart,
  },
];
