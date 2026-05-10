export type QuizLevelId = 'beginner' | 'intermediate' | 'advanced';

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

export type QuizLevel = {
  id: QuizLevelId;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  questions: QuizQuestion[];
};

export const quizLevels: QuizLevel[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    subtitle: 'Addition & subtraction',
    emoji: '🌱',
    color: '#26df78',
    questions: [
      {
        question: 'What is 2 + 3?',
        options: ['4', '5', '6', '7'],
        answerIndex: 1,
      },
      {
        question: 'What is 7 - 2?',
        options: ['3', '4', '5', '6'],
        answerIndex: 2,
      },
      {
        question: 'What is 4 + 4?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
      },
      {
        question: 'What is 10 - 6?',
        options: ['2', '3', '4', '5'],
        answerIndex: 2,
      },
      {
        question: 'What is 5 + 1?',
        options: ['5', '6', '7', '8'],
        answerIndex: 1,
      },
      {
        question: 'What is 3 + 2?',
        options: ['4', '5', '6', '7'],
        answerIndex: 1,
      },
      {
        question: 'What is 9 - 5?',
        options: ['3', '4', '5', '6'],
        answerIndex: 1,
      },
      {
        question: 'What is 6 + 2?',
        options: ['7', '8', '9', '10'],
        answerIndex: 1,
      },
      {
        question: 'What is 1 + 7?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
      },
      {
        question: 'What is 8 - 3?',
        options: ['4', '5', '6', '7'],
        answerIndex: 1,
      },
      {
        question: 'What is 2 + 6?',
        options: ['7', '8', '9', '10'],
        answerIndex: 1,
      },
      {
        question: 'What is 7 + 1?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
      },
      {
        question: 'What is 5 - 2?',
        options: ['2', '3', '4', '5'],
        answerIndex: 1,
      },
      {
        question: 'What is 6 - 1?',
        options: ['4', '5', '6', '7'],
        answerIndex: 1,
      },
      {
        question: 'What is 3 + 5?',
        options: ['7', '8', '9', '10'],
        answerIndex: 1,
      },
      {
        question: 'What is 4 - 1?',
        options: ['2', '3', '4', '5'],
        answerIndex: 1,
      },
      {
        question: 'What is 9 + 0?',
        options: ['8', '9', '10', '11'],
        answerIndex: 1,
      },
      {
        question: 'What is 10 - 2?',
        options: ['7', '8', '9', '10'],
        answerIndex: 1,
      },
      {
        question: 'What is 1 + 1?',
        options: ['1', '2', '3', '4'],
        answerIndex: 1,
      },
      {
        question: 'What is 7 - 4?',
        options: ['2', '3', '4', '5'],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Multiplication & division',
    emoji: '⚡',
    color: '#ffd60a',
    questions: [
      {
        question: 'What is 12 + 8?',
        options: ['18', '19', '20', '21'],
        answerIndex: 2,
      },
      {
        question: 'What is 15 - 7?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
      },
      {
        question: 'What is 6 x 4?',
        options: ['20', '22', '24', '26'],
        answerIndex: 2,
      },
      {
        question: 'What is 36 / 6?',
        options: ['5', '6', '7', '8'],
        answerIndex: 1,
      },
      {
        question: 'What is 9 x 3?',
        options: ['24', '25', '27', '29'],
        answerIndex: 2,
      },
      {
        question: 'What is 45 - 12?',
        options: ['31', '32', '33', '34'],
        answerIndex: 2,
      },
      {
        question: 'What is 7 x 5?',
        options: ['30', '35', '40', '45'],
        answerIndex: 1,
      },
      {
        question: 'What is 56 / 8?',
        options: ['6', '7', '8', '9'],
        answerIndex: 1,
      },
      {
        question: 'What is 14 + 19?',
        options: ['31', '32', '33', '34'],
        answerIndex: 2,
      },
      {
        question: 'What is 64 / 8?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
      },
      {
        question: 'What is 11 x 2?',
        options: ['20', '21', '22', '23'],
        answerIndex: 2,
      },
      {
        question: 'What is 50 - 18?',
        options: ['30', '31', '32', '33'],
        answerIndex: 2,
      },
      {
        question: 'What is 8 x 7?',
        options: ['54', '55', '56', '57'],
        answerIndex: 2,
      },
      {
        question: 'What is 81 / 9?',
        options: ['8', '9', '10', '11'],
        answerIndex: 1,
      },
      {
        question: 'What is 23 + 16?',
        options: ['37', '38', '39', '40'],
        answerIndex: 2,
      },
      {
        question: 'What is 72 / 9?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
      },
      {
        question: 'What is 5 x 9?',
        options: ['40', '45', '50', '55'],
        answerIndex: 1,
      },
      {
        question: 'What is 90 - 25?',
        options: ['63', '64', '65', '66'],
        answerIndex: 2,
      },
      {
        question: 'What is 13 + 14?',
        options: ['25', '26', '27', '28'],
        answerIndex: 2,
      },
      {
        question: 'What is 6 x 8?',
        options: ['46', '47', '48', '49'],
        answerIndex: 2,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'Algebra & fractions',
    emoji: '🔥',
    color: '#ff6d8c',
    questions: [
      {
        question: 'What is 125 / 5?',
        options: ['20', '25', '30', '35'],
        answerIndex: 1,
      },
      {
        question: 'What is 15 x 12?',
        options: ['160', '170', '180', '190'],
        answerIndex: 2,
      },
      {
        question: 'What is 144 / 12?',
        options: ['10', '11', '12', '13'],
        answerIndex: 2,
      },
      {
        question: 'What is 25 x 4?',
        options: ['90', '95', '100', '105'],
        answerIndex: 2,
      },
      {
        question: 'What is 17 + 28?',
        options: ['43', '44', '45', '46'],
        answerIndex: 2,
      },
      {
        question: 'What is 81 x 2?',
        options: ['160', '161', '162', '163'],
        answerIndex: 2,
      },
      {
        question: 'What is 96 / 8?',
        options: ['10', '11', '12', '13'],
        answerIndex: 2,
      },
      {
        question: 'What is 19 x 3?',
        options: ['54', '55', '57', '59'],
        answerIndex: 2,
      },
      {
        question: 'What is 250 - 125?',
        options: ['115', '120', '125', '130'],
        answerIndex: 2,
      },
      {
        question: 'What is 13 x 13?',
        options: ['156', '169', '182', '195'],
        answerIndex: 1,
      },
      {
        question: 'What is 225 / 15?',
        options: ['14', '15', '16', '17'],
        answerIndex: 1,
      },
      {
        question: 'What is 48 + 37?',
        options: ['83', '84', '85', '86'],
        answerIndex: 2,
      },
      {
        question: 'What is 14 x 6?',
        options: ['82', '83', '84', '85'],
        answerIndex: 2,
      },
      {
        question: 'What is 121 / 11?',
        options: ['10', '11', '12', '13'],
        answerIndex: 1,
      },
      {
        question: 'What is 99 - 44?',
        options: ['53', '54', '55', '56'],
        answerIndex: 2,
      },
      {
        question: 'What is 32 x 3?',
        options: ['94', '95', '96', '97'],
        answerIndex: 2,
      },
      {
        question: 'What is 169 / 13?',
        options: ['11', '12', '13', '14'],
        answerIndex: 2,
      },
      {
        question: 'What is 75 + 26?',
        options: ['99', '100', '101', '102'],
        answerIndex: 2,
      },
      {
        question: 'What is 18 x 7?',
        options: ['124', '125', '126', '127'],
        answerIndex: 2,
      },
      {
        question: 'What is 400 / 20?',
        options: ['18', '19', '20', '21'],
        answerIndex: 2,
      },
    ],
  },
];
