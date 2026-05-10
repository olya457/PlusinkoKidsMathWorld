import type {ImageSourcePropType} from 'react-native';
import {images} from './assets';

export type MathArticle = {
  id: string;
  title: string;
  category: string;
  minutes: number;
  image: ImageSourcePropType;
  excerpt: string;
  body: string[];
};

export const mathArticles: MathArticle[] = [
  {
    id: 'golden-ratio',
    title: "The Golden Ratio: Nature's Secret Formula",
    category: 'Number Theory',
    minutes: 4,
    image: images.blogGoldenRatio,
    excerpt: 'How phi appears in sunflowers, galaxies, and human faces.',
    body: [
      "The Golden Ratio, phi, is one of mathematics' most enchanting numbers. It appears throughout nature, from the spiral of sunflower seeds to the proportions of nautilus shells.",
      'Ancient Greek architects used it in the Parthenon, and Leonardo da Vinci explored it in his masterpieces. The ratio appears when a line is divided so the whole line has the same ratio to the larger segment as the larger segment has to the smaller.',
      'Connect any two consecutive Fibonacci numbers and you approach phi more closely as they grow larger. Researchers find similar proportions in DNA structure, flower petals, and spiral galaxies.',
    ],
  },
  {
    id: 'zero',
    title: 'Why Is Zero So Special?',
    category: 'History',
    minutes: 3,
    image: images.blogZero,
    excerpt: 'The number that changed everything, from counting to code.',
    body: [
      'Zero became one of the most important inventions in mathematics because it allowed people to write large numbers clearly and solve more difficult equations.',
      'Before zero, many number systems were harder to calculate with. Once mathematicians accepted zero as both a placeholder and a number, arithmetic became much faster and more powerful.',
      'Today, zero is used in science, technology, banking, engineering, and almost every area of modern life. Computers also rely on zero and one to store information.',
    ],
  },
  {
    id: 'math-everywhere',
    title: 'Why Math Is Everywhere',
    category: 'Everyday Math',
    minutes: 5,
    image: images.wallpaperTeacher,
    excerpt: 'Shopping, cooking, traveling, games, and music all use math.',
    body: [
      'Mathematics is part of everyday life, even when people do not notice it. We use math while shopping, cooking, traveling, playing games, and managing time.',
      'Phones, computers, cars, and even music rely on mathematical calculations to work correctly. Architects use math to design buildings, scientists use it to explore space, and game developers use it to create fun experiences for players.',
      'Learning mathematics helps improve logical thinking and problem-solving skills. It teaches the brain how to analyze situations carefully and make smart decisions.',
      'Children who practice math regularly often become better at focusing and understanding patterns in other subjects as well. Math is not only about numbers on paper. It is a useful tool that helps people understand the world around them.',
    ],
  },
  {
    id: 'history-numbers',
    title: 'The History of Numbers',
    category: 'History',
    minutes: 4,
    image: images.wallpaperFormulas,
    excerpt: 'Ancient civilizations built number systems to count and plan.',
    body: [
      'Numbers have existed for thousands of years and were created to help people count objects, animals, and supplies.',
      'Ancient civilizations used different symbols and systems to represent numbers before the modern system was invented. The Egyptians, Romans, and Babylonians all had their own ways of counting and calculating.',
      'Over time, mathematicians developed better systems that made calculations faster and easier. The number zero became one of the most important inventions in mathematics because it allowed people to create advanced equations and solve more difficult problems.',
      'Today, numbers are used in science, technology, banking, engineering, and almost every area of modern life.',
    ],
  },
  {
    id: 'brain-training',
    title: 'How Math Trains Your Brain',
    category: 'Learning',
    minutes: 4,
    image: images.wallpaperChalkboard,
    excerpt: 'Solving problems strengthens memory, attention, and logic.',
    body: [
      'Solving math problems is like exercising your brain. Each time you work with numbers, your memory, attention, and logical thinking become stronger.',
      'Math teaches the brain to stay focused and search for solutions step by step instead of guessing randomly.',
      'Practicing mathematics can improve concentration and analytical skills. It also helps people become more patient because many problems require careful thinking and multiple attempts.',
      'Children who regularly solve puzzles and math quizzes often develop better confidence in learning and decision-making. Math is not only about getting the correct answer. It is also about learning how to think clearly.',
    ],
  },
  {
    id: 'pi',
    title: 'Fun Facts About Pi',
    category: 'Geometry',
    minutes: 3,
    image: images.wallpaperBlueGrid,
    excerpt: 'Pi starts with 3.14 and continues forever without repeating.',
    body: [
      'Pi is one of the most famous numbers in mathematics. It represents the relationship between the circumference of a circle and its diameter.',
      'The number starts with 3.14, but it continues forever without repeating the same pattern. Mathematicians have calculated trillions of digits of pi using powerful computers.',
      'People celebrate Pi Day every year on March 14 because the date matches the first digits of the number.',
      'Pi is used in geometry, engineering, physics, and even space exploration. Without pi, many modern technologies and scientific calculations would not work correctly.',
    ],
  },
  {
    id: 'puzzles',
    title: 'Why Puzzles Are Helpful',
    category: 'Logic',
    minutes: 3,
    image: images.wallpaperKidsBoard,
    excerpt: 'Logic games turn practice into a fun brain workout.',
    body: [
      'Math puzzles and logic games are excellent ways to train the brain while having fun. They encourage players to think carefully, test ideas, and search for patterns.',
      'Puzzles can improve memory, attention, and problem-solving skills in both children and adults.',
      'When people solve puzzles regularly, they become more comfortable with difficult tasks and learn not to give up easily.',
      'Many schools use puzzles and interactive games to make learning mathematics more exciting for students. Challenges that involve numbers, shapes, or quick thinking can turn practice into an enjoyable activity instead of a stressful one.',
    ],
  },
  {
    id: 'multiplication',
    title: 'The Power of Multiplication',
    category: 'Skills',
    minutes: 4,
    image: images.wallpaperNumbers,
    excerpt: 'Multiplication helps solve large calculations quickly.',
    body: [
      'Multiplication is one of the most useful math skills because it helps solve large calculations quickly. Instead of adding the same number many times, multiplication allows people to find answers faster and more efficiently.',
      'It is used in shopping, sports, construction, science, and many everyday situations.',
      'Learning multiplication tables can greatly improve calculation speed and confidence. Once students remember the basic patterns, solving harder equations becomes much easier.',
      'Multiplication is also an important step toward learning fractions, algebra, and more advanced mathematics in the future.',
    ],
  },
  {
    id: 'space',
    title: 'Math in Space Exploration',
    category: 'Science',
    minutes: 5,
    image: images.wallpaperBlueGrid,
    excerpt: 'Rockets, satellites, and telescopes all depend on math.',
    body: [
      'Space missions would not be possible without mathematics. Scientists and engineers use complex calculations to launch rockets, control satellites, and predict the movement of planets.',
      'Even a very small mistake in calculations could cause a mission to fail.',
      'Astronauts also use math while working in space. They calculate distances, fuel usage, speed, and equipment measurements during missions.',
      'Modern telescopes and space technology rely on mathematical formulas to study stars and galaxies far away from Earth. Mathematics helps humanity explore the universe and discover new information about space every year.',
    ],
  },
];
