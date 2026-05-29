export const abstractBackgrounds = {
  default: {
    colors: ['#16092f', '#321468', '#5c2fbd', '#1572d6'],
    glows: [
      'rgba(255,84,181,0.32)',
      'rgba(70,166,255,0.24)',
      'rgba(168,88,255,0.22)',
    ],
    ribbon: 'rgba(255,255,255,0.055)',
  },
  quiz: {
    colors: ['#16082b', '#3a156e', '#8d2fca', '#217ddd'],
    glows: [
      'rgba(244,73,166,0.34)',
      'rgba(62,140,255,0.26)',
      'rgba(255,214,10,0.11)',
    ],
    ribbon: 'rgba(255,255,255,0.06)',
  },
  tips: {
    colors: ['#120d35', '#262183', '#9b38cd', '#1e8fcf'],
    glows: [
      'rgba(116,92,255,0.32)',
      'rgba(255,92,176,0.27)',
      'rgba(40,204,211,0.16)',
    ],
    ribbon: 'rgba(255,255,255,0.052)',
  },
  blog: {
    colors: ['#1b0a34', '#4a1773', '#cf3d98', '#2a77d6'],
    glows: [
      'rgba(255,105,180,0.3)',
      'rgba(74,151,255,0.22)',
      'rgba(176,105,255,0.2)',
    ],
    ribbon: 'rgba(255,255,255,0.058)',
  },
  game: {
    colors: ['#13072b', '#281263', '#6341ce', '#0a83d8'],
    glows: [
      'rgba(152,56,255,0.35)',
      'rgba(244,73,166,0.26)',
      'rgba(62,140,255,0.2)',
    ],
    ribbon: 'rgba(255,255,255,0.048)',
  },
  walls: {
    colors: ['#18082d', '#431364', '#b932b1', '#2170d9'],
    glows: [
      'rgba(244,73,166,0.32)',
      'rgba(62,140,255,0.25)',
      'rgba(152,56,255,0.25)',
    ],
    ribbon: 'rgba(255,255,255,0.056)',
  },
  splash: {
    colors: ['#180732', '#3b1179', '#d53f9d', '#2585df'],
    glows: [
      'rgba(255,91,186,0.36)',
      'rgba(64,164,255,0.28)',
      'rgba(178,92,255,0.26)',
    ],
    ribbon: 'rgba(255,255,255,0.064)',
  },
  onboardingWelcome: {
    colors: ['#170830', '#432184', '#df4ca7', '#2d86e4'],
    glows: [
      'rgba(255,103,190,0.34)',
      'rgba(75,168,255,0.25)',
      'rgba(167,92,255,0.2)',
    ],
    ribbon: 'rgba(255,255,255,0.06)',
  },
  onboardingQuiz: {
    colors: ['#12072d', '#2a1a75', '#7b38d8', '#2394df'],
    glows: [
      'rgba(151,83,255,0.34)',
      'rgba(244,73,166,0.24)',
      'rgba(44,177,255,0.21)',
    ],
    ribbon: 'rgba(255,255,255,0.052)',
  },
  onboardingLearn: {
    colors: ['#190a34', '#392375', '#be3cb2', '#1684c9'],
    glows: [
      'rgba(244,73,166,0.3)',
      'rgba(51,183,226,0.22)',
      'rgba(152,56,255,0.24)',
    ],
    ribbon: 'rgba(255,255,255,0.056)',
  },
  onboardingGame: {
    colors: ['#13082c', '#30146d', '#6b45d8', '#1677d4'],
    glows: [
      'rgba(152,56,255,0.34)',
      'rgba(62,140,255,0.25)',
      'rgba(244,73,166,0.24)',
    ],
    ribbon: 'rgba(255,255,255,0.05)',
  },
  onboardingStart: {
    colors: ['#19092f', '#491879', '#e447a0', '#2b79df'],
    glows: [
      'rgba(255,88,178,0.35)',
      'rgba(58,146,255,0.27)',
      'rgba(255,214,10,0.1)',
    ],
    ribbon: 'rgba(255,255,255,0.062)',
  },
} as const;

export type AbstractBackgroundVariant = keyof typeof abstractBackgrounds;
