import { request } from './request';
import { getFirestore } from './db';
import { getRealtimeCollection } from './real-time';
import { Message, MessageBody } from '../types/message';
import { firestore } from 'firebase';

export function getRealtimeMessages(bulletinId: string) {
  const ref = getFirestore()
    .collection('bulletins')
    .doc(bulletinId)
    .collection('messages') as firestore.CollectionReference<Message>;

  return getRealtimeCollection(ref);
}

export function addBulletinMessage(bulletinId: string, body: MessageBody) {
  return request<{ id: string }>(`bulletins/${bulletinId}/messages`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
