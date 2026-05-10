import type {ImageSourcePropType} from 'react-native';
import {images} from './assets';

export type Wallpaper = {
  id: string;
  title: string;
  cost: number;
  image: ImageSourcePropType;
};

export const wallpapers: Wallpaper[] = [
  {
    id: 'violet-formulas',
    title: 'Formula Flow',
    cost: 6,
    image: images.wallpaperFormulas,
  },
  {
    id: 'study-energy',
    title: 'Study Energy',
    cost: 6,
    image: images.wallpaperTeacher,
  },
  {
    id: 'chalk-map',
    title: 'Chalk Map',
    cost: 10,
    image: images.wallpaperChalkboard,
  },
  {
    id: 'number-cloud',
    title: 'Number Cloud',
    cost: 10,
    image: images.wallpaperNumbers,
  },
  {
    id: 'blue-grid',
    title: 'Blue Grid',
    cost: 20,
    image: images.wallpaperBlueGrid,
  },
];
