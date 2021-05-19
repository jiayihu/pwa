import { firestore } from 'firebase/app';

let db: firestore.Firestore | null = null;

export function getFirestore(): firestore.Firestore {
  if (!db) {
    db = firestore();
  }

  return db;
}
