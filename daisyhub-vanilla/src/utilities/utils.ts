export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type ValueOf<T> = T[keyof T];

export function assertNever(_: never): never {
  throw new Error('Unreachable code');
}

export function debounce<F extends (...params: Array<any>) => void>(fn: F, delay: number): F {
  let timer: number;

  return function (this: any, ...args: Array<any>) {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export function flatten<T>(arr: Array<Array<T>>): Array<T> {
  return ([] as Array<T>).concat(...arr);
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  const hex = Array.from({ length: 6 }, (_, i) => i)
    .map(() => letters[Math.floor(Math.random() * 16)])
    .join('');

  return `#${hex}`;
}

export type Reviver = (this: any, key: string, value: any) => any;

export function readLocalStorage<T>(key: string, reviver?: Reviver): T | null {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item, reviver) : null;
  } catch (error) {
    console.log('Error reading from localStorage');
    console.error(error);
    return null;
  }
}

export function saveLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving to localStorage');
    console.error(error);
  }
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export const isTruthy = Boolean;

export function isValidDate(value: Date) {
  return value instanceof Date && !isNaN(value as any);
}

export const noop = () => {
  // Noop
};

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function omit<T extends Record<string, any>, K extends Array<keyof T>>(
  obj: T,
  keys: K,
): Omit<T, K> {
  return (Object.keys(obj) as Array<keyof T>)
    .filter(key => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];

      return acc;
    }, {} as T);
}

export function roundTo2Decimals(x: number): number {
  return Math.round(x * 100) / 100;
}

export function series(n: number, fn = (_: any, i: number) => i) {
  Array.from({ length: n }, fn);
}

export function shuffle<T>(values: T[]): T[] {
  return values.sort(() => 0.5 - Math.random());
}

export function addDays(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days));
}

export function times(n: number, fn: (n: number) => void) {
  Array.from({ length: n }, (_, i) => i).map(fn);
}

export const uniqueId = (prefix: string = ''): string => {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
};

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
