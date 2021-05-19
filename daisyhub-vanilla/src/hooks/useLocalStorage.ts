import { useState } from 'react';
import { saveLocalStorage, readLocalStorage, Reviver } from '../utilities/utils';

export function useLocalStorage<T>({
  key,
  initialValue,
  reviver,
}: {
  key: string;
  initialValue: T;
  reviver?: Reviver;
}): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    return readLocalStorage<T>(key, reviver) || initialValue;
  });

  const setValue = (value: T) => {
    saveLocalStorage(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
