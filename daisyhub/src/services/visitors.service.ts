import { request } from './request';
import { getFirestore } from './db';
import { getRealtimeCollection } from './real-time';
import { Visitor } from '../types/visitor';
import { firestore } from 'firebase';

export function getRealtimeVisitors(bulletinId: string) {
  const ref = getFirestore()
    .collection('bulletins')
    .doc(bulletinId)
    .collection('visitors') as firestore.CollectionReference<Visitor>;

  return getRealtimeCollection(ref);
}

export function addBulletinVisitor(bulletinId: string, name: string) {
  return request<{ id: string }>(`bulletins/${bulletinId}/visitors`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function removeBulletinVisitor(bulletinId: string, visitorId: string) {
  return request<void>(`bulletins/${bulletinId}/visitors/${visitorId}`, {
    method: 'DELETE',
  });
}
