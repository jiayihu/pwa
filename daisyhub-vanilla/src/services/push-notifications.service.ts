import { request } from './request';

export function createPushSubscription(bulletinId: string, pushSubscription: PushSubscription) {
  return request<void>(`bulletins/${bulletinId}/push-subscriptions/`, {
    method: 'POST',
    body: JSON.stringify(pushSubscription),
  });
}

export function deletePushSubscription(bulletinId: string, authKey: string) {
  return request<void>(`bulletins/${bulletinId}/push-subscriptions/${authKey}`, {
    method: 'DELETE',
  });
}
