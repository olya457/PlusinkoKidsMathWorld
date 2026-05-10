import React, {createContext, useContext, useMemo} from 'react';
import type {Dispatch, ReactNode, SetStateAction} from 'react';
import {usePersistentState} from './usePersistentState';

type AppStateValue = {
  hydrated: boolean;
  onboardingComplete: boolean;
  setOnboardingComplete: Dispatch<SetStateAction<boolean>>;
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
  favoriteArticles: string[];
  setFavoriteArticles: Dispatch<SetStateAction<string[]>>;
  unlockedWallpapers: string[];
  setUnlockedWallpapers: Dispatch<SetStateAction<string[]>>;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({children}: {children: ReactNode}) {
  const [onboardingComplete, setOnboardingComplete, onboardingHydrated] =
    usePersistentState('mathspark:onboardingComplete', false);
  const [points, setPoints, pointsHydrated] = usePersistentState(
    'mathspark:points',
    0,
  );
  const [favoriteArticles, setFavoriteArticles, favoritesHydrated] =
    usePersistentState<string[]>('mathspark:favoriteArticles', []);
  const [unlockedWallpapers, setUnlockedWallpapers, wallpapersHydrated] =
    usePersistentState<string[]>('mathspark:unlockedWallpapers', []);

  const value = useMemo<AppStateValue>(
    () => ({
      hydrated:
        onboardingHydrated &&
        pointsHydrated &&
        favoritesHydrated &&
        wallpapersHydrated,
      onboardingComplete,
      setOnboardingComplete,
      points,
      setPoints,
      favoriteArticles,
      setFavoriteArticles,
      unlockedWallpapers,
      setUnlockedWallpapers,
    }),
    [
      favoriteArticles,
      favoritesHydrated,
      onboardingComplete,
      onboardingHydrated,
      points,
      pointsHydrated,
      setFavoriteArticles,
      setOnboardingComplete,
      setPoints,
      setUnlockedWallpapers,
      unlockedWallpapers,
      wallpapersHydrated,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const value = useContext(AppStateContext);

  if (!value) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }

  return value;
}
