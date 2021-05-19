import { request } from './request';
import { Bulletin, BulletinBody } from '../types/bulletin';
import { getFirestore } from './db';
import { getRealtimeDocument } from './real-time';
import { firestore } from 'firebase';

export function getBulletins() {
  return request<Bulletin[]>('bulletins');
}

export function getBulletin(bulletinId: string) {
  return request<Bulletin>(`bulletins/${bulletinId}`);
}

export function deleteBulletin(bulletinId: string) {
  return request<void>(`bulletins/${bulletinId}`, {
    method: 'DELETE',
  });
}

export function addBulletin(bulletin: BulletinBody) {
  return request<{ id: string; ownerId: string }>(`bulletins`, {
    method: 'POST',
    body: JSON.stringify(bulletin),
  });
}

export function lockBulletinQueue(bulletinId: string, isLocked: boolean) {
  return request<void>(`bulletins/${bulletinId}/queue`, {
    method: 'PATCH',
    body: JSON.stringify({
      isLocked,
    }),
  });
}

function docToBulletin(document: firestore.DocumentData): Bulletin {
  const creationDate = (document.meta.creationDate.toDate() as Date).toISOString();
  return { ...document, meta: { creationDate } } as Bulletin;
}

export function getRealtimeBulletin(bulletinId: string) {
  const ref = getFirestore().collection('bulletins').doc(bulletinId) as firestore.DocumentReference<
    Bulletin
  >;

  return getRealtimeDocument(ref, doc => docToBulletin(doc));
}
