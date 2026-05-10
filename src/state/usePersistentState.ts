import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Dispatch, SetStateAction} from 'react';
import {useEffect, useState} from 'react';

type Setter<T> = Dispatch<SetStateAction<T>>;

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Setter<T>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(key)
      .then(stored => {
        if (!active) {
          return;
        }

        if (stored !== null) {
          setValue(JSON.parse(stored) as T);
        }
      })
      .finally(() => {
        if (active) {
          setHydrated(true);
        }
      });

    return () => {
      active = false;
    };
  }, [key]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [hydrated, key, value]);

  return [value, setValue, hydrated];
}
