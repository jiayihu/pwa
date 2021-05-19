import { firestore } from 'firebase';

export type EventSource<T> = {
  subscribe(listener: (docs: T | null) => void): void;
  unsubscribe(): void;
};

export const isCollection = <T>(
  ref: firestore.CollectionReference<T> | firestore.DocumentReference<T>,
): ref is firestore.CollectionReference<T> =>
  typeof (ref as firestore.CollectionReference<T>).doc === 'function';

export function getRealtimeCollection<T>(ref: firestore.CollectionReference<T>): EventSource<T[]> {
  let detach: () => void;

  return {
    subscribe(listener) {
      detach = ref.onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => doc.data());
        listener(docs);
      });
    },
    unsubscribe() {
      if (detach) detach();
    },
  };
}

export function getRealtimeDocument<T>(
  ref: firestore.DocumentReference<T>,
  transform: (doc: firestore.DocumentData) => T,
): EventSource<T | null> {
  let detach: () => void;

  return {
    subscribe(listener) {
      detach = ref.onSnapshot(snapshot => {
        const doc = snapshot.data();
        listener(doc ? transform(doc) : null);
      });
    },
    unsubscribe() {
      if (detach) detach();
    },
  };
}
