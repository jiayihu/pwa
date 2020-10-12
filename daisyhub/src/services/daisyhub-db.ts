export const getDb = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('daisyhub', 1);

    request.addEventListener('error', (event) => {
      const error = (event.target as IDBRequest).error;
      reject(error);
    });

    request.addEventListener('success', () => {
      const db = request.result;
      resolve(db);
    });

    request.addEventListener('upgradeneeded', () => {
      const db = request.result;

      if (!db.objectStoreNames.contains('new-messages')) {
        db.createObjectStore('new-messages', { keyPath: 'body.authorId' });
      }
    });
  });
};

/**
 *   1:  { id: 1 } <= Document
 *   3:  { id: 3 } <= Document
 *   4:  { id: 4 } <= Document
 */

export function promisifyRequest<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.addEventListener('success', () => {
      resolve(request.result);
    });

    request.addEventListener('error', () => {
      reject(request.error);
    });
  });
}
